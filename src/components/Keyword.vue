<template>
    <div>
        <el-card style="width: 480px" shadow="always">关键词:
            <div class="keyWords">
                <div v-for="keyword in keyword.Keywords" :key="keyword">

                    <el-tag type="primary">{{ keyword }}</el-tag>
                </div>
            </div>

        </el-card>
        <el-card style="width: 480px" shadow="always">关键句:

            <div v-for="keyword in keyword.KeySentences" :key="keyword">

                <el-tag type="success">{{ keyword.Text }}</el-tag>
            </div>
        </el-card>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { onMounted, ref, watch, computed } from 'vue';
const store = useStore()
const keyword = computed(() => store.state.meetingAssistance == null ? { "ParagraphSummary": "暂无消息" } : store.state.meetingAssistance.MeetingAssistance);

</script>
<style>
.keyWords {
    display: flex;
    /* 使用flex布局 */
    flex-wrap: wrap;
    /* 允许换行 */
    justify-content: space-between;
    /* 元素之间平均分布，两端对齐 */
    gap: 10px;
    /* 设置元素之间的间隔 */
}
</style>