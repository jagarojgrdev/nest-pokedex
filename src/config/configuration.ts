// Tambien se ve como app.config.ts
// Cargamos en app.module

export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DATABASE_HOST ?? 'mongodb://localhost:27017/pokedex',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  },
  enviroment: process.env.NODE_ENV || 'dev',
  defaultLimit: parseInt(process.env.DEFAULT_LIMIT ?? '5', 10),
});
