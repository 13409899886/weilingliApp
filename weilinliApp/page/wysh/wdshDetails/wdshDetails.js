var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    currentTab: 1,
    dataInfo:"",
    processData: [{
      name: '提交',
      time: '',
      start: '#fff',
      end: '#EFF3F6',
      icon: 'https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png'
    },
    {
      name: '受理',
      time: '',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: "https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png"//'https://wechat.tenqent.com/WebImg/wll-img/jindulan.png'
    },
    {
      name: '处理',
      time: '',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: 'https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png'
    },
    {
      name: '办结',
      time: '',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: 'https://wechat.tenqent.com/WebImg/wll-img/jinduhui.png'
    },
    {
      name: '评价',
      time: '',
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
    wx.request({
      method: "POST",
      url: getApp().globalData.api + 'baoshi/pingjia',
      data: {
        id: this.data.id,
        score: one_2
      },
      success: (res) => {
       
        wx.showToast({
          title:res.data.msg,
          duration: 1500
        })

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
    this.data.id = options.id
    wx.showToast({
      icon: "loading",
      mask: true,
      duration: 15000
    })
    wx.request({
      method: "POST",
      url: getApp().globalData.api + 'baoshi/details',
      data: {
        id: options.id
      },
      success: (res) => {
        wx.hideToast()
        if (res.data.code == 1) {
          this.setData({ "dataInfo": res.data.data })
          this.setData({
            one_2: this.data.dataInfo.score,
            two_2: 5 - this.data.dataInfo.score
          })
          
          for (var i = 0; i <= this.data.dataInfo.status;i++){
            this.data.processData[i].icon = 'https://wechat.tenqent.com/WebImg/wll-img/jindulan.png'
          }
          this.data.processData[0].time = this.data.dataInfo.shouli_time
          this.data.processData[1].time = this.data.dataInfo.shouli_time
          this.data.processData[2].time = this.data.dataInfo.chuli_time
          this.data.processData[3].time = this.data.dataInfo.wanjie_time
          this.data.processData[4].time = this.data.dataInfo.pingjia_time
          this.setData({ "processData": this.data.processData })
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
