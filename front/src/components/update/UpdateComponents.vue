<template>
    <div class="update">
        <div class="wrapper">
            <h1>백성의 화초를 수정하오</h1>
            <form @submit.prevent="handleClick">
                <div class="files">
                    <label for="cover">
                        <span>배경 그림을 넣으시오</span>
                        <div class="imgContainer">
                            <img :src="coverPreview" alt="">
                            <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                        </div>
                    </label>
                    <input type="file" id="cover" style="display: none" @change="handleCoverChange" />
                    <label for="profile">
                        <span>화초 그림을 넣으시오</span>
                        <div class="imgContainer">
                            <img :src="profilePreview" alt="" />
                            <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                        </div>
                    </label>
                    <input type="file" id="profile" style="display: none" @change="handleProfileChange" />
                </div>
                <label>서찰 주소</label>
                <input type="email" v-model="texts.email" />
                <label>암호</label>
                <input type="password" v-model="texts.password" />
                <label>호</label>
                <input type="text" v-model="tests.name" />
                <label>고을</label>
                <input type="text" v-model="texts.city" />
                <label>놀이판</label>
                <input type="text" v-model="texts.website" />
                <button type="submit">수정하오</button>
            </form>
            <button class="close" @click="setOpenUpdate(false)">나가오</button>
        </div>
    </div>
</template>

<script>
import { ref, useContext } from 'vue';
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export default {
    props: ['setOpenUpdate', 'user'],
    setup(props) {
        const cover = ref(null);
        const profile = ref(null);
        const texts = ref({
            email: props.user.email,
            password: props.user.password,
            name: props.user.name,
            city: props.user.city,
            website: props.user.website,
        });

        const coverPreview = ref(`/upload/${porps.user.coverPic}`);
        const profilePreview = ref(`/upload/${props.user.profilePic}`);

        const upload = async (file) => {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const res = await makeRequest.post("/upload", formData);
                return res.data;
            } catch (err) {
                console.log(err);
            }
        };

        const handleChange = (e) => {
            texts.value[e.target.name] = e.target.value;
        };

        const queryClient = useQueryClient();

        const mutation = useMutation(
            (user) => {
                return makeRequerst.put("/users", user);
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(["user"]);
                },
            }
        );

        const handleClick = async () => {
            // 커버 및 프로필 이미지가 변경된 경우 업로드
            let coverUrl = props.user.cover.Pic;
            let profileUrl = props.user.profilePic;

            if (cover.value) {
                coverUrl = await upload(cover.value);
            }
            if (profile.value) {
                profileUrl = await upload(profile.value);
            }

            mutation.mutate({ ...texts.value, coverPic: coverUrl, profilePic: profileUrl });
            props.setOpenUpdate(false);
        };

        const handleProfileChange = (e) => {
            const file = e.target.files[0];
            profile.value = file;
            profilePreview.value = URL.createObjectURL(file);
        };

        return {
            texts,
            coverPreview,
            profilePreview,
            handleClick,
            handleChange,
            handleCoverChange,
            handleProfileChange,
        };
    },
    components: {},
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

<style src="./Update.css"></style>