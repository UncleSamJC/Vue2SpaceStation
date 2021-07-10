<template>
    <div class="login">
        Login
        <p></p>
        <input type="text" placeholder="请输入你的用户名" v-model="username" />
        <button @click="handleClick">进入聊天室</button>

    </div>

</template>

<script>
export default {
    name:'login',
    data() {
        return {
            username:'aaaa'
        }
    },
    mounted() {
        const uname = localStorage.getItem("username");
        if(uname){
            this.$router.push('/home');
        }

    },
    methods:{
        handleClick() {
            console.log("send button cliced");
            const username = this.username.trim();

            if(username.length <3){
                alert('用户名不能小于三位')
                return;
            }

            localStorage.setItem("username",username);
            console.log("username stored");
            this.$router.push('/home')
        }
    }
}
</script>