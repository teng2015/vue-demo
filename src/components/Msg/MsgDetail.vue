<template>
  <div class="panel panel-warning">
    <div class="panel-heading">
      标题：
      <strong>{{ msg.title }}</strong>
      <span class="badge pull-right">
        {{ msg.time | dateTimeFormatter }}
      </span>
      <br/>
      发布者：
      <a v-link="`/msg?author=${msg.author}`">
        <i>{{ msg.author }}</i>
      </a>
      <opt-btn-group
        :msg="msg"
        parent-name="MsgDetail">
        <!-- 下面是slot，详情请看http://cn.vuejs.org/api/#slot -->
        <button
          class="btn btn-primary btn-xs"
          slot="goBackBtn"
          @click="goBack">
          返回
        </button>
      </opt-btn-group>
    </div>
    <div class="panel-body">
      {{ msg.content }}
    </div>
  </div>
</template>
<script>
import OptBtnGroup from 'COMPONENT/Msg/OptBtnGroup'
import msgService from 'SERVICE/msgService'
export default {
  components: { OptBtnGroup },
  // 设置默认值（Vue不会像Angular那样吞掉异常）
  data () {
    return {
      msg: {}
    }
  },
  // 初始化：根据msgId请求msg内容
  ready () {
    msgService
      .fetch({
        msgId: this.$route.params.msgId
      })
      .then(msg => this.msg = msg)
  },
  methods: {
    goBack () {
      history.back()
    }
  }
}
</script>
