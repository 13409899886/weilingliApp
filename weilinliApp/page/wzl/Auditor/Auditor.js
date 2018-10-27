Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    processData: [{
      name: '提交',
      year: '2018-05-05',
      tiem: '9:01:22',
      start: '#fff',
      end: '#EFF3F6',
      icon: 'https://wechat.tenqent.com/WebImg/wll-img/jindulan.png'
    },
    {
      name: '受理',
      year: '2018-05-05',
      tiem: '9:01:22',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: 'https://wechat.tenqent.com/WebImg/wll-img/jindulan.png'
    },
    {
      name: '处理',
      year: '2018-05-05',
      tiem: '9:01:22',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: 'https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png'
    },
    {
      name: '完结',
      year: '2018-05-05',
      tiem: '9:01:22',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: 'https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png'
    },
    ],
  },
  setPeocessIcon: function () {
    var index = 0//记录状态为1的最后的位置
    var processArr = this.data.processData
    // console.log("progress", this.data.detailData.progress)
    for (var i = 0; i < this.data.detailData.progress.length; i++) {
      var item = this.data.detailData.progress[i]
      processArr[i].name = item.word
      if (item.state == 1) {
        index = i
        processArr[i].icon = "https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png"
        processArr[i].year = '2018-05-05'
        processArr[i].tiem = '9:01:22'
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      } else {
        processArr[i].icon = "https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png"
        processArr[i].year = '2018-05-05'
        processArr[i].tiem = '9:01:22'
        processArr[i].start = "#EFF3F6"
        processArr[i].end = "#EFF3F6"
      }
    }
    processArr[index].icon = "https://wechat.tenqent.com/WebImg/wll-img/jindulan.png"
    processArr[i].year = '2018-05-05'
    processArr[i].tiem = '9:01:22'
    processArr[index].end = "#EFF3F6"
    processArr[0].start = "#fff"
    processArr[this.data.detailData.progress.length - 1].end = "#fff"
    this.setData({
      processData: processArr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
  },
  noticeTap: function (e) {
    let item = e.target.dataset.item;
    console.log(item);
    this.data.notice[item].isHide = !this.data.notice[item].isHide;
    let notice = this.data.notice;
    this.setData(
      { notice }
    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
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