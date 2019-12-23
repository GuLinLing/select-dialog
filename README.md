## 选人桥

  vue-cli 需要开启 runtimeCompiler: true

### 全局注册

  在main.js中加入以下代码
  import SelectDialog from '@/components/common/SelectDialog'
  Vue.use(SelectDialog)
  接下来在组件方法内直接调用以下方法即可
  this.$selectDialog()

### 局部注册

  在需要调用选人桥的组件内加入以下代码
  import { SelectDialog } from '@/components/common/SelectDialog'
  接下来在组件内直接调用以下方法即可
  selectDialog()

### 参数

  参数名称 | 是否必填 | 类型 | 默认值 | 说明
  spaceId | 是 | String | 无 | 空间的id
  options | 否 | Object | 支持选用户和群组没有选择的数量限制 | 配置
  callback | 否 | Function | 无 | 回调

  options 属性详解
  options: {
    title: 非必填 | String | '' | 弹框的标题,
    user: {
      show: 非必填 | Boolean | true | 控制是否可以选用户,
      min: 非必填 | Number | -Infinity | 控制最少选几个用户,
      max: 非必填 | Number | Infinity | 控制最多选几个用户,
      select: 非必填 | Array | [] | 已选用户的id字符串数组
    },
    group: {
      show: 非必填 | Boolean | true | 控制是否可以选群组,
      min: 非必填 | Number | -Infinity | 控制最少选几个群组,
      max: 非必填 | Number | Infinity | 控制最多选几个群组,
      select: 非必填 | Array | [] | 已选群组的id字符串数组
    }
  }

### 示例(以全局注册方式为例)

#### Promise方式

  this.$selectDialog(空间id)
  .then(res => { // 确定会走这里
    console.log(res)
  })
  .catch(err => { // 取消会走这里
    console.log(err)
  })

#### callback方式

  this.$selectDialog(空间id, {}, function (data) {
    if (data) { // 确定会走这里
      console.log(data)
    } else { // 取消会走这里
      console.log(data)
    }
  })

#### 回传数据

  不论是Promise还是callback
  确定 的回传数据是 对象
  取消 的回传数据是 空值

  确定 回传数据: { user: Array: group: Array }
  
  user: 已选人员的数组不包括之前传入select里的人员, 如果不支持选用户不会返回user字段
  group: 已选群组的数组不包括之前传入的select里的群组, 如果不支持选群组也不会返回group字段

  取消 回传数据: null
