<template>
  <div class="ChatMain">
    <div class="messageArea">
      <div
          class="message"
          v-for="message in messages">
        <div class="meta" :style="{'display':'flex','justify-content':message.sender==='robot'?'start':'end'}">
          <div :class="`${message.sender}`">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>

    <div class="send">
      <el-input
          change="sendMessage"
          v-model="sendData"
          clearable
          style="width:calc(100% - 90px);max-height: 200px "
          :rows="3"
          type="textarea"
          placeholder="Please input"
      />
      <el-button  color="#06b79a" style="width: 90px;height: 48px" @click="sendMessage">发送<el-icon><Message /></el-icon></el-button>
    </div>
  </div>

</template>
<script setup lang="ts">

import {ref,computed,watch} from "vue";
import {Message} from "@element-plus/icons-vue";
import {chatLogin,getChatInfo} from "@/api/api"
import { useStore } from "vuex";
const store=useStore()
watch(
      () => store.state.transcription,
      (newVal, oldVal) => {
        console.log("监听变化");
        if (newVal !== null) {
          console.log(newVal)
          // 执行 chatLogin 函数，并处理返回的 Promise
          chatLogin({"text":JSON.stringify(newVal.Transcription)}).then((res:any) => {
            // 使用 store.commit 来提交 mutation
            console.log(res)
            store.commit("setChatId", res);
            messages.value=[{sender: 'robot', content: '我是ai助手，可以回答关于视频的相关问题'}]
          });
        }
      }
    );
let messages = ref<Chat.message[]>([{sender: 'robot', content: '暂无内容解析'}])
let sendData = ref('')
const sendMessage = (e) => {
  messages.value.push({
    sender:"user",content:sendData.value
  },{sender:"robot",content:"正在分析问题"})
  console.log(store.state.chatId)
  getChatInfo({"id":store.state.chatId,"content":sendData.value}).then((res:any)=>{
    messages.value.pop()
    console.log(res)
    messages.value.push({sender:"robot",content:res})
  })
  sendData.value=""
  console.log(e)
}
</script>


<style scoped lang="css">
.ChatMain {
  width: 500px;
  height: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 30px #a8a8a8;
  padding: 20px 30px 20px 20px;
  display: flex;
  flex-direction: column;
}

.send {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.messageArea {
  height: calc(100% - 48px);
}

.message {
  width: 100%;
  margin-bottom: 5px;

}

.meta {
  border-radius: 10px;
  color: white;
  font-size: 18px;
  width: 100%;
  line-height: 1.4;
  word-wrap: break-word;
}

.robot {
  padding: 10px 15px 8px;
  background-color: #e8e7e7;
  color: #6f6f6f;
  min-height: 45px;
  border-radius: 0 22px 22px 22px;
  width: 65%;
  display: flex;

}

.user {
  padding: 10px 15px 8px;
  background-color: #06b79a;
  color: #efefef;
  width: 65%;
  min-height: 45px;
  border-radius: 22px 0 22px 22px;
}

</style>