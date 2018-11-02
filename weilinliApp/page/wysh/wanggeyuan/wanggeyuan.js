// page/wysh/wanggeyuan/wanggeyuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataInfo:null,
    multiIndex:[],
    objectMultiArray:[],
    // objectMultiArray: [
    //   [
    //     {
    //       id: 0,
    //       name: '无脊柱动物'
    //     },
    //     {
    //       id: 1,
    //       name: '脊柱动物'
    //     }
    //   ], [
    //     {
    //       id: 0,
    //       name: '扁性动物'
    //     },
    //     {
    //       id: 1,
    //       name: '线形动物'
    //     },
       
    //   ]
    // ],
  },
  bindMultiPickerChange(e){
    // console.log(e)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e){
    var id=(this.data.objectMultiArray[0][e.detail.value].id)
    
    wx.request({
      method: "POST",
      data:{
        id:id
      },
      url: getApp().globalData.api + 'baoshi/get_caseitem',
      success: (res) => {
        this.data.objectMultiArray[1]=(res.data.data)
        this.setData({ "objectMultiArray": this.data.objectMultiArray })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      icon: "loading",
      duration: 15000
    })
    wx.request({
      method: "POST",
      url: getApp().globalData.api + 'baoshi/wgy_xq',
      data: {
        id: 37//options.id
      },
      success: (res) => {
        wx.hideToast()
        if (res.data.code == 1) {
          this.setData({ "dataInfo": res.data.data })
          if (res.data.data.type==0){
            wx.request({
              method: "POST",
              url: getApp().globalData.api + 'baoshi/caseitem',
              success: (res) => {
                this.data.objectMultiArray.push(res.data.data)
                this.setData({ "objectMultiArray": this.data.objectMultiArray})
              }
            })
          }
        } else {
          wx.showToast({
            icon: "none",
            mask: true,
            duration: 1500
          })
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