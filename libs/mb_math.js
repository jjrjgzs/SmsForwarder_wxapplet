function 到数值(str) { 
    return Number(str);
}

function 取随机数(min,max){
    return parseInt(Math.random()*(max-min+1)+min,10);
}

function 取绝对值(value){ 
    return Math.abs(value);
}

function 取余数(a,b){ 
    return a%b;
}  

function 取整数(value){
    return parseInt(value);
}

function 取次方(a,b){ 
    return Math.pow(a,b);
} 

function 四舍五入(value,num){
    //return value.toFixed(num);
    return Math.round(value * Math.pow(10, num)) / Math.pow(10, num);
}

module.exports = {到数值:到数值,      
取随机数:取随机数,
取绝对值:取绝对值,
取余数:取余数,
取整数:取整数,
取次方:取次方,
四舍五入:四舍五入
};
 