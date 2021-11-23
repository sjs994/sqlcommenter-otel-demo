'use strict';

const opentelemetry = require("@opentelemetry/sdk-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");

const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/tracing");

const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { GrpcInstrumentation } = require("@opentelemetry/instrumentation-grpc");
const { SequelizeInstrumentation } = require("opentelemetry-instrumentation-sequelize");
const { constants } = require("./constants");

const provider = new NodeTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "BookService",
    }),
    plugins: {
        sequelize: { enabled: false, path: 'opentelemetry-plugin-sequelize' }
    }
});
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);

provider.addSpanProcessor(
    new SimpleSpanProcessor(new ZipkinExporter({
        url: `http://${constants.ZIPKIN_HOSTNAME}:${constants.ZIPKIN_PORT}/api/v2/spans`,
        serviceName: "BookService"
    }))
);
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new GrpcInstrumentation(),
      new SequelizeInstrumentation()
    ],
});

console.log("Tracing initialized");