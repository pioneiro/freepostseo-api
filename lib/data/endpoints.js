const endpoints = [
	{
		name: "User SignUp/LogIn",
		description: "Allows users to SignUp or LogIn",
		pathList: [
			{
				path: "/users/register",
				method: "POST",
				body: [
					{
						param: "user[name]",
						description: "Name of the User",
					},
					{
						param: "user[email]",
						description: "Email of the User, should be unique",
					},
					{
						param: "user[password]",
						description: "Password User creates to LogIn",
					},
				],
				response: [
					{
						param: "error",
						description:
							"An object with error message if any error is encountered",
					},
					{
						param: "token",
						description: "Token to Verify the User later",
					},
				],
			},
			{
				path: "/usesr/login",
				method: "POST",
				body: [
					{
						param: "user[email]",
						description: "Email of the User",
					},
					{
						param: "user[password]",
						description: "Password of the User",
					},
				],
				headers: [
					{
						param: "token",
						description: "Token to verify User",
					},
				],
				response: [
					{
						param: "error",
						description:
							"An object with error message if any error is encountered",
					},
					{
						param: "token",
						description: "Token to verify the User later",
					},
				],
			},
		],
	},
	{
		name: "URL Shortener",
		description: "Shorten a URL into a compact shareable format",
		pathList: [
			{
				path: "/tools/shorturl",
				method: "POST",
				body: [
					{
						param: "url",
						description: "URL to shorten",
					},
				],
				response: [
					{
						param: "error",
						description: "An object with error message if error is encountered",
					},
					{
						param: "urlid",
						description: "An object with urlid",
					},
				],
			},
			{
				path: "/tools/shorturl/urlid",
				method: "GET",
				response: [
					{
						param: "error",
						description: "An object with error message if error is encountered",
					},
					{
						param: "urlid",
						description: "An object with the URL associated with the urlid",
					},
				],
			},
		],
	},
	{
		name: "Scrapper",
		description: "Scraps metadata from a website",
		pathList: [
			{
				path: "/tools/scrapper",
				method: "POST",
				body: [
					{
						param: "url",
						description: "URL to scrap",
					},
				],
				response: [
					{
						param: "error",
						description: "An object with error message if error is encountered",
					},
					{
						param: "data",
						description: "An object with metadata of the website",
					},
				],
			},
		],
	},
	{
		name: "YouTube MP3 Downloader",
		description: "Downloads MP3 audio from a YouTube URL",
		pathList: [
			{
				path: "/tools/youtubemp3",
				method: "POST",
				body: [
					{
						param: "url",
						description: "YouTube URL",
					},
				],
				response: [
					{
						param: "error",
						description: "An object with error message if error is encountered",
					},
					{
						description: "Downloads MP3 extracted from YouTube URL",
					},
				],
			},
		],
	},
];

export default endpoints;
