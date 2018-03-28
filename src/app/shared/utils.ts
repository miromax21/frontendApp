export var Utils = {

    IsNullOrUndefined: (val): boolean => val === null || val === undefined,
    IsEmptyArray: (val: any[]): boolean => val === null || val === undefined || val.length == 0,

    Array: {
        Any: <T>(array: T[], predicate: (T: T) => boolean): boolean => {
            if (!(array instanceof Array))
                return false;
            return array.some((elem: T, index: number, array: T[]) => predicate(elem));
        },
        Contains: <T>(array: T[], elem: T): boolean => {
            if (!(array instanceof Array))
                return false;
            return array.indexOf(elem) !== -1;
        },
        WhereFirst: <T>(array: T[], predicate: (elem: T) => boolean): T => {
            if (!(array instanceof Array))
                return null;
            return array.find((el: T): boolean => predicate(el));
        },
        Map: <T, T1>(array: T[], predicate: (elem: T) => T1): T1[] => {
            if (!(array instanceof Array))
                return null;
            return array.map((elem: T, index: number, array: T[]): T1 => predicate(elem));
        },
        ForEach: <T>(array: T[], predicate: (elem: T, index?: number, array?: T[]) => void): void => {
            if (!(array instanceof Array))
                return;
            array.forEach((elem: T, index: number, array: T[]) => predicate(elem, index, array));
        }
    },

    Object: {
        Any: (obj: { [key: string]: any }, predicate: (val: any, key?: string, obj?: { [key: string]: any }) => boolean): boolean => {
            if (!(obj instanceof Object))
                return false;
            for (let key in obj) {
                if (predicate(obj[key], key, obj))
                    return true;
            }
            return false;
        },
        Extend: <T extends { [key: string]: any }, T1 extends { [key: string]: any }>(obj: T, ...source: { [key: string]: any }[]): T1 => {
            if (!(obj instanceof Object) || !Utils.Array.Any(source, (el) => el instanceof Object))
                return null;
            return <T1>Object.assign(obj, ...source);
        }
    },

    Url: {
        SetParams: (url_template: string, params: { [key: string]: string | number | boolean }): string => {
            return url_template.replace(/\/\:[^/]+/g, (substr: string) => '/' + params[substr.substr(2)]);
        },
        ExtractParams: (url_template: string): string[] => {
            return Utils.Array.Map(url_template.match(/\/\:[^/]+/g), (str) => str.substr(2));
        }
    },

    Date: {
        UtcTimestampToDate(time_stamp: number, offset: number): Date {
            if (time_stamp == undefined || time_stamp == 0 || isNaN(time_stamp))
                return undefined;

            time_stamp += offset * 60 * 60 * 1000;
            return new Date(time_stamp);
        },
        DateToUtcTimestamp(date: Date, offset: number): number {
            if (date == undefined)
                return undefined;

            var timeStamp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
            timeStamp -= offset * 60 * 60 * 1000;
            return timeStamp;
        }
    }
}