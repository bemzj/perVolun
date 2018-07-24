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
        dataList: [], // 评价列表
        index1: null,
        currentVolunteer: {}, // 当前义工评价信息
        starLevel: 0, //星星等级
        commentLevel: ["您还没评价", "非常不满意", "不满意", "一般满意", "满意", "非常满意"],
        commentShow: false,
        tipStatus1: false, //弹窗1
        tipStatus2: false, //弹窗2
        poptext1: "",
        commentIndex: -1,
        commentTxt: '',
        hideText: true, //显示
        user_type: '',
        // host: config.route,
        host: '',
        isUpdate: false,
        load: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this,
            navTitle = "",
            url = config.route + api.OrderStatus;
        _this.setData({
            user_type: app.globalData.user_type
        });
        if (app.globalData.user_type == 'V') {
            navTitle = "历史评价";
        } else {
            navTitle = "我的评价";
        }
        wx.setNavigationBarTitle({
            title: navTitle //页面标题为路由参数
        })
        var data = {
            o_id: app.globalData.id,
            user_type: app.globalData.user_type,
            type: 'OrderEvaluate',
        };
        network.GET(url, {
            params: data,
            success: function(res) {
              console.log(res.data);
                if (res.data.length <= 0) {
                    popup.showToast('您暂无完成的订单喔！');
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
        _this.setData({
            load: true,
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
    onShareAppMessage: function() {},
    //选择星星等级
    selectLevel: function(e) {
        this.setData({
            starLevel: e.currentTarget.dataset.index
        });
    },
    //显示评论
    showComment: function(e) {
        var datas = this.data.dataList[e.currentTarget.dataset.index];
        this.setData({
            commentShow: !this.data.commentShow,
            currentVolunteer: datas,
            starLevel: 0,
            commentIndex: e.currentTarget.dataset.index
        });
    },
    //提交评论
    comfrimComment: function(e) {
        var _this = this;
        var url = config.route + api.OrderStatus;
        var data = e.detail.value;
        data.evaluate = _this.data.starLevel;
        data.id = _this.data.currentVolunteer.id;
        data.type = 'addEvaluate';

        
        network.GET(url, {
            params: data,
            success: function(res) {
                if (res.data.status == 1) {                 
                    var list = _this.data.dataList;
                    list[_this.data.commentIndex].evaluate.info = _this.data.starLevel+'星';
                    list[_this.data.commentIndex].evaluate.status = _this.data.starLevel;
                    list[_this.data.commentIndex].comment = e.detail.value.comment;
                    _this.setData({
                        tipStatus1: !_this.data.tipStatus1,
                        poptext1: "感谢您的评论！",
                        hideText: false,
                        isUpdate: true,
                        commentTxt: e.detail.value.comment,
                        dataList:list
                    });
                } else {
                    _this.setData({
                        tipStatus1: !_this.data.tipStatus1,
                        poptext1: res.data.msg,
                    });
                }
            },
            fail: function() {},
        })
    },
    //关闭页面
    closeComment: function() {
        this.setData({
            commentShow: !this.data.commentShow,
            hideText: true
        });
    },
    // 弹窗1取消
    closeTip: function() {
        var _this = this;
        if (_this.data.isUpdate == true) {
            //如果提交成功
            var obj = _this.data.dataList;
            obj[_this.data.commentIndex].comment = _this.data.commentTxt;
            obj[_this.data.commentIndex].evaluate.status = _this.data.starLevel;
            _this.setData({
                tipStatus1: !_this.data.tipStatus1,
                commentShow: !_this.data.commentShow,
                dataList: obj,
                hideText: true
            });
        } else {
            _this.setData({
                tipStatus1: !_this.data.tipStatus1,
            });
        }
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