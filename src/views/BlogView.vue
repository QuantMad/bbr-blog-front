<script setup lang="ts">
    import { GetPosts } from "@/api_client/blog_api";
    import PostList from "@/components/PostList/PostList.vue";
    import { Post } from "@/models/PostModel"
    import { onMounted, ref } from "vue";

const posts = ref<Array<Post>>();

onMounted(async () => {
  posts.value = (await GetPosts()).data;
})

</script>

<template>
  <p v-if="posts">
    <PostList :posts="ref(posts)"/>
  </p>
  <div v-else>
    No posts to show
  </div>
</template>

<style scoped>

</style>
