// pages/main/main.js
Page({
  data: {
    searchstr:"",
    soups:"",
    meds:"",
    others:"",
    others2:"",
    count:0,
    bg_flag: 0,
  listData:[
  {//main: "12",csearch:"12",name:"01",reason:"text1",solution:"solution",medicine:"121"
  }
  ]
  },
  
  onLoad: function (options) {
  //  var sg = wx.getStorageSync('sg');
   // listData[0].code=sg;
   this.data.searchstr=null;
   this.data.soups=null;
   this.data.meds=null;
   this.data.others=null;
   this.data.others2=null;
   
  console.log('onLoad') 
  let data=options.data;
  this.setData({
    searchstr: data//赋值给name_value
  });
  if(this.data.searchstr!=null)
  this.searchfun();
  },

  searchfun:function(res){

    wx.cloud.init()

    if(this.data.searchstr!=null||this.data.soups!=null||this.data.meds!=null||this.data.others!=null||this.data.others2!=null){
    wx.navigateTo({
      url: '../searchre/searchre?searchstr='+this.data.searchstr+'&soups='+this.data.soups+'&meds='+this.data.meds+'&others='+this.data.others+'&others2='+this.data.others2,
    }) 

  }
  else{
      wx.showModal({
        title: '提示',
        content: '需要输入关键词',
        success (res) {
        }
      })
  }
  },


  searchs: function(res){
    console.log("输入的值为："+res.detail.value);//打印输入的值
    this.setData({
      searchstr: res.detail.value//赋值给name_value
    })
  },
  searchsou: function(res){
    console.log("输入的值为："+res.detail.value);//打印输入的值
    this.setData({
      soups: res.detail.value//赋值给name_value
    })
  },
  searchmed: function(res){
    console.log("输入的值为："+res.detail.value);//打印输入的值
    this.setData({
      meds: res.detail.value//赋值给name_value
    })
  },
  searchoth: function(res){
    console.log("输入的值为："+res.detail.value);//打印输入的值
    this.setData({
      others: res.detail.value//赋值给name_value
    })
  },
  searchoth2: function(res){
    console.log("输入的值为："+res.detail.value);//打印输入的值
    this.setData({
      others2: res.detail.value//赋值给name_value
    })
  },



/*
  wx.openDocument({ 
    filePath, 
    fileType: 'xlsx', 
    success(res) { 
      console.log('打开文档成功') 
    }, 
    fail: function (res) { 
      console.log(res); 
    }, 
  }) 
*/


  clickCount(options) {
    console.log(options);

    this.setData({
      count: this.data.count + 1
    });
  }
})