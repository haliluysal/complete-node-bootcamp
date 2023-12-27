const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Consumer Name: Jonas");
});

myEmitter.emit("newSale");

/////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, resp) => {
  console.log("Request received");
  resp.end("Request received");
});

server.on("request", (req, resp) => {
  console.log("Another Request received 💵");
});

server.on("close", (req, resp) => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests");
});
