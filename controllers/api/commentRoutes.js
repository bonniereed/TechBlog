const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    res.render('all');
});

router.get('/comment/:id', async (req, res) => {
    return res.render('comment', Comment[req.params.id])
});

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            title: req.body.title,
            topic: req.body.topic,
            date_created: req.body.date_created,
            comment: req.body.comment,
            user_id: req.body.user_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//add comments only

module.exports = router;
