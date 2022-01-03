const constants = {
    PORT: process.env.PORT || 3000,
    ZIPKIN_HOSTNAME: process.env.ZIPKIN_HOSTNAME || "zipkin",
    ZIPKIN_PORT: process.env.ZIPKIN_PORT || 9411
};


module.exports = {
    constants
}
