export interface ICampaign {
    id: number;
    membershipId: number;
    accountId: number;
    advertId: number;
    name: string;
    status: number;
}

interface IBaseCampaignInfo {
    id: number;
    membershipId: number;
    accountId: number;
    advertId: number;
    platforms: string[];
    adTypes: string[];
    showsCnt: number;
    creativesCnt: number;
}

export interface ICampaignInfoRaw extends IBaseCampaignInfo {
    startDate: string;
    endDate: string;
}

export interface ICampaignInfo extends IBaseCampaignInfo {
    startDate: Date;
    endDate: Date;
}

