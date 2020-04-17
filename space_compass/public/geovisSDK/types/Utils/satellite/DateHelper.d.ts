/**
 * @private
 */
export declare class DateHelper {
    static toggleTime(date: Date): string;
    static toggleTimeIso(date: Date): string;
    static addDate(date: Date, days: any): string;
    static getFormatDate(arg: any): string;
    static getStrNow(): string;
    static getStr(date: Date): string;
    private static getTodayZeroDate;
    private static getTodayMaxDate;
    static getTodayStartStr(): string;
    static getTodayEndStr(): string;
    static getTomorrowStartStr(): string;
    static getTomorrowEndStr(): string;
    static getWeekStartStr(): string;
    static getWeekEndStr(): string;
    static getMonthStartStr(): string;
    static getMonthEndStr(): string;
    static getYearStartStr(): string;
    static getYearEndStr(): string;
    static getDate15(): Date;
    static getDate60(): Date;
    static getDate120(): Date;
    static addSecond(data: Date, ss: number): Date;
    static addMinutes(data: Date, MM: number): Date;
}
