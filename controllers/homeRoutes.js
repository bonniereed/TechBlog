const router = require('express').Router();
const { Comment, User, Post } = require('../models');
const withAuth = require('../utils/auth');

//hompage rendering
router.get('/', async (req, res) => {
    try {
        // render homepage
        res.render('homepage', {
            logged_in: req.session.logged_in,
        });
        console.log(req.session);
    } catch (err) {
        res.status(500).json(err);
    }
});


// renders all comments
router.get('/post', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: null,
            },
        });
        const post = postData.map((post) =>
            post.get({ plain: true })
        );

        res.render('post', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//render by individual comment
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// renders all comments
router.get('/comment', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                user_id: null,
            },
        });
        const comments = commentData.map((comment) =>
            comment.get({ plain: true })
        );

        res.render('comment', {
            comments,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//render by individual comment
router.get('/comment/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const comment = commentData.get({ plain: true });

        res.render('comment', {
            comment,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
        console.log(req.session.user_id);
        // Find the logged in trainer based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Comment }],
        });

        const user = userData.get({ plain: true });
        const { comments } = user;
        // console.log(trainer);
        console.log(comments);
        res.render('profile', {
            user,
            comments,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// render login screen
router.get('/login', (req, res) => {
    console.log('this is inside of login route');
    console.log(req.session);
    // If the trainer is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
