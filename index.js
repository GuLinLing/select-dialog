import Vue from 'vue'
import i18n from './lang'
import index from './index.vue'

class App {
  constructor (id, options) {
    let self = this
    let el = document.createElement('div')
    el.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.3);
    `
    el.innerHTML = `
      <select-dialog
        v-bind:id="id"
        v-bind:options="options"
        v-on:confirm="confirm"
        v-on:cancel="cancel"
      />
    `
    document.body.appendChild(el)
    new Vue({
      el,
      i18n,
      data: {
        id,
        options
      },
      methods: {
        confirm (data) {
          self.confirm(data)
          this.close()
        },
        cancel () {
          self.cancel(null)
          this.close()
        },
        close () {
          this.$nextTick(() => {
            this.$el.style.display = 'none'
            document.body.removeChild(this.$el)
            this.$destroy()
          })
        }
      },
      components: {
        [index.name]: index
      }
    })
  }
}

function main (spaceId, userOptions = { title: '', user: {}, group: {} }, callback) {
  let checkResult = check.apply(this, arguments)
  if (checkResult) {
    return
  }
  let options = {}
  let defaultOptions = {
    title: '',
    user: {
      show: true,
      min: -Infinity,
      max: Infinity,
      select: []
    },
    group: {
      show: true,
      min: -Infinity,
      max: Infinity,
      select: []
    }
  }
  options.title = userOptions.title || defaultOptions.title
  options.user = Object.assign(defaultOptions.user, userOptions.user)
  options.group = Object.assign(defaultOptions.group, userOptions.group)
  let app = new App(spaceId, options)
  if (callback) {
    app.confirm = callback
    app.cancel = callback
  } else {
    return new Promise((resolve, reject) => {
      app.confirm = resolve
      app.cancel = reject
    })
  }
}

function type (target, type) {
  return Object.prototype.toString.call(target) === `[object ${type}]`
}

function check (spaceId, userOptions, callback) {
  if (!type(spaceId, 'String')) {
    console.log('spaceId: String')
    return true
  }
  if (!type(userOptions, 'Undefined') && !type(userOptions, 'Object')) {
    console.log('userOptions: Object')
    return true
  }
  if (!type(callback, 'Undefined') && !type(callback, 'Function')) {
    console.log('callback: Function')
    return true
  }
  if (!type(userOptions.title, 'Undefined') && !type(userOptions.title, 'String')) {
    console.log('userOptions.title: String')
    return true
  }
  if (!type(userOptions.user, 'Undefined') && !type(userOptions.user, 'Object')) {
    console.log('userOptions.user: Object')
    return true
  }
  if (!type(userOptions.user.show, 'Undefined') && !type(userOptions.user.show, 'Boolean')) {
    console.log('userOptions.user.show: Boolean')
    return true
  }
  if (!type(userOptions.user.min, 'Undefined') && !type(userOptions.user.min, 'Number')) {
    console.log('userOptions.user.min: Number')
    return true
  }
  if (!type(userOptions.user.max, 'Undefined') && !type(userOptions.user.max, 'Number')) {
    console.log('userOptions.user.max: Number')
    return true
  }
  if (!type(userOptions.user.select, 'Undefined') && !type(userOptions.user.select, 'Array')) {
    console.log('userOptions.user.select: Array')
    return true
  }
  if (!type(userOptions.group, 'Undefined') && !type(userOptions.group, 'Object')) {
    console.log('userOptions.group: Object')
    return true
  }
  if (!type(userOptions.group.show, 'Undefined') && !type(userOptions.group.show, 'Boolean')) {
    console.log('userOptions.group.show: Boolean')
    return true
  }
  if (!type(userOptions.group.min, 'Undefined') && !type(userOptions.group.min, 'Number')) {
    console.log('userOptions.group.min: Number')
    return true
  }
  if (!type(userOptions.group.max, 'Undefined') && !type(userOptions.group.max, 'Number')) {
    console.log('userOptions.group.max: Number')
    return true
  }
  if (!type(userOptions.group.select, 'Undefined') && !type(userOptions.group.select, 'Array')) {
    console.log('userOptions.group.select: Array')
    return true
  }
  return false
}

export default {
  install (Vue) {
    Vue.prototype.$selectDialog = main
  },
  selectDialog: main
}
