const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
export class FormatDataUtils {
    HaveSpecialFormat(input: string) {
        if (format.test(input))
            return true;
        return false;
    }

    IsNumber(input:any){
        return input.isInteger(input);
    }

    IsEmptyOrSpaces(str:string) {
        //return str === null || str.match(/^ *$/) !== null;
        if (!str)
            return true;
        else if (str.indexOf(' ') >= 0)
            return true;
        return false;
    }
    
    IsFormatIdentityCard(input:string){
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
        return check;
    }
}