export interface EnvVariables {
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  dbAutoload: boolean;
  jwtSecret: string;
  nodeEnv: 'development' | 'test' | 'production' | 'staging';
}
