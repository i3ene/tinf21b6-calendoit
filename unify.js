const fs = require("fs");
const path = "./dist/calendoit/index.xhtml";
const format = "utf-8";

const tags = ["link", "meta", "base"];

function readWriteSync() {
  const data = fs.readFileSync(path, format);

  var edit = data;
  edit = unifyTags(edit);
  edit = unifyScripts(edit);

  fs.writeFileSync(path, edit, format);
}

function unifyTags(str) {
  var pattern = "<(?!/)";
  pattern += "(" + tags[0];
  for (let i = 1; i < tags.length; i++) pattern += "|" + tags[i];
  pattern += ")";
  pattern += "([^>]*)>";

  const reg = new RegExp(pattern, "g");
  return str.replace(reg, "<$1 $2/>");
}

function unifyScripts(str) {
    var pattern = "<(script([^>]*))(type=\"([^\"]*)\")([^>]*)>";
    const reg = new RegExp(pattern, "g");
    return str.replace(reg, "<$1 type=\"application/javascript\" $5>");
}

readWriteSync();
console.log("Unify complete!");
