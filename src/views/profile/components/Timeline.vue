<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <!-- <h4>{{ item.title }}</h4> -->
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2019/8/20',
          title: '辞职',
          content: '就这样吧。。。。。。'
        },
        {
          timestamp: '2019/7/21',
          title: '业绩下降',
          content: '干了三个月了，那么努力工作，老板还是不给涨工资'
        },
        {
          timestamp: '2019/6/21',
          title: '被批评',
          content: '今天被批评了，明明我没有做错什么，为什么这样对我，气死我了'
        },
        {
          timestamp: '2019/5/22',
          title: '第一个项目',
          content: '今天我完成了我的第一个项目，想起之前的辛苦，感觉值了'
        },
        {
          timestamp: '2019/4/23',
          title: '加入公司',
          content: '我进入了梦寐以求的公司，真期待以后的工作'
        }
      ]
    }
  }
}
</script>
