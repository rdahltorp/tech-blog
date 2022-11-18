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

        const posts = postData.map((post) => post.get({ plain:true }));

        res.render('homepage', {posts})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router