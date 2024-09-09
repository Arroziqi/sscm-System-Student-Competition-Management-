# SSCM (System Student Competition Management) - RESTFUL API

## SetUp Project

1. Create .env file
```
DATABASE_URL="mysql://root:@localhost:3306/sscm"
```

2. Run this code in terminal

```shell

npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start

```