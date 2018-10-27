var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
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
      name: '办结',
      year: '2018-05-05',
      tiem: '9:01:22',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: 'https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png'
    },
    {
      name: '评价',
      year: '2018-05-05',
      tiem: '9:01:22',
      start: '#EFF3F6',
      end: '#fff',
      icon: 'https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png'
    }],
    // 星星评价
    one_1: 'https://wechat.tenqent.com/WebImg/wll-img/xingxingh.png',
    two_1: 'https://wechat.tenqent.com/WebImg/wll-img/xingxinghui.png',
    one_2: 0,
    two_2: 5

  },
 bindViewTap:function(){
   wx.redirectTo({
     url: '../../wysh/wysh/wysh',
   })
 },
 bindViewTapb:function(){
   wx.redirectTo({
     url: '../../wysh/wdsh/wdsh',
   })
 },
//  进度条js
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
  // 星星评分
  //用户评分
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
