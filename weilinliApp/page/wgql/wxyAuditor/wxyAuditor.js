// page/wxy/wxyAuditor/wxyAuditor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: true,
    list:null
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
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  
  getLinkMan() {
    var that = this
    wx.request({
      method: "POST",
      url: 'https://wechat.tenqent.com/api/wxapp/chat/get_user_historyLog',
      data: {
        openid: getApp().globalData.openId,
        wgbm: getApp().globalData.wangge_id,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        this.setData({ list: res.data.data})
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  toMsg(e,type){
    console.log(type)
    getApp().globalData.msgType =e.currentTarget.dataset.val.type
    getApp().globalData.ids = e.currentTarget.dataset.val.to_uid
    getApp().globalData.title = e.currentTarget.dataset.title
    wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/page/wgql/wgql/wgql"
    })
  },
  onLoad: function (options) {
    // getApp().globalData.userInfo="hahah"
    // console.log(getApp().globalData.userInfo)
    this.getLinkMan()
   
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