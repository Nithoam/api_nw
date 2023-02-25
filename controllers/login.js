const User = require('../models/user');

exports.signIn = (req, res, next) => {
    const { email, password } = req.body;
    // Check if email exists
    User.findOne({ email }, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      } else if (!user) {
        res.status(401).send('Invalid email or password');
      } else {
        // Check if password is correct
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
          } else if (!isMatch) {
            res.status(401).send('Invalid email or password');
          } else {
            // Create session and set cookie
            req.session.userId = user._id;
            res.cookie('sessionId', req.session.id, { maxAge: 3600000 }); // 1 hour
            res.status(200).send('Logged in successfully');
          }
        });
      }
    });
  };

exports.signUp = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username: username,
        password: password
    })
        .then(result => {
            console.log('Created User');
            res.status(201).json({
                message: 'User created successfully!',
                user: result
            });
        })
        .catch(err => {
            console.log(err);
        });
}


exports.logOut = (req, res, next) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        } else {
        res.clearCookie('sessionId');
        res.status(200).send('Logged out successfully');
        }
    });
};
