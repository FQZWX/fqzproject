// pages/main/main.js
Page({
  data: {
    searchstr:"",
    count:0,
    bg_flag: 0,
  listData:[
  {//main: "12",csearch:"12",name:"01",reason:"text1",solution:"solution",medicine:"121"
  }
  ]
  },
  
  onLoad: function () {
  //  var sg = wx.getStorageSync('sg');
   // listData[0].code=sg;
  console.log('onLoad') 
  },
  searchs: function(res){
    console.log("输入的值为："+res.detail.value);//打印输入的值
    this.setData({
      searchstr: res.detail.value//赋值给name_value
    })
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

    this.setData({
      bg_flag: 1
    });
    
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
if(this.data.searchstr!=""&&this.data.searchstr.length!=0){
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
              results.forEach(element => {
               // console.log(i++,"+",element);
                element=element.split(',')
               // console.log(i++,"+",element[0]);
                var tmp=element[0];

                var tmp2=element[1];
                var tp=that.data.searchstr;

                if(element[0]!=0)
                {
                  console.log("1");
                  if(tmp.length!=0&&tmp2.length!=0&&tp.length!=0)
                  {
                  if(tmp.indexOf(tp)!=-1||tmp2.indexOf(tp)!=-1)
                  {
                    //console.log("2");
                    var so="";
                    var inde=6
                      while(element[inde]!=null&&element[inde]!=""&&element[inde].length!=0)
                      {
                        so=so+element[inde];
                        so=so+"，";
                        inde++;
                      }
                      so=so.substr(0,so.length-1)
                    
                    var tmpadd={
                      id: id++,flag: 0, main:element[0],csearch:element[1],name:element[2],reason:element[3],solution:element[4],
                      soup:element[5],medicine:so
                    };
                   
                    tmplist.push(tmpadd);
                    that.setData({
                      listData: tmplist
                    });
                  }
                }
              }
              })
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
}
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

console.log(tmplist)

    console.log(options);
    this.setData({
      listData: tmplist
    });
   // document.all.txtArea.value = tempStr;
    //oXL.Quit();
   // CollectGarbage();
  },
  clickCount(options) {
    console.log(options);

    this.setData({
      count: this.data.count + 1
    });
  }
})