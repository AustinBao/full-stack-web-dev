/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer
  .prompt({
    name: "website url"
  })
  .then((answers) => {
    var qr_png = qr.image(answers['website url'], { type: 'png' });
    qr_png.pipe(fs.createWriteStream("qr_img.png"));
    fs.writeFile("URL.txt", answers['website url'], (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    console.log("something went wrong: " + error)
  });

