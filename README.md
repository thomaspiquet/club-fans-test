# Club.fans Technical Assessment

## How to setup

- You need to have Docker
- You may not want to have another app running on port 3000 or 3306.

- execute the following command in the terminal.
  `docker-compose up --build`

It may take several seconds for MySQL Server to be up. The api will trigger some errors during this time.

When the api is up, use the seeder (or alternatively, you can do it by hand with the postman collection).

The seeder is just raw JS and run directly in local.

Go to `api-seeder` folder, then :

- `npm i`
- `npm run start`

It will seed 50 users, with 35 medias and 10 follow per user. (so 1 750 medias and 500 follows in total).

It also show the time needed to seed it, so you can spam it to test performance.

## Architecture

The API follow the classic architecture of a NestJS app.

### This API is based on 3 controllers.

- Users, which is responsible of the CRUD of users and the following of others users
- Medias, which is responsible of the CRUD of medias
- Feeds, which is responsible of giving the feed of a user (by his id)

### It has 3 TypeORM entities and 1 "hided" many to many table.

User, Media, ViewedMedia and user_following_user (the many to many table)

ViewedMedia is here to mark every Media that has been seen by a User. (it only mark the media for him, not for every users).
So he only get the medias he doesn't see yet.

### Databases

Databases hold the TypeORM connection.

### The feed

`http://localhost:3000/feeds?id=1&page=0&limit=10`

`id` is the id of the user, `page` to offset the results, `limit` to limit the number of results
