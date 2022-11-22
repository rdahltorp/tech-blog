const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

//Gets specific post by id
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

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error)
    }
})


//Creates new post when logged in.
router.post('/', withAuth, async (req, res) => {
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
router.delete('/:id', withAuth, async (req, res) => {
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

module.exports = router;