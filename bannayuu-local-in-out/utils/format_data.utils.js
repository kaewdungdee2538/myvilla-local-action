"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatDataUtils = void 0;
const moment = require("moment");
const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const formatuuid = /[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
const formathome = /[`@#$%^&*;'|<>~]/;
const formatNumber = /[0-9]/;
class FormatDataUtils {
    HaveSpecialFormat(input) {
        if (format.test(input))
            return true;
        return false;
    }
    HaveSpecialHomeFormat(input) {
        if (formathome.test(input))
            return true;
        return false;
    }
    HaveSpecialUuidFormat(input) {
        if (formatuuid.test(input))
            return true;
        return false;
    }
    IsNumber(input) {
        try {
            const value = parseInt(input);
            if (typeof value !== 'number') {
                return false;
            }
            if (value !== Number(value)) {
                return false;
            }
            if (value === Infinity) {
                return false;
            }
            return true;
        }
        catch (_a) {
            return fail;
        }
    }
    IsNotNumber(input) {
        if (formatNumber.test(input))
            return false;
        return true;
    }
    IsEmptyOrSpaces(str) {
        if (!str)
            return true;
        else if (str.indexOf(' ') >= 0)
            return true;
        return false;
    }
    IsFormatIdentityCard(input) {
        let check = false;
        let cc;
        let sum = 0;
        let Cal = 0;
        for (let i = 0; i < 12; i++) {
            cc = input.substring(i, i + 1);
            let _sum = (parseInt(cc) * (13 - i));
            sum = sum + _sum;
        }
        Cal = sum % 11;
        if (Cal <= 1)
            Cal = 1 - Cal;
        else
            Cal = 11 - Cal;
        if (input.substring(12, 13) == Cal.toString())
            check = true;
        console.log('Identity : ' + check);
        return check;
    }
    async IsDateTimeFormat(input) {
        try {
            const isdata = moment(input, "YYYY-MM-DD HH:mm:ss").isValid();
            console.log('IsDateTimeFormat : ' + isdata);
            return isdata;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async IsTimeFormat(input) {
        try {
            const isdata = moment(input, "HH:mm:ss").isValid();
            console.log('IsTimeFormat : ' + input + isdata);
            return isdata;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async IsTimeStartOverTimeEnd(inputStart, inputEnd) {
        try {
            const dateStart = moment(inputStart, "HH:mm:ss");
            const dateEnd = moment(inputEnd, "HH:mm:ss");
            if (dateStart > dateEnd) {
                console.log('IsTimeStartOverTimeEnd : true');
                return true;
            }
            console.log('IsTimeStartOverTimeEnd : false');
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
}
exports.FormatDataUtils = FormatDataUtils;
//# sourceMappingURL=format_data.utils.js.map