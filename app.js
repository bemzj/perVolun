// app.js
const {
    api,
    config
} = require('./utils/config.js');
App({
    // 小程序执行时触发函数
    onLaunch: function(options) {
        var _this = this;
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || [];
            logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                this.globalData.code = res.code;
                //获取本地缓存id值
                wx.getStorage({
                    key: 'user',
                    success: function(res) {
                        _this.globalData.id = res.data.id;
                        _this.globalData.user_type = res.data.user_type;
                    },
                    fail: function(res) {
                        _this.getUserId();
                    }
                })
            }
        })
    },
    globalData: {
        userInfo: null
    },
    getUserId: function() {
        var _this = this;
        wx.request({
            url: config.route + api.SmallLogin,
            data: {
                code: _this.globalData.code,
                token: config.token
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                //把后台传过来的id存入缓存
                wx.setStorage({
                    key: "user",
                    data: res.data
                })
                _this.globalData.id = res.data.id;
                _this.globalData.user_type = res.data.user_type;
            }
        })
    },
})