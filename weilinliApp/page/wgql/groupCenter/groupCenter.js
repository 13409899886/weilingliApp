// page/wgql/wxyAuditor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:null,//页面初始化数据
    wgbm:"",//网格编码
  },
  toMsg(e) {
    console.log(e)
    if (e.currentTarget.dataset.is_siliao==0){//判断是否接受私聊
      getApp().globalData.msgType = 'friend'
      getApp().globalData.ids = e.currentTarget.dataset.to_uid
      getApp().globalData.title = e.currentTarget.dataset.title
      wx.redirectTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
        url: "/page/wgql/wgql/wgql"
      })
    }
    
  },
  look_wgcy(){
    this.setData({ wgbm: getApp().globalData.wangge_id })
    this.getUserlist()
  },
  look_sqcy(){
    this.setData({ wgbm: "" })
    this.getUserlist()
  },
  getUserlist() {
    var that = this
    wx.showLoading()
    wx.request({
      method: "POST",
      url: getApp().globalData.api + 'chat_room/get_shequ_users',
      data: {
        openid: getApp().globalData.openId,//用户的openid"oaorM4ssPgLKfEKXn76Fek6uwPvE",//
        wgbm: getApp().globalData.wangge_id,//用户的网格编码"420102001001001"//
      },
      success: (res) => {
        wx.hideLoading()
        this.data.info.users=[]
        for (var k in res.data.data.users){
          this.data.info.users.push(res.data.data.users[k])
        } 
        this.setData({ info: this.data.info })
      }
    })
  },
  switch1Change(e){
    if (e.detail.value){
      console.log("选中")
    }else{
      console.log("取消")
    }
    wx.request({
      method: "POST",
      url: getApp().globalData.api + 'chat_room/is_liao',
      data: {
        openid:  getApp().globalData.openId,//用户的openidoaorM4ssPgLKfEKXn76Fek6uwPvE"
      },
      success: (res) => {
        wx.hideLoading()
        
      }
    })
  },
  getInfo(){
    wx.showLoading()
    wx.request({
      method: "POST",
      url: getApp().globalData.api + 'chat_room/get_fwtd',
      data: {
        openid: getApp().globalData.openId,//用户的openid"oaorM4ssPgLKfEKXn76Fek6uwPvE",//
        wgbm: getApp().globalData.wangge_id,//用户的网格编码"420102001001001"//
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.code==1){
          this.setData({ info: res.data.data })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo() //页面挂载获取初始数据
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