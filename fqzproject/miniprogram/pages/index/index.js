//index.js
//获取应用实例
const app = getApp()
wx.cloud.init({
  traceUser:true,
})

/*onLoad: function (options) {
  wx.showLoading({
    title: '登录中'
  })
  wx.getSetting({
    success: res => {
      console.log(res)
      if (res.authSetting['scope.userInfo'] === true) { // 成功授权
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            console.log(res)
            this.setUserInfoAndNext(res)
          },
          fail: res => {
            console.log(res)
          }
        })
      } else if (res.authSetting['scope.userInfo'] === false) { // 授权弹窗被拒绝
        wx.openSetting({
          success: res => {
            console.log(res)
          },
          fail: res => {
            console.log(res)
          }
        })
      } else { // 没有弹出过授权弹窗
        wx.getUserInfo({
          success: res => {
            console.log(res)
            this.setUserInfoAndNext(res)
          },
          fail: res => {
            console.log(res)
            wx.openSetting({
              success: res => {
                console.log(res)
              },
              fail: res => {
                console.log(res)
              }
            })
          }
        })
      }
    }
  })
},
*/

Page({
  data: {
    title: "基于《傅青主女科》小程序",
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: ''
  },
  jumpS:function(){
    wx.cloud.init()
    wx.navigateTo({
      url: '../search/search',
    })
  },
  jumpT:function(){
    wx.cloud.init()
    wx.navigateTo({
      url: '../topic/topic',
    })
  },
  jumpH:function(){
    wx.cloud.init()
    wx.navigateTo({
      url: '../history/history',
    }) 
  },
  onLoad: function (options) {
    this.getOpenid();

  },
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res.result.openId)
      var openid = res.result.openId;
      that.setData({
       openid: openid
      })
      this.setOpenid();
     }
    })
   },

   adddata()
   {
    const db = wx.cloud.database({});
    const cont = db.collection('User');
    cont.add({
      data: {
        userid: this.data.openid,
      },
      success: function (res) {
        console.log(res._id)
       /* wx.showModal({
          title: '成功',
          content: '您已经登记成功',
          showCancel: false
        })*/
      }
    });
  },

   setOpenid()
   {
    const db = wx.cloud.database({});
    const cont = db.collection('User');
    cont.where(
      {
        userid: this.data.openid
      }
    ).get({
      success: res => {
        console.log(res.data.length);
        if(res.data.length==0)
        {this.adddata();}
        else{
        console.log("数据存在",res);
      }
      },
      fail: err => {
        this.adddata();
      }
  });
},



  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})
  /*
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
*/
