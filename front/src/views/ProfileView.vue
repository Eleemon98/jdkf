<template>
    <div class="profile">
        <div v-if="isLoading">loading</div>
        <div v-else>
        <div class="images">
            <img :src="'/upload/' + data.coverPic" alt="" class="cover" />
            <img :src="'/upload/' + data.profilePic" alt="" class="profilePic" />
        </div>
        <div class="profileContainer">
            <div class="uInfo">
            <div class="left">
                <a href="http://facebook.com"><font-awesome-icon :icon="['fab', 'facebood']" fontSize="large" /></a>
                <a href="http://facebook.com"><font-awesome-icon :icon="['fab', 'instagram']" fontSize="large" /></a>
                <a href="http://facebook.com"><font-awesome-icon :icon="['fab', 'twitter']" fontSize="large" /></a>
                <a href="http://facebook.com"><font-awesome-icon :icon="['fas', 'link']" fontSize="large" /></a>
            </div>
            <div class="center">
                <span>{{ data.name }}</span>
                <div class="info">
                <div class="item">
                    <font-awesome-icon :icon="['fas', 'location-dot']" />
                    <span>{{ data.city }}</span>
                </div>
                <div class="item">
                    <font-awesome-icon :icon="['fas', 'language']" />
                    <span>{{ data.website }}</span>
                </div>
                </div>
                <button v-if="rIsLoading">loading</button>
                <button v-else-if="userId === currentUser.id" @click="setOpenUpdate(true)">update</button>
                <button v-else @click="handleFollow">
                {{ relationshipData.includes(currentUser.id) ? "Following" : "Follow" }}
                </button>
            </div>
            <div class="right">
                <font-awesome-icon :icon="['far', 'envelope']" />
                <MoreVertIcon />
            </div>
            </div>
            <Posts :userId="userId" />
        </div>
        </div>
        <Update v-if="openUpdate" :setOpenUpdate="setOpenUpdate" :user="data" />
    </div>
</template>

<script>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { makeRequest } from "../../axios";
import { useRoute } from "vue-router";
import { useAuth } from "../../context/authContext";
import Update from "../../components/update/Update";

export default {
    components: {
        FontAwesomeIcon,
        PlaceIcon,
        LanguageIcon,
        EmailOutlinedIcon,
        MoreVertIcon,
        Posts,
        Update
    },
    setup() {
        const currentUser = useAuth().currentUser;
        const route = useRoute();
        const userId = parseInt(route.params.userId);
        const { isLoading, error, data } = useQuery(["user"], () =>
            makeRequest.get("/users/find/" + userId).then((res) => {
                return res.data;
            })
        );
        const { isLoading: rIsLoading, data: relationshipData } = useQuery(
            ["relationship"],
            () =>
            makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
            return res.data;
            })
        );
        const mutation = useMutation(
            (following) => {
                if (following)
                return makeRequest.delete("/relationships?userId=" + userId);
            return makeRequest.post("/relationships", { userId });
            },
            {
                onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["relationship"]);
                },
            }
        );
        const setOpenUpdate = ref(false);

        const handleFollow = () => {
        mutation.mutate(relationshipData.includes(currentUser.value.id));
        };

        return {
            isLoading,
            rIsLoading,
            data,
            relationshipData,
            userId,
            currentUser,
            handleFollow,
            setOpenUpdate
        };
    },
    data() {
        return {
            sampleData: ''
        }
    },
    created() {},
    mounted() {},
    unmounted() {},
    methods: {}
}
</script>

<style src="./ProfileView.vue"></style>