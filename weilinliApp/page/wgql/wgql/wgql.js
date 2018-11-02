// pages/wgql/wgql.js
var t=require("../../../utils/face.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideShows: false,
    faceList:[],
    scroll:"",
    content:"",
    faceShow:false,
    historyPage: 1,
    megList:[],
    H:750,
    openid:"",
    scrollTo:"",
    msgType:"",
    ids:"",
    scollBottom:"0",
    wangge_id:"",
    user_id:"",
    msgTypeChange:false,//切换语音或文本类型时 记录状态
    touchEndLocation:"",//记录触摸录音按钮初始位置
    touchStartLocation: "",//记录触摸录音按钮结束位置
    innerAudioContext:"",//音频对象
    recorderManager:"",//录音对象
    res:"00",
    recall:"",//记录撤回功能触发开始的时间
    recallTimer:"",//撤回的定时器
    yhsf:"",//用户身份
    log:"log",//日志
    isPause:false//如果取消录音为true 正常结束为false
  },
  
  chooseImage(){
    var that=this
    
    
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
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
            that.data.content = `<img class="img" src="${src}" />`
            setTimeout(()=>{
              that.sendMessage()
            },1000)
          }
        })
      }
    })
  },
  showToast(msg){
    wx.showToast({
      title:msg
    })
  },
  recallBtn(e){
    
    wx.request({
      method: "POST",
      url: getApp().globalData.api +'chat/msg_cancel',
      data: {
        id: e.currentTarget.dataset.id,
        status: getApp().globalData.msgType
      },
      success: (res) => {  
        if (res.data.code == 1) {
          // this.data.megList.splice(e.currentTarget.dataset.index, 1)
          // this.setData({ 'megList': this.data.megList })
          this.sendRecall(e.currentTarget.dataset.id)
        }else{
          this.data.megList[e.currentTarget.dataset.index].isrecallShow=false
          this.setData({ 'megList': this.data.megList })
        }
        this.showToast(res.data.msg)
      }
    })
  },
  delBtn(e) {
    wx.request({
      method: "POST",
      url: getApp().globalData.api + 'chat/msg_delete',
      data: {
        id: e.currentTarget.dataset.id,
        status: getApp().globalData.msgType
      },
      success: (res) => {
        console.log(res.data.code == 1)
        if (res.data.code==1){
          // this.data.megList.splice(e.currentTarget.dataset.index, 1)
          // this.setData({ 'megList': this.data.megList })
          this.sendRecall(e.currentTarget.dataset.id)
        }
        this.showToast(res.data.msg)
      }
    })
  },
  recallStart(e) {
    var index = e.currentTarget.dataset.index
    this.data.recall = new Date().getTime()
    this.data.recallTimer=setTimeout(()=>{ 
      this.data.megList[index].isrecallShow=true    
      // this.data.megList.splice(e.currentTarget.dataset.index,1)
      this.setData({'megList': this.data.megList})
      console.log("弹出")
    },1000)
  },
  recallEnd() {
    if ((new Date().getTime() - this.data.recall) < 1000) {
      clearInterval(this.data.recallTimer)
      console.log("清除定时器")
    }

  },
  FaceShow(){
    this.setData({faceShow:!this.data.faceShow})
  },
  checkFace(item){
    this.setData({ content: this.data.content + " face"+t.default[item.target.dataset.val]+" ", })
    this.setData({ faceShow: !this.data.faceShow })
  },
  onclickMsg: function () {
    var isMsg = this.data.hideShows;
    var isText = isMsg;
   
    this.setData({ hideShows: !isText, })
  },
  
  recordEnd(e) {
    this.data.recorderManager.stop()
    wx.hideToast()
  },
  recordMove(e){
    this.touchEndLocation = e.touches[0].pageY || e.touches[0].clientY
    
    if(this.touchStartLocation -  this.touchEndLocation > 100 ){
      this.data.recorderManager.stop()
      this.data.isPause=true
      wx.showToast({
        title: "已取消"
      })
    }
  },
  
  audioPlay(src){ 
    var src=(src.currentTarget.dataset.src)
    this.data.innerAudioContext.src = src
    this.data.innerAudioContext.play();
    
    this.data.innerAudioContext.onPlay(() => {
      wx.showToast({
        title: "正在播放",
        icon: "none",
        duration: 1500
      })
    })
    this.data.innerAudioContext.onError((res) => {
      wx.showToast({
        title: "播放错误",
        icon: "none",
        duration: 1500
      })
    })
    
  },
  recordStart(e){
    wx.showToast({
      title:"向上滑动取消录音",
      icon:"none",
      duration:1500
    })
    
    this.data.isPause = false
    var that=this
   
    this.touchStartLocation = e.touches[0].pageY || e.touches[0].clientY
    
    
    this.data.recorderManager.onStart(() => {
      console.log('recorder start')
    })
    this.data.recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    this.data.recorderManager.onStop((res) => {
      if (this.data.isPause) {//如果取消状态==true就不上传
        return
      }
      that.setData({ res: "开始上传" })
      
      wx.uploadFile({
        url: 'https://wechat.tenqent.com/api/wxapp/chat/mp3', //仅为示例，非真实的接口地址
        filePath: res.tempFilePath,
        name: 'file',
        success(res) {
          var src=JSON.parse(res.data).data 
          that.sendMP3(src)
        }
      })
      
      // that.data.innerAudioContext.autoplay = true
      // that.data.innerAudioContext.src = res.tempFilePath
      
    })
    
    this.data.recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      
    })

    const options = {
      duration: 5000,
      sampleRate: 44100,
      numberOfChannels: 1,  
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 500
    }
    this.data.recorderManager.start(options)
   
  },
  bindKeyInput(val){
    this.setData({ content:  val.detail.value, })
  },
  msgTypeChange(){
    this.setData({ msgTypeChange: !this.data.msgTypeChange})
    
  },
  startPullDownRefresh(){
    this.data.historyPage++
    this.getHistoryMessage2()
  },
  getHistoryMessage2() {//下拉刷新方法
    var that = this
    wx.request({
      method: "POST",
      url: getApp().globalData.api +'chat_room/getShequHistoryLog',
      data: {
        openid: this.data.openid,
        wgbm: this.data.ids,
        page: that.data.historyPage,
        type: this.data.msgType
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        if (!res.data.data.data.length>0){
          return
        }
        for (var k = res.data.data.data.length-1; k >=0 ; k--) {
          that.data.megList.unshift(res.data.data.data[k])
        }
        that.setData({ megList: that.data.megList })
        this.setData({ scrollTo: "To15" })
        // this.setData({ scrollTo: "To" + that.data.megList.length})
        // console.log(that.data.megList)
      }
    })
  },
  getHistoryMessage(){
    var that=this
    wx.request({
      method:"POST",
      url: getApp().globalData.api +'chat_room/getShequHistoryLog',
      data: {
        openid: this.data.openid,
        wgbm: this.data.ids,
        page: that.data.historyPage,
        type: this.data.msgType
      },
      success:  (res)=> {
        for (var k in res.data.data.data){
          that.setData({ megList: that.data.megList.concat(res.data.data.data[k])})
        }
        this.setData({ scrollTo: "ToBottom" })
      }
    })
  },
  sendMP3(mp3) {
    var that = this
    wx.sendSocketMessage(
      {
        data:
          JSON.stringify(
            {
              type: "chatMessage",
              data: {
                mine: {
                  content: mp3,
                  msgtype:"MP3"
                },
                to: {
                  type: this.data.msgType,
                  id: this.data.ids
                }
              }
            }
          )
      }
    )
  },
  sendRecall(id) {
    var that = this
    wx.sendSocketMessage(
      {
        data:
          JSON.stringify(
            {
              type: "revocation",
              id: id
            }
          )
      }
    )
    //发完成清空输入框
    that.setData({ content: "" })

  },
  sendMessage() {
    var that = this
    wx.sendSocketMessage(
      {
        data:
          JSON.stringify(
            {
              type: "chatMessage",
              data: {
                mine: {
                  content: that.data.content
                },
                to: {
                  type: this.data.msgType,
                  id: this.data.ids
                }
              }
            }
          )
      }
    )
    //发完成清空输入框
    that.setData({ content: "" })

  },
  /*创建连接*/
  socket(){
    wx.showLoading({
      mask:true
    })
    var that=this
    //建立连接
    wx.connectSocket({ url: 'wss://wechat.tenqent.com:7273' })
    //连接成功
    wx.onSocketOpen(function () {
      console.log("连接成功")
      wx.hideLoading()
      wx.sendSocketMessage(
       {data: 
          JSON.stringify({
              type: "init",
              data: {
                user_id: that.data.user_id,
                openid: that.data.openid,
                wangge_id: that.data.wangge_id,
                name: getApp().globalData.userInfo.name,
                headimgurl:getApp().globalData.userInfo.avatar, 
                user_gn_type: 1
              }
          })
       }
      )
      
    })
    wx.onSocketMessage(function(e) {
      
      var app=getApp().globalData
      
      var data = JSON.parse(e.data)
      console.log(data)
      if (data.type != 'ping' && app.msgType == "friend" && (data.content&&app.ids != data.content.openid) && app.openId != data.content.openid){
        return
      } else if (data.type != 'ping' && data.content&&app.msgType != data.content.type){
        return
      }
     
      switch (data.type) {
        // 服务端ping客户端
        case 'ping': break;   
        case "getMessage":
          var obj={}
          obj.content=data.content
          obj.msgtype = data.content.msgtype
          obj.id=  data.content.id
          obj.openid = data.content.openid
          data.content = data.content
          that.setData({ megList: that.data.megList.concat(obj) })
          console.log(that.data.megList)
          that.setData({ scrollTo: "ToBottom" })
          break;
        case "noonline":
          var a = {}
          wx.showToast(
            {
              title:"好友不在线",
              icon:"none"
            }
          )
          break;

        case "revocation":
          for (var j = 0; j < that.data.megList.length;j++){
            if (that.data.megList[j].id==data.id){
              that.data.megList.splice(j, 1)
              that.setData({ 'megList': that.data.megList })
              break;
            }
          }
        break;

        case "MP3":
          var obj = {}
          obj.content = data.content
          obj.msgtype = data.content.msgtype
          obj.id = data.content.id
          obj.openid = data.content.openid
          data.content = data.content
          that.setData({ megList: that.data.megList.concat(obj) })
          console.log(that.data.megList)
          that.setData({ scrollTo: "ToBottom" })
          break;   
      }
    })
    
    // wx.onSocketClose((res) => {
    //   that.socket()
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    
    this.setData({ yhsf: 0 }) // getApp().globalData.userInfo.user_shenfen })//
    this.setData({ innerAudioContext: wx.createInnerAudioContext() })//获取全局音频对象
    this.setData({ recorderManager: wx.getRecorderManager() }) //获取全局录音对象
    this.data.innerAudioContext.onPlay(() => {//监听录音播放
      wx.showToast({
        title: "开始播放",
        icon: "none",
        duration: 1500
      })
    })
    this.setData({ msgType: getApp().globalData.msgType})
    this.setData({ ids: getApp().globalData.ids })
    this.setData({ openid: getApp().globalData.openId })
    this.setData({ wangge_id: getApp().globalData.wangge_id })
    this.setData({ user_id: getApp().globalData.user_id })
    
    
    this.getHistoryMessage()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.setData({faceList: t.default})
    wx.setNavigationBarTitle({
      title: getApp().globalData.title//页面标题为路由参数
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.socket()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.closeSocket()
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.closeSocket()
    
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