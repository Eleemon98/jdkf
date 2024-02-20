<template>
    <div class="login">
    <div class="card">
      <div class="left">
        <h1>조대한친에 온 것을 환영하오.</h1>
        <span>백성이오?</span>
        <router-link to="/register">
          <button>호적등록</button>
        </router-link>
      </div>
      <div class="right">
        <h1>신분인증</h1>
        <form @submit.prevent="handleLogin">
          <input type="text" placeholder="이름(id)" v-model="inputs.username" />
          <input type="password" placeholder="암호(password)" v-model="inputs.password" />
          <span v-if="err">{{ err }}</span>
          <button type="submit">신분인증</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const inputs = ref({
            username: '',
            password: ''
        });
        const err = ref(null);
        const router = useRouter();             

        const handleLogin = async () => {
            try {
                const response = await axios.post('http://localhost:3050/auth/login', inputs.value);
                const token = response.data.token;
                localStorage.setItem('token', token);
                router.push('/');
            } catch (error) {
                err.value = error.response ? error.response.data : err;
                console.log(err.value);
            }
        };

        return {
            inputs,
            err,
            handleLogin
        };
    },
    components: {},
    data() {
        return {
            

        }
    },
    created() {},
    mounted() {},
    unmounted() {},
    methods: {

    }
}
</script>

<style src="./css/login.css"></style>