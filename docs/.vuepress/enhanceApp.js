/***********************
 * @desc 自定义主题根目录下进行拓展配置
 * @name JS
 * @author Jo.gel
 * @date 2019/8/1 0001
 ***********************/
export default (
	{
		Vue,
		options,
		router,
		siteData,
	}
) => {
	console.info(router);
	console.info(siteData);
	console.info(router.currentRoute);
	console.info(options);
	console.info(Vue.prototype);
}
