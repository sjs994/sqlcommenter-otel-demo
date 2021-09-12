const Sequelize = require("sequelize");
const { wrapSequelizeAsMiddleware } = require("@google-cloud/sqlcommenter-sequelize");

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
    }
);

const sqlcommenterMiddleware = wrapSequelizeAsMiddleware(sequelize, 
    {
        traceparent: true,
        tracestate: true,
      
        // These are optional and will cause a high cardinality burst traced queries
        client_timezone: false,
        db_driver: true,
        route: true,
    },
    { TraceProvider: "OpenTelemetry" }
);
      

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
    sequelize,
    Book,
    sqlcommenterMiddleware
}

