// production
export const configfile = {
  HOST: 'local.uat.bannayuu.com',
  DATABASE: 'cit_bannayuu_db',
  PORT_API: '4090',
  DATABASE_PORT: 5432,
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
  TOKEN_AUTHENTICATION:'5330531265f44e00bffdd12aa1e3e3a0'
};

// demo
// export const configfile = {
//   HOST: '192.168.81.135',
//   DATABASE: 'demo_bannayuu_db',
//   DATABASE_PORT: 50005,
//   PORT_API: '36005',
//   // "PATHSAVEIMAGE": "C:\\Bannayuu\\Visitor\\Image\\files", //prod
//   // "PATHPACELSAVEIMAGE": "C:\\Bannayuu\\Web\\Image\\files", //prod
//   // "PATHFOLDERSTATIC": "C:\\Bannayuu\\Visitor\\Image\\files", //prod
//   PATHSAVEIMAGE: '/home/ubuntu/banayuu_images/visitor', // demo
//   PATHPACELSAVEIMAGE: '/home/ubuntu/banayuu_images/webmanagement', // demo
//   PATHFOLDERSTATIC: '/home/ubuntu/banayuu_images/visitor', // demo
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
