// 3 Brings in sequelize from npm
import Sequelize from "sequelize";
// 4 (through 7) Gets post model
import PostModel from "./Post.js";
import CommentModel from "./Comment.js";
import CommentReplyModel from "./CommentReply.js";

// 8 Use the sequelize import from #3 to connect to the blog database
const db = new Sequelize("postgres://hackupstate@localhost:5432/blog", {
	logging: false,
});

// 9 Give the post access to the db from 8 through 4
const Post = PostModel(db);
const Comment = CommentModel(db);
const CommentReply = CommentReplyModel(db);

//11 connect to db
const connectToDB = async () => {
	try {
		//12A Try and run a query
		await db.authenticate();
		//13 If it works, print out we're connected
		console.log("Connected to database");

		// Comment.belongsTo(Post, { foreignKey: "postID" });
		Post.hasMany(Comment, { foreignKey: "postID" });
		Comment.hasMany(CommentReply, { foreignKey: "commentID" });

		//14 Sync the models with the tables in the DB
		db.sync();
	} catch (error) {
		//12B If 12A fails, show an error message
		console.error(error);
		console.error("PANIC! DB ISSUE.");
	}
};

//15 Run 11-14 above
connectToDB();

//16 Export out the model and DB so we can access it in server.js
export { db, Post, Comment, CommentReply };
