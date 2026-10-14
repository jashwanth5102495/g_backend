import { z } from 'zod';
export declare const CricketDataApiInfoSchema: z.ZodObject<{
    hitsToday: z.ZodOptional<z.ZodNumber>;
    hitsUsed: z.ZodOptional<z.ZodNumber>;
    hitsLimit: z.ZodOptional<z.ZodNumber>;
    remHits: z.ZodOptional<z.ZodNumber>;
    credits: z.ZodOptional<z.ZodNumber>;
    server: z.ZodOptional<z.ZodNumber>;
    offsetRows: z.ZodOptional<z.ZodNumber>;
    totalRows: z.ZodOptional<z.ZodNumber>;
    queryTime: z.ZodOptional<z.ZodNumber>;
    s: z.ZodOptional<z.ZodNumber>;
    cache: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    server?: number | undefined;
    hitsToday?: number | undefined;
    hitsUsed?: number | undefined;
    hitsLimit?: number | undefined;
    remHits?: number | undefined;
    credits?: number | undefined;
    offsetRows?: number | undefined;
    totalRows?: number | undefined;
    queryTime?: number | undefined;
    s?: number | undefined;
    cache?: number | undefined;
}, {
    server?: number | undefined;
    hitsToday?: number | undefined;
    hitsUsed?: number | undefined;
    hitsLimit?: number | undefined;
    remHits?: number | undefined;
    credits?: number | undefined;
    offsetRows?: number | undefined;
    totalRows?: number | undefined;
    queryTime?: number | undefined;
    s?: number | undefined;
    cache?: number | undefined;
}>;
export declare const CricketDataTeamInfoSchema: z.ZodObject<{
    name: z.ZodString;
    shortname: z.ZodOptional<z.ZodString>;
    img: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    shortname?: string | undefined;
    img?: string | undefined;
}, {
    name: string;
    shortname?: string | undefined;
    img?: string | undefined;
}>;
export declare const CricketDataScoreItemSchema: z.ZodObject<{
    r: z.ZodNumber;
    w: z.ZodNumber;
    o: z.ZodNumber;
    inning: z.ZodString;
}, "strip", z.ZodTypeAny, {
    r: number;
    w: number;
    o: number;
    inning: string;
}, {
    r: number;
    w: number;
    o: number;
    inning: string;
}>;
export declare const CricketDataMatchItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    matchType: z.ZodString;
    status: z.ZodString;
    venue: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    date: z.ZodOptional<z.ZodString>;
    dateTimeGMT: z.ZodOptional<z.ZodString>;
    teams: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    teamInfo: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        shortname: z.ZodOptional<z.ZodString>;
        img: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        shortname?: string | undefined;
        img?: string | undefined;
    }, {
        name: string;
        shortname?: string | undefined;
        img?: string | undefined;
    }>, "many">>;
    score: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        r: z.ZodNumber;
        w: z.ZodNumber;
        o: z.ZodNumber;
        inning: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        r: number;
        w: number;
        o: number;
        inning: string;
    }, {
        r: number;
        w: number;
        o: number;
        inning: string;
    }>, "many">>>;
    series_id: z.ZodOptional<z.ZodString>;
    fantasyEnabled: z.ZodOptional<z.ZodBoolean>;
    bbbEnabled: z.ZodOptional<z.ZodBoolean>;
    hasSquad: z.ZodOptional<z.ZodBoolean>;
    matchStarted: z.ZodOptional<z.ZodBoolean>;
    matchEnded: z.ZodOptional<z.ZodBoolean>;
    tossWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tossChoice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    matchWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    name: string;
    id: string;
    venue: string;
    matchType: string;
    teams: string[];
    score: {
        r: number;
        w: number;
        o: number;
        inning: string;
    }[];
    date?: string | undefined;
    tossWinner?: string | null | undefined;
    dateTimeGMT?: string | undefined;
    teamInfo?: {
        name: string;
        shortname?: string | undefined;
        img?: string | undefined;
    }[] | undefined;
    series_id?: string | undefined;
    fantasyEnabled?: boolean | undefined;
    bbbEnabled?: boolean | undefined;
    hasSquad?: boolean | undefined;
    matchStarted?: boolean | undefined;
    matchEnded?: boolean | undefined;
    tossChoice?: string | null | undefined;
    matchWinner?: string | null | undefined;
}, {
    status: string;
    name: string;
    id: string;
    matchType: string;
    venue?: string | undefined;
    date?: string | undefined;
    tossWinner?: string | null | undefined;
    dateTimeGMT?: string | undefined;
    teams?: string[] | undefined;
    teamInfo?: {
        name: string;
        shortname?: string | undefined;
        img?: string | undefined;
    }[] | undefined;
    score?: {
        r: number;
        w: number;
        o: number;
        inning: string;
    }[] | undefined;
    series_id?: string | undefined;
    fantasyEnabled?: boolean | undefined;
    bbbEnabled?: boolean | undefined;
    hasSquad?: boolean | undefined;
    matchStarted?: boolean | undefined;
    matchEnded?: boolean | undefined;
    tossChoice?: string | null | undefined;
    matchWinner?: string | null | undefined;
}>;
export declare const CricketDataCurrentMatchesResponseSchema: z.ZodObject<{
    apikey: z.ZodOptional<z.ZodString>;
    data: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        matchType: z.ZodString;
        status: z.ZodString;
        venue: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        date: z.ZodOptional<z.ZodString>;
        dateTimeGMT: z.ZodOptional<z.ZodString>;
        teams: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        teamInfo: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            shortname: z.ZodOptional<z.ZodString>;
            img: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }, {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }>, "many">>;
        score: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            r: z.ZodNumber;
            w: z.ZodNumber;
            o: z.ZodNumber;
            inning: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            r: number;
            w: number;
            o: number;
            inning: string;
        }, {
            r: number;
            w: number;
            o: number;
            inning: string;
        }>, "many">>>;
        series_id: z.ZodOptional<z.ZodString>;
        fantasyEnabled: z.ZodOptional<z.ZodBoolean>;
        bbbEnabled: z.ZodOptional<z.ZodBoolean>;
        hasSquad: z.ZodOptional<z.ZodBoolean>;
        matchStarted: z.ZodOptional<z.ZodBoolean>;
        matchEnded: z.ZodOptional<z.ZodBoolean>;
        tossWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tossChoice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        matchWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        status: string;
        name: string;
        id: string;
        venue: string;
        matchType: string;
        teams: string[];
        score: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[];
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }, {
        status: string;
        name: string;
        id: string;
        matchType: string;
        venue?: string | undefined;
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teams?: string[] | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        score?: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }>, "many">>;
    status: z.ZodString;
    info: z.ZodOptional<z.ZodObject<{
        hitsToday: z.ZodOptional<z.ZodNumber>;
        hitsUsed: z.ZodOptional<z.ZodNumber>;
        hitsLimit: z.ZodOptional<z.ZodNumber>;
        remHits: z.ZodOptional<z.ZodNumber>;
        credits: z.ZodOptional<z.ZodNumber>;
        server: z.ZodOptional<z.ZodNumber>;
        offsetRows: z.ZodOptional<z.ZodNumber>;
        totalRows: z.ZodOptional<z.ZodNumber>;
        queryTime: z.ZodOptional<z.ZodNumber>;
        s: z.ZodOptional<z.ZodNumber>;
        cache: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    data: {
        status: string;
        name: string;
        id: string;
        venue: string;
        matchType: string;
        teams: string[];
        score: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[];
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }[];
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    apikey?: string | undefined;
}, {
    status: string;
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    data?: {
        status: string;
        name: string;
        id: string;
        matchType: string;
        venue?: string | undefined;
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teams?: string[] | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        score?: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }[] | undefined;
    apikey?: string | undefined;
}>;
export declare const CricketDataMatchesResponseSchema: z.ZodObject<{
    apikey: z.ZodOptional<z.ZodString>;
    data: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        matchType: z.ZodString;
        status: z.ZodString;
        venue: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        date: z.ZodOptional<z.ZodString>;
        dateTimeGMT: z.ZodOptional<z.ZodString>;
        teams: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        teamInfo: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            shortname: z.ZodOptional<z.ZodString>;
            img: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }, {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }>, "many">>;
        score: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            r: z.ZodNumber;
            w: z.ZodNumber;
            o: z.ZodNumber;
            inning: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            r: number;
            w: number;
            o: number;
            inning: string;
        }, {
            r: number;
            w: number;
            o: number;
            inning: string;
        }>, "many">>>;
        series_id: z.ZodOptional<z.ZodString>;
        fantasyEnabled: z.ZodOptional<z.ZodBoolean>;
        bbbEnabled: z.ZodOptional<z.ZodBoolean>;
        hasSquad: z.ZodOptional<z.ZodBoolean>;
        matchStarted: z.ZodOptional<z.ZodBoolean>;
        matchEnded: z.ZodOptional<z.ZodBoolean>;
        tossWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tossChoice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        matchWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        status: string;
        name: string;
        id: string;
        venue: string;
        matchType: string;
        teams: string[];
        score: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[];
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }, {
        status: string;
        name: string;
        id: string;
        matchType: string;
        venue?: string | undefined;
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teams?: string[] | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        score?: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }>, "many">>;
    status: z.ZodString;
    info: z.ZodOptional<z.ZodObject<{
        hitsToday: z.ZodOptional<z.ZodNumber>;
        hitsUsed: z.ZodOptional<z.ZodNumber>;
        hitsLimit: z.ZodOptional<z.ZodNumber>;
        remHits: z.ZodOptional<z.ZodNumber>;
        credits: z.ZodOptional<z.ZodNumber>;
        server: z.ZodOptional<z.ZodNumber>;
        offsetRows: z.ZodOptional<z.ZodNumber>;
        totalRows: z.ZodOptional<z.ZodNumber>;
        queryTime: z.ZodOptional<z.ZodNumber>;
        s: z.ZodOptional<z.ZodNumber>;
        cache: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    data: {
        status: string;
        name: string;
        id: string;
        venue: string;
        matchType: string;
        teams: string[];
        score: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[];
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }[];
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    apikey?: string | undefined;
}, {
    status: string;
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    data?: {
        status: string;
        name: string;
        id: string;
        matchType: string;
        venue?: string | undefined;
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teams?: string[] | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        score?: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }[] | undefined;
    apikey?: string | undefined;
}>;
export declare const CricketDataMatchInfoResponseSchema: z.ZodObject<{
    apikey: z.ZodOptional<z.ZodString>;
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        matchType: z.ZodString;
        status: z.ZodString;
        venue: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        date: z.ZodOptional<z.ZodString>;
        dateTimeGMT: z.ZodOptional<z.ZodString>;
        teams: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        teamInfo: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            shortname: z.ZodOptional<z.ZodString>;
            img: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }, {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }>, "many">>;
        score: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            r: z.ZodNumber;
            w: z.ZodNumber;
            o: z.ZodNumber;
            inning: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            r: number;
            w: number;
            o: number;
            inning: string;
        }, {
            r: number;
            w: number;
            o: number;
            inning: string;
        }>, "many">>>;
        series_id: z.ZodOptional<z.ZodString>;
        fantasyEnabled: z.ZodOptional<z.ZodBoolean>;
        bbbEnabled: z.ZodOptional<z.ZodBoolean>;
        hasSquad: z.ZodOptional<z.ZodBoolean>;
        matchStarted: z.ZodOptional<z.ZodBoolean>;
        matchEnded: z.ZodOptional<z.ZodBoolean>;
        tossWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tossChoice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        matchWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        status: string;
        name: string;
        id: string;
        venue: string;
        matchType: string;
        teams: string[];
        score: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[];
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }, {
        status: string;
        name: string;
        id: string;
        matchType: string;
        venue?: string | undefined;
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teams?: string[] | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        score?: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }>;
    status: z.ZodString;
    info: z.ZodOptional<z.ZodObject<{
        hitsToday: z.ZodOptional<z.ZodNumber>;
        hitsUsed: z.ZodOptional<z.ZodNumber>;
        hitsLimit: z.ZodOptional<z.ZodNumber>;
        remHits: z.ZodOptional<z.ZodNumber>;
        credits: z.ZodOptional<z.ZodNumber>;
        server: z.ZodOptional<z.ZodNumber>;
        offsetRows: z.ZodOptional<z.ZodNumber>;
        totalRows: z.ZodOptional<z.ZodNumber>;
        queryTime: z.ZodOptional<z.ZodNumber>;
        s: z.ZodOptional<z.ZodNumber>;
        cache: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    data: {
        status: string;
        name: string;
        id: string;
        venue: string;
        matchType: string;
        teams: string[];
        score: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[];
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    };
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    apikey?: string | undefined;
}, {
    status: string;
    data: {
        status: string;
        name: string;
        id: string;
        matchType: string;
        venue?: string | undefined;
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teams?: string[] | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        score?: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    };
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    apikey?: string | undefined;
}>;
export declare const CricketDataBatsmanSchema: z.ZodObject<{
    batsman: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id?: string | undefined;
    }, {
        name: string;
        id?: string | undefined;
    }>;
    dismissal: z.ZodOptional<z.ZodString>;
    'dismissal-text': z.ZodOptional<z.ZodString>;
    r: z.ZodDefault<z.ZodNumber>;
    b: z.ZodDefault<z.ZodNumber>;
    '4s': z.ZodDefault<z.ZodNumber>;
    '6s': z.ZodDefault<z.ZodNumber>;
    sr: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    r: number;
    batsman: {
        name: string;
        id?: string | undefined;
    };
    b: number;
    '4s': number;
    '6s': number;
    sr: number;
    dismissal?: string | undefined;
    'dismissal-text'?: string | undefined;
}, {
    batsman: {
        name: string;
        id?: string | undefined;
    };
    r?: number | undefined;
    dismissal?: string | undefined;
    'dismissal-text'?: string | undefined;
    b?: number | undefined;
    '4s'?: number | undefined;
    '6s'?: number | undefined;
    sr?: number | undefined;
}>;
export declare const CricketDataBowlerSchema: z.ZodObject<{
    bowler: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id?: string | undefined;
    }, {
        name: string;
        id?: string | undefined;
    }>;
    o: z.ZodDefault<z.ZodNumber>;
    m: z.ZodDefault<z.ZodNumber>;
    r: z.ZodDefault<z.ZodNumber>;
    w: z.ZodDefault<z.ZodNumber>;
    eco: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    bowler: {
        name: string;
        id?: string | undefined;
    };
    r: number;
    w: number;
    o: number;
    m: number;
    eco: number;
}, {
    bowler: {
        name: string;
        id?: string | undefined;
    };
    r?: number | undefined;
    w?: number | undefined;
    o?: number | undefined;
    m?: number | undefined;
    eco?: number | undefined;
}>;
export declare const CricketDataInningScorecardSchema: z.ZodObject<{
    inning: z.ZodString;
    batting: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        batsman: z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id?: string | undefined;
        }, {
            name: string;
            id?: string | undefined;
        }>;
        dismissal: z.ZodOptional<z.ZodString>;
        'dismissal-text': z.ZodOptional<z.ZodString>;
        r: z.ZodDefault<z.ZodNumber>;
        b: z.ZodDefault<z.ZodNumber>;
        '4s': z.ZodDefault<z.ZodNumber>;
        '6s': z.ZodDefault<z.ZodNumber>;
        sr: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        r: number;
        batsman: {
            name: string;
            id?: string | undefined;
        };
        b: number;
        '4s': number;
        '6s': number;
        sr: number;
        dismissal?: string | undefined;
        'dismissal-text'?: string | undefined;
    }, {
        batsman: {
            name: string;
            id?: string | undefined;
        };
        r?: number | undefined;
        dismissal?: string | undefined;
        'dismissal-text'?: string | undefined;
        b?: number | undefined;
        '4s'?: number | undefined;
        '6s'?: number | undefined;
        sr?: number | undefined;
    }>, "many">>>;
    bowling: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        bowler: z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id?: string | undefined;
        }, {
            name: string;
            id?: string | undefined;
        }>;
        o: z.ZodDefault<z.ZodNumber>;
        m: z.ZodDefault<z.ZodNumber>;
        r: z.ZodDefault<z.ZodNumber>;
        w: z.ZodDefault<z.ZodNumber>;
        eco: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        bowler: {
            name: string;
            id?: string | undefined;
        };
        r: number;
        w: number;
        o: number;
        m: number;
        eco: number;
    }, {
        bowler: {
            name: string;
            id?: string | undefined;
        };
        r?: number | undefined;
        w?: number | undefined;
        o?: number | undefined;
        m?: number | undefined;
        eco?: number | undefined;
    }>, "many">>>;
    catching: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>>;
    extras: z.ZodOptional<z.ZodObject<{
        r: z.ZodDefault<z.ZodNumber>;
        w: z.ZodDefault<z.ZodNumber>;
        nb: z.ZodDefault<z.ZodNumber>;
        b: z.ZodDefault<z.ZodNumber>;
        lb: z.ZodDefault<z.ZodNumber>;
        p: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        r: number;
        w: number;
        b: number;
        nb: number;
        lb: number;
        p: number;
    }, {
        r?: number | undefined;
        w?: number | undefined;
        b?: number | undefined;
        nb?: number | undefined;
        lb?: number | undefined;
        p?: number | undefined;
    }>>;
    totals: z.ZodOptional<z.ZodObject<{
        R: z.ZodDefault<z.ZodNumber>;
        O: z.ZodDefault<z.ZodNumber>;
        W: z.ZodDefault<z.ZodNumber>;
        RR: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        W: number;
        RR: number;
        R: number;
        O: number;
    }, {
        W?: number | undefined;
        RR?: number | undefined;
        R?: number | undefined;
        O?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    inning: string;
    batting: {
        r: number;
        batsman: {
            name: string;
            id?: string | undefined;
        };
        b: number;
        '4s': number;
        '6s': number;
        sr: number;
        dismissal?: string | undefined;
        'dismissal-text'?: string | undefined;
    }[];
    bowling: {
        bowler: {
            name: string;
            id?: string | undefined;
        };
        r: number;
        w: number;
        o: number;
        m: number;
        eco: number;
    }[];
    catching: any[];
    extras?: {
        r: number;
        w: number;
        b: number;
        nb: number;
        lb: number;
        p: number;
    } | undefined;
    totals?: {
        W: number;
        RR: number;
        R: number;
        O: number;
    } | undefined;
}, {
    inning: string;
    batting?: {
        batsman: {
            name: string;
            id?: string | undefined;
        };
        r?: number | undefined;
        dismissal?: string | undefined;
        'dismissal-text'?: string | undefined;
        b?: number | undefined;
        '4s'?: number | undefined;
        '6s'?: number | undefined;
        sr?: number | undefined;
    }[] | undefined;
    bowling?: {
        bowler: {
            name: string;
            id?: string | undefined;
        };
        r?: number | undefined;
        w?: number | undefined;
        o?: number | undefined;
        m?: number | undefined;
        eco?: number | undefined;
    }[] | undefined;
    catching?: any[] | undefined;
    extras?: {
        r?: number | undefined;
        w?: number | undefined;
        b?: number | undefined;
        nb?: number | undefined;
        lb?: number | undefined;
        p?: number | undefined;
    } | undefined;
    totals?: {
        W?: number | undefined;
        RR?: number | undefined;
        R?: number | undefined;
        O?: number | undefined;
    } | undefined;
}>;
export declare const CricketDataScorecardResponseSchema: z.ZodObject<{
    apikey: z.ZodOptional<z.ZodString>;
    data: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        matchType: z.ZodString;
        status: z.ZodString;
        venue: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        date: z.ZodOptional<z.ZodString>;
        dateTimeGMT: z.ZodOptional<z.ZodString>;
        teams: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        teamInfo: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            shortname: z.ZodOptional<z.ZodString>;
            img: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }, {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }>, "many">>;
        score: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            r: z.ZodNumber;
            w: z.ZodNumber;
            o: z.ZodNumber;
            inning: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            r: number;
            w: number;
            o: number;
            inning: string;
        }, {
            r: number;
            w: number;
            o: number;
            inning: string;
        }>, "many">>>;
        series_id: z.ZodOptional<z.ZodString>;
        fantasyEnabled: z.ZodOptional<z.ZodBoolean>;
        bbbEnabled: z.ZodOptional<z.ZodBoolean>;
        hasSquad: z.ZodOptional<z.ZodBoolean>;
        matchStarted: z.ZodOptional<z.ZodBoolean>;
        matchEnded: z.ZodOptional<z.ZodBoolean>;
        tossWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        tossChoice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        matchWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    } & {
        scorecard: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            inning: z.ZodString;
            batting: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                batsman: z.ZodObject<{
                    id: z.ZodOptional<z.ZodString>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    id?: string | undefined;
                }, {
                    name: string;
                    id?: string | undefined;
                }>;
                dismissal: z.ZodOptional<z.ZodString>;
                'dismissal-text': z.ZodOptional<z.ZodString>;
                r: z.ZodDefault<z.ZodNumber>;
                b: z.ZodDefault<z.ZodNumber>;
                '4s': z.ZodDefault<z.ZodNumber>;
                '6s': z.ZodDefault<z.ZodNumber>;
                sr: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                r: number;
                batsman: {
                    name: string;
                    id?: string | undefined;
                };
                b: number;
                '4s': number;
                '6s': number;
                sr: number;
                dismissal?: string | undefined;
                'dismissal-text'?: string | undefined;
            }, {
                batsman: {
                    name: string;
                    id?: string | undefined;
                };
                r?: number | undefined;
                dismissal?: string | undefined;
                'dismissal-text'?: string | undefined;
                b?: number | undefined;
                '4s'?: number | undefined;
                '6s'?: number | undefined;
                sr?: number | undefined;
            }>, "many">>>;
            bowling: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                bowler: z.ZodObject<{
                    id: z.ZodOptional<z.ZodString>;
                    name: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    id?: string | undefined;
                }, {
                    name: string;
                    id?: string | undefined;
                }>;
                o: z.ZodDefault<z.ZodNumber>;
                m: z.ZodDefault<z.ZodNumber>;
                r: z.ZodDefault<z.ZodNumber>;
                w: z.ZodDefault<z.ZodNumber>;
                eco: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                bowler: {
                    name: string;
                    id?: string | undefined;
                };
                r: number;
                w: number;
                o: number;
                m: number;
                eco: number;
            }, {
                bowler: {
                    name: string;
                    id?: string | undefined;
                };
                r?: number | undefined;
                w?: number | undefined;
                o?: number | undefined;
                m?: number | undefined;
                eco?: number | undefined;
            }>, "many">>>;
            catching: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>>;
            extras: z.ZodOptional<z.ZodObject<{
                r: z.ZodDefault<z.ZodNumber>;
                w: z.ZodDefault<z.ZodNumber>;
                nb: z.ZodDefault<z.ZodNumber>;
                b: z.ZodDefault<z.ZodNumber>;
                lb: z.ZodDefault<z.ZodNumber>;
                p: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                r: number;
                w: number;
                b: number;
                nb: number;
                lb: number;
                p: number;
            }, {
                r?: number | undefined;
                w?: number | undefined;
                b?: number | undefined;
                nb?: number | undefined;
                lb?: number | undefined;
                p?: number | undefined;
            }>>;
            totals: z.ZodOptional<z.ZodObject<{
                R: z.ZodDefault<z.ZodNumber>;
                O: z.ZodDefault<z.ZodNumber>;
                W: z.ZodDefault<z.ZodNumber>;
                RR: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                W: number;
                RR: number;
                R: number;
                O: number;
            }, {
                W?: number | undefined;
                RR?: number | undefined;
                R?: number | undefined;
                O?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            inning: string;
            batting: {
                r: number;
                batsman: {
                    name: string;
                    id?: string | undefined;
                };
                b: number;
                '4s': number;
                '6s': number;
                sr: number;
                dismissal?: string | undefined;
                'dismissal-text'?: string | undefined;
            }[];
            bowling: {
                bowler: {
                    name: string;
                    id?: string | undefined;
                };
                r: number;
                w: number;
                o: number;
                m: number;
                eco: number;
            }[];
            catching: any[];
            extras?: {
                r: number;
                w: number;
                b: number;
                nb: number;
                lb: number;
                p: number;
            } | undefined;
            totals?: {
                W: number;
                RR: number;
                R: number;
                O: number;
            } | undefined;
        }, {
            inning: string;
            batting?: {
                batsman: {
                    name: string;
                    id?: string | undefined;
                };
                r?: number | undefined;
                dismissal?: string | undefined;
                'dismissal-text'?: string | undefined;
                b?: number | undefined;
                '4s'?: number | undefined;
                '6s'?: number | undefined;
                sr?: number | undefined;
            }[] | undefined;
            bowling?: {
                bowler: {
                    name: string;
                    id?: string | undefined;
                };
                r?: number | undefined;
                w?: number | undefined;
                o?: number | undefined;
                m?: number | undefined;
                eco?: number | undefined;
            }[] | undefined;
            catching?: any[] | undefined;
            extras?: {
                r?: number | undefined;
                w?: number | undefined;
                b?: number | undefined;
                nb?: number | undefined;
                lb?: number | undefined;
                p?: number | undefined;
            } | undefined;
            totals?: {
                W?: number | undefined;
                RR?: number | undefined;
                R?: number | undefined;
                O?: number | undefined;
            } | undefined;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        status: string;
        name: string;
        id: string;
        venue: string;
        matchType: string;
        teams: string[];
        score: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[];
        scorecard: {
            inning: string;
            batting: {
                r: number;
                batsman: {
                    name: string;
                    id?: string | undefined;
                };
                b: number;
                '4s': number;
                '6s': number;
                sr: number;
                dismissal?: string | undefined;
                'dismissal-text'?: string | undefined;
            }[];
            bowling: {
                bowler: {
                    name: string;
                    id?: string | undefined;
                };
                r: number;
                w: number;
                o: number;
                m: number;
                eco: number;
            }[];
            catching: any[];
            extras?: {
                r: number;
                w: number;
                b: number;
                nb: number;
                lb: number;
                p: number;
            } | undefined;
            totals?: {
                W: number;
                RR: number;
                R: number;
                O: number;
            } | undefined;
        }[];
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    }, {
        status: string;
        name: string;
        id: string;
        matchType: string;
        venue?: string | undefined;
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teams?: string[] | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        score?: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
        scorecard?: {
            inning: string;
            batting?: {
                batsman: {
                    name: string;
                    id?: string | undefined;
                };
                r?: number | undefined;
                dismissal?: string | undefined;
                'dismissal-text'?: string | undefined;
                b?: number | undefined;
                '4s'?: number | undefined;
                '6s'?: number | undefined;
                sr?: number | undefined;
            }[] | undefined;
            bowling?: {
                bowler: {
                    name: string;
                    id?: string | undefined;
                };
                r?: number | undefined;
                w?: number | undefined;
                o?: number | undefined;
                m?: number | undefined;
                eco?: number | undefined;
            }[] | undefined;
            catching?: any[] | undefined;
            extras?: {
                r?: number | undefined;
                w?: number | undefined;
                b?: number | undefined;
                nb?: number | undefined;
                lb?: number | undefined;
                p?: number | undefined;
            } | undefined;
            totals?: {
                W?: number | undefined;
                RR?: number | undefined;
                R?: number | undefined;
                O?: number | undefined;
            } | undefined;
        }[] | undefined;
    }>;
    status: z.ZodString;
    info: z.ZodOptional<z.ZodObject<{
        hitsToday: z.ZodOptional<z.ZodNumber>;
        hitsUsed: z.ZodOptional<z.ZodNumber>;
        hitsLimit: z.ZodOptional<z.ZodNumber>;
        remHits: z.ZodOptional<z.ZodNumber>;
        credits: z.ZodOptional<z.ZodNumber>;
        server: z.ZodOptional<z.ZodNumber>;
        offsetRows: z.ZodOptional<z.ZodNumber>;
        totalRows: z.ZodOptional<z.ZodNumber>;
        queryTime: z.ZodOptional<z.ZodNumber>;
        s: z.ZodOptional<z.ZodNumber>;
        cache: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    data: {
        status: string;
        name: string;
        id: string;
        venue: string;
        matchType: string;
        teams: string[];
        score: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[];
        scorecard: {
            inning: string;
            batting: {
                r: number;
                batsman: {
                    name: string;
                    id?: string | undefined;
                };
                b: number;
                '4s': number;
                '6s': number;
                sr: number;
                dismissal?: string | undefined;
                'dismissal-text'?: string | undefined;
            }[];
            bowling: {
                bowler: {
                    name: string;
                    id?: string | undefined;
                };
                r: number;
                w: number;
                o: number;
                m: number;
                eco: number;
            }[];
            catching: any[];
            extras?: {
                r: number;
                w: number;
                b: number;
                nb: number;
                lb: number;
                p: number;
            } | undefined;
            totals?: {
                W: number;
                RR: number;
                R: number;
                O: number;
            } | undefined;
        }[];
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
    };
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    apikey?: string | undefined;
}, {
    status: string;
    data: {
        status: string;
        name: string;
        id: string;
        matchType: string;
        venue?: string | undefined;
        date?: string | undefined;
        tossWinner?: string | null | undefined;
        dateTimeGMT?: string | undefined;
        teams?: string[] | undefined;
        teamInfo?: {
            name: string;
            shortname?: string | undefined;
            img?: string | undefined;
        }[] | undefined;
        score?: {
            r: number;
            w: number;
            o: number;
            inning: string;
        }[] | undefined;
        series_id?: string | undefined;
        fantasyEnabled?: boolean | undefined;
        bbbEnabled?: boolean | undefined;
        hasSquad?: boolean | undefined;
        matchStarted?: boolean | undefined;
        matchEnded?: boolean | undefined;
        tossChoice?: string | null | undefined;
        matchWinner?: string | null | undefined;
        scorecard?: {
            inning: string;
            batting?: {
                batsman: {
                    name: string;
                    id?: string | undefined;
                };
                r?: number | undefined;
                dismissal?: string | undefined;
                'dismissal-text'?: string | undefined;
                b?: number | undefined;
                '4s'?: number | undefined;
                '6s'?: number | undefined;
                sr?: number | undefined;
            }[] | undefined;
            bowling?: {
                bowler: {
                    name: string;
                    id?: string | undefined;
                };
                r?: number | undefined;
                w?: number | undefined;
                o?: number | undefined;
                m?: number | undefined;
                eco?: number | undefined;
            }[] | undefined;
            catching?: any[] | undefined;
            extras?: {
                r?: number | undefined;
                w?: number | undefined;
                b?: number | undefined;
                nb?: number | undefined;
                lb?: number | undefined;
                p?: number | undefined;
            } | undefined;
            totals?: {
                W?: number | undefined;
                RR?: number | undefined;
                R?: number | undefined;
                O?: number | undefined;
            } | undefined;
        }[] | undefined;
    };
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    apikey?: string | undefined;
}>;
export declare const CricketDataSeriesItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    odi: z.ZodOptional<z.ZodNumber>;
    t20: z.ZodOptional<z.ZodNumber>;
    test: z.ZodOptional<z.ZodNumber>;
    squads: z.ZodOptional<z.ZodNumber>;
    matches: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    test?: number | undefined;
    squads?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    matches?: number | undefined;
    odi?: number | undefined;
    t20?: number | undefined;
}, {
    name: string;
    id: string;
    test?: number | undefined;
    squads?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    matches?: number | undefined;
    odi?: number | undefined;
    t20?: number | undefined;
}>;
export declare const CricketDataSeriesListResponseSchema: z.ZodObject<{
    apikey: z.ZodOptional<z.ZodString>;
    data: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
        odi: z.ZodOptional<z.ZodNumber>;
        t20: z.ZodOptional<z.ZodNumber>;
        test: z.ZodOptional<z.ZodNumber>;
        squads: z.ZodOptional<z.ZodNumber>;
        matches: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        test?: number | undefined;
        squads?: number | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        matches?: number | undefined;
        odi?: number | undefined;
        t20?: number | undefined;
    }, {
        name: string;
        id: string;
        test?: number | undefined;
        squads?: number | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        matches?: number | undefined;
        odi?: number | undefined;
        t20?: number | undefined;
    }>, "many">>;
    status: z.ZodString;
    info: z.ZodOptional<z.ZodObject<{
        hitsToday: z.ZodOptional<z.ZodNumber>;
        hitsUsed: z.ZodOptional<z.ZodNumber>;
        hitsLimit: z.ZodOptional<z.ZodNumber>;
        remHits: z.ZodOptional<z.ZodNumber>;
        credits: z.ZodOptional<z.ZodNumber>;
        server: z.ZodOptional<z.ZodNumber>;
        offsetRows: z.ZodOptional<z.ZodNumber>;
        totalRows: z.ZodOptional<z.ZodNumber>;
        queryTime: z.ZodOptional<z.ZodNumber>;
        s: z.ZodOptional<z.ZodNumber>;
        cache: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    data: {
        name: string;
        id: string;
        test?: number | undefined;
        squads?: number | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        matches?: number | undefined;
        odi?: number | undefined;
        t20?: number | undefined;
    }[];
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    apikey?: string | undefined;
}, {
    status: string;
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    data?: {
        name: string;
        id: string;
        test?: number | undefined;
        squads?: number | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        matches?: number | undefined;
        odi?: number | undefined;
        t20?: number | undefined;
    }[] | undefined;
    apikey?: string | undefined;
}>;
export declare const CricketDataSeriesInfoResponseSchema: z.ZodObject<{
    apikey: z.ZodOptional<z.ZodString>;
    data: z.ZodObject<{
        info: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        matchList: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            matchType: z.ZodString;
            status: z.ZodString;
            venue: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            date: z.ZodOptional<z.ZodString>;
            dateTimeGMT: z.ZodOptional<z.ZodString>;
            teams: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            teamInfo: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                shortname: z.ZodOptional<z.ZodString>;
                img: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                shortname?: string | undefined;
                img?: string | undefined;
            }, {
                name: string;
                shortname?: string | undefined;
                img?: string | undefined;
            }>, "many">>;
            score: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
                r: z.ZodNumber;
                w: z.ZodNumber;
                o: z.ZodNumber;
                inning: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                r: number;
                w: number;
                o: number;
                inning: string;
            }, {
                r: number;
                w: number;
                o: number;
                inning: string;
            }>, "many">>>;
            series_id: z.ZodOptional<z.ZodString>;
            fantasyEnabled: z.ZodOptional<z.ZodBoolean>;
            bbbEnabled: z.ZodOptional<z.ZodBoolean>;
            hasSquad: z.ZodOptional<z.ZodBoolean>;
            matchStarted: z.ZodOptional<z.ZodBoolean>;
            matchEnded: z.ZodOptional<z.ZodBoolean>;
            tossWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            tossChoice: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            matchWinner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            status: string;
            name: string;
            id: string;
            venue: string;
            matchType: string;
            teams: string[];
            score: {
                r: number;
                w: number;
                o: number;
                inning: string;
            }[];
            date?: string | undefined;
            tossWinner?: string | null | undefined;
            dateTimeGMT?: string | undefined;
            teamInfo?: {
                name: string;
                shortname?: string | undefined;
                img?: string | undefined;
            }[] | undefined;
            series_id?: string | undefined;
            fantasyEnabled?: boolean | undefined;
            bbbEnabled?: boolean | undefined;
            hasSquad?: boolean | undefined;
            matchStarted?: boolean | undefined;
            matchEnded?: boolean | undefined;
            tossChoice?: string | null | undefined;
            matchWinner?: string | null | undefined;
        }, {
            status: string;
            name: string;
            id: string;
            matchType: string;
            venue?: string | undefined;
            date?: string | undefined;
            tossWinner?: string | null | undefined;
            dateTimeGMT?: string | undefined;
            teams?: string[] | undefined;
            teamInfo?: {
                name: string;
                shortname?: string | undefined;
                img?: string | undefined;
            }[] | undefined;
            score?: {
                r: number;
                w: number;
                o: number;
                inning: string;
            }[] | undefined;
            series_id?: string | undefined;
            fantasyEnabled?: boolean | undefined;
            bbbEnabled?: boolean | undefined;
            hasSquad?: boolean | undefined;
            matchStarted?: boolean | undefined;
            matchEnded?: boolean | undefined;
            tossChoice?: string | null | undefined;
            matchWinner?: string | null | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        matchList: {
            status: string;
            name: string;
            id: string;
            venue: string;
            matchType: string;
            teams: string[];
            score: {
                r: number;
                w: number;
                o: number;
                inning: string;
            }[];
            date?: string | undefined;
            tossWinner?: string | null | undefined;
            dateTimeGMT?: string | undefined;
            teamInfo?: {
                name: string;
                shortname?: string | undefined;
                img?: string | undefined;
            }[] | undefined;
            series_id?: string | undefined;
            fantasyEnabled?: boolean | undefined;
            bbbEnabled?: boolean | undefined;
            hasSquad?: boolean | undefined;
            matchStarted?: boolean | undefined;
            matchEnded?: boolean | undefined;
            tossChoice?: string | null | undefined;
            matchWinner?: string | null | undefined;
        }[];
        info?: Record<string, any> | undefined;
    }, {
        info?: Record<string, any> | undefined;
        matchList?: {
            status: string;
            name: string;
            id: string;
            matchType: string;
            venue?: string | undefined;
            date?: string | undefined;
            tossWinner?: string | null | undefined;
            dateTimeGMT?: string | undefined;
            teams?: string[] | undefined;
            teamInfo?: {
                name: string;
                shortname?: string | undefined;
                img?: string | undefined;
            }[] | undefined;
            score?: {
                r: number;
                w: number;
                o: number;
                inning: string;
            }[] | undefined;
            series_id?: string | undefined;
            fantasyEnabled?: boolean | undefined;
            bbbEnabled?: boolean | undefined;
            hasSquad?: boolean | undefined;
            matchStarted?: boolean | undefined;
            matchEnded?: boolean | undefined;
            tossChoice?: string | null | undefined;
            matchWinner?: string | null | undefined;
        }[] | undefined;
    }>;
    status: z.ZodString;
    info: z.ZodOptional<z.ZodObject<{
        hitsToday: z.ZodOptional<z.ZodNumber>;
        hitsUsed: z.ZodOptional<z.ZodNumber>;
        hitsLimit: z.ZodOptional<z.ZodNumber>;
        remHits: z.ZodOptional<z.ZodNumber>;
        credits: z.ZodOptional<z.ZodNumber>;
        server: z.ZodOptional<z.ZodNumber>;
        offsetRows: z.ZodOptional<z.ZodNumber>;
        totalRows: z.ZodOptional<z.ZodNumber>;
        queryTime: z.ZodOptional<z.ZodNumber>;
        s: z.ZodOptional<z.ZodNumber>;
        cache: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }, {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    data: {
        matchList: {
            status: string;
            name: string;
            id: string;
            venue: string;
            matchType: string;
            teams: string[];
            score: {
                r: number;
                w: number;
                o: number;
                inning: string;
            }[];
            date?: string | undefined;
            tossWinner?: string | null | undefined;
            dateTimeGMT?: string | undefined;
            teamInfo?: {
                name: string;
                shortname?: string | undefined;
                img?: string | undefined;
            }[] | undefined;
            series_id?: string | undefined;
            fantasyEnabled?: boolean | undefined;
            bbbEnabled?: boolean | undefined;
            hasSquad?: boolean | undefined;
            matchStarted?: boolean | undefined;
            matchEnded?: boolean | undefined;
            tossChoice?: string | null | undefined;
            matchWinner?: string | null | undefined;
        }[];
        info?: Record<string, any> | undefined;
    };
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    apikey?: string | undefined;
}, {
    status: string;
    data: {
        info?: Record<string, any> | undefined;
        matchList?: {
            status: string;
            name: string;
            id: string;
            matchType: string;
            venue?: string | undefined;
            date?: string | undefined;
            tossWinner?: string | null | undefined;
            dateTimeGMT?: string | undefined;
            teams?: string[] | undefined;
            teamInfo?: {
                name: string;
                shortname?: string | undefined;
                img?: string | undefined;
            }[] | undefined;
            score?: {
                r: number;
                w: number;
                o: number;
                inning: string;
            }[] | undefined;
            series_id?: string | undefined;
            fantasyEnabled?: boolean | undefined;
            bbbEnabled?: boolean | undefined;
            hasSquad?: boolean | undefined;
            matchStarted?: boolean | undefined;
            matchEnded?: boolean | undefined;
            tossChoice?: string | null | undefined;
            matchWinner?: string | null | undefined;
        }[] | undefined;
    };
    info?: {
        server?: number | undefined;
        hitsToday?: number | undefined;
        hitsUsed?: number | undefined;
        hitsLimit?: number | undefined;
        remHits?: number | undefined;
        credits?: number | undefined;
        offsetRows?: number | undefined;
        totalRows?: number | undefined;
        queryTime?: number | undefined;
        s?: number | undefined;
        cache?: number | undefined;
    } | undefined;
    apikey?: string | undefined;
}>;
export type CricketDataMatchItem = z.infer<typeof CricketDataMatchItemSchema>;
export type CricketDataCurrentMatchesResponse = z.infer<typeof CricketDataCurrentMatchesResponseSchema>;
export type CricketDataMatchesResponse = z.infer<typeof CricketDataMatchesResponseSchema>;
export type CricketDataMatchInfoResponse = z.infer<typeof CricketDataMatchInfoResponseSchema>;
export type CricketDataScorecardResponse = z.infer<typeof CricketDataScorecardResponseSchema>;
export type CricketDataSeriesListResponse = z.infer<typeof CricketDataSeriesListResponseSchema>;
export type CricketDataSeriesInfoResponse = z.infer<typeof CricketDataSeriesInfoResponseSchema>;
