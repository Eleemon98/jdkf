<template>
  <div class="home">
    <!-- <Stories/>
    <Share/> -->
    <Posts/>
  </div>
</template>

<script>
import Posts from '@/components/posts/PostsComponents.vue';

export default {
  name: 'HomeView',
  components: {
    Posts
  }
}
</script>

<style src="./css/home.css"></style>
