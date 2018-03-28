export interface IAdvertAccountStat {
    common: IStatData;
    rows: IStatData[];
    pagingInfo: IPagingInfo;
    sortInfo: ISortInfo;
    reportParams: string;
}

export interface IStatData {
    groupName: string;
    coverage: number;
    impressions: number;
    ctr: number;
    clicks: number;
    firstQuartileCount: number;
    firstQuartilePercent: number;
    midpointCount: number;
    midpointPercent: number;
    thirdQuartileCount: number;
    thirdQuartilePercent: number;
    completeCount: number;
    completePercent: number;
    closeCount: number;
    closePercent: number;
}

export interface IPagingInfo {
    currentPage: number;
    totalPage: number;
}

export interface ISortInfo {
    field: string;
    descSort: boolean;
}