export default {
  install (Vue, options) {
    Vue.prototype.getData = () => {
      console.log('我是插件中的方法')
    }
  }
}
