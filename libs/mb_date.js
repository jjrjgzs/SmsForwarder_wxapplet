function 取当前日期时间() { 
    return new Date();
}

function 取现行日期() { 
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + "/" + month + "/" + strDate;
    return currentdate;
}

function 取现行时间() { 
    var date = new Date();
    var getHours = date.getHours();
    var getMinutes = date.getMinutes();
    var getSeconds = date.getSeconds();
    if (getHours >= 0 && getHours <= 9) {
        getHours = "0" + getHours;
    }
    if (getMinutes >= 0 && getMinutes <= 9) {
        getMinutes = "0" + getMinutes;
    }
    if (getSeconds >= 0 && getSeconds <= 9) {
        getSeconds = "0" + getSeconds;
    }
    var currenttime = getHours + ":" + getMinutes + ":" + getSeconds;
    return currenttime;
}

function 到日期时间(年,月,日,时,分,秒) {
    return new Date(年,月-1,日,时,分,秒);
} 

function 到日期时间2(value) {
    return new Date(value);
} 

function 时间到文本(date){ 
    var month = date.getMonth()+1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + "/" + month + "/" + strDate; 
    
    var getHours = date.getHours();
    var getMinutes = date.getMinutes();
    var getSeconds = date.getSeconds();
    if (getHours >= 0 && getHours <= 9) {
        getHours = "0" + getHours;
    }
    if (getMinutes >= 0 && getMinutes <= 9) {
        getMinutes = "0" + getMinutes;
    }
    if (getSeconds >= 0 && getSeconds <= 9) {
        getSeconds = "0" + getSeconds;
    }
    var currenttime = getHours + ":" + getMinutes + ":" + getSeconds;     
    
    return currentdate + " " + currenttime;                  
}

function 取时间间隔(a,b){ 
    return a.getTime()-b.getTime();
}

function 取年(time){ 
    return time.getFullYear();
}

function 取月(time){ 
    return time.getMonth()+1;
}

function 取日(time){ 
    return time.getDate();
}

function 取时(time){ 
    return time.getHours();
}

function 取分(time){ 
    return time.getMinutes();
}

function 取秒(time){ 
    return time.getSeconds();
}

function 取星期几(time){ 
    return time.getDay();
}

function 取时间戳(time){ 
    return Date.parse(time);
}

function 时间戳到时间(value){ 
    return new Date(value);
}

function 格式化时长(value,type){ 
    //  秒
    let second = parseInt(value);
    //  分
    let minute = 0;
    //  小时
    let hour = 0;
    //  天
    let day = 0;
    //  如果秒数大于60，将秒数转换成整数
    if (second > 60) {
        //  获取分钟，除以60取整数，得到整数分钟
        minute = parseInt(second / 60);
        //  获取秒数，秒数取余，得到整数秒数
        second = parseInt(second % 60);
        //  如果分钟大于60，将分钟转换成小时
        if (minute > 60) {
            //  获取小时，获取分钟除以60，得到整数小时
            hour = parseInt(minute / 60);
            //  获取小时后取余的分，获取分钟除以60取佘的分
            minute = parseInt(minute % 60);
            //  如果小时大于24，将小时转换成天
            if (hour > 23) {
                //  获取天数，获取小时除以24，得到整天数
                day = parseInt(hour / 24);
                //  获取天数后取余的小时，获取小时除以24取余的小时
                hour = parseInt(hour % 24);
            }
        }
    }
    let result = '' + parseInt(second);
    if(type==1){
        result = result + '秒';
    }
    if (minute > 0) {
        if(type==1){
           result = '' + parseInt(minute) + '分' + result;
        }else{
            result = '' + parseInt(minute) + ':' + result;
        }
    }
    if (hour > 0) {
        if(type==1){
           result = '' + parseInt(hour) + '小时' + result;
        }else{
            result = '' + parseInt(hour) + ':' + result;
        }
    }
    if (day > 0) {
        if(type==1){
           result = '' + parseInt(day) + '天' + result;
        }else{
           result = '' + parseInt(day) + ':' + result;
        }        
    }
    return result
}

module.exports = {取当前日期时间:取当前日期时间,
取现行日期:取现行日期,
取现行时间:取现行时间,
到日期时间:到日期时间,
到日期时间2:到日期时间2,
时间到文本:时间到文本,
取时间间隔:取时间间隔,
取年:取年,
取月:取月,
取日:取日,
取时:取时,
取分:取分,
取秒:取秒,
取星期几:取星期几,
取时间戳:取时间戳,
时间戳到时间:时间戳到时间,
格式化时长:格式化时长
};

 