const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, resp) => {
  // soln1
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     resp.end(data);
  //   });
  // soln2: streams
  //   const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     resp.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     resp.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     resp.statusCode(500);
  //     resp.end("File not found");
  //   });
  // soln3: streams and pipe
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(resp);
  // readbleSource.pipe(writableDestination)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening");
});
