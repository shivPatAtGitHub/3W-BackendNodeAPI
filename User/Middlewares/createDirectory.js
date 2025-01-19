import fs from "fs";
import path from "path";

export const createDirectory = (pathName) => {
  return new Promise((resolve, reject) => {
    const __dirname = path.resolve();

    pathName = pathName.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, "");
    // Remove leading directory markers, and remove ending /file-name.extension

    fs.mkdir(path.resolve(__dirname, pathName), { recursive: true }, (e) => {
      if (e) {
        console.error(e);
      }

      resolve(true);
    });
  });
};
