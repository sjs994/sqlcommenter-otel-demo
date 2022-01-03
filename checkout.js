const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor } = require("@opentelemetry/tracing");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { constants } = require("./constants"); 
const fetch = require("node-fetch");
const provider = new NodeTracerProvider();

const zipkinExporter = new ZipkinExporter({
  url: `http://${constants.ZIPKIN_HOSTNAME}:${constants.ZIPKIN_PORT}/api/v2/spans`,
  serviceName: "CheckoutService"
});
const spanProcessor = new SimpleSpanProcessor(zipkinExporter);
provider.addSpanProcessor(spanProcessor);
provider.register()

const express = require("express")
const app = express()
const port = constants.PORT

const updateContent = (url, bodyArg) => {
  return new Promise((resolve, reject) => { 
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(bodyArg),
        headers: { 'Content-Type': 'application/json' }
    }, resolve, reject)
    .then(resp => resp.text())
    .then(body => resolve(body))
    .catch(error => reject(error))
  })
}

const getUrlContents = (url) => {
    return new Promise((resolve, reject) => { 
      fetch(url, resolve, reject)
      .then(resp => resp.text())
      .then(body => resolve(body))
    })
  }

app.get("/contents", async (req, resp) => {
  const books = await getUrlContents(`http://${constants.INVENTORY_HOSTNAME}:${constants.INVENTORY_PORT}/books/all`);
  resp.type("json");
  resp.send(JSON.stringify({ dashboard: books }));
})

app.put("/checkout/:id", async (req, resp) => {
    let bookId = req.params["id"];
    let bookResponse = await getUrlContents(`http://${constants.INVENTORY_HOSTNAME}:${constants.INVENTORY_PORT}/books/id/${bookId}`);
    let bookData = JSON.parse(bookResponse)
    let bookCount = bookData.count;
    if (bookCount <= 0) {
        resp.status(500).send(JSON.stringify({error: "Book not available"}));   
    } else {
        try {
            await updateContent(`http://${constants.INVENTORY_HOSTNAME}:${constants.INVENTORY_PORT}/books/updateCount`, {id: bookId, count: bookCount - 1}); 
            resp.status(200).send("Successfully checked out");
        } catch (error) {
            resp.status(500).send(JSON.stringify(error))
        }
    }
});

app.listen(port, () => { console.log(`Listening at http://localhost:${port}`)})
