export default {
	//随机ID
	getUID() {
		return 'axxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	
	//获取天数
	getDay(year, month) {
		var d = new Date(year, month, 0);
		return d.getDate();
	},
	//获取随机数据
	/**
	 * @param {String,Number} m
	 * @param {String,Number} n
	 * @param {String} cycle
	 */
	getRandomData(m, n, cycle) {
		let len,s;
		if (cycle === "year") {
			len = 12;
			s = 1;
		} else if(cycle === "month"){
			var d = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
			len = d.getDate();
			s = 1;
		}else{
			len = 23;
			s = 0
		}
		var datas = [];
		for (let i = s; i <= len; i++) {
			var data = Math.floor(Math.random() * (m - n) + n) + Math.random();
			datas.push([i, ~~data]);
		}
		return datas;
	},
	//获取数据最大值，最小值，平均值,累计值
	getArrMA(arr) {
		if (!arr) {
			return {
				max: 0,
				min: 0,
				average: 0
			}
		} else {
			return {
				max: Math.max.apply(null, arr),
				min: Math.min.apply(null, arr),
				average: (arr.reduce((a, b) => a + b) / arr.length).toFixed(2),
				total: (arr.reduce((a, b) => a + b ))
			}
		}

	},
	
		formatDateTime: function (d, pattern) {
			if (!d) return "";
			if (typeof d != "object") {
				if (/[TZ]/.test(d) == false && /[-]/.test(d)) {
					// 考虑到浏览器兼容性问题，将yyyy-MM-dd转换成yyyy/MM/dd的格式再进行new Date
					d = d.replace(/-/g, '/');
				}
				d = new Date(d);
			}
			pattern = pattern || 'yyyy-MM-dd';
			var y = d.getFullYear().toString(),
				o = {
					M: d.getMonth() + 1,
					d: d.getDate(),
					h: d.getHours(),
					m: d.getMinutes(),
					s: d.getSeconds()
				};
			pattern = pattern.replace(/(y+)/ig, function (a, b) {
				return y.substr(4 - Math.min(4, b.length));
			});
			for (var i in o) {
				pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
					return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
				});
			}
			return pattern;
		},
		F: function (d, pattern) {
			return util.formatDateTime(d, pattern);
		},
		CompareDate(start, end) {
			var start = new Date(start),
				end = new Date(end);
			var poor = end - start;
			// 分
			if (poor / 1000 / 60 < 60) {
				return Math.round(poor / 1000 / 60) + '分';
			}
			//小时
			if (poor / 1000 / 60 / 60 < 24) {
				return Math.floor(poor / 1000 / 60 / 60) + '时' + Math.round(poor / 1000 / 60 % 60) + '分';
			}
	
			//天
			if (poor / 1000 / 60 / 60 / 24) {
				return Math.floor(poor / 1000 / 60 / 60 / 24) + '天' + Math.floor(poor / 1000 / 60 / 60 % 24) + '时' + Math.round(poor / 1000 / 60 % 60) + '分';
			}
		},
		getTimeClass({
			type = 'd',
			data = [],
			key = 'showTime'
		}) {
			let getD = (d) => {
				return (d ? new Date(d) : new Date()).getDate();
			}
			let getW = (d) => {
				return Math.ceil((d ? new Date(d) : new Date()).getDate() / 7);
			}
			let getM = (d) => {
				return (d ? new Date(d) : new Date()).getMonth() + 1;
			}
	
			let getTitle = (d) => {
				return (new Date(d).getFullYear() + '年') + ({
					d: getM(d) + '月' + getD(d) + '日',
					w: getM(d) + '月第' + getW(d) + '周',
					m: getM(d) + '月'
				})[type]
			}
	
			let isSame = (start, end) => {
				let _map = {
					d: getD,
					w: getW,
					m: getM
				}
				return _map[type](start) === _map[type](end);
			}
	
			let sliceIndex = 0,
				result = [];
			data.forEach((element, index, arr) => {
				let nextIndex = index == arr.length - 1 ? index : index + 1;
				let start = element[key],
					end = arr[nextIndex][key],
					_list = [];
	
				if (!isSame(start, end) || index == arr.length - 1) {
					_list = arr.slice(sliceIndex, index + 1);
					sliceIndex = index + 1;
					result.push({
						title: getTitle(start),
						list: _list
					})
				}
			});
			return result;
		},
		getDateClass({
			data = [],
			key = 'showTime'
		}) {
			let getY = (d) => {
				return (d ? new Date(d) : new Date()).getFullYear();
			}
			var days = [31, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			let curW = [],
				perW = [],
				perM = [],
				threeM = [];
			let isSame = (start, item) => {
				if (getY(start) === getY() && util.getTheWeek().day - util.getTheWeek(start).day < 8) {
					curW.push(item)
				} else if (getY(start) === getY() && util.getTheWeek().day - util.getTheWeek(start).day > 7 && util.getTheWeek().day - util.getTheWeek(start).day < 31) {
					perW.push(item)
				} else if (getY(start) === getY() && util.getTheWeek().day - util.getTheWeek(start).day > 30 && util.getTheWeek().day - util.getTheWeek(start).day < 90) {
					perM.push(item)
				} else {
					threeM.push(item)
				}
			}
	
			data.forEach((element, index, arr) => {
				isSame(element[key], element);
			});
	
			var result = [];
	
			if (curW.length) {
				result.push({
					title: '',
					list: curW
				})
			}
			if (perW.length) {
				result.push({
					title: '一周前',
					list: perW
				})
			}
			if (perM.length) {
				result.push({
					title: '一个月前',
					list: perM
				})
			}
			if (threeM.length) {
				result.push({
					title: '三个月前',
					list: threeM
				})
			}
			return result;
		},
		getTheWeek(time) {
			var totalDays = 0,
				now = time ? new Date(time) : new Date(),
				years = now.getYear();
			if (years < 1000) {
				years += 1900
			}
			var days = [31, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
			//判断是否为闰年，针对2月的天数进行计算
			if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
				days[1] = 29
			} else {
				days[1] = 28
			}
	
			// 第几周
			if (now.getMonth() == 0) {
				totalDays = totalDays + now.getDate();
			} else {
				var curMonth = now.getMonth();
				for (var count = 1; count <= curMonth; count++) {
					totalDays = totalDays + days[count - 1];
				}
				totalDays = totalDays + now.getDate();
			}
			var week = Math.ceil(totalDays / 7);
	
			// 第几天
			var day = 0;
			for (var i = 0; i < now.getMonth(); i++) {
				day += days[i];
			}
			day += now.getDate();
	
			return {
				day: day,
				// week:week
			};
		},
		transDateFromServer(serverDate, pattern) {
			if (!serverDate) return '';
			if (typeof serverDate == "string" && /[TZ]/.test(serverDate) == false) {
				serverDate = serverDate.replace(/-/g, '/');
			}
			return util.F(serverDate, pattern || "yyyy-MM-dd hh:mm");
		},
		transDateFromServer2(serverDate, pattern) {
			if (!serverDate) return "";
			return util.F(serverDate, pattern || "yyyy-MM-dd hh:mm:ss");
		},
		transDateFromServer3(serverDate, pattern) {
			if (!serverDate) return '';
			if (typeof localeDate == "string" && /[TZ]/.test(localeDate) == false) {
				serverDate = serverDate.replace(/-/, '/');
			}
			return util.F(serverDate, pattern || "yyyy年MM月");
		},
		transDateFromServer4(serverDate, pattern) {
			if (!serverDate) return "";
			return util.F(serverDate, pattern || "yyyy年MM月dd日");
		},
		transDateFromServer5(serverDate, pattern) {
			if (!serverDate) return "";
			return util.F(new Date(serverDate) - 28800000, pattern || "yyyy-MM-dd hh:mm");
		},
		transDateFromServerYMD(serverDate, pattern) {
			if (!serverDate) return '';
			if (typeof localeDate == "string" && /[TZ]/.test(localeDate) == false) {
				serverDate = serverDate.replace(/-/, '/');
			}
			return util.F(serverDate, pattern || "yyyy-MM-dd");
		},
		transDateFromLocale(localeDate) {
			if (!localeDate) return '';
			if (typeof localeDate == "string") {
				if (/[TZ]/.test(localeDate) == false) localeDate = localeDate.replace(/-/g, '/');
				localeDate = new Date(localeDate);
			}
			// toISOString() 方法可以使用ISO标准将 Date 对象转换为字符串。
			// 该标准称为 ISO-8601 ，格式为: YYYY-MM-DDTHH:mm:ss.sssZ
			return localeDate.toISOString();
		},
}
