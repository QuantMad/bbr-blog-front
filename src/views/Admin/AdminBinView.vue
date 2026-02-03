<script setup lang="ts">
import { GetPostsInBin } from '@/api_client/blog_admin_api';
import type { Post } from '@/models/PostModel';
import { onMounted, ref } from 'vue';
import PostList from '@/components/PostList/PostList.vue';
import AdminBinButtons from '@/components/PostList/AdminBinButtons.vue';

const posts = ref<Array<Post>>();

onMounted(async () => {
  posts.value = (await GetPostsInBin()).data;
})
</script>

<template>
    <p v-if="posts">
        <PostList :posts="ref(posts)"/>
    </p>
</template>
