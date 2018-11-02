// page/wgql/tzxx/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeDetails:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading()
    wx.request({
      method: "POST",
      url: getApp().globalData.api + "notice/details",
      data: {
        id: options.id
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code == 1) {
          var data = res.data.data
          const regex = new RegExp('<img', 'gi');
          data.content=data.content.replace(regex, `<img style="max-width: 100%;"`);
          this.setData({ 'noticeDetails': data })
        }
      }
    })
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