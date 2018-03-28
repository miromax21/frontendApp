import { ActionReducer, Action } from '@ngrx/store';
import { IAccount } from './interfaces/i-account.interface';
//import { ICampaignInfo } from '@shared';

export const STORE_TYPES = {
    CHANGE_USER: 'CHANGE_USER',
    CHANGE_ADVERT: 'CHANGE_ADVERT',
    CHANGE_CAMPAIGN: 'CHANGE_CAMPAIGN',
    CHANGE_CAMPAIGN_INFO: 'CHANGE_CAMPAIGN_INFO',
    CLEAR: 'CLEAR'
}

export interface CampaignState {
    currentCampaign: number;
}

// export interface CampaignInfoState {
//     currentCampaignInfo: ICampaignInfo;
// }

export interface AdvertState {
    currentAdvert: number;
}

export interface UserState {
    user: IAccount;
}

function reducer<T, V extends Action = Action>(type: string, default_value: T): ActionReducer<T, V> {
    return function (state: T = default_value, action: V): T {
        switch (action.type) {
            case STORE_TYPES.CLEAR:
                return default_value;
            case type:
                return (<any>action).payload;
            default:
                return state;
        }
    }
}

export const userStateReducer = reducer<IAccount>(STORE_TYPES.CHANGE_USER, null);
export const currentAdvertReducer = reducer<number>(STORE_TYPES.CHANGE_ADVERT, 0);
export const currentCampaignReducer = reducer<number>(STORE_TYPES.CHANGE_CAMPAIGN, 0);
///export const currentCampaignInfoReducer = reducer<ICampaignInfo>(STORE_TYPES.CHANGE_CAMPAIGN_INFO, null);
