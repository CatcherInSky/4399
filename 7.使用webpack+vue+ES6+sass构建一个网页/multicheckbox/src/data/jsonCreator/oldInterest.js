let str = "文化娱乐	1	动漫	104   广播电台	109   戏曲曲艺	108   演出票务	111   电影	102   电视剧	103   综艺	105   音乐	101   KTV	112   棋牌桌游	113   收藏	114   文化艺术	115   书籍阅读	116   星座运势	117   休闲爱好	118   网络小说	119 软件应用	2	办公学习	201   系统工具	202   社交通讯	203   影音图像	204   手机美化	205   理财购物	206   生活实用	207   资讯阅读	208   旅游出行	209   母婴育儿	210   应用市场	211 资讯	3	社会时政	301   商业财经	302   科技资讯	303   娱乐八卦	304   网络奇闻	305   军事	306   时尚	307 网络购物	4	-	- 教育培训	5	家教	511   全日制学校	501   留学	512   考试培训	509   职场培训	507   语言学习	508   IT培训	504   艺术培训	506   体育培训	510   技能培训	505   学前教育	513   中小学教育	514   大学教育	515   学历教育	516   公务员考试	517   职业教育	518 医疗健康	6	养生保健	608   医疗器械	606   医疗服务	604   医疗机构	605   整容整形	603   疾病	602   药品	607   体检	609   疗养院	610   成人用品	611   口腔健康	612 游戏	7	PC游戏	703   手机游戏	702   模拟辅助	701   游戏机	705   网页游戏	704   休闲益智	706   跑酷竞速	707   宝石消除	708   网络游戏	709   动作射击	710   棋牌桌游	711   儿童游戏	712   体育格斗	713   角色扮演	714   经营养成	715   策略塔防	716   东方仙侠	717   三国题材	718   西方魔幻	719 旅游出行	8	国内游	807   港澳台	808   出国游	809   酒店	811   交通票务	813   主题旅游	814   自驾游	815   本地周边游	816   户外探险	817 汽车	9	低档车	914   中档车	915   高档车	916   二手车	913   豪华汽车	917   新能源汽车	903   汽车保险	910   汽车改装	908   汽车用品	909   汽车维修	907   汽车美容	906   租车服务	912   车展	918 餐饮美食	10	休闲小食	1004   烹饪和菜谱	1010   酒水	1012   饮料	1013   餐馆	1014   面包蛋糕	1015 家电数码	11	个人护理电器	1104   办公数码设备	1112   厨房电器	1103   大家电	1101   手机	1106   摄影器材	1111   智能设备	1110   生活电器	1102   电脑	1107   网络设备	1113   影音设备	1114 母婴亲子	13	奶粉辅食	1301   妈妈用品	1310   孕婴保健	1314   宝宝安全	1308   宝宝家电	1304   宝宝洗护用品	1303   宝宝玩乐	1306   早教	1312   母婴护理服务	1313   母婴社区	1315   童装童鞋	1307   童车童床	1305   纸尿裤湿巾	1302   胎教	1311   儿童摄影	1316   儿童玩具	1317 体育健身	14	球类运动	1401   休闲健身	1402   跑步骑行	1403   水上运动	1404   极限运动	1405   户外运动	1406   健身器械	1407   体育类赛事	1408 金融理财	15	P2P	1515   保险	1508   信用卡	1510   外汇	1504   基金	1502   股票	1501   网络理财	1518   银行理财	1517   彩票	1519   期货	1520   贵金属	1521   信托	1522   贷款	1523 求职创业	16	——	—— 房产	17	买房	1702   卖房	1703   新房	1714   二手房	1713   普通住宅	1715   别墅豪宅	1716   商业房产	1717   租房	1718   写字楼	1719 个护美容	18	SPA美体	1807   个人护理	1803   彩妆	1802   护肤品	1801   美发	1805   美甲	1806   香水	1804   减肥瘦身	1809 生活服务	19	二手回收	1907   婚庆服务	1909   家政服务	1901   搬家服务	1906   摄影服务	1911   物业维修	1903   物流配送	1908   鲜花配送	1904 商务服务	21	人员招聘	2114   会计审计	2104   公关服务	2107   安全安保	2105   广告服务	2101   法律咨询	2102   大宗货物物流	2111   移民中介	2115   招商加盟	2116   机械器材	2117   农林牧渔	2118 建材家居	22	厨具	2205   家具	2203   家居饰品	2207   家纺	2204   灯具	2206   装修建材	2202   日用百货	2208   办公家具	2209   别墅装修	2210   小户型装修	2211 婚恋交友	23	——	—— 服饰鞋包	25	时尚女装	2501   精品男装	2502   女鞋	2503   男鞋	2504   内衣	2505   珠宝配饰	2506   箱包皮具	2507   手表	2508 非汽车类机动车	26	——	—— 公益	27	——	—— 花鸟萌宠	28	猫	2801   狗	2802   鸟	2803   水族	2804   宠物用品	2805   宠物服务	2806   绿植花卉	2807 直播	32	明星娱乐	3201   游戏	3202   音乐	3203 " 

let reg = /[A-Za-z\u4e00-\u9fa5]+.?[0-9]+/g

let x = str.match(reg)
let y = [];
for(let i = 0;i<x.length;i++){
	y.push({
		id:x[i].match(/[0-9]+/g)[0],
		name:x[i].match(/[A-Za-z\u4e00-\u9fa5]+/g)[0]
	})
}
console.log(y)
class Node{
  constructor(node,parent=null){
    this.id =node.id
    this.name = node.name
    this.children = []
  }
}
let oldinterest = new Node({
	id:0,
	name:'全部'
})
for(let i = 0;i<y.length;i++){
	if(y[i].id<100){
		oldinterest.children.push(new Node(y[i]))
	}else if(y[i].id > 100){
		let j = Math.floor(y[i].id/100)
		for(let item of oldinterest.children){
			if(item.id == j){
				item.children.push(new Node(y[i]))
				break
			}
		}
	}
}
JSON.stringify(oldinterest)

