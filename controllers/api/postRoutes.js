const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

//Creates a new post
router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            post_title: req.body.post_title,
            post_text: req.body.post_text,
            user_id: req.session.user_id,
        });
        console.log(newPost);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Deletes post by ID
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: "Post not found with this ID" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Updates Post by ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if (!postData) {
            res.status(404).json({ message: "Post not found with this ID" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;