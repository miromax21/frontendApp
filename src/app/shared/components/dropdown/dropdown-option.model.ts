//import { ICampaign } from '../../interfaces/i-campaign.interface';
//import { CampaignStatusEnum } from '../../enums/campaign-status.enum';

interface IDropdownOption {
    key: string;
    value: string | number | boolean;
    selected?: boolean;
    className?: string;
}

export class DropdownOption implements IDropdownOption {

    static GetCampaignOption(campaign: any, selected: boolean): DropdownOption {
        let c: string = 'icon';
        switch (campaign.status) {
            case 1:
                c += ' play';
                break;
            case 2:
                c += ' pause';
                break;
            case 3:
                c += ' stop';
                break;
        }
        return new DropdownOption(
            campaign.id + ' ' + (campaign.name || ''),
            campaign.id,
            selected,
            c
        );
    }

    constructor(
        public key: string,
        public value: string | number | boolean,
        public selected?: boolean,
        public className?: string
    ) { }
}