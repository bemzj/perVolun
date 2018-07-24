// pages/serveHis/serveHis.js
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
        popUp: false,
        currentIndex: -1,
        popText1: '',
        tipStatus1: false, //弹窗1
        tipStatus2: false, //弹窗2
        detailData: {},
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
    //关闭页面
    closePop: function() {
        this.setData({
            popUp: !this.data.popUp
        })
    },
    //确定按钮
    btn01(e) {
        var _this = this;
        var data = {
            o_id: app.globalData.id,
            v_id: _this.data.detailData.v_id.id,
            type: 'bind',
        };
        var url = config.route + api.GetVInfo;
        network.GET(url, {
            params: data,
            success: function(res) {
                if (res.data.status == 0) {
                    popup.showToast(res.data.msg);
                } else if (res.data.status == 1) {
                    var obj = _this.data.dataList;
                    obj[_this.data.currentIndex].has = !obj[_this.data.currentIndex].has;
                    _this.setData({
                        tipStatus1: !_this.data.tipStatus1,
                        dataList: obj,
                        popText1: '绑定义工成功'
                    })
                }
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
            tipStatus1: !this.data.tipStatus1,
            popUp: !this.data.popUp
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        var url = config.route + api.GetVInfo;
        var data = {
            o_id: app.globalData.id,
            type: 'history',
        };
        network.GET(url, {
            params: data,
            success: function(res) {
                if (res.data.status == 0) {
                    popup.showToast(res.data.msg);
                    setTimeout(function() {
                        jump.navigateBack();
                    }, 2000);
                } else if (res.data.status == 1) {
                    _this.setData({
                        dataList: res.data.historyV,
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