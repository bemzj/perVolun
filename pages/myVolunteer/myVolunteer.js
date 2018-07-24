// pages/myVolunteer/myVolunteer.js
var app = getApp();
const {
    api,
    config
} = require('../../utils/config.js')
const network = require("../../utils/network.js")
const popup = require('../../utils/popup.js')
const jump = require('../../utils/jump.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        detailData: {},
        popUp: false,
        currentIndex: -1,
        popText1: '',
        tipStatus1: false, //弹窗1
        tipStatus2: false, //弹窗2
        // host: config.route,
        host: '',
    },
    click01: function(e) {
        var _this = this;
        _this.setData({
            detailData: _this.data.dataList[e.currentTarget.dataset.index],
            popUp: !_this.data.popUp,
            currentIndex: e.currentTarget.dataset.index
        })
    },
    //去预约
    click02: function(e) {
        if (e.currentTarget.dataset.index == true) {
            wx.navigateTo({
                url: '../serverBook/serverBook',
            })
        }
    },
    //确定按钮
    btn01(e) {
        var obj = this.data.dataList;
        obj[this.data.currentIndex].has = !obj[this.data.currentIndex].has;
        this.setData({
            tipStatus1: !this.data.tipStatus1,
            dataList: obj,
            popText1: '您的预约申请已提交，请耐心等待！'
        })
    },
    //关闭页面
    closePop: function() {
        this.setData({
            popUp: !this.data.popUp
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        var data = {
            o_id: app.globalData.id,
            type: 'my',
        };
        var url = config.route + api.GetVInfo;
        network.GET(url, {
            params: data,
            success: function(res) {
                if (res.data.length <= 0) {
                    popup.showToast('您暂未绑定义工喔！');
                    setTimeout(function() {
                        jump.navigateBack();
                    }, 2000);
                } else {
                    _this.setData({
                        dataList: res.data,
                    });
                }
            },
            fail: function() {
                //失败后的逻辑  
            },
        })
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
    onShareAppMessage: function() {},
    // 弹窗1取消
    closeTip: function() {
        this.setData({
            tipStatus1: !this.data.tipStatus1,
            popUp: !this.data.popUp
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
})