// page/wysh/wysh/wysh.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    page1: "pages/chat/index",
    page2: "pages/chat/index",
    openid: "",
    location: "",
    latitude: "",
    longitude: "",
    content: "",
    images: [],
    is_jm_gk: 1,
    log:[],//日志
    tempFilePath:[],//本地图片数组
  },
  chooseImage() {
    var that = this
    if (that.data.tempFilePath.length >= 3){
      return
    }
    
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        wx.uploadFile({
          url: 'https://wechat.tenqent.com/api/wxapp/chat/mp3', //仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'file',
          success(res) {
            var src = JSON.parse(res.data).data
            that.data.tempFilePath.push(tempFilePaths)
            that.data.images.push(src)
            that.setData({ "tempFilePath": that.data.tempFilePath })            
          }
        })
      }
    })
  },
  textareaChange(e){
    console.log(e.detail.value)
    this.setData({ "content": e.detail.value })
  },
  chooseLocation(){
    var that=this
    wx.chooseLocation({
      success(res){
        console.log(res)
        that.setData({ "location": res.address })
      }
    })
  },
  checkAddress(){
    var that=this
    wx.getSetting({
      success(res) {

        if (!res.authSetting['scope.userLocation']) {
          //  console.log("没有授权")
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.chooseLocation() 
            }
          })
        } else {
          that.chooseLocation()  
        }
      }
    })
  },
  bindViewTap: function () {
    wx.redirectTo({
      url: '../../wysh/wdsh/wdsh',
    })
  },
  // 滑行按钮
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value){
      this.setData({ "is_jm_gk": 1 })
    }else{
      this.setData({ "is_jm_gk": 0 })
    }
    
  },
  formSubmit(e){
    
    wx.request({
      method: "POST",
      url: getApp().globalData.api + 'chat/get_form_id',
      data: {
        form_id: e.detail.formId,
        type: 1,
        openid: getApp().globalData.openId
      },
      success: (res) => {
        
      }
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  submitBtn(){
    wx.showToast({
      icon:"loading",
      mask:true,
      duration:10000
    })
    
      wx.request({
        method: "POST",
        url: getApp().globalData.api + 'baoshi/index',
        data: {
          page1: this.data.page1,
          page2: this.data.page2,
          openid: this.data.openid,
          location: this.data.location,
          latitude: this.data.latitude,
          longitude: this.data.longitude,
          content: this.data.content,
          images: this.data.images,
          is_jm_gk: this.data.is_jm_gk,
        },
        success: (res) => {
          wx.hideToast()
          if (res.data.code == 1) {
            wx.redirectTo({
              url: '../../wysh/wdsh/wdsh',
            })
            
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:"none"
            })
          }
        }
      })
    
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

 getLocation(){
   var that=this
   wx.getSetting({
     success(res) {

       if (!res.authSetting['scope.userLocation']) {
         //  console.log("没有授权")
         wx.authorize({
           scope: 'scope.userLocation',
           success() {
             // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
             wx.getLocation({
               success(res) {
                 that.gpsToAddress(res)
               }
             })
           }
         })
       } else {
         //  console.log("已经授权")
         wx.getLocation({
           success(res) {
             that.gpsToAddress(res)
           }
         })
       }
     }
   })
   
 },
 gpsToAddress(data){
   this.setData({ "latitude": data.latitude, "longitude": data.longitude })
  //  console.log(this.data.latitude)
  //  console.log(this.data.longitude)
   wx.showLoading()
   wx.request({
     method: "POST",
     url: getApp().globalData.api + 'qrcode/get_address_wx',
     data: {
       latitude: data.latitude,
       longitude: data.longitude,
     },
     success: (res) => {
       wx.hideLoading()
       this.setData({ "location": res.data.msg })
     }
   })
  
 },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getLocation()
    this.data.openid = getApp().globalData.openId
    
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
