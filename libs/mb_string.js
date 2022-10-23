function 取文本长度(str){
    if(str!=null){
        return str.length;
    }else{
        return 0;
    }
}

function 取文本行数(str) { 
    var lines = 0; 
    try { 
        lines = ((str.match(/[^\n]*\n[^\n]*/gi).length)); 
    }catch(e){ 
        lines = 0; 
    }  
    lines++; 
    return lines; 
}

function 寻找文本(str,sub,index){
    if(str==null || sub==null){
        return -1;
    }
    return str.indexOf(sub, index);
}

function 倒找文本(str,sub,index){
    if(str==null || sub==null){
        return -1;
    }        
    return str.lastIndexOf(sub, index);
}

function 取文本中间(str,start,len){
    if(str==null || start==null){
        return "";
    }        
    return str.substr(start, len);
}

function 取文本左边(str,len){
    if(isNaN(len)||len==null)
    {
        len = str.length;
    }else{
        if(parseInt(len)<0||parseInt(len)>str.length)
        {
            len = str.length;
        }
    }
    return str.substr(0,len);
}

function 取文本右边(str,len){
    if(isNaN(len)||len==null)
    {
        len = str.length;
    }else{
        if(parseInt(len)<0||parseInt(len)>str.length)
        {
            len = str.length;
        }
    }
    return str.substring(str.length-len,str.length);
}

function 取指定文本(待取文本,左边文本,右边文本){
    var pattern = new RegExp(左边文本 + "(.*?)" + 右边文本,"g");
    var result = new Array(0);
    while (pattern.exec(待取文本) != null){
        //console.log(RegExp.$1);
        result.push(RegExp.$1);
    }
    return result;
}

function 子文本替换(str, a, b) {
    if(str==null || a==null || b==null){
        return "";
    }         
    var regExp = new RegExp(a, "g");
    return str.replace(regExp, b);
} 

function 分割文本(str, separator){
    if(str==null || separator==null){
        return null;
    }         
    return str.split(separator);
}

function 到大写(str){
    if(str==null){
        return "";
    }         
    return str.toUpperCase();
}

function 到小写(str){
    if(str==null){
        return "";
    }          
    return str.toLowerCase();
}

function 删首尾空(str){
    if(str==null){
        return "";
    }          
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}   

function 删全部空(str){
    if(str==null){
        return "";
    }          
    return str.replace(/\s+/g, ""); 
}       

module.exports = {取文本长度:取文本长度,
取文本行数:取文本行数,
寻找文本:寻找文本,
倒找文本:倒找文本,
取文本左边:取文本左边,
取文本中间:取文本中间,
取文本右边:取文本右边,
取指定文本:取指定文本,
子文本替换:子文本替换,
分割文本:分割文本,
到大写:到大写,
到小写:到小写,
删首尾空:删首尾空,
删全部空:删全部空};
 