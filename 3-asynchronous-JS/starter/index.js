const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, resp) => {
      if (err) return console.log(err.message);
      console.log(resp.body.message);
      fs.writeFile("dog-img.txt", resp.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("saved file");
      });
    });
});
