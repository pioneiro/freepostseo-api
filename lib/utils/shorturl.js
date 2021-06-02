import urldb from "../models/shorturl.js";

const pushurl = (newURL, callback) => {
	try {
		urldb.findOne({ url: newURL }, (errorFinding, foundURL) => {
			if (errorFinding) callback(errorFinding);
			else if (foundURL) callback({ urlid: foundURL._id });
			else
				new urldb({ url: newURL })
					.save()
					.then((savedURL) => callback({ urlid: savedURL._id }))
					.catch((errorSaving) => callback(errorSaving));
		});
	} catch (error) {
		callback(error);
	}
};

const geturl = (urlid, callback) => {
	try {
		urldb.findById(urlid, (errorFinding, foundURL) => {
			if (errorFinding) {
				callback(errorFinding);
			} else if (foundURL) {
				callback({ url: foundURL.url });
			} else {
				callback({ error: "No URL registered for given ID" });
			}
		});
	} catch (error) {
		callback(error);
	}
};

export { pushurl, geturl };
