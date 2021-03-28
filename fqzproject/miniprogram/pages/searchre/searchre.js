// miniprogram/pages/searchre/searchre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      searchstr:"",
      soups:"",
      meds:"",
      others:"",
      others2:"",
      count:0,
      nore:0,
      bg_flag: 0,
    listData:[
    {//main: "12",csearch:"12",name:"01",reason:"text1",solution:"solution",medicine:"121"
    }
    ]

  },
  onLoad: function (options) {
    //  var sg = wx.getStorageSync('sg');
     // listData[0].code=sg;
    console.log('onLoad') 
    let ss=options.searchstr;
    let so=options.soups;
    let me=options.meds;
    let ot=options.others;
    let ot2=options.others2;
    this.setData({
      searchstr: ss,
      soups:so,
      meds:me,
      others:ot,
      others2:ot2
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


    
    //var tempStr = "";
    //this.listData.data[0]=12;
    //this.onLoad();
    /*var filePath = '/pages/data/keyword.xlsx';
    var oXL = new ActiveXObject("Excel.application");
    var oWB = oXL.Workbooks.open(filePath);
    oWB.worksheets(1).select();
    var oSheet = oWB.ActiveSheet;
    try {
      for (var i = 2; i < 46; i++) {
        if (oSheet.Cells(i, 2).value == "null" || oSheet.Cells(i, 3).value == "null")
          break;
        var a = oSheet.Cells(i, 2).value.toString() == "undefined" ? "" : oSheet.Cells(i, 2).value;
        tempStr += ("  " + oSheet.Cells(i, 2).value +
          "  " + oSheet.Cells(i, 3).value +
          "  " + oSheet.Cells(i, 4).value +
          "  " + oSheet.Cells(i, 5).value +
          "  " + oSheet.Cells(i, 6).value + "\n");
      }
    } catch (e) {
      alert(e);
    }*/
  //  var tmpsg="1235";
   // wx.setStorageSync('id', this.data.id);
  //  wx.setStorageSync('sg', tmpsg);

  //const filePath = 'pages/search/data/keyword.csv';
  //let fs = wx.getFileSystemManager()

  //const cloud=require('wx-server-sdk')
 // cloud.init()

 //清除表格中的数据
 var tmplist=this.data.listData;
 tmplist.splice(0,tmplist.length);


 var flag=0;
 
 var id=0;
  var that=this;
 //1.选择文件
 /*
  wx.chooseMessageFile({
    count: 1,
    type: 'all',
    success(res) {
      console.log("选择文件成功", res)
      console.log(res.tempFiles[0].name)
      console.log( res.tempFiles[0].path)
    // 2.上传文件
    wx.cloud.uploadFile({
        cloudPath: 'keyword.csv',
        filePath: 'http://tmp/K2qtufah9AqZ013c61723804196a9937099342433821.csv',
        success: res => {
         // console.log( res.tempFiles[0].name)
          console.log("上传文件成功", res)
          console.log(res.fileID)*/
          // 3.下载附件(临时文件)
          wx.cloud.downloadFile({
            fileID: 'cloud://fqzproject-3gerrahf405b9e03.6671-fqzproject-3gerrahf405b9e03-1304790849/keyword.csv',
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
              var so=that.data.soups;
              var me=that.data.meds;
              var ot=that.data.others;
              var ot2=that.data.others2;
              results.forEach(element => {
               // console.log(i++,"+",element);
                element=element.split(',')
               // console.log(i++,"+",element[0]);
                //inde进行中药位置查找
                var inde=6
                var maxi=inde-1;
                var mes="";
                while(element[inde]!=undefined&&element[inde]!=null&&element[inde]!=""&&element[inde].length!=0)
                {
                  mes=mes+element[inde];
                  mes=mes+"，";
                  inde++;
                }
                mes=mes.substr(0,mes.length-1)

                var tmpflag=0;
                //if(element[0]!=0)
                //{
                  //console.log("1");
                  /**查询篇名 */
                  if(ss!=undefined&&ss.length!=0&&tmpflag!=1)
                  {
                  if(element[0].length!=0&&element[1].length!=0)
                  {
                  if(element[0].indexOf(ss)!=-1||element[1].indexOf(ss)!=-1)
                  {
                    console.log("2");
                    tmpflag=1;
                  }
                }
              }
                /**查询汤方 */
                if(so!=undefined&&so.length!=0&&tmpflag!=1){
                if(element[maxi].length!=0)
                {
                if(element[maxi].indexOf(so)!=-1)
                {
                  //console.log("2");
                  tmpflag=1;
                }
              }
            }
              /**查询中药 */
              if(me!=undefined&&me.length!=0&&tmpflag!=1){
              if(mes.length!=0)
              {
              if(mes.indexOf(me)!=-1)
              {
                //console.log("2");
                tmpflag=1;
              }
            }
          }
            /**查询其他关键词 */
            if(ot!=undefined&&ot.length!=0&&tmpflag!=1){
              var p=0;
            while(p<=maxi)
            {
              if(element[p].length!=0)
            if(element[p].indexOf(ot)!=-1)
            {
              console.log("2");
              tmpflag=1;
              break;
            }
            p++;
          }
          if(mes.length!=0)
          {
          if(mes.indexOf(ot)!=-1)
          {
            //console.log("2");
            tmpflag=1;
          }
        }
          }
          /**查询第二个关键词 */
          if(ot2!=undefined&&ot2.length!=0&&tmpflag!=1){
            var p=0;
          while(p<=maxi)
          {
            if(element[p].length!=0)
          if(element[p].indexOf(ot2)!=-1)
          {
            console.log("2");
            tmpflag=1;
            break;
          }
          p++;
        }
        if(mes.length!=0)
        {
        if(mes.indexOf(ot2)!=-1)
        {
          //console.log("2");
          tmpflag=1;
        }
      }
        }
                    
                if(tmpflag==1){
                  console.log('3')
                    var tmpadd={
                      id: id++,flag: 0, main:element[0],csearch:element[1],name:element[2],reason:element[3],solution:element[4],
                      soup:element[5],medicine:mes
                    };
                    
                   
                    tmplist.push(tmpadd);
                    that.setData({
                      listData: tmplist
                    });

                    this.setData({
                      bg_flag: 1
                    });
                  
                  }
          //    }
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
          /*
        },
        fail: res => {
          console.log("上传文件失败", res)
        },
      })
    },
    fail(res) {
    console.log("选择文件失败", res)
    }
  })*/
  console.log("12")

  /**插入数据库 */
  //this.insertresult();
  

console.log(tmplist)

    console.log(options);
    this.setData({
      listData: tmplist
    });
   // document.all.txtArea.value = tempStr;
    //oXL.Quit();
   // CollectGarbage();
  },
  insertresult:function(){

    const db = wx.cloud.database({});
    const cont = db.collection('Search');
    var nowdate =new Date();
    cont.add({
      data: {
        searchres: this.data.searchstr,
        date: nowdate,
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