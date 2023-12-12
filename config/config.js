/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",			// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					  		// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "zh-cn",
	locale: "zh-CN",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
      timezone: "Asia/Shanghai"
		},
    {
      module: "MMM-CalendarExt3Agenda",
      position: "top_left",
      config: {
        instanceId: "basicCalendar",
        useWeather: false,
        showMiniMonthCalendar: true
      }
    },
		// {
		// 	module: "calendar",
		// 	header: "节假日",
		// 	position: "top_left",
		// 	config: {
		// 		calendars: [
		// 			{
		// 				fetchInterval: 7 * 24 * 60 * 60 * 1000,
		// 				//symbol: "calendar-check",
    //         name: "cn_holiday", // <-- specify calendar name
    //         color: "skyblue", // <-- if you don't want to get color, just remove this line.
    //         broadcastPastEvents: true, // <-- need to broadcast past events
    //         maximalNumberOfDays: 30, // <-- how old events would be broadcasted
    //         maximumEntries: 100, // <-- assign enough number to prevent truncating new events by old events.
    //         symbol: 'camera',
		// 				url: "https://gitee.com/congqiu/ChineseHoliday/raw/master/holiday.ics"
		// 			}
		// 		],
    //     broadcastPastEvents: true,
    //     displaySymbol: false,
		// 	}
		// },
		{
			module: "compliments",
			position: "lower_third",
      // config: {
      //   remoteFile: 'https://gist.githubusercontent.com/user/e28a69665b8839f6e9a7acd6b4acc97d/raw/be1dee8f805a433f6ee0fa3556d1927da14e7799/compliments.json'
      // }
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Jinan",
				locationID: "1805753", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "30dffd20b922d4fdc1a9582c4191b4cb"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "天气预报",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Jinan",
				locationID: "1805753", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "30dffd20b922d4fdc1a9582c4191b4cb"
			}
		},
		// {
		// 	module: "newsfeed",
		// 	position: "bottom_bar",
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "虎嗅",
		// 				url: "https://rss.huxiu.com/"
		// 			}
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true,
		// 		broadcastNewsFeeds: true,
		// 		broadcastNewsUpdates: true
		// 	}
		// },
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "36氪",
						url: "https://36kr.com/feed"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
