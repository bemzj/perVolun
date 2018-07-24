// pages/myCard/myCard.js
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
        detailData: {},
        // host: config.route,
        host: '',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      var _this = this;
      var url = config.route + api.GetVolunteer;
      var data = {
        o_id: app.globalData.id,
        type: 'VmyInfo',
      };
      network.GET(url, {
        params: data,
        success: function (res) {
          _this.setData({
            detailData: res.data,
          });
          //拿到解密后的数据，进行代码逻辑
        },
        fail: function () {
          //失败后的逻辑  
        },
      })
    },
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