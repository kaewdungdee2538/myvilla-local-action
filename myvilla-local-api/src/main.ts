import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {dbConnection} from './pg_database/pg.database';
const connect = new dbConnection;
const port = process.env.PORT_API || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log('API is listening on port : '+port);
  await connect.createPgConnect();
}
bootstrap();
