const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

//Gets specific post by id + associated comments
router.get('/:id', async (req, res) => {
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

        console.log(postData);

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error)
    }
})

//Leave comment functionality
router.post('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });

        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;