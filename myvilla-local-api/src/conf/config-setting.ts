// production
export const configfile = {
  DB_HOST: 'local.uat.bannayuu.com',
  DB_NAME: 'cit_bannayuu_db',
  APP_PORT: '4090',
  DB_PORT: 5432,
  DB_USERNAME: 'cit',
  DB_PASSWORD: 'db13apr',
  PATHSAVEIMAGE: 'C:\\Bannayuu\\Visitor\\Image\\files', //prod
  PATHPACELSAVEIMAGE: 'C:\\Bannayuu\\Web\\Image\\files', //prod
  PATHFOLDERSTATIC: 'C:\\Bannayuu\\Visitor\\Image\\files', //prod
  MYCOMPANY_ID: '1',
  IMAGE_SIZE: 10,
  URL_CALCULATE: 'http://localhost:4060/api/bannayuu/calculate/cal-all', //prod
  // "URL_CALCULATE":"https://uat.bannayuu.com/apicalculate/api/bannayuu/calculate/cal-all",
  HOST_LINE_NOTIFICATION: 'https://cit.bannayuu.com/apicross/webhook',
  PATH_LINE_ACTION_IN_NOTIFICATION: '/push_noti_home_line',
  HOST_LINE_NOTIFICATION_BOARDCAST:
    'https://cit.bannayuu.com/apinotify/line_notify',
  PATH_LINE_ACTION_IN_NOTIFICATION_BOARDCAST: '/push_notify_home_line',
  BASIC_AUTH_USERNAME: 'bannayuu',
  BASIC_AUTH_PASSWORD: 'bannayuu@pass',
  TOKEN_AUTHENTICATION: '5330531265f44e00bffdd12aa1e3e3a0',
};

// export const configfile = {
//   DB_HOST: process.env.DB_HOST,
//   DB_NAME: process.env.DB_NAME,
//   DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
//   APP_PORT: process.env.APP_PORT,
//   DB_USERNAME: process.env.DB_USERNAME,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   PATHSAVEIMAGE: process.env.IMAGE_PATH_VISITOR,
//   PATHPACELSAVEIMAGE: process.env.IMAGE_PATH_WEB,
//   PATHFOLDERSTATIC: process.env.IMAGE_PATH_VISITOR,
//   MYCOMPANY_ID: process.env.MYCOMPANY_ID,
//   IMAGE_SIZE: process.env.IMAGE_SIZE_MB
//     ? parseInt(process.env.IMAGE_SIZE_MB)
//     : 10,
//   URL_CALCULATE: process.env.URL_CALCULATE,
//   HOST_LINE_NOTIFICATION: process.env.HOST_LINE_NOTIFICATION,
//   PATH_LINE_ACTION_IN_NOTIFICATION:
//     process.env.PATH_LINE_ACTION_IN_NOTIFICATION,
//   HOST_LINE_NOTIFICATION_BOARDCAST:
//     process.env.HOST_LINE_NOTIFICATION_BOARDCAST,
//   PATH_LINE_ACTION_IN_NOTIFICATION_BOARDCAST:
//     process.env.PATH_LINE_ACTION_IN_NOTIFICATION_BOARDCAST,
//   BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME,
//   BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
//   TOKEN_AUTHENTICATION: process.env.TOKEN_AUTHENTICATION,
// };

// test
// export const configfile = {
//   DB_HOST: '192.168.81.135',
//   DB_NAME: 'demo_bannayuu_db',
//   DB_PORT: 50005,
//   APP_PORT: '36005',
//   DB_USERNAME:'postgres',
//   DB_PASSWORD:'P@ssw0rd',
//   // "PATHSAVEIMAGE": "C:\\Bannayuu\\Visitor\\Image\\files", //prod
//   // "PATHPACELSAVEIMAGE": "C:\\Bannayuu\\Web\\Image\\files", //prod
//   // "PATHFOLDERSTATIC": "C:\\Bannayuu\\Visitor\\Image\\files", //prod
//   PATHSAVEIMAGE: 'C:\\api\\bannayuu\\images', // demo
//   PATHPACELSAVEIMAGE: '/home/ubuntu/banayuu_images/webmanagement', // demo
//   PATHFOLDERSTATIC: 'C:\\api\\bannayuu\\images', // demo
//   MYCOMPANY_ID: '1',
//   IMAGE_SIZE: 10,
//   // "URL_CALCULATE":"http://localhost:4060/api/bannayuu/calculate/cal-all", //prod
//   // "URL_CALCULATE":"https://uat.bannayuu.com/apicalculate/api/bannayuu/calculate/cal-all",
//   URL_CALCULATE: 'http://localhost:36006/api/bannayuu/calculate/cal-all', // demo
//   HOST_LINE_NOTIFICATION: 'http://localhost:38502/apicross/webhook',
//   PATH_LINE_ACTION_IN_NOTIFICATION: '/push_noti_home_line',
//   HOST_LINE_NOTIFICATION_BOARDCAST:
//     'http://localhost:38501/line_notify',
//   PATH_LINE_ACTION_IN_NOTIFICATION_BOARDCAST: '/push_notify_home_line',
//   BASIC_AUTH_USERNAME:'bannayuu',
//   BASIC_AUTH_PASSWORD:'bannayuu@pass',
//   TOKEN_AUTHENTICATION:'5330531265f44e00bffdd12aa1e3e3a0'
// };
