import { prisma } from '../src/db.js';

export async function seedCasinoData() {
  console.log('🎰 Seeding Casino Users, Coin Balances, and Gameplay History...');

  // 1. Admin User
  const admin = await prisma.casinoUser.upsert({
    where: { userId: 'admin' },
    update: { role: 'ADMIN' },
    create: {
      userId: 'admin',
      password: 'admin123',
      role: 'ADMIN',
      coins: 999999,
      status: 'ACTIVE',
    },
  });

  // 2. Sample User 1: Active VIP Player with games played
  const user1 = await prisma.casinoUser.upsert({
    where: { userId: 'vip_player' },
    update: {},
    create: {
      userId: 'vip_player',
      password: 'pass123',
      role: 'USER',
      coins: 3400,
      status: 'ACTIVE',
    },
  });

  // Check if user1 has bets, if not create sample game history
  const user1BetsCount = await prisma.casinoBet.count({ where: { casinoUserId: user1.id } });
  if (user1BetsCount === 0) {
    // Initial allotment transaction
    await prisma.coinTransaction.create({
      data: {
        casinoUserId: user1.id,
        amount: 2000,
        balanceAfter: 2000,
        type: 'ADMIN_ALLOT',
        note: 'Welcome bonus allotment by Admin',
      },
    });

    // Game 1: Roulette - Won
    await prisma.casinoBet.create({
      data: {
        casinoUserId: user1.id,
        game: 'ROULETTE',
        betAmount: 200,
        payout: 400,
        won: true,
        details: { betType: 'RED', winningNumber: 14, winningColor: 'RED' },
        balanceAfter: 2200,
      },
    });

    // Game 2: Andar Bahar - Won
    await prisma.casinoBet.create({
      data: {
        casinoUserId: user1.id,
        game: 'ANDAR_BAHAR',
        betAmount: 300,
        payout: 600,
        won: true,
        details: { chosenSide: 'ANDAR', jokerCard: 'K♠', winningSide: 'ANDAR', dealtCards: 6 },
        balanceAfter: 2500,
      },
    });

    // Game 3: Roulette - Lost
    await prisma.casinoBet.create({
      data: {
        casinoUserId: user1.id,
        game: 'ROULETTE',
        betAmount: 500,
        payout: 0,
        won: false,
        details: { betType: 'STRAIGHT_UP', selectedNumber: 7, winningNumber: 22, winningColor: 'BLACK' },
        balanceAfter: 2000,
      },
    });

    // Allotment by Admin
    await prisma.coinTransaction.create({
      data: {
        casinoUserId: user1.id,
        amount: 1400,
        balanceAfter: 3400,
        type: 'ADMIN_ALLOT',
        note: 'VIP Weekend Allotment',
      },
    });
  }

  // 3. Sample User 2: Player out of coins with Pending Coin Request
  const user2 = await prisma.casinoUser.upsert({
    where: { userId: 'rahul_luck' },
    update: {},
    create: {
      userId: 'rahul_luck',
      password: 'pass123',
      role: 'USER',
      coins: 0, // Spent all coins
      status: 'ACTIVE',
    },
  });

  const user2BetsCount = await prisma.casinoBet.count({ where: { casinoUserId: user2.id } });
  if (user2BetsCount === 0) {
    // Initial allotment
    await prisma.coinTransaction.create({
      data: {
        casinoUserId: user2.id,
        amount: 1000,
        balanceAfter: 1000,
        type: 'ADMIN_ALLOT',
        note: 'Starter pack by Admin',
      },
    });

    // Lost bets
    await prisma.casinoBet.create({
      data: {
        casinoUserId: user2.id,
        game: 'ROULETTE',
        betAmount: 500,
        payout: 0,
        won: false,
        details: { betType: 'BLACK', winningNumber: 9, winningColor: 'RED' },
        balanceAfter: 500,
      },
    });

    await prisma.casinoBet.create({
      data: {
        casinoUserId: user2.id,
        game: 'ANDAR_BAHAR',
        betAmount: 500,
        payout: 0,
        won: false,
        details: { chosenSide: 'BAHAR', jokerCard: '8♥', winningSide: 'ANDAR', dealtCards: 4 },
        balanceAfter: 0,
      },
    });

    // Create pending coin request
    await prisma.coinRequest.create({
      data: {
        casinoUserId: user2.id,
        requestedAmount: 1500,
        status: 'PENDING',
        reason: 'Spent all coins playing Andar Bahar. Please allot 1,500 coins to continue.',
      },
    });
  }

  console.log('✅ Casino seeding complete:');
  console.log('   - Admin:     userId = admin, password = admin123');
  console.log('   - VIP User:  userId = vip_player, password = pass123 (Balance: 3,400)');
  console.log('   - User 2:    userId = rahul_luck, password = pass123 (Balance: 0, Pending Request)');
}

seedCasinoData()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

