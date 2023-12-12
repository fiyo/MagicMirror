![MagicMirror²: The open source modular smart mirror platform. ](.github/header.png)

<p style="text-align: center">
  <a href="https://choosealicense.com/licenses/mit">
		<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
	</a>
	<img src="https://img.shields.io/github/actions/workflow/status/michmich/magicmirror/automated-tests.yaml" alt="GitHub Actions">
	<img src="https://img.shields.io/github/checks-status/michmich/magicmirror/master" alt="Build Status">
	<a href="https://codecov.io/gh/MichMich/MagicMirror">
		<img src="https://codecov.io/gh/MichMich/MagicMirror/branch/master/graph/badge.svg?token=LEG1KitZR6" alt="CodeCov Status"/>
	</a>
	<a href="https://github.com/MichMich/MagicMirror">
		<img src="https://img.shields.io/github/stars/michmich/magicmirror?style=social">
	</a>
</p>

**MagicMirror²**是一个开源模块化智能镜像平台。随着越来越多的可安装模块，**MagicMirror²**允许您将走廊或浴室的镜子转换为个人助理。**MagicMirror²**是由 [原始 MagicMirror](https://michaelteeuw.nl/tagged/magicmirror) 的创建者在 [不断增长的贡献者](https://github.com/MichMich/MagicMirror/graphs/contributors) 社区的难以置信的帮助下构建的。

MagicMirror²专注于模块化插件系统，并使用 [Electron](https://www.electronjs.org/) 作为应用程序包装器。因此，不再需要安装web服务器或浏览器！

## 文档

有关包括 **[安装说明](https://docs.magicmirror.builders/getting-started/installation.html)** 在内的完整文档，请访问我们的专用文档网站：[https://docs.magicmirror.builders](https://docs.magicmirror.builders)

## 说明

- 默认天气预报城市：济南（Jinan）

您可以根据自己的需求进入更改。修改位置位于 **config/config.js** 文件的以下位置：

```json
{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Jinan", //location 字段为天气预报的城市名称，参数 config/city.list.json 文件中的 name 字段进行设置
				locationID: "1805753", //location 和 locationID 字段的值可以参照 config/city.list.json 文件中的ID进行设置。
				apiKey: "30dffd20b922d4fdc1a9582c4191b4cb"
			}
		},
```

- 加入 36氪 rss源：https://36kr.com/feed

## 链接

- 网站: [https://magicmirror.builders](https://magicmirror.builders)
- 文档: [https://docs.magicmirror.builders](https://docs.magicmirror.builders)
- 论坛: [https://forum.magicmirror.builders](https://forum.magicmirror.builders)
  - 技术讨论: https://forum.magicmirror.builders/category/11/core-system
- Discord: [https://discord.gg/J5BAtvx](https://discord.gg/J5BAtvx)
- 博客: [https://michaelteeuw.nl/tagged/magicmirror](https://michaelteeuw.nl/tagged/magicmirror)
- 捐赠: [https://magicmirror.builders/#donate](https://magicmirror.builders/#donate)

## 贡献指南

欢迎各种形式贡献，不仅以代码的形式，还包含：

- 错误报告
- 文件
- 翻译

有关完整的贡献指南，请查看: [https://docs.magicmirror.builders/about/contributing.html](https://docs.magicmirror.builders/about/contributing.html)

## 喜欢魔镜吗？考虑捐款！

MagicMirror²是开源和免费的。这并不意味着我们不需要钱。

请考虑捐款，以帮助我们支付网络服务器和电子邮件服务等持续成本。

如果我们收到足够的捐款，我们甚至可以腾出一些工作时间，花一些额外的时间改进MagicMirror²核心。

要捐款，请关注 [这里](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=G5D8E9MR5DTD2&source=url) 链接.

<p style="text-align: center">
	<a href="https://forum.magicmirror.builders/topic/728/magicmirror-is-voted-number-1-in-the-magpi-top-50"><img src="https://magicmirror.builders/img/magpi-best-watermark-custom.png" width="150" alt="MagPi Top 50"></a>
</p>
