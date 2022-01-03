const constants = {
    PORT: process.env.PORT || 3001,
    ZIPKIN_HOSTNAME: process.env.ZIPKIN_HOSTNAME || "zipkin",
    ZIPKIN_PORT: process.env.ZIPKIN_PORT || 9411,
    INVENTORY_HOSTNAME: process.env.INVENTORY_HOSTNAME || "bookservice",
    INVENTORY_PORT: process.env.INVENTORY_PORT || 3000
};


module.exports = {
    constants
}
