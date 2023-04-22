import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { user1670427994562 } from './src/migrations/1670427994562-user';
import { event1670432348447 } from './src/migrations/1670432348447-event';
import { vacation1670432348448 } from './src/migrations/1670432348448-vacation';
import { exception1670432362053 } from './src/migrations/1670432362053-exception';
import { User } from './src/models/user.model';
import { Event } from './src/models/event.model';
import { Exception } from './src/models/exception.model';
import { Vacation } from './src/models/vacation.model';

config();

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const port = +process.env.DATABASE_PORT;
const database = process.env.DATABASE_DATABASE;

export default new DataSource({
  username,
  password,
  host,
  port,
  database,
  type: 'postgres',
  ssl: false,
  entities: [User, Event, Exception, Vacation],
  migrations: [
    user1670427994562,
    event1670432348447,
    vacation1670432348448,
    exception1670432362053,
  ],
});
