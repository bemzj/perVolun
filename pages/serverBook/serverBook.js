// pages/serverBook/serverBook.js
const {
    api,
    config
} = require('../../utils/config.js')
const network = require("../../utils/network.js")
const popup = require('../../utils/popup.js')
const jump = require('../../utils/jump.js')
var app = getApp();

////////////////////////////////time-select/////////////////////////////////////////
const date = new Date();

const years = [];
const months = [];
const days = [];
const times = [];

let crtTime = date.getHours(); //currentTime
let crtDay = date.getDate(); //currentDay
let crtMonth = date.getMonth() + 1; //currentMonth
let crtYear = date.getFullYear(); //currentYear

let startTime = ''; //time
let startDay = ''; //day 
let startMonth = ''; //month
let startYear = ''; //year 

if (crtTime>16)
{
  startYear = crtYear;
  startTime = 8;
  switch (crtMonth) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
      if (crtDay>=31)
      {
        startDay = 1;
        startMonth = crtMonth+1;
      }else{
        startDay = crtDay+1;
        startMonth = crtMonth;
      }
      break;
    case 12:
      if (crtDay >= 31) {
        startDay = 1;
        startMonth = 1;
        startYear = crtYear+1;
      } else {
        startDay = crtDay + 1;
        startMonth = crtMonth;
      }
      break;
    case 2:
      if (crtYear%4 == 0 && crtYear% 100 != 0) {
        if (crtDay >= 29) {
          startDay = 1;
          startMonth = crtMonth+1;
        } else {
          startDay = crtDay + 1;
          startMonth = crtMonth;
        }
      } else {
        if (crtYear% 400 == 0) {
          if (crtDay >= 29) {
            startDay = 1;
            startMonth = crtMonth + 1;
          } else {
            startDay = crtDay + 1;
            startMonth = crtMonth;
          }
        } else {
          if (crtDay >= 28) {
            startDay = 1;
            startMonth = crtMonth + 1;
          } else {
            startDay = crtDay + 1;
            startMonth = crtMonth;
          }
        }
      }
      break;
    default:
      if (crtDay >= 30) {
        startDay = 1;
        startMonth = crtMonth + 1;
      } else {
        startDay = crtDay + 1;
        startMonth = crtMonth;
      }
      break;
  }
}else{
  startTime = crtTime;
  startDay = crtDay;
  startMonth = crtMonth;
  startYear = crtYear;
}
//开始年份
for (let i = startYear; i <= startYear + 0; i++) {
    years.push(i)
}
for (let i = startMonth; i <= 12; i++) {
    months.push(i)
}
for (let i = startTime; i <= 16; i++) {
  times.push(i)
}
selectDate(startMonth);

