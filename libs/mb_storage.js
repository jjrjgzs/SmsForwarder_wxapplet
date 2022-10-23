function 保存设置(key,value) { 
    wx.setStorageSync(key, value);
}

function 读取设置(key) { 
    return wx.getStorageSync(key);
}

function 删除设置(key) { 
    wx.removeStorageSync(key);
}

function 清空设置() { 
    wx.clearStorageSync();
}

module.exports = {保存设置:保存设置,      
读取设置:读取设置,
删除设置:删除设置,
清空设置:清空设置
};
 