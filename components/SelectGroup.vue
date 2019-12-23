<style scoped>
  .select-group h3 {
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
    border-radius: 4px;
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
    class="select-group"
  >
    <h3 v-on:click="toggle">
      <i v-bind:class="arrowClass" />
      {{ $t('group') }}
      {{ count }}
    </h3>
    <el-checkbox-group
      v-show="show"
      v-model="selected"
      v-bind:min="options.min"
      v-bind:max="options.max"
    >
      <el-checkbox
        v-for="item in data"
        v-bind:key="item.groupId"
        v-bind:label="item.groupId"
        v-bind:disabled="disabledHandler(item)"
        v-on:change="changeHandler(item, $event)"
      >
        <section>
          <img v-bind:src="item.logoIcon">
        </section>
        <aside>
          <p>{{ groupName(item) }}</p>
          <p>{{ item.parent }}</p>
        </aside>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: 'SelectGroup',
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
      groupName (item) {
        let name = this.$i18n.locale === 'zh'
        ? item.chName
        : (item.enName || item.chName)
        return name
      },
      disabledHandler (item) {
        return this.options.select.includes(item.groupId)
      },
      changeHandler (item, checked) {
        if (checked) {
          this.state[item.groupId] = item
        } else {
          delete this.state[item.groupId]
        }
      }
    }
  }
</script>
