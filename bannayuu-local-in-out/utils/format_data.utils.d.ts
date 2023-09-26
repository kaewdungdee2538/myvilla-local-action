/// <reference types="jest" />
export declare class FormatDataUtils {
    HaveSpecialFormat(input: string): boolean;
    HaveSpecialHomeFormat(input: string): boolean;
    HaveSpecialUuidFormat(input: string): boolean;
    IsNumber(input: any): boolean | typeof fail;
    IsNotNumber(input: string): boolean;
    IsEmptyOrSpaces(str: string): boolean;
    IsFormatIdentityCard(input: string): boolean;
    IsDateTimeFormat(input: string): Promise<boolean>;
    IsTimeFormat(input: string): Promise<boolean>;
    IsTimeStartOverTimeEnd(inputStart: string, inputEnd: string): Promise<boolean>;
}
