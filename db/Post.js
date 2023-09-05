// 5 Pull in datatypes from sequelize
import { DataTypes } from "sequelize";

// 6 Define a function that gets access to the DB as a param
const Post = (db) => {
	//10 define the post table and model in the database with the following
	//cols and data types
	return db.define("post", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: DataTypes.STRING,
		tagline: DataTypes.STRING,
		content: DataTypes.TEXT,
		image: DataTypes.BLOB,
		imageType: DataTypes.STRING,
		author: DataTypes.STRING,
	});
};

// 7 Exports out the post
export default Post;
