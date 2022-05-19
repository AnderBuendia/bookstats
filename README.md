# Bookstats

Do you want to save your books in some kind of list and watch some stats about them? Then, this is your web site.

## Stack Software

- [Next.JS](https:/nextjs.org/): [React](https://reactjs.org/) Framework, oriented to SSR.
- [Typescript](https://www.typescriptlang.org/): Strongly typed programming language that builds on JavaScript.
- [Tailwindcss](https://tailwindcss.com/): A utility-first CSS framework packed with classes .
- [Prisma](https://www.prisma.io/): Prisma is an ORM that helps your app read and write data to the DB in an intuitive and safe way.
- [Railway](https://railway.app/): Railway is an infrastructure platform where you can provision in this case a PostgreSQL DB in the cloud.
- [Vercel](https://vercel.com/): Vercel is a platform to deploy any frontend app.

## Using this repository

Before use this repository, you need to install [NodeJS](https://nodejs.org/en/download/) with `npm` that is multiplatform (is valid for Windows, MacOS and Linux).

Moreover you need to set up a [GitHub](https://github.com/) OAuth App to authenticate users.

Finally you can install through `docker-compose.yml` a PostgreSQL DB locally.

## To Install

You need to clone the following repository:

```
https://github.com/AnderBuendia/bookstats.git
```

Go to the root project folder and initialize projects:

```
cd bookstats
npm install
```

If you need to set up a local PostgreSQL database. In the root folder run this command:

```
docker-compose up -d
```

And then, set up database schema with Prisma:

```
npx prisma generate
npx prisma migrate dev
```

If you want to set up a database GUI you can configure it with this command:

```
npx prisma studio
```


Configure .env files:

```
cp example.env .env.local
```

Once the .env files are configured, you need to run the backend and frontend server from the root folder:

```
npm run dev
```

## Notes

To access website: https://bookstats.anderb.info/
