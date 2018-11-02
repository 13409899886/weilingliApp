// pages/tzxx/tzxx.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    url: "background: url(https://wechat.tenqent.com/WebImg/wll-img/",
    cover: ")no-repeat center center;background-size: cover",
    page:1,
    api:"notice/city",
    noticeList:[]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  lower(){
    console.log("滑动了")
    this.data.page++
    this.getList(this.data.api)
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
    this.data.api = e.target.dataset.api
    this.data.page=1
    this.setData({ 'noticeList': [] })
    if (this.data.currentTab != e.target.dataset.current) {
      that.setData({
        currentTab: e.target.dataset.current
      })
      this.getList(this.data.api)
    }
  },
  getList(api){
    wx.showLoading()
    wx.request({
      method: "POST",
      url: getApp().globalData.api + api,
      data: {
        openid: getApp().globalData.openId,
        page:this.data.page
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code == 1) {
          this.data
          var data = res.data.data
          this.data.noticeList.concat(data)
          this.setData({ 'noticeList': data })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(this.data.api)
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
