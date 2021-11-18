### Node server with sqlcommenter

This app spawns off a simple node server using sequelizer and a postgres container to view the logs of sqlcommenter.

To start the service and view postgres logs: 
```
docker-compose up -d && docker-compose logs -f postgres
```

To debug the code, use 
```
docker-compose -f docker-compose.debug.yaml up -d && docker-compose logs -f postgres
```

Link to opentelemetry-sqlcommenter: <https://github.com/open-telemetry/opentelemetry-sqlcommenter>