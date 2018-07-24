//index.js
//获取应用实例
const app = getApp()
const {
    api,
    config
} = require('../../utils/config.js');
const popup = require('../../utils/popup.js');
Page({
    data: {
        count: 0,
        swiperHeight: '417rpx',
        swiper: {
            autoplay: 'true',
            interval: 5000,
            duration: 300,
            circular: 'true',
        },
        host: config.imgRout,
        bottomBanners: [],
        btns: [{
            url: '../../images/index_btn1.png',
            name: '义工登记',
            link: '../../pages/registerVolun/registerVolun'
        }, {
            url: '../../images/index_btn2.png',
            name: '服务预约',
            link: '../../pages/serverBook/serverBook'
        }, {
            url: '../../images/index_btn3.png',
            name: '个人中心',
            link: '../../pages/personInfo/personInfo'
        }, {
            url: '../../images/index_btn4.png',
            name: '活动说明',
            link: '../../pages/register/register'
        }],
        tipStatus1: false, //弹窗1
        tipStatus2: false, //弹窗2
        popText1: ''
    },
    swiperChange: function(e) {
        this.setData({
            count: e.detail.current
        });
    },
    register: function(e) {},
    onShow: function() {
        var that = this;
        if (app.globalData.userInfo == null) {
            //获取本地缓存id值
            wx.getStorage({
                key: 'userInfo',
                success: function(res) {
                    app.globalData.userInfo = res.data;
                },
                fail: function(res) {
                    that.setData({
                        tipStatus1: !that.data.tipStatus1,
                        popText1: '授权登录'
                    })
                }
            })
        }
    },
    core: function(e) {},
    // 弹窗1取消 授权登录
    closeTip: function(e) {
        app.globalData.userInfo = e.detail.userInfo;
        // 把用户信息存入缓存
        wx.setStorage({
            key: "userInfo",
            data: e.detail.userInfo
        })
        //把用户的昵称头像传到后台保存
        wx.request({
            url: config.route + api.SmallUserInfo,
            data: {
                nickname: app.globalData.userInfo.nickName,
                avatarurl: app.globalData.userInfo.avatarUrl,
                id: app.globalData.id,
                token: config.token,
            },
            success: function(res) {}
        })
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
        }
        this.setData({
            tipStatus1: !this.data.tipStatus1
        });
    },
    // 弹窗2取消
    cancel: function() {
        this.setData({
            tipStatus2: !this.data.tipStatus2
        });
    },
    // 弹窗2确定
    comfirmPop: function() {
        this.setData({
            tipStatus2: !this.data.tipStatus2
        });
    },
    //事件处理函数
    bindViewTap: function() {},
    onShareAppMessage: function(e) {},
    onLoad: function() {
        var _this = this;
        var data = {
            'type': 'index',
            'token': config.token
        };
        _this.requestFun(api.Pic, data);
    },
    requestFun: function(apis, datas) {
        var _this = this;
        wx.request({
            url: config.route + apis,
            data: datas,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                _this.setData({
                    bottomBanners: res.data
                });
            }
        })
    },
})