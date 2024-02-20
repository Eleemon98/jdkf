<template>
    <div class="register">
        <div class="card">
            <div class="left">
                <h1>조대한친에 온 것을 환영하오.</h1>
                <span>백성이오?</span>
                <router-link to="/login">
                    <button>신분인증</button>
                </router-link>
            </div>
            <div class="right">
                <h1>호적등록</h1>
                <form @submit.prevent="handleClick">
                    <input type="text" placeholder="이름(id)" name="username" v-model="inputs.username" />
                    <input type="email" placeholder="서찰주소(email)" name="email" v-model="inputs.email" />
                    <input type="password" placeholder="암호(password)" name="password" v-model="inputs.password" />
                    <input type="text" placeholder="호(nickname)" name="nickname" v-model="inputs.nickname" />
                    <div v-if="err" class="error">{{ err }}</div>
                    <button type="submit">호적등록</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    components: {},
    data() {
        return {
            inputs: {
                username: '',
                email: '',
                password: '',
                nickname: '',
                },
            err: null,
        };
    },
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
        async handleClick() {
            try {
                const response = await axios.post('http://localhost:3050/auth/register', this.inputs);
                console.log(response.data); // 반응 데이터를 기록하려는 경우
            } catch (err) {
                this.err = err.response.data;
            }
        },
    },
};
</script>

<style src="./css/register.css"></style>