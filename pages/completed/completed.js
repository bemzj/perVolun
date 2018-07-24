// pages/completed/completed.js
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
        index1: null,
        popText1: ''
    },
    warn: function(e) {
        var _this = this,
            obj = _this.data.dataList,
            index = e.currentTarget.dataset.index,
            url = config.route + api.GetVolunteer,
            data = {
                orderId: obj[index].id,
                type: 'TaskStatus',
                orderType: 'Urge',
            };
        network.GET(url, {
            params: data,
            success: function(res) {
                obj[index].urge = false;
                _this.setData({
                    dataList: obj,
                    tipStatus1: !_this.data.tipStatus1,
                    popText1: '提醒成功'
                })
                //拿到解密后的数据，进行代码逻辑
            },
            fail: function() {
                //失败后的逻辑
            },
        })
    },
    // 弹窗1取消
    closeTip: function() {
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        var url = config.route + api.GetVolunteer;
        var data = {
            o_id: app.globalData.id,
            type: 'Task',
            query_type: 'Urge',
            status: 2,
        };
        network.GET(url, {
            params: data,
            success: function(res) {
                if (res.data.length <= 0) {
                    popup.showToast('您暂无已完成的任务单喔！');
                    setTimeout(function() {
                        jump.navigateBack();
                    }, 2000);
                } else {
                    _this.setData({
                        dataList: res.data,
                    });
                }
                //拿到解密后的数据，进行代码逻辑
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
    onShareAppMessage: function() {}
})