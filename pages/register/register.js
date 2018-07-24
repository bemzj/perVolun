// pages/serverBook/serverBook.js
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
        swiperHeight: '200rpx', //最上面轮播图
        swiper: {
            indicatorDots: 'true',
            autoplay: 'true',
            productImg: '',
            interval: 5000,
            duration: 300,
            circular: 'true',
            bottomBanners: ['../../images/book_banner1_no.png', '../../images/book_banner2_no.png', '../../images/book_banner1_no.png']
        }, //首页轮播数据
    },
    //显示预约弹窗
    showAddress: function() {
        wx.navigateTo({
            url: '../../pages/serverBook/serverBook'
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        var data = {};
        var url = config.route + api.getActionPic;
        //发起请求  
        network.GET(url, {
            params: data,
            success: function(res) {
                console.log(res);
                _this.setData({
                    hostImg: config.imgRout,
                    productImg: res.data.product,
                });
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