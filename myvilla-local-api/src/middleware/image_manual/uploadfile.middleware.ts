import {configfile} from '../../conf/config-setting'
import { extname } from 'path';
import { StatusException } from "src/utils/callback.status";
import { readdir, existsSync, mkdirSync } from 'fs';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { v4 as uuidv4 } from 'uuid';
const errMessageUtilsTh = new ErrMessageUtilsTH();
const formatUtils = new FormatDataUtils();


export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|bmp|svg)$/)) {
        return callback(
            new StatusException(
                {
                    error: 'File is not image.',
                    result: null,
                    message: 'ต้องเป็นรูปภาพนามสกุล .jpg .jpeg .png .bmp .svg เท่านั้น',
                    statusCode: 200
                },
                200,
            ),
            false
        );
    }
    return callback(null, true);
};
const checkVisitorValues = (req,file,callback) => {
    const body = req.body;
    let errMessage = null;
    if (!body.visitor_info) {
        return errMessageUtilsTh.errVisitorInfoNotFound;
    } else {
        const visitorInfo = JSON.parse(body.visitor_info);
        if (!visitorInfo.prefix_name)
            errMessage = errMessageUtilsTh.errVisitorInfoPrefixNameNotFound
        else if (formatUtils.HaveSpecialFormat(visitorInfo.prefix_name))
            errMessage = errMessageUtilsTh.errVisitorInfoPrefixNameProhibitSpecial;
        else if (!visitorInfo.first_name_th)
            errMessage = errMessageUtilsTh.errVisitorInfoFirstNameNotFound;
        else if (formatUtils.HaveSpecialFormat(visitorInfo.first_name_th))
            errMessage = errMessageUtilsTh.errVisitorInfoFirstNameProhibitSpecial;
        else if (!visitorInfo.last_name_th)
            errMessage = errMessageUtilsTh.errVisitorInfoLastNameNotFound;
        else if (formatUtils.HaveSpecialFormat(visitorInfo.last_name))
            errMessage = errMessageUtilsTh.errVisitorInfoLastNameProhibitSpecial;
        else if (!visitorInfo.identity_card)
            errMessage = errMessageUtilsTh.errVisitorInfoIdentityNotFound
        // else if (!this.formatUtils.IsFormatIdentityCard(visitorInfo.identity_card))
        //     return this.errMessageUtilsTh.errVisitorInfoIdentityFormatNotValid;
        errMessage = null;
    }
    if(errMessage){
        return callback(
            new StatusException(
                {
                    error: errMessage,
                    result: null,
                    message: errMessage,
                    statusCode: 200
                },
                200,
            ),
            false
        );
    }
    return callback(null, true);
}
export const editFileName = (req, file, callback) => {
    const cookiesObj = req.cookie
    const type_contrac = cookiesObj.type_contrac
    const action_type_contrac = cookiesObj.action_type_contrac
    console.log('cookie '+ JSON.stringify(cookiesObj))
    const name = generateUuidWithoutHyphens();

    const fileExtName = extname(file.originalname);
    return callback(null, `${type_contrac}${action_type_contrac}_${name}${fileExtName}`);
};


export const getCurrentDatePathFileSave = (req, file, callback) => {
    const cookiesObj = req.cookie
    const type = cookiesObj.type;
    const action_type = cookiesObj.action_type;
    const current_date = new Date();
    const pathAllFiles = configfile.PATHSAVEIMAGE;
    let year = current_date.getFullYear().toString();
    let month = (current_date.getMonth()+1).toString();
    let date = current_date.getDate().toString();
    let currentPath = `${pathAllFiles}/files/${type}/${action_type}/${year}/${month}/${date}`;
    console.log(pathAllFiles);
    console.log('file'+ file)
    const dir = currentPath;
    if (!existsSync(dir)) {
        mkdirSync(dir, {
            recursive: true
        });
    }
    readdir(currentPath, err => {
        if (err)
            return callback(
                new StatusException(
                    {
                        error: err,
                        result: null,
                        message: 'Directory not exists.',
                        statusCode: 200
                    },
                    200,
                ),
                false
            );
        return callback(null, currentPath);
    });
}

export const getCurrentDatePathFileForPacelSave = (req, file, callback) => {
    const cookiesObj = req.cookie
    const type = cookiesObj.type;
    const action_type = cookiesObj.action_type;
    const current_date = new Date();
    const pathAllFiles = configfile.PATHPACELSAVEIMAGE;
    let year = current_date.getFullYear().toString();
    let month = (current_date.getMonth()+1).toString();
    let date = current_date.getDate().toString();
    let currentPath = `${pathAllFiles}/files/${type}/${action_type}/${year}/${month}/${date}`;
    console.log(pathAllFiles);
    const dir = currentPath;
    if (!existsSync(dir)) {
        mkdirSync(dir, {
            recursive: true
        });
    }
    readdir(currentPath, err => {
        if (err)
            return callback(
                new StatusException(
                    {
                        error: err,
                        result: null,
                        message: 'Directory not exists.',
                        statusCode: 200
                    },
                    200,
                ),
                false
            );
        return callback(null, currentPath);
    });
}
function generateUuidWithoutHyphens(): string {
    const uuid = uuidv4(); // Generate a random UUID with hyphens
    return uuid.replace(/-/g, ''); // Remove hyphens from the UUID
  }

