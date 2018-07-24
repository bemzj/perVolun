// pages/completed/completed.js
var app = getApp();
const {
    api,
    config
} = require('../../utils/config.js');
const network = require("../../utils/network.js");
const popup = require('../../utils/popup.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        index1: null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        var url = config.route + api.GetVolunteer;
        var data = {
            o_id: app.globalData.id,
            type: 'serviceUser',
        };
        network.GET(url, {
            params: data,
            success: function(res) {
              if (res.data.length==0)
              {
                  popup.showToast('暂无数据哦！');
                  setTimeout(function () {
                    wx.navigateBack();
                  }, 2000);
              }else{
                var mydata = res.data;
                for (var i = 0; i < mydata.length;i++)
                {
                  if (mydata[i].name.length>4)
                  {
                    mydata[i].name = mydata[i].name.substring(0, 4);
                  }
                }
                _this.setData({
                  dataList: mydata,
                });
                //拿到解密后的数据，进行代码逻辑
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
    onShareAppMessage: function() {}
})