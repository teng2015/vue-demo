<template src="./tpl.html"></template>
<script>
import msgService from 'SERVICE/msgService'
import userService from 'SERVICE/userService'

/**
 * 该组件由新增信息(/msg/add)与修改信息(/msg/modify/:msgId)所共用
 * 为区分状态，使用isAddMode来标识
 */
export default {
  // 关键点：设置本组件不可复用
  // 否则 /msg/add <=> /msg/modify/:msgId 间跳转，状态会保留
  route: { canReuse: false },

  data () {
    return {
      msg: {},
      isAddMode: true // 默认是新增的页面
    }
  },

  ready () {
    // 初始化：非修改页面状态下，毋须远程取消息
    if (!this.$route.path.startsWith('/msg/modify')) return

    this.isAddMode = false // 否则就是处于修改页面，立即修改标识

    msgService
      .fetch({
        msgId: this.$route.params.msgId
      })
      .then((msg) => {
        // 虽说后端会有过滤，但还是要严谨一点
        if (!msg || msg.author !== userService.data.username) {
          setTimeout(() => { alert('非信息发布者无权修改') }) // 避免alert阻塞线程
          return this.$router.replace('/msg')
        }

        this.msg = msg
      })
  },

  methods: {
    /**
     * 根据标识位进行请求（最后都跳转到详情页）
     */
    handleSubmit () {
      let opt = this.isAddMode ? 'add' : 'mod'

      msgService[opt](this.msg)
        .then(this.jumpToDetailMsg)
    },

    /**
     * 跳转到详情页
     * @param  {Number} [object].id  msgId
     */
    jumpToDetailMsg ({ id }) {
      this.$router.replace({
        name: 'detailMsg',
        params: { msgId: id }
      })
    },

    /**
     * 返回上一页
     */
    goBack () {
      history.back()
    }
  }
}
</script>
