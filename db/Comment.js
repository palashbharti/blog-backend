import { DataTypes } from "sequelize";

const Comment = (db) => {
	return db.define("comment", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		content: DataTypes.TEXT,
		author: DataTypes.STRING,
		postID: DataTypes.INTEGER,
		commentPicturePath: DataTypes.STRING,
	});
};

export default Comment;
