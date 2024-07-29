<template>
    <div v-if=" store.state.autoCaptures != null">
        章节内容详解：
        <!-- {{ autoCaptures }} -->
        <el-card v-for="autoCapture in autoCaptures" :key="autoCapture.Id" style="width: 480px; margin-bottom: 10px;">
            <div>
                <div>
                    <el-tag>{{ formatTime(autoCapture.Start) }}-{{
                        formatTime(autoCapture.End) }}</el-tag>
                    主题：{{ autoCapture.Headline }} <br />
                    内容：{{ autoCapture.Summary }}

                </div>
            </div>
        </el-card>
    </div>
    <div v-else>
        暂无内容
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { onMounted, ref, watch, computed } from 'vue';
const store = useStore()
const autoCaptures = computed(() => store.state.autoCaptures == null ? { "ParagraphSummary": "暂无消息" } : store.state.autoCaptures.AutoChapters);
let formatTime = (milliseconds) => {
    // 将毫秒转换为 mm:ss 格式
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
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