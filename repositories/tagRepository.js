import fs from 'fs';

export default {
  init: function (name) {
    this.filename = name+".json";
    let content = ""; 
    if(fs.existsSync(this.filename))
      content = fs.readFileSync(this.filename);
    else content = "{}"
    this.data = JSON.parse(content) || {};
  },

  insert: function (collectionName, tag) {
    if (!this.data[collectionName]) {
      this.data[collectionName] = [];
    }
    this.data[collectionName].push(tag);
  },

  selectAll: function (collectionName) {
    return this.data[collectionName];
  },

  save: function () {
    console.log(this.data);
    const content = JSON.stringify(this.data);
    console.log(content);
    fs.writeFileSync(this.filename, content);
  }
}