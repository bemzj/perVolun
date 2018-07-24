// pages/newTaskDetail/newTaskDetail.js
var app = getApp();
const network = require("../../utils/network.js")
const {
    api,
    config
} = require('../../utils/config.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        myCode: '',
        share: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        if (options.id) {
            // 获取用户免费名额
            var url = config.route + api.InfoU,
                data = {
                    id: options.id
                };
            network.GET(url, {
                params: data,
                success: function(res) {
                    _this.setData({
                        myCode: res.data.info.code.code,
                        share: true,
                    });
                },
                fail: function() {
                    //失败后的逻辑  
                },
            })
        } else {
            _this.setData({
                myCode: app.globalData.code
            });
        }
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
    onShareAppMessage: function(res) {
        return {
            title: app.globalData.userInfo.nickName + '请你免费洗空调',
            path: '/pages/mycode/mycode?id=' + app.globalData.id,
        }
    },
    getCode: function() {
        var self = this;
        if (self.data.myCode.length!=6)
        {
          wx.showToast({
            title: '内容复制失败',
            icon: 'none'
          })
        }else{
          wx.setClipboardData({
            data: self.data.myCode,
            success: function (res) {
              wx.getClipboardData({
                success: function (res) { }
              })
            }
          })
        }
        
    },
    goHome: function() {
        wx.navigateTo({
            url: '../index/index',
        })
    }
})