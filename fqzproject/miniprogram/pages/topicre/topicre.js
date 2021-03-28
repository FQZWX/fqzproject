// miniprogram/pages/topicre/topicre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchstr:"",
    others:"",
    others2:"",
    others3:"",
    count:0,
    bg_flag: 0,

    single_flag:0,
    multiple_flag:0,
    fill_flag:0,
    judge_flag:0,
    explain_flag:0,
    qa_flag:0,

    listData:[{}],      //用于存储单选
    multyData:[{}],     //用于存储多选
    fillData:[{}],    //用于存储填空
    judgeData:[{}],      //用于存储判断
    explainData:[{}],    //用于存储名词解释
    qaData:[{}]     //用于存储问答题
  },

   singledisplay: function(res)
  {
    var fnum=this.data.single_flag;
    if(fnum==0){
    this.setData({
      single_flag:1
    })
  }
  else{
    this.setData({
      single_flag:0
    })
  }
  },
  multydisplay: function(res)
  {
    var fnum=this.data.multiple_flag;
    if(fnum==0){
    this.setData({
      multiple_flag:1
    })
  }
  else{
    this.setData({
      multiple_flag:0
    })
  }
  },
  filldisplay: function(res)
  {
    var fnum=this.data.fill_flag;
    if(fnum==0){
    this.setData({
      fill_flag:1
    })
  }
  else{
    this.setData({
      fill_flag:0
    })
  }
  },
  judgedisplay: function(res)
  {
    var fnum=this.data.judge_flag;
    if(fnum==0){
    this.setData({
      judge_flag:1
    })
  }
  else{
    this.setData({
      judge_flag:0
    })
  }
  },
  explaindisplay: function(res)
  {
    var fnum=this.data.explain_flag;
    if(fnum==0){
    this.setData({
      explain_flag:1
    })
  }
  else{
    this.setData({
      explain_flag:0
    })
  }
  },
  qadisplay: function(res)
  {
    var fnum=this.data.qa_flag;
    if(fnum==0){
    this.setData({
      qa_flag:1
    })
  }
  else{
    this.setData({
      qa_flag:0
    })
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  var sg = wx.getStorageSync('sg');
     // listData[0].code=sg;
    console.log('onLoad') 
    let ss=options.searchstr;
    let ot=options.others;
    let ot2=options.others2;
    let ot3=options.others3;
    this.setData({
      searchstr: ss,
      others:ot,
      others2:ot2,
      others3:ot3
    });
    this.searchfun();
    },

    display: function(res)
  {
    console.log(res.currentTarget.dataset.id);
    var index = res.currentTarget.dataset.id;
    var f = "listData["+index+"].flag"
    var fnum=this.data.listData[index].flag;
    console.log(f);
    if(fnum==0){
    this.setData({
      [f]:1
    })
  }
  else{
    this.setData({
      [f]:0
    })
  }
  },

  searchfun: function (options) {
    wx.cloud.init()

 var tmplist=this.data.listData;
 tmplist.splice(0,tmplist.length);


 var flag=0;
 
 var id=0;
  var that=this;
   wx.cloud.downloadFile({
     fileID: 'cloud://fqzproject-3gerrahf405b9e03.6671-fqzproject-3gerrahf405b9e03-1304790849/topic.csv',
            success: sres => {
              console.log("下载文件成功", sres)
  
              // 4.通过下载附件得到tempFilePath并读取文件内容到result
              let fs = wx.getFileSystemManager()
              // 注意编码格式为'utf-8'
              let result = fs.readFileSync(sres.tempFilePath, "utf-8")
              //console.log(result)
              var results=result.split('\n')
              var i=0;
              var ss=that.data.searchstr;
              var ot=that.data.others;
              var ot2=that.data.others2;
              var ot3=that.data.others3;
              results.forEach(element => {
                //console.log(i++,"+",element);
                element=element.split(',')
               // console.log(i++,"+",element[0]);
                //inde进行中药位置查找

                var keyi=8;
                var tmpflag=0;
                 
                  if(ss!=undefined&&ss.length!=0)
                  {
                  if(element[keyi].length!=0&&element[keyi].length!=0)
                  {
                  if(element[keyi].indexOf(ss)!=-1)
                  {
                    console.log("2");
                    tmpflag=1;
                  }
                }
              }
              if(ot!=undefined&&ot.length!=0)
                  {
                  if(element[keyi+1].length!=0&&element[keyi+2].length!=0)
                  {
                  if(element[keyi+1].indexOf(ot)!=-1||element[keyi+2].indexOf(ot)!=-1)
                  {
                    console.log("2");
                    tmpflag=1;
                  }
                }
              }
              if(ot2!=undefined&&ot2.length!=0)
              {
              if(element[keyi+1].length!=0&&element[keyi+2].length!=0)
              {
              if(element[keyi+1].indexOf(ot2)!=-1||element[keyi+2].indexOf(ot2)!=-1)
              {
                console.log("2");
                tmpflag=1;
              }
            }
          }
          if(ot3!=undefined&&ot3.length!=0)
          {
          if(element[keyi+1].length!=0&&element[keyi+2].length!=0)
          {
          if(element[keyi+1].indexOf(ot3)!=-1||element[keyi+2].indexOf(ot3)!=-1)
          {
            console.log("2");
            tmpflag=1;
          }
        }
      }
              
              
   
                if(tmpflag==1){
                  console.log('3')
                    var tmpadd={
                      id: id++,flag: 0, str:element[0],title:element[1],a:element[2],b:element[3],c:element[4],
                      d:element[5],e:element[6],answer:element[7]
                    };
                    
                   
                    tmplist.push(tmpadd);
                    that.setData({
                      listData: tmplist
                    });

                    this.setData({
                      bg_flag: 1
                    });
                  
                  }
              })
              if(this.data.bg_flag==0)
              this.setData({
                nore: 1
              });
            },
            fail: sres => {
              console.log("下载文件失败", sres)
            },
          })
  console.log("12")

  /**插入数据库 */
  //this.insertresult();
  

console.log(tmplist)

    console.log(options);
    this.setData({
      listData: tmplist
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