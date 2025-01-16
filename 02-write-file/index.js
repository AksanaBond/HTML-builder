const fs = require('fs');
const readline = require('readline');
const path = require('path');
const filePath = path.join(__dirname, 'output.txt');
const fileStream = fs.createWriteStream(filePath);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome! You can write some text');
rl.prompt();
rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Goodbbye!');
    rl.close();
  } else {
    fileStream.write(input + '\n');
    rl.prompt();
  }
});

rl.on('SIGINT', () => {
  console.log('Goodbye!');
  fileStream.end();
  rl.close();
  process.exit();
});

rl.on('close', () => {
  fileStream.end();
});
