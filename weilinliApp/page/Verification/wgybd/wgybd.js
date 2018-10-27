// pages/Wgybd/Wgybd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['请选择社区', '社区1', '社区2', '社区3'],
    objectArray: [
      {
        id: 0,
        name: '请选择社区'
      },
      {
        id: 1,
        name: '社区1'
      },
      {
        id: 2,
        name: '社区2'
      },
      {
        id: 3,
        name: '社区3'
      }
    ],
    index: 0,
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    array_b: ['请选择网格', '001网格', '002网格', '003网格'],
    objectArray: [
      {
        id: 0,
        name: '请选择网格'
      },
      {
        id: 1,
        name: '001网格'
      },
      {
        id: 2,
        name: '002网格'
      },
      {
        id: 3,
        name: '003网格'
      }
    ],
    index_b: 0,
    multiIndex_b: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    array_c: ['选择街道', '001街道', '002街道', '003街道'],
    objectArray: [
      {
        id: 0,
        name: '请选择街道'
      },
      {
        id: 1,
        name: '001街道'
      },
      {
        id: 2,
        name: '002街道'
      },
      {
        id: 3,
        name: '003街道'
      }
    ],
    index_c: 0,
    multiIndex_c: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    array_d: ['请选择区', '001区', '002区', '003区'],
    objectArray: [
      {
        id: 0,
        name: '请选择区'
      },
      {
        id: 1,
        name: '001区'
      },
      {
        id: 2,
        name: '002区'
      },
      {
        id: 3,
        name: '003区'
      }
    ],
    index_d: 0,
    multiIndex_d: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01'
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindPickerChange_b: function (e) {
    console.log('picker_b发送选择改变，携带值为', e.detail.value)
    this.setData({
      index_b: e.detail.value
    })
  },
  bindMultiPickerChange_b: function (e) {
    console.log('picker_b发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex_b: e.detail.value
    })
  },
  bindPickerChange_c: function (e) {
    console.log('picker_b发送选择改变，携带值为', e.detail.value)
    this.setData({
      index_c: e.detail.value
    })
  },
  bindMultiPickerChange_c: function (e) {
    console.log('picker_b发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex_c: e.detail.value
    })
  },
  bindPickerChange_d: function (e) {
    console.log('picker_b发送选择改变，携带值为', e.detail.value)
    this.setData({
      index_d: e.detail.value
    })
  },
  bindMultiPickerChange_d: function (e) {
    console.log('picker_b发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex_d: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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