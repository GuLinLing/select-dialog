<style scoped>
  .select-user h3 {
    font-size: 14px;
    font-weight: normal;
    color: #313B40;
    margin: 0;
    cursor: pointer;
  }
  .el-checkbox {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .el-checkbox>>>.el-checkbox__label {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .el-checkbox img {
    width: 33px;
    height: 33px;
    margin: 0 10px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .el-checkbox aside {
    flex-basis: 100%;
  }
  .el-checkbox p {
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .el-checkbox p:nth-of-type(1) {
    font-size: 14px;
    color: #313B40;
  }
  .el-checkbox p:nth-of-type(2) {
    font-size: 12px;
    color: #7C868D;
  }
</style>

<template>
  <div
    v-if="options.show"
    v-show="data.length"
    class="select-user"
  >
    <h3 v-on:click="toggle">
      <i v-bind:class="arrowClass" />
      {{ $t('user') }}
      {{ count }}
    </h3>
    <el-checkbox-group
      v-show="show"
      v-model="selected"
      v-bind:min="options.min"
      v-bind:max="options.max"
    >
      <el-checkbox
        v-for="(item, index) in data"
        v-bind:key="item.employeeShortId"
        v-bind:label="item.employeeShortId"
        v-bind:disabled="disabledHandler(item)"
        v-on:change="changeHandler(item, $event)"
      >
        <section>
          <img v-bind:src="item.headIcon">
        </section>
        <aside>
          <p>{{ userNameAndId(item) }}</p>
          <p>{{ userDeptName(item) }}</p>
        </aside>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: 'SelectUser',
    props: {
      data: {
        type: Array
      },
      options: {
        type: Object
      }
    },
    data () {
      return {
        show: true,
        selected: this.options.select,
        state: {}
      }
    },
    computed: {
      arrowClass () {
        return this.show ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
      },
      count () {
        let num = this.selected.length - this.options.select.length
        let str = num ? `(${num})` : ''
        return str
      }
    },
    methods: {
      toggle () {
        this.show = !this.show
      },
      userNameAndId (item) {
        let name = this.$i18n.locale === 'zh' ? item.name : (item.nameEn || item.name)
        let id = item.employeeShortId
        return name + id
      },
      userDeptName (item) {
        let deptName = this.$i18n.locale === 'zh'
        ? item.deptFullName
        : (item.deptFullNameEn || item.deptFullName)
        return deptName
      },
      disabledHandler (item) {
        return this.options.select.includes(item.employeeShortId)
      },
      changeHandler (item, checked) {
        if (checked) {
          this.state[item.employeeShortId] = item
        } else {
          delete this.state[item.employeeShortId]
        }
      }
    }
  }
</script>
