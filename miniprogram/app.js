//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // 查看是否有open ID的缓存
    wx.getStorage({
      key: 'openId',
      fail(err) {
        console.log('not openId')

        // 调用云函数login获取openId
        wx.cloud.callFunction({
          name: 'login'
        }).then(res => {
          wx.setStorageSync('openId', res.result.event.userInfo.openId)
        }).catch(err => {
          console.log('login err:', err)
        })
      }
    })

    this.globalData = {}
  },

  // 获取今日时间
  getToday() {
    let now = new Date();

    let year = now.getFullYear() //年
    let month = now.getMonth() + 1 //月
    let day = now.getDate() //日

    let hh = now.getHours() //时
    let mm = now.getMinutes() //分
    let ss = now.getSeconds() //毫秒 

    let clock = year + "-"

    if (month < 10)
      clock += "0"

    clock += month + "-"

    if (day < 10)
      clock += "0"

    clock += day + " "

    if (hh < 10)
      clock += "0"

    clock += hh + ":"
    if (mm < 10) clock += '0'
    clock += mm + ':' + ss
    return clock
  }
})