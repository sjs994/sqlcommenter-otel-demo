const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_SCHEMA || "postgres",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        dialectOptions: {
            sl: process.env.DB_SSL == "true"
        }
    });

const Book = sequelize.define("Book", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorName: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = {
    sequelize: sequelize,
    Book: Book
}

