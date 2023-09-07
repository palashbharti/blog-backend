// 1 Does imports from npm packages
import express from "express";
import cors from "cors";
// 2 (through 16) Imports sequelize setup
import { db, Post, Comment, CommentReply } from "./db/db.js";
import { Op } from "sequelize";
import multer from "multer";
import jwt from "jsonwebtoken";
import fs from "fs";

//17 Setup express server to parse json body and allow CORS
const server = express();
server.use(express.json());
server.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });
server.use(upload.single("photo"));

//18 Root endpoint to test that the server is working
server.get("/", (req, res) => {
    res.send({ status: "online" });
});

//41 Get the request from the front end to save a new post to the DB
server.post("/newPost", async (req, res) => {
    //42 Use the form values from #39 to make a new post in the DB
    console.log(req.file);
    if (req.file && req.file.size > 500000) {
        res.send({ error: "file too big" });
    } else {
        const creationDetails = await Post.create({
            title: req.body.title,
            content: req.body.content,
            tagline: req.body.tagline,
            image: req.file?.buffer,
            imageType: req.file?.mimetype,
            author: `Nathan Evans`,
        });

        // console.log(creationDetails);
        // await Comment.create({
        // 	postID: creationDetails.dataValues.id,
        // 	author: "bot",
        // 	content: "Yay auto comments",
        // });

        res.send({});
    }
});

//23 Lines up with 22 on the frontend
server.get("/posts", async (req, res) => {
    //24 Use the post model from #2 to query the database, get the results
    //and send them back to the frontend in a posts object
    res.send({ posts: await Post.findAll() });
});

server.get("/post/:id", async (req, res) => {
    //34 Get specific post ID using the model from sequelize
    res.send({
        post: await Post.findOne({
            where: { id: req.params.id },
            include: [{ model: Comment, include: CommentReply }],
        }),
    });
});

server.delete("/commentReply/:id", async (req, res) => {
    await CommentReply.destroy({ where: { id: req.params.id } });
    res.send();
});

server.post("/commentReply/:commentID", async (req, res) => {
    console.log(req.params.commentID, req.body.text);
    await CommentReply.create({
        content: req.body.text,
        commentID: req.params.commentID,
    });
    res.send();
});

server.delete("/post/:id", async (req, res) => {
    const post = await Post.findOne({ where: { id: req.params.id } });
    await post.destroy();
    res.send();
});

server.post("/comment", async (req, res) => {
    await Comment.create(req.body);
    console.log(req.body);
    res.send({
        comments: await Comment.findAll({
            where: { postID: req.body.postID },
            include: [CommentReply],
        }),
    });
});

server.post("/postsSearch", async (req, res) => {
    console.log(req.body.query);
    res.send({
        posts: await Post.findAll({
            where: { title: { [Op.iLike]: `%${req.body.query}%` } },
        }),
    });
});

//19 Make server listen for requests on 3011
server.listen(3011, () => {
    console.log("Server is running on port 3011");
});
