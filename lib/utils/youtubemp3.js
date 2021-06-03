import ytdl from "ytdl-core";

const youtubemp3 = (url, callback) => {
	if (ytdl.validateURL(url)) {
		ytdl
			.getInfo(url)
			.then((info) => {
				const fileName = info.videoDetails.title
					.replace("|", "")
					.toString("ascii")
					.concat(".mp3");

				const readStream = ytdl.downloadFromInfo(info, {
					quality: "highestaudio",
				});

				callback({ fileName, readStream });
			})
			.catch((error) => callback({ error: { message: error.message } }));
	} else callback({ error: { message: "Not a valid YouTube link" } });
};

export default youtubemp3;
