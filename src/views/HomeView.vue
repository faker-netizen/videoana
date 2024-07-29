<script setup lang="ts">
import Threading from "@/components/Thread.vue";
import {RouterLink} from "vue-router";
import Media from "@/components/Media.vue";
import Chat from "@/components/Chat.vue";
import {ref} from "vue";
import {defaultTreeData} from "@/utils/default";

let treeRef = ref(null)
let treeData = ref(defaultTreeData)
const getTree = (p) => {
  console.log(p)
  treeData.value = {}
  setTimeout(
      () => treeData.value = defaultTreeData, 1000
  )

}


</script>

<template>
  <div class="main">
    <div class="element">
      <Threading :data="treeData?.Summarization?.MindMapSummary" ref="treeRef"/>
    </div>
    <div class="element">
      <Media @send-tree-data="getTree" />
    </div>
    <div class="element">
      <Chat/>

    </div>
  </div>

</template>
<style lang="css">
.main {
  width: 98vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: auto;
}

.element {
  height: 90%;
}

</style>