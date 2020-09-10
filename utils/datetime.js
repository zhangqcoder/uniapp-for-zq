const DT = {
	F(d, pattern) {
		if(!d) return "";
		if(typeof d != "object") d = new Date(d);
	    pattern = pattern || 'yyyy-MM-dd';
	    var y = d.getFullYear().toString(),
	        o = {
	            M: d.getMonth() + 1, 
	            d: d.getDate(), 
	            h: d.getHours(), 
	            m: d.getMinutes(), 
	            s: d.getSeconds() 
	        };
	    pattern = pattern.replace(/(y+)/ig, function(a, b) {
	        return y.substr(4 - Math.min(4, b.length));
	    });
	    for (var i in o) {
	        pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function(a, b) {
	            return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
	        });
	    }
	    return pattern;
	},
	str2Date(d) {
		if(!d) return ;
		if(typeof d != 'object') return new Date(d);
		return d;
	},
	firstDayByWeek(d) {
		var _now = DT.str2Date(d) || new Date;
		var _day = _now.getDay();
		var offsetDay = ((_day == 0 ? 7 : _day) - 1);
		return DT.midnight(new Date(_now.getTime()-offsetDay*24*60*60*1000));
	},
	firstDayByMonth(d) {
		var _now = DT.str2Date(d) || new Date;
		return DT.midnight(new Date(_now.getFullYear(), _now.getMonth(), 1));
	},
	firstDayByYear(d) {
		var _now = DT.str2Date(d) || new Date;
		return DT.midnight(new Date(_now.getFullYear(), 0, 1));
	},
	countDateByStep(base, flag, step, realTime) {
		base = DT.formatePolyfill(base);
		var newMills, 
			baseDate = DT.str2Date(base) || new Date(base),
			baseMills = baseDate.getTime(),
			_nowMills = new Date().getTime();
		switch (step) {
			case 'day' :
				newMills = baseMills + 24*60*60*1000*flag;
			break;
			case 'week' :
				newMills = baseMills + 7*24*60*60*1000*flag;
			break;
			case 'month' :
				newMills = new Date(baseDate.getFullYear(), baseDate.getMonth()+flag, baseDate.getDate()).getTime();
				if(realTime)
					newMills = new Date(baseDate.getFullYear(), baseDate.getMonth()+flag, baseDate.getDate(), baseDate.getHours(), baseDate.getMinutes(), baseDate.getSeconds()).getTime();
			break;
			case 'year' :
				newMills = new Date(baseDate.getFullYear()+flag, baseDate.getMonth(), baseDate.getDate()).getTime();
				if(realTime)
					newMills = new Date(baseDate.getFullYear()+flag, baseDate.getMonth(), baseDate.getDate(), baseDate.getHours(), baseDate.getMinutes(), baseDate.getSeconds()).getTime();
			break;
		}

		if(newMills > _nowMills) newMills = _nowMills;
		return (realTime ? newMills : DT.midnight(newMills));
	},
	midnight(d) {
		return DT.F(d)+' 00:00:00';
	},
	midnightMill(d) {
		var _midn = DT.str2Date(d) || new Date;
		return new Date(DT.midnight(_midn)).getTime();
	},
	chain(date,step) {
		return DT.countDateByStep(date, -1, step)
	},
	yearOFyear(date) {
		return DT.countDateByStep(date, -1, 'year')
	},
	getPeriods (params) {
		var start = params.beginDate,
			baseDate = new Date(DT.formatePolyfill(start)),
			baseMills = baseDate.getTime(),
			end,
			step = params.cycle;

		switch (step) {
			case 'day' :
				end = baseMills + 24*60*60*1000;
			break;
			case 'week' :
				end = baseMills + 7*24*60*60*1000;
			break;
			case 'month' :
				end = new Date(baseDate.getFullYear(), baseDate.getMonth()+1, baseDate.getDate(), 0, 0, 0).getTime();
			break;
			case 'year' :
				end = new Date(baseDate.getFullYear()+1, baseDate.getMonth(), baseDate.getDate(), 0, 0, 0).getTime();
			break;
		}

		return {
			min: baseMills ,
			max: new Date(end).getTime()
		}
    },
    formatePolyfill(dateStr) {
    	if(typeof dateStr !== 'string') return dateStr;
    	return dateStr.replace(/-/g,'/');
    },
    getTerminalsByMonth(year, month) {
    	var start, end;
    	if(month == 0) {
    		start = new Date(year, 0, 1, 0,0,0);
    		end = new Date(year, 11, 31, 23, 59, 59);
    	} else {
    		start = new Date(year, month-1, 1, 0,0,0);
    		end = new Date(year, month, 0, 23, 59, 59);
    	}

    	return {
    		start: start,
    		end: end
    	}
	},
	monthDayFormat(val,type){
		var year,month,day;
		var times = [];
		var date = new Date();
		if(type =='m-d'){
			times = val.split("-");
			month = Number(times[0]) - 1;
			day = Number(times[1]);

			date.setDate(day);
			date.setMonth(month);
		}else if (type =='y-m'){
			times = val.split("-");
			year = Number(times[0]);
			month = Number(times[1]) - 1 ;

			date.setFullYear(year);
			date.setMonth(month);
			date.setDate(1);
		}
		return date;
		//return new Date(date.toJSON().substr(0,10));
		

	}
}

export default DT;