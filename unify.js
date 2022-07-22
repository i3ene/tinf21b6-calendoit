const fs = require('fs');
const path = './dist/calendoit/index.xhtml';
const format = 'utf-8';

function readWriteSync() {
  const data = fs.readFileSync(path, format);

  var newValue = data.replace(/^\./gim, 'myString');

  fs.writeFileSync(path, newValue, format);
}

readWriteSync();
console.log('Unify complete!');