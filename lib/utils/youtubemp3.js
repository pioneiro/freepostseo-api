import ytdl from "ytdl-core";

const youtubemp3 = (url, callback) => {
  if (ytdl.validateURL(url)) {
    ytdl
      .getInfo(url)
      .then((info) => {
        const fileName = encodeURIComponent(
          info.videoDetails.title.concat(".mp3")
        );

        const readStream = ytdl.downloadFromInfo(info, {
          quality: "highestaudio",
        });

        callback({ fileName, readStream });
      })
      .catch((error) => callback({ error: error.message }));
  } else callback({ error: "Not a valid YouTube link" });
};

export default youtubemp3;
