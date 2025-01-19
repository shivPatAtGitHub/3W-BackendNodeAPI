import { createDirectory } from "./createDirectory.js";

export const singleFileUpload = async (path, file) => {
  return new Promise(async (resolve, reject) => {
    try {
      await createDirectory(path);

      await file.mv(path, (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    } catch (error) {
      reject(false);
    }
  });
};
