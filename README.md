# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejectar
```
npm run install
```
3. Instalar Nest CLI
```
npm run install
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar a ```.env```

6. LLenar la varibles de entorno en el ```.env```

7. Ejecutar la aplicación en dev:
```
npm run start:dev
```
8. Reconstruir DB con Seed
```
http://localhost:3000/api/v1/seed/
```

## Stack empleado
### DB
* MongoDB
* PostgresQL

### BackEnd
* TypeScript
* NestJS

### NPM
* Class Validator
* Class Transformer
* UUID

### Tools
* Axios
* Prettier
* Eslint
