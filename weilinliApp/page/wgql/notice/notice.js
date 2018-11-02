// page/wgql/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    wx.request({
      method: "POST",
      url: getApp().globalData.api + 'chat_room/chat_notice_list',
      data: {
        wgbm: getApp().globalData.wangge_id,
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code == 1) {
          // res.data.data.sort((a,b)=>{
          //   return  a.id - b.id
          // })
          var data = res.data.data

          this.setData({'noticeList':data})
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