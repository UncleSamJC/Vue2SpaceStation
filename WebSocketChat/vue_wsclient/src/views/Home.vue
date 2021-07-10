<template>
    <div class="home">
      当前位置：聊天室
      <button @click="handleExitRoom">退出</button>
        <ul>
            <li v-for="item of messageList" :key="item.id">
                <p> 
                <span>
                    {{item.user}}
                </span>
                <span>
                    {{new Date(item.dateTime)}}
                </span>
                </p>
                <p>
                   消息： {{item.message}}
                </p>
            </li>
        </ul>
     <input placeholder="请输入你的消息" type="text" v-model="msg"></input>
     <button @click="handleMessageClick">发送</button>
    </div>
</template>

<script>

const ws = new WebSocket("wss://echo.websocket.org")
//wss://echo.websocket.org

export default {
  name: "Home",
  data() {
    return {
      msg: "",
      username:'',
      messageList: [],
    };
  },
  methods: {
    handleExitRoom() {
      console.log("exit room fun called");
      localStorage.removeItem("username");
      this.$router.push('/login')
    },
    handleMessageClick() {
      const msg = this.msg;
      if(!msg.trim().length){ return; }

      ws.send(JSON.stringify(
        {
        id:new Date().getTime(),
        username:this.username,
        dateTime: new Date().getTime(),
        message:this.msg
      }))

    },
    handleOpen(e) {
      console.log("FE:conn open",e);
    },
    handleClose(e) {
      console.log("FE:conn close",e);
    },
    handleError(e) {
      console.log("FE: error occurred",e);
    },
    handleMessage(e) {
      // console.log(e.data);
      const msgText =  JSON.parse(e.data);
      console.log("FE: message handled",e);
      this.messageList.push(msgText);

      this.msgText = ''
    }
  },
  mounted() {
    this.username = localStorage.getItem("username");
      if(!this.username){
          this.$router.push('/login')
          return
      }

      ws.addEventListener('open',this.handleOpen.bind(this),false);
      ws.addEventListener('close',this.handleClose.bind(this),false);
      ws.addEventListener('error',this.handleError.bind(this),false);
      ws.addEventListener('message',this.handleMessage.bind(this),false);


  }
};
</script>