import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  dbUsername: process.env.DB_USER_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbAutoload: process.env.DB_DATABASE_AUTOLOAD === 'true' ? true : false,
  jwtSecret: process.env.JWT_SECRET,
}));
