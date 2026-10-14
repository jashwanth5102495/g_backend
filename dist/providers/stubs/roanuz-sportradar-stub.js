/**
 * STUB: Roanuz Cricket API Provider
 * Docs: https://www.cricketapi.com/documentation/
 *
 * TODO: Implement when a Roanuz API license key is available.
 * Required steps:
 * 1. Implement Roanuz OAuth token exchange (POST to /v5/core/{app_id}/auth/).
 * 2. Connect to Roanuz WebSocket endpoint for ultra-low latency ball-by-ball push.
 * 3. Map Roanuz match summary schema to internal Match model.
 * 4. Map Roanuz ball-by-ball payload into internal BallEvent model.
 */
export class RoanuzCricketProvider {
    name = 'roanuz';
    async getLiveMatches() {
        throw new Error('RoanuzCricketProvider not implemented yet. Set CRICKET_PROVIDER=mock or cricketdata.');
    }
    async getMatchSnapshot(matchId) {
        throw new Error('RoanuzCricketProvider not implemented yet.');
    }
    async getFixtures(range) {
        throw new Error('RoanuzCricketProvider not implemented yet.');
    }
    async getScorecard(matchId) {
        throw new Error('RoanuzCricketProvider not implemented yet.');
    }
    async getCommentary(matchId, cursor) {
        throw new Error('RoanuzCricketProvider not implemented yet.');
    }
}
/**
 * STUB: Sportradar Cricket API Provider
 * Docs: https://developer.sportradar.com/docs/read/cricket/Cricket_v2
 *
 * TODO: Implement when Sportradar Cricket v2 API access is provisioned.
 * Required steps:
 * 1. Provision Sportradar API Key with trial or production subscription.
 * 2. Call /cricket-t2/en/tournaments/live_summaries.json for live polling.
 * 3. Map Sportradar match timelines, probabilities, and player statistics.
 */
export class SportradarCricketProvider {
    name = 'sportradar';
    async getLiveMatches() {
        throw new Error('SportradarCricketProvider not implemented yet. Set CRICKET_PROVIDER=mock or cricketdata.');
    }
    async getMatchSnapshot(matchId) {
        throw new Error('SportradarCricketProvider not implemented yet.');
    }
    async getFixtures(range) {
        throw new Error('SportradarCricketProvider not implemented yet.');
    }
    async getScorecard(matchId) {
        throw new Error('SportradarCricketProvider not implemented yet.');
    }
    async getCommentary(matchId, cursor) {
        throw new Error('SportradarCricketProvider not implemented yet.');
    }
}
