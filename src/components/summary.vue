<template>
     <el-card style="width: 480px" shadow="always">{{ summary.ParagraphSummary }}</el-card>
</template>
<script setup>
import { useStore } from 'vuex';
import { onMounted, ref, watch, computed } from 'vue';
const store=useStore()
const summary=computed(() => store.state.summarization==null?{"ParagraphSummary":"暂无消息"}:store.state.summarization.Summarization);

</script>