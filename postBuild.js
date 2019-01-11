const fs = require('fs');
fs.readFile('./dist/browser-untar_.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  const replacement = fs.readFileSync('./dist/untar-worker.js').toString().replace(/\\/g,'\\\\');
  const result = data.replace(/"__replace__string__"/g, `'${replacement}'`);

  fs.writeFile('./dist/browser-untar.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});