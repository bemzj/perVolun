// pages/newTaskDetail/newTaskDetail.js
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
        status: 1,
        user_type: '', //登录类型
        bookStatus: null, //预约类型
        bookTitle: ["预约中", "预约成功", "", "预约失败"],
        noNewDetails: '很抱歉！暂无最新预约详情！',
        popText1: '',
        tipStatus1: false, //弹窗1
        tipStatus2: false, //弹窗2
        tipsText: ''
    },
    serveComplete: function() {
        this.setData({
            popText1: "是否能确定服务已经完成！\n注意：确定后将无法修改，谢谢！",
            tipStatus2: !this.data.tipStatus2
        });
    },
    //拒绝
    refuse: function() {
        var _this = this;
        _this.setData({
            popText1: "您是否拒绝该任务的申请！",
            tipStatus2: !_this.data.tipStatus2
        });
    },
    accept: function() {
        var _this = this,
            url = config.route + api.GetVolunteer,
            data = {
                orderId: _this.data.detailData.id,
                type: 'TaskStatus',
                orderType: 'accept',
            };
        network.GET(url, {
            params: data,
            success: function(res) {
                popup.showToast('接受任务成功，谢谢！', 'success', 1000);
                setTimeout(function() {
                    jump.redirectTo('/pages/beforeComplete/beforeComplete');
                }, 1000);
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
        });
        if (this.data.user_type == 'V') {
            wx.navigateBack(1);
        } else {}
    },
    // 弹窗2取消
    cancel: function() {
        this.setData({
            tipStatus2: !this.data.tipStatus2
        });
    },
    // 弹窗2确定
    comfirmPop: function() {
        var _this = this,
            url = config.route + api.GetVolunteer,
            data = {
                orderId: _this.data.detailData.id,
                type: 'TaskStatus',
            };
        if (app.globalData.user_type == 'V') {
            // 拒单
            data.orderType = 'refuse';
        } else if (app.globalData.user_type == 'U') {
            // 用户确认完成
            data.orderType = 'confirm';
        }
        network.GET(url, {
            params: data,
            success: function(res) {
                if (app.globalData.user_type == 'V') {
                    popup.showToast('您拒绝了任务', 'success', 1000);
                    setTimeout(function() {
                        jump.redirectTo('/pages/newTask/newTask');
                    }, 1000);
                } else if (app.globalData.user_type == 'U') {
                    popup.showToast('服务完成', 'success', 1000);
                    setTimeout(function() {
                        jump.redirectTo('/pages/hisComment/hisComment');
                    }, 1000);
                }
            },
            fail: function() {
                //失败后的逻辑
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        var url, data;
        if (options.user_type == 'V') {
            var num = -1;
            url = config.route + api.GetVolunteer;
            data = {
                o_id: app.globalData.id,
                orderId: options.orderId, // 订单id
                type: 'Task',
                status: 0,
                query_type: 'details',
            };
            network.GET(url, {
                params: data,
                success: function(res) {
                    _this.setData({
                        detailData: res.data,
                    });
                    //拿到解密后的数据，进行代码逻辑
                },
                fail: function() {
                    //失败后的逻辑  
                },
            })
        } else {
            var num = parseInt(options.bookStatus);
            var status;
            switch (num) {
                case 0:
                    status = 0; // 预约中
                    break;
                case 1:
                    status = 1; // 成功
                    _this.setData({
                        tipsText: '您已预约成功，请保持手机畅通，方便义工与你联系，祝生活愉快'
                    })
                    break;
                case 2:
                    status = 3; // 失败
                    num = 3;
                    _this.setData({
                        tipsText: '因为您的地址不在服务范围内/个人信息有误等原因,您的预约失败'
                    })
                    break;
            }
            url = config.route + api.OrderStatus;
            data = {
                o_id: app.globalData.id,
                status: status,
                type: 'OrderU',
            };
            network.GET(url, {
                params: data,
                success: function(res) {
                    _this.setData({
                        detailData: res.data,
                    });
                },
                fail: function() {
                    //失败后的逻辑  
                },
            })
        }
        var navTitle = "";
        _this.setData({
            user_type: options.user_type,
            bookStatus: num
        })
        if (_this.data.user_type == 'V') {
            navTitle = "新任务详情";
        } else {
            navTitle = _this.data.bookTitle[_this.data.bookStatus];
        }
        wx.setNavigationBarTitle({
            title: navTitle //页面标题为路由参数
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