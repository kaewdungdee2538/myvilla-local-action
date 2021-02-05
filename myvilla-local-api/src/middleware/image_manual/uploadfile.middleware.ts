import 'dotenv/config';
import { extname } from 'path';
import { StatusException } from "src/utils/callback.status";
import { readdir, existsSync, mkdirSync } from 'fs';
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(
            new StatusException(
                {
                    error: 'File is not image.',
                    result: null,
                    message: 'ต้องเป็นรูปภาพนามสกุล .jpg .jpeg .png เท่านั้น',
                    statusCode: 400
                },
                400,
            ),
            false
        );
    }
    return callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const current_date = new Date();
    const year = current_date.getFullYear().toString();
    const month = current_date.getMonth().toString();
    const date = current_date.getDate().toString();
    const hour = current_date.getHours().toString();
    const minute = current_date.getHours().toString();
    const second = current_date.getSeconds().toString();
    const milsec = current_date.getMilliseconds().toString();

    const file_date_name = `${year}${month}${date}_${hour}${minute}${second}${milsec}`
    const fileExtName = extname(file.originalname);
    return callback(null, `${name}_${file_date_name}${fileExtName}`);
};

export const getCurrentDatePathFileSave = (req, file, callback) => {
    const current_date = new Date();
    const pathAllFiles = process.env.PATHSAVEIMAGE;
    let year = current_date.getFullYear().toString();
    let month = current_date.getMonth().toString();
    let date = current_date.getDate().toString();
    let currentPath = `${pathAllFiles}/${year}/${month}/${date}`;

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
                        error: 'File is not image.',
                        result: null,
                        message: 'ต้องเป็นรูปภาพนามสกุล .jpg .jpeg .png เท่านั้น',
                        statusCode: 400
                    },
                    400,
                ),
                false
            );
        return callback(null, currentPath);
    });
}