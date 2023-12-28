const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("I could not write file");
      resolve("success");
    });
  });
};

// sync await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const resp = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(resp.body.message);
    await writeFilePro("dog-img.txt", resp.body.message);
    console.log("Random dog image saved");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: READY";
};

(async () => {
  try {
    console.log("1: will get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3: done getting dog pics");
  } catch (error) {
    console.log("ERROR ☠️");
  }
})();

// with then functions (again getting into callbacks)
// console.log("1: will get dog pics");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: done getting dog pics");
//   })
//   .catch((err) => {
//     console.log("ERROR ☠️");
//   });

// promised which makes easier to read
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((resp) => {
//     console.log(resp.body.message);
//     return writeFilePro("dog-img.txt", resp.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// callback hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, resp) => {
//       if (err) return console.log(err.message);
//       console.log(resp.body.message);
//       fs.writeFile("dog-img.txt", resp.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("saved file");
//       });
//     });
// });
