const express = require("express")
const fs = require("fs")
const readline = require('readline');
var Transform = require('stream').Transform;
var util = require('util');

const questionsFilePath = "./questions.txt";
const app = express()

async function removeFirstLine() {
  fs.readFile(questionsFilePath, function(err, data) { // read file to memory
      if (!err) {
          data = data.toString(); // stringify buffer
          var position = data.toString().indexOf('\n'); // find position of new line element
          if (position != -1) { // if new line element found
              data = data.substr(position + 1); // subtract string based on first line length

              fs.writeFile(questionsFilePath, data, function(err) { // write file
                  if (err) { // if error, report
                      console.log (err);
                  }
              });
          } else {
              console.log('no lines found');
          }
      } else {
          console.log(err);
      }
  });
}

async function getFirstLine(pathToFile) {
  const readable = fs.createReadStream(pathToFile);
  const reader = readline.createInterface({ input: readable });
  const line = await new Promise((resolve) => {
    reader.on('line', (line) => {
      reader.close();
      resolve(line);
    });
  });
  readable.close();
  return line;
}

app.get("/", (req, res) => {
  getFirstLine(questionsFilePath).then((line) => {
    res.send(line)
    removeFirstLine();
  });
});

app.post("/dailyquestion", (req, res) => {
  res.send({
    response_type: "in_channel",
    text: "yo wassup"
  })
});

app.listen(3000, () => {
  console.log("yeet");
});
