1. Add following node packages to package.json

  ```
  "bcrypt": "*",
  "express-session": "*",
  "mongoose": "*",
  "passport": "*",
  "passport-local": "*",
  "passport-local-mongoose": "*",
  ```

1. Add model for user in `app/models/user.js` with following content

  ```
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var passportLocalMongoose = require('passport-local-mongoose');

  var UserSchema = new Schema({
    username: {type: String},
    password: {type: String}
  });

  UserSchema.plugin(passpoerLocalMongoose);

  module.exports = mongoose.model('User', UserSchema);
  ```

1. in `app.js` add
  * under requires:

    ```
    var mongoose = require('mongoose');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    ```

  * under `app.use(cookieParser());`:

    ```
    // this should be an env variable
    app.use(require('express-session')({
      secret: 'this is top secret',
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    ```

  * under `app.use('/users', users);`:

    ```
    var User = require('./app/models/user');
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    mongoose.connect('mongodb://localhost/user_authentication');
    ```

1. in `routes/index.js`:
  * add the following requires:

    ```
    var passport = require('passport');
    var User = require('../app/models/user')
    ```

  * replace the existing route with the following content:

    ```
    router.get('/', function(req, res, next) {
      res.render('index', { user: req.user });
    });

    router.get('/register', function(req, res) {
      res.render('register', {})
    });

    router.post('/register', function(req, res) {
      var newUser = new User({username: req.body.username})
      User.register(newUser, req.body.password .function(err, user) {
        if (err) {
          return res.render('register', {user: user});
        }

        passpoer.authenticate('local')(req, res, function() {
          res.redirect('/';)
        });
      });
    });
    ```

1. add template `register.jade`

  ```
  block content
    form(action="/register" method="post")
      label(for="username") Username
      br
      input(type="text" name="username" id="username")
      br
      label(for="password") Password
      br
      input(type="password" name="password" id="password")
      br
      input(type="submit" value="Register for the best app ever")
  ```

1. in index.jade content should be"

  ```
  block content
    form(action="/register" method="post")
      label(for="username") Username
      br
      input(type="text" name="username" id="username")
      br
      label(for="password") Password
      br
      input(type="password" name="password" id="password")
      br
      input(type="submit" value="Register for the best app ever")
  ```

1. npm install
1. start server and cross your fingers.... `DEBUG=user_authentication:* npm start`
