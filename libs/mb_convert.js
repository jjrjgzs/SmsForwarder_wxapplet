function 到文本(value){
    return "" + value;
}

function 到数值(str) { 
    return Number(str);
}

function 到十六进制(value) { 
    return value.toString(16);
}      

function 到十进制(str) { 
    return parseInt(str,16);
}

function 代码转字符(){
    var result = "";
    for(var i=0;i<arguments.length;i++){
        result = result + String.fromCharCode(arguments[i]);
    }
    return result;
}

function 字符转代码(str){
    return str.charCodeAt(0);
}

function 文本转json(str){
    str = str.replace(/\ufeff/g,"");
    str = str.replace(/\'/g, '"');
	return JSON.parse(str)
}

function json转文本(json){
    return JSON.stringify(json);
}

function 取数据类型(value){
    var a = typeof(value);
    switch(a){
    case "number":
      return 1;
      break;
    case "string":
      return 2;
      break;
    case "boolean":
      return 3;
      break;
    case "object":
      return 4;
      break;              
    case "function":
      return 5;
      break;              
    case "undefined":
      return 6;
      break; 
    default:
        return 6;
    }
}

function 是否为非数字(value){
    return isNaN(value);
}

function 转换为金额(n){
    var fraction = ["角", "分"];  
    var digit = [ "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖" ];  
    var unit = [   ["元", "万", "亿"],  ["", "拾", "佰", "仟"]  ];  
    var head = n < 0 ? "欠" : "";  
    n = Math.abs(n);  
    var s = "";  
    for (var i = 0; i < fraction.length; i++) {  
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, "");  
    }  
    s = s || "整";  
    n = Math.floor(n);  
    for (var i = 0; i < unit[0].length && n > 0; i++) {  
        var p = "";  
        for (var j = 0; j < unit[1].length && n > 0; j++) {  
            p = digit[n % 10] + unit[1][j] + p;  
            n = Math.floor(n / 10);  
        }  
        s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;  
    }  
    return head + s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整");  
}

module.exports = {到文本:到文本,
到数值:到数值,
到十六进制:到十六进制,
到十进制:到十进制,
代码转字符:代码转字符,
字符转代码:字符转代码,
文本转json:文本转json,
json转文本:json转文本,
取数据类型:取数据类型,
是否为非数字:是否为非数字,
转换为金额:转换为金额};

 