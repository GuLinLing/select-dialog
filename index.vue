<style scoped>
  .select-dialog {
    padding: 24px;
    background-color: #fff;
    border: 1px solid #ccc;
    line-height: 1.5;
    overflow: hidden;
  }
  header {
    overflow: hidden;
  }
  header h2 {
    font-size: 18px;
    color: #313B40;
    margin: 0;
  }
  header input {
    width: 100%;
    margin: 16px 0 10px 0;
    padding: 7px 10px;
    font-size: 14px;
    outline: 0;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    box-sizing: border-box;
  }
  header input::placeholder {
    color: #B4BBBF;
  }
  header i {
    cursor: pointer;
    float: right;
  }
  main {
    width: 548px;
    height: 408px;
    overflow: auto;
  }
  main p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  main input::placeholder {
    color: #B4BBBF;
  }
  footer {
    text-align: right;
  }
  footer span {
    display: inline-block;
    font-size: 14px;
    padding: 6px 30px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid;
  }
  footer span + span {
    margin-left: 10px;
  }
  footer span:nth-child(1) {
    color: #FFFFFF;
    background-color: #0092FF;
  }
  footer span:nth-child(2) {
    color: #313B40;
    border-color: #E6E6E6;
  }
</style>

<template>
  <div class="select-dialog">
    <header>
      <i
        class="el-icon-close"
        v-on:click="cancel"
      />
      <h2>{{ options.title }}</h2>
      <input
        v-bind:placeholder="$t('placeholder')"
        v-model="search"
        v-on:input="debounce(searchHandler, 1000)()"
        v-on:keydown.enter="debounce(searchHandler, 100)()"
        type="text"
      >
    </header>
    <main v-loading="loading">
      <select-user
        ref="user"
        v-bind:data="data.user"
        v-bind:options="options.user"
      />
      <select-group
        ref="group"
        v-bind:data="data.group"
        v-bind:options="options.group"
      />
      <p v-show="noData">{{ $t('tip') }}</p>
    </main>
    <footer>
      <span v-on:click="confirm">{{ $t('confirm') }}</span>
      <span v-on:click="cancel">{{ $t('cancel') }}</span>
    </footer>
  </div>
</template>

<script>
  import api from './api'
  import SelectUser from './components/SelectUser.vue'
  import SelectGroup from './components/SelectGroup.vue'
  export default {
    name: 'SelectDialog',
    props: {
      id: {
        type: String,
        required: true
      },
      options: {
        type: Object
      }
    },
    data () {
      return {
        search: '',
        loading: false,
        data: {
          user: [],
          group: []
        },
        noData: false
      }
    },
    methods: {
      debounce (fn, delay) {
        return function () {
          fn.async && clearTimeout(fn.async)
          fn.async = setTimeout(() => {
            fn.apply(this, arguments)
          }, delay)
        }
      },
      getData () {
        let params = {
          keyword: this.search,
          timeLimit: 0,
          apps: [
            {
              name: 'spaceGroup',
              queryParams: {
                count: 100,
                start: 0,
                filters: [
                  {
                    space_id: this.id
                  }
                ]
              }
            },
            {
              name: 'contact',
              queryParams: {
                count: 100,
                start: 0,
                filters: [
                  {
                    space_id: this.id
                  }
                ]
              }
            }
          ]
        }
        let { user, group } = this.options
        if (user.show && group.show) {
          this.getUserAndGroup(params)
        } else {
          user.show && this.getUser(params)
          group.show && this.getGroup(params)
        }
      },
      getUserAndGroup (params) {
        this.noData = false
        this.loading = true
        api.getUserAndGroup(params)
        .then(res => {
          let { users: user, group } = res
          this.data.user = user
          this.data.group = group
          if (!user.length && !group.length) {
            this.noData = true
          } else {
            this.noData = false
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => this.loading = false)
      },
      getUser (params) {
        this.noData = false
        this.loading = true
        api.getUserAndGroup(params)
        .then(res => {
          let { users: user } = res
          this.data.user = user
          if (!user.length) {
            this.noData = true
          } else {
            this.noData = false
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => this.loading = false)
      },
      getGroup (params) {
        this.noData = false
        this.loading = true
        api.getUserAndGroup(params)
        .then(res => {
          let { group } = res
          this.data.group = group
          if (!group.length) {
            this.noData = true
          } else {
            this.noData = false
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => this.loading = false)
      },
      searchHandler () {
        this.search = this.search.trim()
        this.data.user = []
        this.data.group = []
        if (!this.search) {
          return
        }
        this.getData()
      },
      confirm () {
        let { user, group } = this.$refs
        let data = {}
        user && (
          data.user = user.selected.slice()
          .filter(id => !user.options.select.find(val => val === id)) // 过滤初始已选人员
          .map(id => user.state[id]) // 映射成完整的对象
        )
        group && (
          data.group = group.selected.slice()
          .filter(id => !group.options.select.find(val => val === id))  // 过滤初始已选群组
          .map(id => group.state[id]) // 映射成完整的对象
        )
        this.$emit('confirm', data)
      },
      cancel () {
        this.$emit('cancel')
      }
    },
    components: {
      [SelectUser.name]: SelectUser,
      [SelectGroup.name]: SelectGroup
    }
  }
</script>
