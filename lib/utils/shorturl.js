import urldb from "../models/shorturl.js";

const pushurl = (newURL, callback) => {
  try {
    urldb.findOne({ url: newURL }, (errorFinding, foundURL) => {
      if (errorFinding)
        callback({
          error: errorFinding.message || "Error accessing DB",
        });
      else if (foundURL) callback({ urlid: foundURL._id });
      else
        new urldb({ url: newURL })
          .save()
          .then((savedURL) => callback({ urlid: savedURL._id }))
          .catch((errorSaving) =>
            callback({
              error: errorSaving.message || "Error accessing DB",
            })
          );
    });
  } catch (error) {
    callback({
      error: error.message || "Unexpected Error",
    });
  }
};

const geturl = (urlid, callback) => {
  try {
    urldb.findById(urlid, (errorFinding, foundURL) => {
      if (errorFinding) {
        callback({
          error: errorFinding.message || "Error accessing DB",
        });
      } else if (foundURL) {
        callback({ url: foundURL.url });
      } else {
        callback({ error: "No URL registered for given ID" });
      }
    });
  } catch (error) {
    callback({ error: error.message || "Unexpected Error" });
  }
};

export { pushurl, geturl };
