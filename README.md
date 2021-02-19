# Node.js - Express Framework Easy Starter

This is a start kit to quickly start the development of Express.

The application uses ES6, the template engine is Handlebars, and the ORM is Sequelize.

<img src="https://raw.githubusercontent.com/takuya-motoshima/express-easy-starter/master/screencap/login.png" width="400" style="display: block; margin-bottom: 10px;">
<img src="https://raw.githubusercontent.com/takuya-motoshima/express-easy-starter/master/screencap/profile.png" width="400" style="display: block; margin-bottom: 10px;">

## Change Log

See [CHANGELOG.md](./CHANGELOG.md).

## Getting Started

Install Node.js version control tool.  

```sh
npm install -g n;
```

Install Node.js version 13.  

```sh
n 13;
  ```

Clone the starter project.  

```sh
cd /tmp/foo;
git clone https://github.com/takuya-motoshima/express-easy-starter.git;
```

Install required packages.  

```sh
npm install;
```

Install the latest version of PM2.  

```sh
npm install -g pm2@latest;
```

Copy the Nginx configuration file of this application to "/etc/nginx/conf.d/" and change the host name of the configuration file.  

```sh
sudo cp -a documents/sample-nginx.conf /etc/nginx/conf.d/express-easy-starter.conf;
```

Reload nginx to reflect the settings.  

```sh
sudo systemctl reload nginx;
```

Create an environment variable.  
Create "/tmp/foo/.env" and add the following.  
These can be accessed from the application in a format like "process.env.NODE_ENV".  

```sh
NODE_ENV=development
AWS_REKOGNITION_REGION=ap-northeast-1
AWS_REKOGNITION_ACCESS_KEY=...
AWS_REKOGNITION_SECRET_KEY=...
```

<table>
  <tbody>
    <tr>
      <th>NODE_ENV</th>
      <td>Set "production", "test" or "development".<br>The application connects to the DB of "config/database.js" set here.</td>
    <tr>
    </tr>
      <th>AWS_REKOGNITION_REGION<br>AWS_REKOGNITION_ACCESS_KEY<br>AWS_REKOGNITION_SECRET_KEY</th>
      <td>Describe the information to access the Amazon Rekognition service used by "shared/RekognitionClient.js".<br>Do not write if your application does not use "shared/RekognitionClient.js".</td>
    </tr>
  </tbody>
</table>

Create a DB to be used in this application.  

```sql
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `express-easy-starter` DEFAULT CHARACTER SET utf8mb4;';
mysql -u root -D express-easy-starter < documents/sample-db.sql; 
```

The user table is added to the sample DB, and the following records are added to the user table.  

```sql
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

Start an app.  

```sh
cd /tmp/foo;
npm start;
```

View the website at: https://\<Your application host name\>.  

## Usage

### User authentication.

Features of user login and logout.  

This application uses Passport to authenticate users.  

To use user authentication, add the following settings to "config/config.js".

config/config.js:

```js
authentication: {
    enabled: true,
    usernameField: 'email',
    passwordField: 'password',
    loginSuccessfulUrl: '/',
    loginFailureUrl: '/login',
    exclude: [
      '/signup'
    ]
}
```

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>enabled</td>
      <td>Set to true to use user authentication.</td>
    </tr>
    <tr>
      <td>usernameField</td>
      <td>Login ID column name of the user table.</td>
    </tr>
    <tr>
      <td>passwordField</td>
      <td>Password column name of the user table.</td>
    </tr>
    <tr>
      <td>loginSuccessfulUrl</td>
      <td>URL of the page to display after login</td>
    </tr>
    <tr>
      <td>loginFailureUrl</td>
      <td>The URL of the page to display when logout. This is usually the login page.</td>
    </tr>
    <tr>
      <td>exclude</td>
      <td>Set the URL that can be accessed without user authentication.</td>
    </tr>
  </tbody>
</table>


### Login page and page after successful login.

See [routes/login.js](routes/login.js) and [views/login.hbs](views/login.hbs) for the login page.  

See [routes/welcome.js](routes/welcome.js) and [views/welcome.hbs](views/welcome.hbs) for pages after successful login.  


### About routing.

URL routing is automatic in this application.  

There is a one-to-one relationship between a URL string and its corresponding router module.  
For example "routes/users.js" is mapped to "https://{Your application}/users".  

Also, "routes/api/users.js" is mapped to "https://{Your application}/api/users".

### About the model.

Explains how to connect DB and how to use the model.  
For information on other model methods, see "[Sequelize | Sequelize ORM](https://sequelize.org/)".

Defined in database connection information [config/database.js](config/database.js).  

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

Please refer to [models/UserModel.js](models/UserModel.js) for the implementation of the model class.  

```js
import Model from '../shared/Model';

export default (class extends Model {

  static get table() {
    return 'user';
  }

  static get attributes() {
    const attributes = {
      id: {
        type: super.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: super.DataTypes.STRING,
      password: super.DataTypes.STRING,
      name: super.DataTypes.STRING,
      created: super.DataTypes.DATE,
      modified: super.DataTypes.DATE
    };
  }

  static async isPasswordCorrect(id, password) {
    const count = await super.count({ where: { id, password } });
    return count > 0;
  }
}).attach();
```

The model can be used as follows.  

```js
import UserModel from '../../models/UserModel';

let users = await UserModel.findAll();
let user = await UserModel.findOne({where: {id: 1}});
await UserModel.update({name: 'some name'}, {where: {id: 1}});
```

### About views.

The view in this application uses the Handlebars template engine.  
See [https://handlebarsjs.com/](https://handlebarsjs.com/) for how to use Handlebars.  

Place the views in the "views /" directory.  

For example, to return "views / login.hbs" to the browser.  

```js
res.render('login');
```

## License

[MIT licensed](./LICENSE.txt)