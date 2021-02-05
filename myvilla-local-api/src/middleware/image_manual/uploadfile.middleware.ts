import { extname } from 'path';
import { StatusException } from "src/utils/callback.status";
import { mkdir, readdir } from 'fs';
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
    const fileExtName = extname(file.originalname);
    return callback(null, `${name}${fileExtName}`);
};

export const getCurrentDatePathFileSave = (req, file, callback) => {
    const current_date = new Date();
    const pathAllFiles = './files';
    let year = current_date.getFullYear().toString();
    let month = current_date.getMonth().toString();
    let date = current_date.getDate().toString();
    let currentPath = pathAllFiles;
    checkDirectory(currentPath, (err, value) => {
        if (err)
            return callback(directoryIsNotExist(err), null);
        else {
            currentPath = `${currentPath}/${year}`;
            checkDirectory(currentPath, (err2, value2) => {
                if (err2)
                    return callback(directoryIsNotExist(err), null);
                else {
                    currentPath = `${currentPath}/${month}`
                    checkDirectory(currentPath, (err3, value3) => {
                        if (err3)
                            return callback(directoryIsNotExist(err), null);
                        else {
                            currentPath = `${currentPath}/${date}`
                            checkDirectory(currentPath, (err3, value3) => {
                                if (err3)
                                    return callback(directoryIsNotExist(err), null);
                                else
                                    return callback(null, currentPath);
                            });
                        }
                    });
                }
            });
        }
    });



}

function checkDirectory(currentPath: string, callback: any) {
    return readdir(currentPath, (err) => {
        if (err) {
            mkdir(currentPath, err => {
                if (err) {
                    console.log(err);
                    return callback(err, false);
                } return callback(null, true);
            })
        }
        console.log('have folder ' + currentPath);
        return callback(null, true);
    });
}

function directoryIsNotExist(str: string) {
    return new StatusException(
        {
            error: str,
            result: null,
            message: str,
            statusCode: 400
        },
        400);
}