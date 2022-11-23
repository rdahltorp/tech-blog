const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth')

//Render sign up page
router.get('/signup', async (req, res) => {
    try {
        res.render('signup')
    } catch (error) {
        res.status(500).json(error)
    }
});

//Submit new user
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
          username: req.body.username,
          password: req.body.password
        });

        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.logged_in = true;

          res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Render login page
router.get('/login', async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.status(500).json(error)
    }
});

//Login as existing user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//See user profile/dash while signed in as that user. 
router.get('/dashboard', withAuth, async (req,res) => {
  if (!req.session.logged_in) {
    res.redirect('/api/users/login')
  }

  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (error) {
    res.status(500).json(error)
  }
});

//Creates new post when logged in.
router.post('/dashboard', withAuth, async (req, res) => {
  try {
      const newPost = await Post.create({
          ...req.body,
          user_id: req.session.user_id
      });

      res.status(200).json(newPost);
  } catch (error) {
      res.status(500).json(error);
  }
});

//Deletes post based on ID
router.delete('/dashboard/:id', withAuth, async (req, res) => {
  console.log(req.params);
  try {
      const postData = await Post.destroy({
          where: {
              id: req.params.id,
          }
      });

      if (!postData) {
          res.status(404).json({ message: 'No post was found!' });
          return
      };

      res.status(200).json(postData);
  } catch (error) {
      res.status(500).json(error);
  }
})

//Updates post based on id - not implemeneted yet - need js functionality
router.put('/:id', withAuth, async (req, res) => {
  try {
      const postNewData = await Post.update({
          where: {
              id: req.params.id,
              user_id: req.session.user_id
          }
      });

      res.status(200).json(postNewData);
  } catch (error) {
      res.status(500).json(error);
  }
})


//Logout user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
