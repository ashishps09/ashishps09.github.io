export const getImageURL = imgUrl => {
  let url = [];
  try {
    url = require("../assets/icons/" + imgUrl);
  } catch (e) {
    return [];
  }
  return [url];
};
