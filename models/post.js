module.exports = function (sequelize, DataTypes) {
    Post = sequelize.define("Post", {
        sender_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiver_id: {
            type: DataTypes.STRING,
            allowNull: false
        }, post: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
   

    return Post;
};