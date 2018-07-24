// pages/registerVolun/registerVolun.js
const {
    api,
    config
} = require('../../utils/config.js');
const network = require("../../utils/network.js");
const popup = require('../../utils/popup.js');
const jump = require('../../utils/jump.js');
var app = getApp();
const ctx = wx.createCanvasContext('mycanvas');
Page({
    /**
     * 生命周期函数--监听页面加载
     */
    register: function(e) {
        var self = this,
            url = config.route + api.RegisterV,
            data = e.detail.value;
        console.log(data);
        data.photo = self.data.photo;
        data.service_area = self.data.addressText;
        if (self.data.isUpdate) {
            data.id = self.data.myInfo.id;
        } else {
            data.o_id = app.globalData.id;
        }
        //发起请求  
        network.POST(url, {
            params: data,
            success: function(res) {
                if (res.data.status == 0) {
                    // 注册失败
                    self.setData({
                        tipStatus1: !self.data.tipStatus1,
                        popText1: res.data.msg
                    });
                } else {
                    // 注册成功
                    if (self.data.isUpdate) {
                        popup.showToast('修改成功', 'success', 1000);
                        setTimeout(function() {
                            jump.navigateBack();
                        }, 1000);
                    } else {
                        popup.showToast('注册成功', 'success', 1000);
                        app.globalData.user_type = 'V';
                        var Vinfo = {
                            id: app.globalData.id,
                            user_type: app.globalData.user_type,
                        };
                        wx.setStorageSync('user', Vinfo);
                        setTimeout(function() {
                            jump.redirectTo('/pages/personInfo/personInfo');
                        }, 1000);
                    }
                }
            },
            fail: function() {
                //失败后的逻辑  
            },
        })
    },
    bindRegionChange: function(e) {
        var index = e.target.dataset.index;
        var nowRegion = this.data.region;
        nowRegion[index].province = e.detail.value[0];
        nowRegion[index].city = e.detail.value[1];
        nowRegion[index].area = e.detail.value[2];
        var atext = '';
        var quchong = [];
        for (var i = 0; i < nowRegion.length; i++) {
          if (nowRegion[i].province != '*服务地区（可多选）') {
                if (i == 0) {
                    atext += (nowRegion[i].province + ' ');
                    atext += (nowRegion[i].city + ' ');
                    atext += (nowRegion[i].area + ',');
                    quchong.push(nowRegion[i])
                } else {
                    var k = 1;
                    for (var j = 0; j < quchong.length; j++) {
                        if ((quchong[j].province == nowRegion[i].province) && (quchong[j].city == nowRegion[i].city) && (quchong[j].area == nowRegion[i].area)) {
                            k = 0;
                            console.log(1);
                            break;
                        }
                    }
                    if (k == 1) {
                        atext += (nowRegion[i].province + ' ');
                        atext += (nowRegion[i].city + ' ');
                        atext += (nowRegion[i].area + ',');
                        quchong.push(nowRegion[i]);
                    }
                }
            }
        }
        atext = atext.substr(0, atext.length - 1);
        console.log(atext);
        this.setData({
            region: nowRegion,
            addressText: atext
        });
    },
    /**
     * 页面的初始数据
     */
    data: {
        tipStatus1: false, //弹窗1
        tipStatus2: false, //弹窗2
        popText1: '',
        region: [{
            'province': '*服务地区（可多选）',
            'city': "",
            'area': ""
        }],
        headsrc: '../../images/head.png',
        addressIndex: -1, //删除地址的标识
        addressText: '',
        scrollHeight: 0,
        scrollTop: 0,
        cHeight: 0,
        cWidth: 0,
        headSrc: "../../images/photo.jpg",
        headSrc1: "../../images/photo.jpg",
        cbStatus: false,
        isUpdate: false,
        photo: '',
        // host: config.route,
        host: '',
        myInfo: {},
        display: 'none',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;

        if (options.type == 'update') {
            var url = config.route + api.GetVolunteer,
                data = {
                    o_id: app.globalData.id,
                    type: 'VdateInfo',
                };
            network.GET(url, {
                params: data,
                success: function(res) {
                    var service_area = res.data.service_area.split(','),
                        address = [],
                        service_address = [],
                        province, city, area;
                    for (var i = 0; i < service_area.length; i++) {
                        address = service_area[i].split(' ');
                        for (var j = 0; j < address.length; j++) {
                            switch (j) {
                                case 0:
                                    province = address[j];
                                    break;
                                case 1:
                                    city = address[j];
                                    break;
                                case 2:
                                    area = address[j];
                                    break;
                            }
                        }
                        address = {
                            'province': province,
                            'city': city,
                            'area': area,
                        };
                        service_address[i] = address;
                    }
                    
                    _this.setData({
                        isUpdate: true,
                        myInfo: res.data,
                        
                        region: service_address,
                        addressText: res.data.service_area
                    });
                    setTimeout(function(){
                      _this.setData({
                        photo: res.data.photo,
                      });
                    },2000);
                    //拿到解密后的数据，进行代码逻辑
                },
                fail: function() {
                    //失败后的逻辑  
                },
            })
        }
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
        wx.getUserInfo({
          success: function (res) {
            _this.setData({
              photo: res.userInfo.avatarUrl,
            });
          }
        })
        /*去获取是否注册*/
        var url = config.route + api.hasRegister
        var data={}
        data.o_id = app.globalData.id;
        network.POST(url, {
            params: data,
            success: function(res) {
                if(res.data.status==200){
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 3000,
                        complete:function(){
                            setTimeout(function(){
                                wx.navigateBack({
                                    delta: 1
                                })
                            },1000)

                        }
                    })


                }
            },
            fail: function() {
                //失败后的逻辑
            },
        })
    },
    //点击获取头像
    getHead:function(){
      var _this = this;
      wx.getUserInfo({
        success: function (res) {
          console.log(res.userInfo.avatarUrl);
          _this.setData({
            photo: res.userInfo.avatarUrl,
          });
        }
      })
    },
    addAddress: function() {
        var nowRegion = this.data.region;
        nowRegion.push({
          'province': "*服务地区（可多选）",
            'city': "",
            'area': ""
        });
        popStatus: -1, //识别弹窗从那里调用
            this.setData({
                region: nowRegion
            });
    },
    subtractionAddress: function(e) {
        var index = e.currentTarget.dataset.index;
        var nowRegion = this.data.region;
        var self = this;
        if (typeof index == 'undefined') {
            wx.showToast({
                title: '操作频繁，删除失败',
                icon: 'fail',
                duration: 5000
            })
        } else {
            this.setData({
                popStatus: 0,
                tipStatus2: !this.data.tipStatus2,
                popText1: '请确认是否删除该地址！',
                addressIndex: index
            });
        }
        
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
    onShareAppMessage: function() {},
    // 弹窗1取消
    closeTip: function() {
        this.setData({
            tipStatus1: !this.data.tipStatus1,
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
        if (this.data.popStatus == 0) {
            var nowRegion = this.data.region;
            nowRegion.splice(this.data.addressIndex, 1);
            var quchong = [];
            var atext = '';
            for (var i = 0; i < nowRegion.length; i++) {
              if (nowRegion[i].province != '*服务地区（可多选）') {
                    if (i == 0) {
                        atext += (nowRegion[i].province + ' ');
                        atext += (nowRegion[i].city + ' ');
                        atext += (nowRegion[i].area + ',');
                        quchong.push(nowRegion[i])
                    } else {
                        var k = 1;
                        for (var j = 0; j < quchong.length; j++) {
                            if ((quchong[j].province == nowRegion[i].province) && (quchong[j].city == nowRegion[i].city) && (quchong[j].area == nowRegion[i].area)) {
                                k = 0;
                                break;
                            }
                        }
                        if (k == 1) {
                            atext += (nowRegion[i].province + ' ');
                            atext += (nowRegion[i].city + ' ');
                            atext += (nowRegion[i].area + ',');
                            quchong.push(nowRegion[i]);
                        }
                    }
                }
            }
            atext = atext.substr(0, atext.length - 1);
            this.setData({
                region: nowRegion,
                tipStatus2: !this.data.tipStatus2,
                tipStatus1: !this.data.tipStatus1,
                popText1: "删除成功！",
                addressText: atext
            });
        }
    },
    scroll: function(e) {
        this.setData({
            scrollHeight: e.detail.scrollHeight,
            scrollTop: e.detail.scrollTop
        });
    },
    addMyHead: function() {
        var that = this;
        wx.chooseImage({
            count: 1, // 
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePath = res.tempFilePaths["0"];
                wx.getImageInfo({
                    src: tempFilePath,
                    success: function(res) {
                        that.setData({
                            cbStatus: !that.data.cbStatus,
                            headSrc: tempFilePath,
                            cHeight: res.height,
                            cWidth: res.width,
                            display: 'block',
                        });
                        ctx.drawImage(tempFilePath, 0, 0, that.cWidth, that.cHeight);
                        ctx.draw();
                    }
                });
            }
        })
    },
    clipBtn: function() {
        var that = this;
        ctx.draw(false, wx.canvasToTempFilePath({
            x: 0,
            y: that.data.cHeight * that.data.scrollTop / that.data.scrollHeight,
            width: that.data.cWidth,
            height: that.data.cWidth,
            destWidth: that.data.cWidth,
            destHeight: that.data.cWidth,
            canvasId: 'mycanvas',
            success: function(res) {
                var data = {
                    path: res.tempFilePath
                };
                network.uploadFile({
                    params: data,
                    success: function(resUpload) {
                        var resData = JSON.parse(resUpload.data);
                        that.setData({
                            photo: resData.url,
                            // photo: config.route + (resData.url.substring(1)),
                            cbStatus: !that.data.cbStatus,
                            display: 'none',
                        });
                        //拿到解密后的数据，进行代码逻辑
                    },
                    fail: function() {
                        //失败后的逻辑  
                        that.setData({
                            cbStatus: !that.data.cbStatus,
                            display: 'none',
                        });
                        popup.showToast('图片上传失败');
                    },
                })
            },
            fail: function(res) {},
            complete: function(res) {}
        }));
    }
})