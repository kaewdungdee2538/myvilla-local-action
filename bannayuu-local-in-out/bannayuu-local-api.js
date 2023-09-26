"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_setting_1 = require("./conf/config-setting");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const pg_database_1 = require("./pg_database/pg.database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const load_setting_local_utils_1 = require("./utils/load_setting_local.utils");
const connect = new pg_database_1.dbConnection;
const port = config_setting_1.configfile.PORT_API || 8080;
const loadSettingLocal = new load_setting_local_utils_1.LoadSettingLocalUtils(connect);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: true,
    });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(cookieParser());
    await app.listen(port);
    console.log('API is listening on port : ' + port);
    await connect.createPgConnect();
}
bootstrap();
//# sourceMappingURL=bannayuu-local-api.js.map