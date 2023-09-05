import { DataTypes } from "sequelize";

const CommentReply = (db) => {
	return db.define("commentReply", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		content: DataTypes.TEXT,
		commentID: DataTypes.INTEGER,
	});
};

export default CommentReply;
