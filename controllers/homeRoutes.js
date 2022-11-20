const router = require('express').Router();
const withAuth = require('../utils/auth')
const { User, Post, Comment } = require('../models')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {posts, logged_in: req.session.logged_in})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Need a route for specific blog posts. /:id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['description', 'date_created'],
                    include: [
                        {                        
                            model: User,
                            attributes: ['username']
                        }
                    ]
                },
            ]
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error)
    }
})


//Need a route for profile dashboard that shows all blog posts form that user





module.exports = router