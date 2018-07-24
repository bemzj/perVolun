// pages/proposal/proposal.js
var app = getApp();
const network = require("../../utils/network.js")
const {
    api,
    config
} = require('../../utils/config.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        writing: true,
        user_type: 'V',
        popText1: '',
        tipStatus1: false, //弹窗1
        tipStatus2: false, //弹窗2
        textareaTxt: '',
        disabled: true,
        content: ''
    },
    write: function(e) {
        this.setData({
            writing: true
        })
    },
    showIt: function(e) {
        if (e.detail.value == '') {
            this.setData({
                writing: true
            })
        }
    },
    hideImage: function(e) {
        this.setData({
            writing: false
        })
    },
    submitSuggust: function(e) {
        var _this = this;
        var url = config.route + api.Idea;
        var data = e.detail.value;
            data.o_id = app.globalData.id;
            data.user_type = app.globalData.user_type;
        network.POST(url, {
            params: data,
            success: function(res) {
                if (res.data.status == 1) {
                    _this.setData({
                        tipStatus1: !_this.data.tipStatus1,
                        popText1: '提交成功，感谢您的建议！',
                        textareaTxt: '',
                        writing: true,
                        disabled: false
                    });
                } else {
                    _this.setData({
                        tipStatus1: !_this.data.tipStatus1,
                        popText1: res.data.msg,
                        writing: true,
                        disabled: false
                    });
                }
            },
            fail: function() {
                //失败后的逻辑  
            },
        })
    },
    // 弹窗1取消
    closeTip: function() {
        this.setData({
            tipStatus1: !this.data.tipStatus1,
            disabled: true,
            textareaTxt: ''
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            user_type: app.globalData.user_type,
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})