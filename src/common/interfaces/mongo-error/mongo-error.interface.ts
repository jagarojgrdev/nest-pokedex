// Creamos interfaz nest g itf common/interfaces/mongoError --no-spec
export interface MongoError extends Error {
  code?: number;
  keyValue?: {
    [key: string]: any;
  };
}
