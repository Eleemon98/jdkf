<template>
    <div class="post">
        <div class="container">
            <div class="user">
                <div class="userInfo">
                    <img :src="'/upload/' + post.profilePic" alt="" />
                    <div class="details">
                        <router-link :to="'/profile/${post.userId}'" style="text-decoration: none; color: inherit;">
                            <span class="name">{{ post.name }}</span>
                        </router-link>
                        <span class="date">{{ formatDate(post.createdAt) }}</span>
                    </div>
                </div>
                <font-awesome-icon icon="fa-solid fa-ellipsis" @click="toggleMenu" />
                <button v-if="menuOpen && post.userId === currentUser.id" @click="handleDelete">삭제</button>
            </div>
            <div class="content">
                <p>{{ post.desc }}</p>
                <img :src="'/upload/' + post.img" alt="" />
            </div>
            <div class="info">
                <div class="item" @click="handleLike">
                    <template v-if="isLoading">무언가 다가오고 있소.</template>
                    <template v-else>
                        <template v-if="isLiked">
                            <font-awesome-icon icon="fa-solid fa-heart" style="color: red" />
                        </template>
                        <template v-else>
                            <font-awesome-icon icon="fa-regular fa-heart" />
                        </template>
                    </template>
                    {{ likeCount }} 좋아요
                </div>
                <div class="item" @click="toggleComments">{{ commentButtonText }}</div>
                <div class="item"><font-awesome-icon icon="fa-solid fa-square-share-nodes" />공유</div>
            </div>
            <Comments v-if="commentOpen" :postId="post.id" />
        </div>
    </div>
</template>

<script>
import Comments from "../comments/CommentsComponents.vue";
import moment from "moment";

export default {
    props: {
        post: Object
    },
    components: {        
        Comments
    },
    data() {
        return {
            menuOpen: false,
            commentOpen: false,
            isLoading: false,
            isLiked: false,
            likeCount: 0,
            currentUser: null
        }
    },
    created() {
        this.currentUser = this.$store.state.currentUser; //currentUser가 Vuex 스토어에 저장되어 있다고 가정
        this.fetchLikes();
    },
    mounted() {},
    unmounted() {},
    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        toggleComments() {
            this.commentOpen = !this.commentOpen;
        },
        async fetchLikes() {
            this.isLoading = true;
            // 좋아요 동기화
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.isLoading = false;
            // 좋아요 데이터 구상
            const likes = [1, 2, 3]; // 데이터 가정.includes(currentUser.id )
            this.isLiked = likes.includes(this.currentUser.id);
            this.likeCount = likes.length;
        },
        async handleLike() {
            // 유사/유사하지 않은 작업 시뮬레이션
            this.isLoading = true;
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.isLiked = !this.isLiked;
            if (this.isLiked) {
                this.likeCount++;
            } else {
                this.likeCount--;
            }
            this.isLoading = false;
        },
        async handleDelete() {
            // 삭제 행위 시뮬레이션
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert("게시물이 삭제되었소.");
        },
        formatDate(date) {
            return moment(date).fromNow();
        }
    }
}
</script>

