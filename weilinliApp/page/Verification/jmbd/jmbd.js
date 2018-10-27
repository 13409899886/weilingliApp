// pages/Wll/wll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grid: "胡倩/第一网格",
    Telephone: "12345678901",
    text: "张之洞路双号202-222号，复兴路48-54号。",
    array: ['请选择所在的区域', '区域1', '区域2', '区域3'],
    objectArray: [
      {
        id: 0,
        name: '请选择所在的区域'
      },
      {
        id: 1,
        name: '区域1'
      },
      {
        id: 2,
        name: '区域2'
      },
      {
        id: 3,
        name: '区域3'
      }
    ],
    index: 0,
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    array_b: ['请选择您所在的街道', '街道1', '街道2', '街道3'],
    objectArray: [
      {
        id: 0,
        name: '请选择您所在的街道'
      },
      {
        id: 1,
        name: '街道1'
      },
      {
        id: 2,
        name: '街道2'
      },
      {
        id: 3,
        name: '街道3'
      }
    ],
    index_b: 0,
    multiIndex_b: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    array_c: ['请选择您所在的社区', '社区1', '社区2', '社区3'],
    objectArray: [
      {
        id: 0,
        name: '请选择您所在的社区'
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
    index_c: 0,
    multiIndex_c: [0, 0, 0],
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
    console.log('picker_c发送选择改变，携带值为', e.detail.value)
    this.setData({
      index_c: e.detail.value
    })
  },
  bindMultiPickerChange_c: function (e) {
    console.log('picker_c发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex_c: e.detail.value
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