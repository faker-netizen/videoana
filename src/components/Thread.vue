
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="内容大纲" name="first">
      <div class="treeMain">
        <TreeNode  :node="store?.state?.summarization?.Summarization?.MindMapSummary"></TreeNode>
      </div>
    </el-tab-pane>
    <el-tab-pane label="全文摘要结果" name="second">
      <Summary ></Summary>
    </el-tab-pane>
    <el-tab-pane label="关键词，关键句" name="third">
      <Keyword></Keyword>
    </el-tab-pane>
    <el-tab-pane label="章节内容" name="fourth">
      <AutoChapters></AutoChapters>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { defaultTreeData } from "@/utils/default";
import { ref } from 'vue'
import TreeNode from "@/components/treeNode.vue";
import Summary from "@/components/summary.vue"
import Keyword from "@/components/Keyword.vue"
import AutoChapters from "@/components/AutoChapters.vue"
import { useStore }   from 'vuex';
const store=useStore()
const activeName = ref('first')
const props = defineProps({
  data: {
    type: Array<Thread.nodeType>,
    default: [{
      Title: "交叉路口、单位出入口等人行通行位置设置原始坡道过渡",
      Topic: []
    }]
  },
})
const getTreeData = () => {
  return []
}

// console.log(props.data.Summarization.MindMapSummary)
</script>

<style scoped>
.treeMain {
  width: 500px;
  height: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 30px #a8a8a8;
  padding: 20px 30px 20px 20px;

}
</style>