<template>

    <ul v-if="store.state.summarization && store.state.summarization.Summarization">
      <li v-for="(node, index) in props.node" :key="index">
        <span @click="toggle(node)" style="color:#6f6f6f">{{ node.Title }}</span>
        <TreeNode v-if="node.Topic.length > 0" :node="node.Topic" />
      </li>
    </ul>
    <dev v-else>请先上传视频</dev>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useStore }   from 'vuex';
import 'vue3-mindmap/dist/style.css'
const store=useStore()
const handleChange = (val: string[]) => {
  console.log(val)
}
type nodeType = { Title: string, Topic: nodeType[] }
const props = defineProps({
  node: {
    type: Array<Thread.nodeType>,
    default: [{
      Title: "交叉路口、单位出入口等人行通行位置设置原始坡道过渡",
      Topic: []
    }]
  }
})
function toggle(node: nodeType) {
  if (node.Topic) {
  }
}
</script>


<style scoped></style>