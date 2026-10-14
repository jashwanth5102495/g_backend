import { prisma } from '../db.js';
const ROULETTE_RED_NUMBERS = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);
const CARD_RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const CARD_SUITS = ['♠', '♥', '♦', '♣'];
function getRandomCard() {
    const rank = CARD_RANKS[Math.floor(Math.random() * CARD_RANKS.length)];
    const suit = CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
    return { rank, suit, display: `${rank}${suit}` };
}
export const casinoRoutes = async (fastify) => {
    // 1. Auth: Login & Verify
    fastify.post('/api/casino/auth', async (request, reply) => {
        try {
            const { userId, password } = request.body;
            if (!userId || !password) {
                return reply.status(400).send({ error: 'User ID and password are required' });
            }
            const cleanUserId = String(userId).trim();
            let user = await prisma.casinoUser.findUnique({
                where: { userId: cleanUserId },
            });
            if (!user && cleanUserId.toLowerCase() === 'admin' && password === 'admin123') {
                user = await prisma.casinoUser.create({
                    data: {
                        userId: 'admin',
                        password: 'admin123',
                        role: 'ADMIN',
                        coins: 999999,
                        status: 'ACTIVE',
                    },
                });
            }
            if (!user) {
                return reply
                    .status(401)
                    .send({ error: 'Invalid User ID or Password. Please contact Casino Admin.' });
            }
            if (user.password !== password) {
                return reply.status(401).send({ error: 'Incorrect password. Please try again.' });
            }
            if (user.status === 'SUSPENDED') {
                return reply
                    .status(403)
                    .send({ error: 'This casino account has been suspended by Admin.' });
            }
            return {
                success: true,
                user: {
                    id: user.id,
                    userId: user.userId,
                    role: user.role,
                    coins: user.coins,
                    status: user.status,
                },
            };
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Authentication error' });
        }
    });
    // 2. Auth: Get User Balance & Status
    fastify.get('/api/casino/auth', async (request, reply) => {
        try {
            const { userId } = request.query;
            if (!userId) {
                return reply.status(400).send({ error: 'Missing userId parameter' });
            }
            const user = await prisma.casinoUser.findUnique({
                where: { userId: String(userId).trim() },
                select: {
                    id: true,
                    userId: true,
                    role: true,
                    coins: true,
                    status: true,
                    coinRequests: {
                        where: { status: 'PENDING' },
                        orderBy: { createdAt: 'desc' },
                        take: 1,
                    },
                },
            });
            if (!user) {
                return reply.status(404).send({ error: 'User not found' });
            }
            return {
                success: true,
                user: {
                    ...user,
                    pendingRequest: user.coinRequests[0] || null,
                },
            };
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Error fetching user' });
        }
    });
    // 3. Admin: List Users with Full Statistics
    fastify.get('/api/casino/admin/users', async (request, reply) => {
        try {
            const users = await prisma.casinoUser.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    bets: {
                        select: {
                            id: true,
                            game: true,
                            betAmount: true,
                            payout: true,
                            won: true,
                            createdAt: true,
                        },
                    },
                    coinRequests: {
                        where: { status: 'PENDING' },
                        select: { id: true, requestedAmount: true, createdAt: true },
                    },
                },
            });
            const userStats = users.map((u) => {
                const totalGames = u.bets.length;
                const wins = u.bets.filter((b) => b.won).length;
                const losses = u.bets.filter((b) => !b.won).length;
                const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
                const totalWagered = u.bets.reduce((acc, b) => acc + b.betAmount, 0);
                const totalPayout = u.bets.reduce((acc, b) => acc + b.payout, 0);
                const netPnL = totalPayout - totalWagered;
                const rouletteGames = u.bets.filter((b) => b.game === 'ROULETTE').length;
                const andarBaharGames = u.bets.filter((b) => b.game === 'ANDAR_BAHAR').length;
                return {
                    id: u.id,
                    userId: u.userId,
                    password: u.password,
                    role: u.role,
                    coins: u.coins,
                    status: u.status,
                    createdAt: u.createdAt.toISOString(),
                    totalGames,
                    wins,
                    losses,
                    winRate,
                    totalWagered,
                    totalPayout,
                    netPnL,
                    gamesBreakdown: {
                        roulette: rouletteGames,
                        andarBahar: andarBaharGames,
                    },
                    pendingRequestsCount: u.coinRequests.length,
                };
            });
            return { success: true, users: userStats };
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Failed to fetch users' });
        }
    });
    // 4. Admin: Create User
    fastify.post('/api/casino/admin/users', async (request, reply) => {
        try {
            const { userId, password, initialCoins = 0 } = request.body;
            if (!userId || !password) {
                return reply.status(400).send({ error: 'User ID and Password are required.' });
            }
            const cleanUserId = String(userId).trim();
            const coins = Math.max(0, Number(initialCoins) || 0);
            const existing = await prisma.casinoUser.findUnique({
                where: { userId: cleanUserId },
            });
            if (existing) {
                return reply
                    .status(409)
                    .send({ error: `User with ID "${cleanUserId}" already exists.` });
            }
            const newUser = await prisma.$transaction(async (tx) => {
                const user = await tx.casinoUser.create({
                    data: {
                        userId: cleanUserId,
                        password: String(password).trim(),
                        role: 'USER',
                        coins,
                        status: 'ACTIVE',
                    },
                });
                if (coins > 0) {
                    await tx.coinTransaction.create({
                        data: {
                            casinoUserId: user.id,
                            amount: coins,
                            balanceAfter: coins,
                            type: 'ADMIN_ALLOT',
                            note: 'Initial account allotment by Admin',
                        },
                    });
                }
                return user;
            });
            return {
                success: true,
                user: {
                    id: newUser.id,
                    userId: newUser.userId,
                    coins: newUser.coins,
                    role: newUser.role,
                    status: newUser.status,
                    createdAt: newUser.createdAt.toISOString(),
                },
            };
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Failed to create user' });
        }
    });
    // 5. Admin: Allot Coins
    fastify.post('/api/casino/admin/allot-coins', async (request, reply) => {
        try {
            const { userId, amount, note } = request.body;
            if (!userId)
                return reply.status(400).send({ error: 'User ID is required' });
            const allotAmount = Number(amount);
            if (isNaN(allotAmount) || allotAmount <= 0) {
                return reply
                    .status(400)
                    .send({ error: 'Allotment amount must be a positive number' });
            }
            const cleanUserId = String(userId).trim();
            const user = await prisma.casinoUser.findUnique({ where: { userId: cleanUserId } });
            if (!user)
                return reply.status(404).send({ error: 'User not found' });
            const updatedUser = await prisma.$transaction(async (tx) => {
                const newBalance = user.coins + allotAmount;
                const updated = await tx.casinoUser.update({
                    where: { id: user.id },
                    data: { coins: newBalance },
                });
                await tx.coinTransaction.create({
                    data: {
                        casinoUserId: user.id,
                        amount: allotAmount,
                        balanceAfter: newBalance,
                        type: 'ADMIN_ALLOT',
                        note: note || `Admin manual allotment of ${allotAmount} coins`,
                    },
                });
                return updated;
            });
            return {
                success: true,
                message: `Successfully allotted ${allotAmount} coins to ${cleanUserId}`,
                userId: updatedUser.userId,
                coins: updatedUser.coins,
            };
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Failed to allot coins' });
        }
    });
    // 6. Admin: List Coin Requests
    fastify.get('/api/casino/admin/requests', async (request, reply) => {
        try {
            const requests = await prisma.coinRequest.findMany({
                orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
                include: {
                    casinoUser: {
                        select: { id: true, userId: true, coins: true, status: true },
                    },
                },
            });
            return {
                success: true,
                requests: requests.map((r) => ({
                    id: r.id,
                    userId: r.casinoUser.userId,
                    currentBalance: r.casinoUser.coins,
                    requestedAmount: r.requestedAmount,
                    allocatedAmount: r.allocatedAmount,
                    status: r.status,
                    reason: r.reason,
                    adminNotes: r.adminNotes,
                    createdAt: r.createdAt.toISOString(),
                    reviewedAt: r.reviewedAt ? r.reviewedAt.toISOString() : null,
                })),
            };
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Failed to fetch requests' });
        }
    });
    // 7. Admin: Approve or Reject Coin Request
    fastify.post('/api/casino/admin/requests', async (request, reply) => {
        try {
            const { requestId, action, amount, adminNotes } = request.body;
            if (!requestId || !action) {
                return reply.status(400).send({ error: 'requestId and action are required.' });
            }
            const coinRequest = await prisma.coinRequest.findUnique({
                where: { id: requestId },
                include: { casinoUser: true },
            });
            if (!coinRequest)
                return reply.status(404).send({ error: 'Coin request not found' });
            if (coinRequest.status !== 'PENDING') {
                return reply
                    .status(400)
                    .send({ error: `Request already ${coinRequest.status.toLowerCase()}.` });
            }
            if (action === 'APPROVE') {
                const allocateCoins = Number(amount) || coinRequest.requestedAmount;
                await prisma.$transaction(async (tx) => {
                    await tx.coinRequest.update({
                        where: { id: requestId },
                        data: {
                            status: 'APPROVED',
                            allocatedAmount: allocateCoins,
                            adminNotes: adminNotes || null,
                            reviewedAt: new Date(),
                        },
                    });
                    const newBalance = coinRequest.casinoUser.coins + allocateCoins;
                    await tx.casinoUser.update({
                        where: { id: coinRequest.casinoUserId },
                        data: { coins: newBalance },
                    });
                    await tx.coinTransaction.create({
                        data: {
                            casinoUserId: coinRequest.casinoUserId,
                            amount: allocateCoins,
                            balanceAfter: newBalance,
                            type: 'REQUEST_APPROVED',
                            note: adminNotes || `Approved refill for ${allocateCoins} coins`,
                        },
                    });
                });
                return {
                    success: true,
                    message: `Approved request! Allotted ${allocateCoins} coins to ${coinRequest.casinoUser.userId}.`,
                };
            }
            else if (action === 'REJECT') {
                await prisma.coinRequest.update({
                    where: { id: requestId },
                    data: {
                        status: 'REJECTED',
                        adminNotes: adminNotes || 'Rejected by Admin',
                        reviewedAt: new Date(),
                    },
                });
                return {
                    success: true,
                    message: `Rejected coin request for ${coinRequest.casinoUser.userId}.`,
                };
            }
            else {
                return reply.status(400).send({ error: 'Invalid action. Must be APPROVE or REJECT' });
            }
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Failed to update request' });
        }
    });
    // 8. Admin: Get Detailed User History
    fastify.get('/api/casino/admin/user/:userId', async (request, reply) => {
        try {
            const { userId } = request.params;
            const cleanUserId = decodeURIComponent(userId).trim();
            const user = await prisma.casinoUser.findUnique({
                where: { userId: cleanUserId },
                include: {
                    bets: { orderBy: { createdAt: 'desc' }, take: 100 },
                    coinTransactions: { orderBy: { createdAt: 'desc' }, take: 50 },
                    coinRequests: { orderBy: { createdAt: 'desc' }, take: 20 },
                },
            });
            if (!user)
                return reply.status(404).send({ error: 'User not found' });
            const totalGames = user.bets.length;
            const wins = user.bets.filter((b) => b.won).length;
            const losses = user.bets.filter((b) => !b.won).length;
            const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
            const totalWagered = user.bets.reduce((acc, b) => acc + b.betAmount, 0);
            const totalPayout = user.bets.reduce((acc, b) => acc + b.payout, 0);
            const netPnL = totalPayout - totalWagered;
            return {
                success: true,
                user: {
                    id: user.id,
                    userId: user.userId,
                    password: user.password,
                    role: user.role,
                    coins: user.coins,
                    status: user.status,
                    createdAt: user.createdAt.toISOString(),
                },
                stats: {
                    totalGames,
                    wins,
                    losses,
                    winRate,
                    totalWagered,
                    totalPayout,
                    netPnL,
                    rouletteCount: user.bets.filter((b) => b.game === 'ROULETTE').length,
                    andarBaharCount: user.bets.filter((b) => b.game === 'ANDAR_BAHAR').length,
                },
                bets: user.bets.map((b) => ({
                    id: b.id,
                    game: b.game,
                    betAmount: b.betAmount,
                    payout: b.payout,
                    won: b.won,
                    details: b.details,
                    balanceAfter: b.balanceAfter,
                    createdAt: b.createdAt.toISOString(),
                })),
                transactions: user.coinTransactions.map((t) => ({
                    id: t.id,
                    amount: t.amount,
                    balanceAfter: t.balanceAfter,
                    type: t.type,
                    note: t.note,
                    createdAt: t.createdAt.toISOString(),
                })),
                requests: user.coinRequests.map((r) => ({
                    id: r.id,
                    requestedAmount: r.requestedAmount,
                    allocatedAmount: r.allocatedAmount,
                    status: r.status,
                    reason: r.reason,
                    createdAt: r.createdAt.toISOString(),
                })),
            };
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Failed to fetch user history' });
        }
    });
    // 9. User: Request Coins Refill
    fastify.post('/api/casino/user/request-coins', async (request, reply) => {
        try {
            const { userId, requestedAmount = 1000, reason = 'Out of coins' } = request.body;
            if (!userId)
                return reply.status(400).send({ error: 'User ID is required' });
            const cleanUserId = String(userId).trim();
            const user = await prisma.casinoUser.findUnique({ where: { userId: cleanUserId } });
            if (!user)
                return reply.status(404).send({ error: 'Casino user not found' });
            const existingPending = await prisma.coinRequest.findFirst({
                where: { casinoUserId: user.id, status: 'PENDING' },
            });
            if (existingPending) {
                return reply.status(400).send({
                    error: 'You already have a pending coin request awaiting Admin approval.',
                    pendingRequest: existingPending,
                });
            }
            const newRequest = await prisma.coinRequest.create({
                data: {
                    casinoUserId: user.id,
                    requestedAmount: Math.max(100, Number(requestedAmount) || 1000),
                    status: 'PENDING',
                    reason: String(reason).trim(),
                },
            });
            return {
                success: true,
                message: `Coin request for ${newRequest.requestedAmount} coins submitted to Admin!`,
                request: newRequest,
            };
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Failed to submit request' });
        }
    });
    // 10. Gameplay: Play Roulette or Andar Bahar
    fastify.post('/api/casino/play', async (request, reply) => {
        try {
            const { userId, game, betAmount, betChoice, selectedNumber } = request.body;
            if (!userId || !game || !betAmount) {
                return reply.status(400).send({ error: 'userId, game, and betAmount are required.' });
            }
            const wager = Math.floor(Number(betAmount));
            if (isNaN(wager) || wager <= 0) {
                return reply.status(400).send({ error: 'Bet amount must be a positive number' });
            }
            const cleanUserId = String(userId).trim();
            const user = await prisma.casinoUser.findUnique({ where: { userId: cleanUserId } });
            if (!user)
                return reply.status(404).send({ error: 'User not found' });
            if (user.coins < wager) {
                return reply.status(400).send({
                    error: 'INSUFFICIENT_COINS',
                    message: `Insufficient coins. You have ${user.coins} coins, but bet requires ${wager} coins. Please request coins from Admin.`,
                    currentCoins: user.coins,
                });
            }
            let won = false;
            let payout = 0;
            let details = {};
            if (game === 'ROULETTE') {
                const winningNumber = Math.floor(Math.random() * 37);
                const winningColor = winningNumber === 0 ? 'GREEN' : ROULETTE_RED_NUMBERS.has(winningNumber) ? 'RED' : 'BLACK';
                const isEven = winningNumber !== 0 && winningNumber % 2 === 0;
                const choice = String(betChoice || 'RED').toUpperCase();
                if (choice === 'RED' && winningColor === 'RED') {
                    won = true;
                    payout = wager * 2;
                }
                else if (choice === 'BLACK' && winningColor === 'BLACK') {
                    won = true;
                    payout = wager * 2;
                }
                else if (choice === 'EVEN' && isEven) {
                    won = true;
                    payout = wager * 2;
                }
                else if (choice === 'ODD' && winningNumber !== 0 && !isEven) {
                    won = true;
                    payout = wager * 2;
                }
                else if (choice === 'STRAIGHT_UP' && Number(selectedNumber) === winningNumber) {
                    won = true;
                    payout = wager * 36;
                }
                else if (choice === '1_18' && winningNumber >= 1 && winningNumber <= 18) {
                    won = true;
                    payout = wager * 2;
                }
                else if (choice === '19_36' && winningNumber >= 19 && winningNumber <= 36) {
                    won = true;
                    payout = wager * 2;
                }
                details = {
                    betType: choice,
                    selectedNumber: selectedNumber !== undefined ? selectedNumber : null,
                    winningNumber,
                    winningColor,
                    isEven,
                    multiplier: won ? (choice === 'STRAIGHT_UP' ? 36 : 2) : 0,
                };
            }
            else if (game === 'ANDAR_BAHAR') {
                const chosenSide = String(betChoice || 'ANDAR').toUpperCase();
                const joker = getRandomCard();
                const dealtCards = [];
                let currentSide = 'ANDAR';
                let winningSide = 'ANDAR';
                let matched = false;
                let count = 0;
                while (!matched && count < 50) {
                    count++;
                    const card = getRandomCard();
                    dealtCards.push({ side: currentSide, card: card.display });
                    if (card.rank === joker.rank) {
                        matched = true;
                        winningSide = currentSide;
                        break;
                    }
                    currentSide = currentSide === 'ANDAR' ? 'BAHAR' : 'ANDAR';
                }
                if (chosenSide === winningSide) {
                    won = true;
                    payout = Math.round(wager * 1.95);
                }
                details = {
                    chosenSide,
                    jokerCard: joker.display,
                    winningSide,
                    totalCardsDealt: dealtCards.length,
                    dealtCards: dealtCards.slice(0, 12),
                };
            }
            else {
                return reply.status(400).send({ error: `Unsupported game type: ${game}` });
            }
            const result = await prisma.$transaction(async (tx) => {
                const balanceAfter = user.coins - wager + payout;
                const updatedUser = await tx.casinoUser.update({
                    where: { id: user.id },
                    data: { coins: balanceAfter },
                });
                const bet = await tx.casinoBet.create({
                    data: {
                        casinoUserId: user.id,
                        game,
                        betAmount: wager,
                        payout,
                        won,
                        details,
                        balanceAfter,
                    },
                });
                await tx.coinTransaction.create({
                    data: {
                        casinoUserId: user.id,
                        amount: -wager,
                        balanceAfter: user.coins - wager,
                        type: 'BET_SPENT',
                        note: `Placed ${wager} coins bet on ${game}`,
                    },
                });
                if (payout > 0) {
                    await tx.coinTransaction.create({
                        data: {
                            casinoUserId: user.id,
                            amount: payout,
                            balanceAfter,
                            type: 'BET_WON',
                            note: `Won ${payout} coins from ${game}`,
                        },
                    });
                }
                return {
                    betId: bet.id,
                    newBalance: updatedUser.coins,
                    won,
                    payout,
                    profit: payout - wager,
                    details,
                };
            });
            return {
                success: true,
                game,
                wager,
                won: result.won,
                payout: result.payout,
                profit: result.profit,
                newBalance: result.newBalance,
                details: result.details,
            };
        }
        catch (error) {
            return reply.status(500).send({ error: error?.message || 'Failed to process game round' });
        }
    });
};
