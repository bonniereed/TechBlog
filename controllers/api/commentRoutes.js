const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: Post }, { model: User }],
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//post request data
router.post("/", withAuth, async (req, res) => {
    try {
        console.log(req.session);
        const newComment = await Comment.create({
            comment_content: req.body.comment_content,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        console.log(newComment);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
