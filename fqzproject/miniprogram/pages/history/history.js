// miniprogram/pages/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[{/*date: "2021/2/5 12:26:25", searchres: "后"*/}]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryData();
  },
  jump: function(res)
  {
    console.log(res.currentTarget.dataset.id);
    var index = res.currentTarget.dataset.id;
    var url=this.data.listData[index].url;
    console.log(f);

    wx.cloud.init()
    wx.navigateTo({
      url: url,
    })
  },

  queryData(){
    var tmplist=this.data.listData;
    tmplist.splice(0,tmplist.length);

    const db = wx.cloud.database({});
    const cont = db.collection('Search');
    cont.where(
      {
        _openid: this.data.openid
      }
    ).get({
      success: res => {
        if(res.data.length!=0)
        {
          var id=0;
          res.data.forEach(element => {
            var date=element.date;
            //var date=new Date();
            var str=element.searchres;
            var datestr="";
            datestr=datestr+date.getFullYear()+"/";
            datestr=datestr+(date.getUTCMonth()+1)+"/";
            datestr=datestr+date.getDate()+" ";
            datestr=datestr+date.getHours()+":";
            datestr=datestr+date.getMinutes()+":";
            datestr=datestr+date.getSeconds();
            console.log(datestr);
            var tmpurl='../search/search?data='
            
            var tmpadd={
              id: id++,
              date: datestr,
              searchres: str,
              url: tmpurl+str
            }
            tmplist.push(tmpadd);
          });
          
          console.log(tmplist);
                    this.setData({
                      listData: tmplist
                    })
        }
        
        else{
        console.log("数据不存在",res);
      }
      },
      fail: err => {
        this.adddata();
      }
  });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})