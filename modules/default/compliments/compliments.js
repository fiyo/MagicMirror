/* MagicMirror²
 * Module: Compliments
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("compliments", {
	// Module config defaults.
	defaults: {
		compliments: {
			anytime: ["嘿，祝你今天好运！"],
			morning: ["早上好！"],
			afternoon: ["下午好！"],
			evening: ["嗨，晚上好！"],
			"....-01-01": ["新年快乐！"],
			"....-10-01": ["国庆节快乐！", "祝福祖国繁荣昌盛"],
			"....-08-01": ["今天是建军节！"],
			day_sunny: ["今天天气很好", "今天是晴天"],
			day_cloudy: ["今天是个多云的天气", "今天云量有点多"],
			cloudy: ["今天天气有点阴", "今天太阳不太愿意出来"],
			cloudy_windy: ["多云还有些风"],
			showers: ["可能有阵雨，别忘了带伞", "今天有阵雨"],
			rain: ["别忘了带伞", "可能会下雨哦！"],
			thunderstorm: ["今天有暴雨", "今天有大暴雨，尽量少出门"],
			snow: ["今天有雪，小心路滑", "今天有雪哦！"],
			fog: ["今日有雾，注意安全", "有雾，注意行车安全"],
			night_clear: ["夜空晴朗", "夜晚晴空万里"],
			night_cloudy: ["晚上多云", "今晚可能看不到星星"],
			night_showers: ["晚上有阵雨，记得带伞"],
			night_rain: ["晚上有雨"],
			night_thunderstorm: ["晚上有暴雨，尽量别出门", "晚上有暴雨，出门注意安全"],
			night_snow: ["晚上会下雪哦，注意安全"],
			night_alt_cloudy_windy: ["夜间多云还有风"]
		},
		updateInterval: 30000,
		remoteFile: null,
		fadeSpeed: 4000,
		morningStartTime: 3,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17,
		random: true
	},
	lastIndexUsed: -1,
	// Set currentweather from module
	currentWeatherType: "",

	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	// Define start sequence.
	start: async function () {
		Log.info(`Starting module: ${this.name}`);

		this.lastComplimentIndex = -1;

		if (this.config.remoteFile !== null) {
			const response = await this.loadComplimentFile();
			this.config.compliments = JSON.parse(response);
			this.updateDom();
		}

		// Schedule update timer.
		setInterval(() => {
			this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/**
	 * Generate a random index for a list of compliments.
	 * @param {string[]} compliments Array with compliments.
	 * @returns {number} a random index of given array
	 */
	randomIndex: function (compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		const generate = function () {
			return Math.floor(Math.random() * compliments.length);
		};

		let complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/**
	 * Retrieve an array of compliments for the time of the day.
	 * @returns {string[]} array with compliments for the time of the day.
	 */
	complimentArray: function () {
		const hour = moment().hour();
		const date = moment().format("YYYY-MM-DD");
		let compliments = [];

		// Add time of day compliments
		if (hour >= this.config.morningStartTime && hour < this.config.morningEndTime && this.config.compliments.hasOwnProperty("morning")) {
			compliments = [...this.config.compliments.morning];
		} else if (hour >= this.config.afternoonStartTime && hour < this.config.afternoonEndTime && this.config.compliments.hasOwnProperty("afternoon")) {
			compliments = [...this.config.compliments.afternoon];
		} else if (this.config.compliments.hasOwnProperty("evening")) {
			compliments = [...this.config.compliments.evening];
		}

		// Add compliments based on weather
		if (this.currentWeatherType in this.config.compliments) {
			Array.prototype.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
		}

		// Add compliments for anytime
		Array.prototype.push.apply(compliments, this.config.compliments.anytime);

		// Add compliments for special days
		for (let entry in this.config.compliments) {
			if (new RegExp(entry).test(date)) {
				Array.prototype.push.apply(compliments, this.config.compliments[entry]);
			}
		}

		return compliments;
	},

	/**
	 * Retrieve a file from the local filesystem
	 * @returns {Promise} Resolved when the file is loaded
	 */
	loadComplimentFile: async function () {
		const isRemote = this.config.remoteFile.indexOf("http://") === 0 || this.config.remoteFile.indexOf("https://") === 0,
			url = isRemote ? this.config.remoteFile : this.file(this.config.remoteFile);
		const response = await fetch(url);
		return await response.text();
	},

	/**
	 * Retrieve a random compliment.
	 * @returns {string} a compliment
	 */
	getRandomCompliment: function () {
		// get the current time of day compliments list
		const compliments = this.complimentArray();
		// variable for index to next message to display
		let index;
		// are we randomizing
		if (this.config.random) {
			// yes
			index = this.randomIndex(compliments);
		} else {
			// no, sequential
			// if doing sequential, don't fall off the end
			index = this.lastIndexUsed >= compliments.length - 1 ? 0 : ++this.lastIndexUsed;
		}

		return compliments[index] || "";
	},

	// Override dom generator.
	getDom: function () {
		const wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		// get the compliment text
		const complimentText = this.getRandomCompliment();
		// split it into parts on newline text
		const parts = complimentText.split("\n");
		// create a span to hold the compliment
		const compliment = document.createElement("span");
		// process all the parts of the compliment text
		for (const part of parts) {
			if (part !== "") {
				// create a text element for each part
				compliment.appendChild(document.createTextNode(part));
				// add a break
				compliment.appendChild(document.createElement("BR"));
			}
		}
		// only add compliment to wrapper if there is actual text in there
		if (compliment.children.length > 0) {
			// remove the last break
			compliment.lastElementChild.remove();
			wrapper.appendChild(compliment);
		}
		return wrapper;
	},

	// Override notification handler.
	notificationReceived: function (notification, payload, sender) {
		if (notification === "CURRENTWEATHER_TYPE") {
			this.currentWeatherType = payload.type;
		}
	}
});
