import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {dbConnection} from './pg_database/pg.database';
import * as bodyParser from 'body-parser';
import * as formData from 'express-form-data';
import * as os from 'os';

const connect = new dbConnection;
const port = process.env.PORT_API || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bodyParser:true,
  });
  app.use(bodyParser.urlencoded({extended:true}))
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
 
  //  app.use(upload.array());
  await app.listen(port);
  console.log('API is listening on port : '+port);
  await connect.createPgConnect();
}
bootstrap();
