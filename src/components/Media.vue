<template>
  <div class="mediaMain">
    <!--    <el-button @click="test">11</el-button>-->

    <!--    <el-button type="primary" @click="emitTreeData">获取data</el-button>-->
    <!--    <el-tag type="primary" class="tag">-->
    <!--      点击下方+添加照片，照片个数不少于2张，不大于5张-->
    <!--    </el-tag>-->
    <!--      <RouterLink to="/about">Home</RouterLink>-->
    <el-upload action="#" :before-upload="beforeUpload" :http-request="handleUpload" type="file" accept=".mp4">
      <el-button type="primary" color="#06b79a" :loading="buttonLoading">上传视频</el-button>
    </el-upload>
    <el-tag type="primary">{{ tag }}</el-tag>

    <div v-loading="loading" style="width: 100%;display: flex;justify-content: center;margin-top: 10px;">
      <video
          ref="videoPlayer"
          class="video-js"
          controls
          preload="auto"
          width="750"
          height="364"

      >
        <source :src="videoUrl" type="video/mp4"/>
      </video>
    </div>
    <el-button @click="jumpTime(10)">跳转到第十秒</el-button>
    <!--    用这个版本-->
    <el-steps align-center class="steps" style="max-width: 600px" v-if="autoChapters!=null">
      <el-step v-for="(sentence, index) in autoChapters.AutoChapters" :key="sentence.Id"
               :title="formatTime(sentence.Start)" :description="sentence.Headline"
               @click="() => fastForwardTo(sentence.Start)"/>
    </el-steps>

  </div>
</template>
<script setup lang="ts">
import {ElButton, ElMessage} from 'element-plus'
import {computed, onMounted, reactive, ref, watch} from "vue";
import {generateRandomFileName, ossClient} from "@/utils/oss";
import {Plus} from "@element-plus/icons-vue";
import VueVideoPlayer, {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import videojs from 'video.js';
import {useStore} from 'vuex';
import {getVideoInfo, chatLogin} from "@/api/api"
let videoPlayer  = ref<any>(null)
let player:any=null
const store = useStore()
const currentTime = ref(0) // 引用 video-player 组件

let formatTime = (milliseconds: any) => {
  // 将毫秒转换为 mm:ss 格式
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
const handleLoadedMetadata = () => {
  // 当视频元数据加载完成后，设置视频播放器的引用

};
const handleTimeUpdate = () => {
  // 这里可以处理播放进度更新的逻辑
  ElMessage.success("已跳转到指定位置")
};

const fastForwardTo = (seconds: any) => {
  currentTime.value = seconds / 1000
  console.log(currentTime.value)
};
// 章节速览
let autoChapters = computed(() => (store.state.autoCaptures))
let tag = ref("上传视频后即可观看视频")
const emit = defineEmits(['sendTreeData', 'updateFileList'])
let fileList = ref()
let videoUrl = ref('https://onbotics-map-img.oss-cn-shanghai.aliyuncs.com/uploads/20240726/o146vuevg8fzj4hoac6jv.mp4')
let buttonLoading = ref(false)
let loading = ref(true)
let loadingOption = ref({
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.8)'
})
function beforeUpload(file: any) {
  return true
}

const test = () => {

}

function handleUpload(option: any) {
  buttonLoading.value = true
  tag.value = "正在上传视频请稍等"
  const fileName = `${generateRandomFileName(option.file.name.split(".")[1])}`;
  console.log(fileName, option)
  return new Promise((resolve, reject) => {
    ossClient.put(fileName, option.file).then((res) => {
      console.log('文件上传成功:', res);
      fileList.value = [res.name]
      console.log(fileList.value)
      videoUrl.value = res.url
      loading.value = false
      buttonLoading.value = false
      ElMessage.success("上传视频成功,正在解析视频内容")
      tag.value = "视频上传成功，正在解析视频内容"
      getVideoInfo({"ossUrl": res.url}).then((ress: any) => {
        console.log(ress)
        if (ress.code == 1) {
          store.dispatch('fetchAndStoreData', ress.data);
          ElMessage.success("解析文件成功")
        }
      })
      // emit('updateFileList', fileList.value);
      resolve(res.url); // 根据你的OSS设置，这可能是res.requestUrls[0]或其他属性
    }).catch((err) => {
      console.error('文件上传失败:', err);
      reject(err);
    });
  });
}

watch(() => fileList.value, (value, oldValue, onCleanup) => {
  fileList.value = value;
})
const emitTreeData = () => {
  console.log(1)
  emit('sendTreeData', 12)
}
const jumpTime = (time:number) => {
  if (player){
    player.currentTime(time)
  }
}
onMounted(() => {
  console.log(videoPlayer.value)
  player = videojs(videoPlayer.value, {
    controls: true,
    autoplay: false,
    preload: 'auto',
    playbackRates: [0.5, 1, 1.5, 2]
  });
});

</script>
<style scoped>
.mediaMain {
  width: 800px;
  height: 100%;
  border-radius: 10px;
  background: white;
  box-shadow: 1px 1px 30px #a8a8a8;
  padding: 20px 30px 20px 20px;
}

.vedio {
  margin-top: 30px;
}

.steps {
  margin-top: 40px;
}
</style>