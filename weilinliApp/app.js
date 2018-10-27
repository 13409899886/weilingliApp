//app.js
App({
 
  onLaunch: function () {
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo'] == true) {//如果已经授权直接获取用户信息
          
          wx.getUserInfo({
            success: (res) => {
              wx.login({
                success: code => {
                  
                  this.getUserInfo(code, res)
                }
              })
              
            }
          })
        } else {//如果没授权 跳转到授权界面
          wx.redirectTo({ url: "/page/Verification/authorization" })
        }
      }
    })
    
  },
  globalData: {
    api:"https://wechat.tenqent.com/api/wxapp/",
    msgType: "group",//group 群聊 friend 私聊
    // ids:"420102001001003",//如果是群聊就是网格id 如果私聊就是对方的openid
    // openId:"oaorM4huIYLMHSygekz5rzxFxaLI",
    // wangge_id: '420102001001003',
    // user_id:"3812",
    userInfo:"",
    ids: "",//如果是群聊就是网格id 如果私聊就是对方的openid
    openId: "",
    wangge_id: '',
    user_id: "",
    title:"",//全局记录标题
  },
  getUserInfo(code,res){//接收coed和授权后返回的参数
   
    wx.request({
      method: "POST",
      url: this.globalData.api +'user/login',
      data: {
        code:code.code,
        encrypted_data: res.encryptedData,
        iv:encodeURIComponent(res.iv),
        raw_data: res.rawData,
        signature: res.signature
      },
      success: (res) => {
        if(res.data.code==0){
          wx.getUserInfo({
            success: (res) => {
              wx.login({
                success: code => {
                  this.getUserInfo(code, res)
                }
              })
            }
          })
          return
        }
        this.globalData.user_id = res.data.data.user.id
        this.globalData.ids = res.data.data.user.wgbm// "oaorM4sCaiP47gnic88Rnov_N9HQ"//
        this.globalData.openId = res.data.data.user.openid//"oaorM4ssPgLKfEKXn76Fek6uwPvE"//
        this.globalData.wangge_id = res.data.data.user.wgbm
        this.globalData.userInfo = res.data.data.user
        this.globalData.title = res.data.data.user.sssq
        console.log(this.globalData.userInfo)
      }
    })
  }
})