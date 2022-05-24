export const filters = {
  formatNum: (num) => {
    return num + 1
  },
  formatNum2: (num) => {
    return num + 3
  },
}

export default {
  install(Vue) {
    Object.keys(filters).forEach((key) => {
      Vue.filter(key, filters[key])
    })
  },
}
