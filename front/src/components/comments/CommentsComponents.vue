<template>
    <div class="comments">
        <div class="write">
            <img :src="'/upload/' + currentUser.profilePic" alt="" />
            <input type="text" placeholder="답글을 써주시오." v-model="desc" />
            <button @click="handleClick">올리기</button>
        </div>
        <div v-if="error">뭔가 잘못됐소</div>
        <div v-else-if="isLoading">무언가 다가오고 있소.</div>
        <div v-else>
            <div :key="comment.id" v-for="comment in data" class="comment">
                <img :src="'/upload/' + comment.profilePic" alt="" />
                <div class="info">
                    <span>{{ comment.name }}</span>
                    <p>{{ comment.desc }}</p>
                </div>
                <span class="date">{{ formatTimestamp(comment.createdAt) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { makeRequest } from '../../axios';
import moment from 'moment';

export default {
    props: ['postId'],
    setup(props) {
        const desc = ref('');        
        const queryClient = useQueryClient();

        const { isLoading, error, data } = useQuery(
            ['comments'],
            () => makeRequest.get('/comments?postId=' + props.postId).then((res) => res.data)
        );

        const mutation = useMutation(
            (newComment) => makeRequest.post('/comments', newComment),
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['comments']);
                },
            }
        );

        const handleCLick = async () => {
            mutation.mutate({ desc: desc.value, postId: props.postId });
            desc.value = '';
        };

        const formatTimestamp = (timestamp) => moment(timestamp).fromNow();

        return {
            desc,            
            isLoading,
            error,
            data,
            handleCLick,
            formatTimestamp,
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

<style src="./comments.css"></style>