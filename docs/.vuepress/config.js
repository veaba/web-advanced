module.exports = {
	// base: "/web-advanced-frond-end/",
	title: "进阶web高级前端知识体系",
	author: "veaba",
	description: "进阶web高级前端知识体系",
	displayAllHeaders: true, // 默认值：false
	// locales:{},//多语言支持 https://vuepress.vuejs.org/zh/guide/i18n.html
	scss: {},
	locales: {
		"/": {
			lang: "zh-CN",
			title: "进阶web高级前端知识体系",
			description: "面对web技术全栈，来自@veaba 个人学习笔记以及公开博客文章整理"
		}
	},
	themeConfig: {
		repo: "veaba/web-advanced-frond-end",
		logo: "/favicon.png",
		locales: {
			//主站是中文版
			"/": {
				label: "简体中文",
				selectText: "选择语言",
				editLinkText: "在Github上编辑此页",
				nav: require("./nav/zh"),
				// sidebar: 'auto'
			},
		}
	},
	// 修改内部webpack的配置
	chinWebpack: (config, isServer) => {},
	// vuepress-plugin-container 容器
	plugins: [
		// tip
		[
			"container",
			{
				type: "tip",
				before: title =>
					`<div class="tip custom-block"> <p class="title">${title}</p>`,
				after: "</div>"
			}
		],
		[
			"container",
			{
				type: "warning",
				before: title =>
					`<div class="warning custom-block"> <p class="title">${title}</p>`,
				after: "</div>"
			}
		],
		[
			"container",
			{
				type: "danger",
				before: title =>
					`<div class="danger custom-block"> <p class="title">${title}</p>`,
				after: "</div>"
			}
		]
	],
	extraWatchFiles: [".vuepress/nav/zh.js"]
};