function selectDate(n) {
    days.splice(0, days.length);
    var dy = '';
    if (n == startMonth)
    {
      dy = startDay;
      
    }else{
      dy = 1;
    }
    switch (n) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          for (let i = dy; i <= 31; i++) {
                days.push(i)
            }
            break;
        case 2:
            if (startYear % 4 == 0 && startYear % 100 != 0) {
                for (let i = dy; i <= 29; i++) {
                    days.push(i)
                }
            } else {
                if (startYear % 400 == 0) {
                    for (let i = dy; i <= 29; i++) {
                        days.push(i)
                    }
                } else {
                   for (let i = dy; i <= 28; i++) {
                        days.push(i)
                    }
                }
            }
            break;
        default:
            for (let i = dy; i <= 30; i++) {
                days.push(i)
            }
            break;
    }
}

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperHeight: '227.5px', //最上面轮播图
        tipStatus1: false, //弹窗1
        tipStatus2: false, //弹窗2
        vp: false, //义工选择弹窗
        volunSrc: [], //义工人选
        volunLength: 0, //义工人数长度
        myvolunteer: {}, //我的义工数据
        swiper: {
            indicatorDots: 'true',
            autoplay: 'true',
            interval: 5000,
            duration: 300,
            circular: 'true',
        }, //首页轮播数据
        hostImg: config.imgRout,
        host: '',
        bottomBanners: [],
        produceDetails: '', //服务预约详情
        // produceDetails:'../../images/produce_details_no.png',
        bookStyle: ['清洗空调（壁挂）', '清洗冰箱', '清洗洗衣机（直筒）'], //服务事项
        style: 0, //事项选择项
        region: ["省", "市", "区"], //区域选择

        years: years, //年       
        months: months, //月    
        days: days, //天
        times: times, //时

        year: startYear, //获取当年年份
        month: startMonth, //获取当年月份
        time: startTime, //获取当前小时
        day: startDay, //获取当前天
        value: [0, 0, 0, 0], //设置数据
        tsStatus: false, //时间选择显示
        serverStatus: 0, //预约弹窗显示
        spIndex: 0, //义工当前选择项
        insertId: null,
        detailAddress: '',
        popText1: ''
    },
    //时间选择
    bindChange: function(e) {
        const val = e.detail.value;
        selectDate(this.data.months[val[1]]);
        times.splice(0, times.length);
        if (this.data.years[val[0]] == startYear && this.data.months[val[1]] == startMonth && this.data.days[val[2]] == startDay){         
          for (let i = startTime; i <= 16; i++) {
            times.push(i);
          }
        }else{
          for (let i = 8; i <= 16; i++) {
            times.push(i);
          }
        }
        this.setData({
            days: days,
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]],
            time: this.data.times[val[3]],
            times:times
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    addOrder: function(e) {
        var _this = this;
        // 获取时间的时间戳
        var times = _this.data.year + '/' + _this.data.month + '/' + _this.data.day + ' ' + _this.data.time + ":00:00";
        console.log(times);
        var myDate = new Date(times);
        var service_time = myDate.getTime() / 1000;
        var currentTime = new Date();
        console.log(currentTime.getTime())

        var currentStampN = (currentTime.getTime() + 7200000) / 1000;
        //没有
        if (service_time < currentStampN) {
            _this.setData({
                popText1: "至少提前2小时预约",
                tipStatus1: !_this.data.tipStatus1
            });
            return;
        }
        /**********生成订单************/
        var data = e.detail.value;
        data.o_id = app.globalData.id;
        data.service_matters = _this.data.bookStyle[_this.data.style];
        data.service_time = _this.data.year + '-' + _this.data.month + '-' + _this.data.day + ' ' + _this.data.time + ":00:00";
        data.service_address = _this.data.region[0] + ' ' + _this.data.region[1] + ' ' + _this.data.region[2];
        data.type = 'add';
        var url = config.route + api.AddOrder;
        //发起请求  
        network.POST(url, {
            params: data,
            success: function(res) {
                if (res.data.status == 0) {
                    // 注册失败
                    _this.setData({
                        popText1: res.data.msg,
                        tipStatus1: !_this.data.tipStatus1
                    });
                } else if (res.data.status == 1) {
                    // 注册成功
                    popup.showToast('生成订单成功', 'success', 4000);
                    // 后台返回推荐义工数据, 根据用户地理位置放回最近的一个，
                    var len = res.data.recommend.length;
                    _this.setData({
                        serverStatus: !_this.data.serverStatus,
                        vp: !_this.data.vp,
                        volunSrc: res.data.recommend,
                        volunLength: len,
                        myvolunteer: res.data.recommend[0],
                        insertId: res.data.insertId,
                    });
                }
            },
            fail: function() {
                //失败后的逻辑  
            },
        })
    },
    onLoad: function(options) {
        var _this = this;
        var data = {
            'type': 'banner'
        };
        var url = config.route + api.Service;
        //发起请求  
        network.GET(url, {
            params: data,
            success: function(res) {
                _this.setData({
                    bottomBanners: res.data.banner,
                    produceDetails: config.imgRout + res.data.product,
                });
                var resource = res;
                wx.getImageInfo({
                    src: config.imgRout + resource.data.banner[0],
                    success: function(res) {
                        _this.setData({
                            swiperHeight: res.height + 'rpx',
                        })
                    }
                })
                //拿到解密后的数据，进行代码逻辑
            },
            fail: function() {
                //失败后的逻辑  
            },
        })
        // App.requestPublic(api.Service, data);
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'Z3BBZ-C563U-MDPVI-BSXTL-ZB2W5-ZRBHU'
        });
    },
    //服务选择
    styleChange: function(e) {
        this.setData({
            style: e.detail.value
        })
    },
    //区域选择
    regionChange: function(e) {
        this.setData({
            region: e.detail.value
        })
    },
    //关闭时间选择按钮
    closeSelect: function() {
        this.setData({
            tsStatus: !this.data.tsStatus
        })
    },
    //显示时间选择页面
    showSelect: function() {
        this.setData({
            tsStatus: !this.data.tsStatus
        })
    },
    //显示预约弹窗
    showAddress: function() {
        if (app.globalData.user_type == 'V') {
            popup.showToast('您是义工喔！无需预约！');
        } else {
            // 判断用户是否有为完成预约的订单
            var _this = this;
            var dataS = {};
            dataS.type = 'select';
            dataS.o_id = app.globalData.id;
            console.log(dataS.o_id);
            var url = config.route + api.AddOrder;
            //发起请求  
            network.POST(url, {
                params: dataS,
                success: function(res) {
                    if (res.data.status == 0) {
                        _this.setData({
                            serverStatus: !_this.data.serverStatus
                        })
                    } else if (res.data.status == 1) {
                        // 后台返回推荐义工数据, 根据用户地理位置放回最近的一个，
                        _this.setData({
                            serverStatus: !_this.data.serverStatus,
                            vp: !_this.data.vp,
                            volunSrc: res.data.recommend,
                            myvolunteer: res.data.recommend[0],
                            insertId: res.data.insertId,
                        });
                    }
                },
                fail: function() {
                    //失败后的逻辑  
                },
            })
        }
    },
    //关闭预约弹窗
    closeAddresses: function() {
        this.setData({
            serverStatus: !this.data.serverStatus
        })
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
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    success: function(res) {
                        var obj = _this.data.region;
                        obj[0] = res.result.address_component.province;
                        obj[1] = res.result.address_component.city;
                        obj[2] = res.result.address_component.district;
                        _this.setData({
                            region: obj,
                            detailAddress: res.result.address_component.street_number
                        })
                    },
                    fail: function(res) {}
                });
            }
        });
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
    //确定预约
    comfirmBook: function() {
        this.setData({
            serverStatus: !this.data.serverStatus,
            vp: !this.data.vp
        });
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
    //左边按钮
    leftTap: function() {
        let spIndex = ++this.data.spIndex
        if (spIndex == this.data.volunSrc.length) {
            spIndex = 0;
        }
        this.setData({
            spIndex: spIndex
        });
    },
    //右边按钮
    rightTap: function() {
        let spIndex = --this.data.spIndex
        if (spIndex == -1) {
            spIndex = this.data.volunSrc.length - 1;
        }
        this.setData({
            spIndex: spIndex
        });
    },
    //确定人数
    confrimVol: function(e) {
        var dataList = this.data.myvolunteer;
        dataList = this.data.volunSrc[e.currentTarget.dataset.index];
        this.setData({
            myvolunteer: dataList
        });
    },
    //随机分配
    randomVol: function() {
        var dataList = this.data.volunSrc[parseInt(Math.random() * this.data.volunSrc.length)];
        this.setData({
            myvolunteer: dataList
        });
    },
    //确定义工
    cVolunteer: function() {
        var _this = this;
        var dataU = {};
        dataU.type = 'update';
        dataU.id = _this.data.insertId;
        // 传一个义工的id过来
        dataU.v_id = _this.data.myvolunteer.id;
        var url = config.route + api.AddOrder;
        //发起请求  
        network.POST(url, {
            params: dataU,
            success: function(res) {
                if (res.data.status == 0) {
                    popup.showToast(res.data.msg);
                } else if (res.data.status == 1) {
                    popup.showToast('预约成功', 'sussion', 2000);
                    setTimeout(function() {
                        jump.redirectTo('/pages/personInfo/personInfo');
                    }, 2000);
                }
            },
            fail: function() {
                //失败后的逻辑  
            },
        })
    }
})