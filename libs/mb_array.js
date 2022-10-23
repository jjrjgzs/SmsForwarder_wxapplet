function 取成员数(arr){
    if(arr!=null){
        return arr.length;
    }else{
        return 0;
    }
}

function 合并数组(arr1,arr2){ 
    if(arr1==null){
        return arr2;
    }
    if(arr2==null){
        return arr1;
    }
    return arr1.concat(arr2);            
}

function 连接成员(arr,separator){ 
    if(arr==null || separator==null){
        return "";
    }
    return arr.join(separator); 
}

function 加入首成员(arr,element){ 
    if(arr==null){
        return 0;
    }
    arr.unshift(element);
    return arr.length;            
} 

function 加入尾成员(arr,element){ 
    if(arr==null){
        return 0;
    }
    arr.push(element);
    return arr.length;            
} 

function 删除首成员(arr){ 
    if(arr==null){
        return 0;
    }
    arr.shift();
    return arr.length;            
} 

function 删除尾成员(arr){ 
    if(arr==null){
        return 0;
    }
    arr.pop();
    return arr.length;            
} 

function 删除成员(arr,index){  
    if(arr==null){
        return 0;
    }
    arr.splice(index,1);
    return arr.length;            
} 

function 清空数组(arr){ 
    if(arr==null){
        return 0;
    }
    arr.splice(0,arr.length);
    return arr.length;            
}

function 翻转顺序(arr){ 
    if(arr!=null){
        arr.reverse(); 
    }
} 

function 排列顺序(arr,type){ 
    if(arr!=null){
        if(type==1){
            arr.sort();
        }else{
            arr.sort(sortNumber);
        } 
    }
} 

function sortNumber(a, b)
{
    return a - b
}
 
module.exports = {取成员数:取成员数,
合并数组:合并数组,
连接成员:连接成员,
加入首成员:加入首成员,
加入尾成员:加入尾成员,
删除首成员:删除首成员,
删除尾成员:删除尾成员,
删除成员:删除成员,
清空数组:清空数组,
翻转顺序:翻转顺序,
排列顺序:排列顺序
};