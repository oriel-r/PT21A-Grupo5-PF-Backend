import { registerAs } from '@nestjs/config';
import { fail } from 'assert';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { envConfig } from 'src/helpers/get-envs';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';

//DB Postgres configuration

const PostgresDataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: String(process.env.DB_NAME),
  key: envConfig.DB_PASSWORD,
  synchronize: true,
  dropSchema: true,
  logging: ['error'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
};

export const postgresDataSourceConfig = registerAs(
  'postgres',
  () => PostgresDataSourceOptions,
);

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);
