<template>
    <div class="posts">
        <div v-if="error">뭔가 잘못됐소!{{ console.log(error) }}</div> 
        <div v-else-if="isLoading">무언가 다가오고 있소.</div>
        <div v-else>
            <Post :key="post.id" v-for="post in posts" :post="post" />
        </div>
     </div> 
</template>

<script>
import axios from "axios";
import Post from "../post/PostComponents.vue";

export default {
    name: "PostsComponents",
    components: {
        Post
    },
    data() {
        return {
            isLoading: true,
            error: null,
            posts: []
        };
    },
    async created() {
        try {
            const response = await axios.get(`/posts/userId=${this.userId}`);
            this.posts = response.data;
        } catch (error) {
            this.error = error.message || "무언가 잘못됐소!";
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    },
    props: {
        userId: {
            type: Number,
            required: true, 
        }
    },
    mounted() {},
    unmounted() {},
    methods: {}
}
</script>

<style src="./Posts.css"></style>