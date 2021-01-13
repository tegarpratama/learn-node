const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

// Global variable
// Give identity to folder data/products.json
const p = path.join(
   rootDir, 
   'data',
   'products.json'
);

const getProductsFromFile = cb => {
   fs.readFile(p, (err, fileContent) => {
      if(err) {
         cb([]);
      } else {
         cb(JSON.parse(fileContent));
      }
   });
};

module.exports = class Product {
   constructor(title) {
      this.title = title;
   }

   save() {
      getProductsFromFile(products => {
         products.push(this); 
         // "this" refer to initialize object, 
         // ex: product = new Product("Shirt"), -> this = "Shirt"
         fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
         });
      });
   }

   static fetchAll(cb) {
      getProductsFromFile(cb);
   }
}