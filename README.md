# Node.js - Express Framework Easy Starter

This is a start kit to quickly start the development of Express.

The application uses ES6, the template engine is Handlebars, and the ORM is Sequelize.

## Getting Started

1. Install Node.js version 13

    1. Install Node.js version control tool

        ```sh
        npm install -g n;
        ```
    1. Install Node.js version 13

        ```sh
        n 13;
        ```
1. Clone the starter project

    ```sh
    cd /tmp/foo;
    git clone ...;
    ```

1. Install required packages

    ```sh
    npm install;
    ```

1. Install the latest version of PM2

    ```sh
    npm install -g pm2@latest;
    ```

1. Add the web server settings to "/etc/nginx/conf.d/express-easy-starter.conf" and restart nginx.

    /etc/nginx/conf.d/express-easy-starter.conf:

    ```Nginx
    upstream express-easy-starter-upstream {
      # ip_hash;
      server 127.0.0.1:3001;
      # keepalive 64;
    }

    server {
      listen 80;
      server_name {Your application host name};
      charset UTF-8;
      access_log /var/log/nginx/express-easy-starter.access.log  main;
      error_log /var/log/nginx/express-easy-starter.error.log  warn;

      # Hide PHP version and web server software name
      server_tokens off;
      #more_clear_headers X-Powered-By;
      #more_clear_headers Server;

      # Proxy to nodejs app
      location / {

        #proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;

        # Buffering
        client_max_body_size 100m;
        client_body_buffer_size 100m;
        client_body_temp_path /var/cache/nginx/client_temp;
        proxy_buffers 8 10m;
        proxy_buffer_size 10m;
        proxy_busy_buffers_size 10m;

        # Disable caching
        set $do_not_cache 1;
        proxy_no_cache $do_not_cache;
        proxy_cache_bypass $do_not_cache;
        sendfile off;

        # Enable WebSockets
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Send a request to an Express application
        proxy_redirect off;
        proxy_read_timeout 1m;
        proxy_connect_timeout 1m;
        proxy_pass http://express-easy-starter-upstream;
      }
    }
    ```

1. Start an app

    ```sh
    cd /tmp/foo;
    npm run start;
    ```

1. View the website at: https://{Your application host name}


1. Create a table of login accounts

    ```sql

    CREATE DATABASE IF NOT EXISTS `sample` DEFAULT CHARACTER SET utf8mb4;

    USE `sample`;

    CREATE TABLE `user` (
      `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
      `email` varchar(255) NOT NULL,
      `password` varchar(100) NOT NULL,
      `name` varchar(30) NOT NULL,
      `created` datetime NOT NULL DEFAULT current_timestamp(),
      `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
      PRIMARY KEY (`id`),
      UNIQUE KEY `ukAccount1` (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    INSERT INTO `user` (`email`, `password`, `name`) VALUES
      ('robin@example.com', 'password', 'Robin'),
      ('taylor@example.com', 'password', 'Taylor'),
      ('vivian@example.com', 'password', 'Vivian'),
      ('harry@example.com', 'password', 'Harry'),
      ('eliza@example.com', 'password', 'Eliza'),
      ('nancy@example.com', 'password', 'Nancy'),
      ('melinda@example.com', 'password', 'Melinda'),
      ('harley@example.com', 'password', 'Harley');
    ```

## Usage

### URL routing

URL routing is automatic in this application.  
There is a one-to-one relationship between a URL string and its corresponding router module.

For example "routes/users.js" is mapped to "https://{Your application}/users".

Also, "routes/api/users.js" is mapped to "https://{Your application}/api/users".


### Model class

Explains how to connect DB and how to use the model.  
For information on other model methods, see "[Sequelize | Sequelize ORM](https://sequelize.org/)".

1. Add the database connection information to "config/database.js".

    ```js
    export default {
      development: {
        username: 'root',
        password: null,
        database: 'sample',
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
          useUTC: false,
          timezone: 'Etc/GMT-9'
        },
        timezone: 'Etc/GMT-9',
        logging: false
      },
      ...
    ```

1. Create a user model in “models/UserModel.js”.

    ```js
    import Model from '../shared/Model';
    import { DataTypes } from 'sequelize';

    export default class extends Model {
      constructor() {
        const table = 'user';
        const attributes = {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          email: DataTypes.STRING,
          password: DataTypes.STRING,
          name: DataTypes.STRING,
          created: DataTypes.DATE,
          modified: DataTypes.DATE
        };
        super(table, attributes);
      }
    }
    ```

1. Access the table using the user model.

    ```js
    import UserModel from '../models/UserModel';

    // Search user table
    const userModel = new UserModel();
    await accountModel.findAll({ raw: true });
    // [
    //   {
    //     "id": 1,
    //     "email": "robin@example.com",
    //     "password": "password",
    //     "name": "Robin",
    //     "created": "2020-06-04T19:26:19.000Z",
    //     "modified": "2020-06-04T19:26:19.000Z"
    //   },
    //   {
    //     "id": 2,
    //     "email": "taylor@example.com",
    //     "password": "password",
    //     "name": "Taylor",
    //     "created": "2020-06-04T19:26:19.000Z",
    //     "modified": "2020-06-04T19:26:19.000Z"
    //   },
    //   ...
    // ]
    ```

## License

[MIT licensed](./LICENSE.txt)
