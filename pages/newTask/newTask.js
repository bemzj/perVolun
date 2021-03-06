// pages/newTask/newTask.js
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
        status: 0,
        newTask: [],
    },
    navTo(e) {
        let url = e.currentTarget.dataset.to
        wx.redirectTo({
            url: url
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function(options) {
        var _this = this;
        var url = config.route + api.GetVolunteer;
        var data = {
            o_id: app.globalData.id,
            type: 'Task',
            query_type: 'column',
            status: 0,
        };
        network.GET(url, {
            params: data,
            success: function(res) {
                if (res.data.length <= 0) {
                    popup.showToast('您暂无新任务单喔！');
                    setTimeout(function() {
                        jump.navigateBack();
                    }, 2000);
                } else {
                    _this.setData({
                        newTask: res.data,
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
    onLoad: function() {},
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