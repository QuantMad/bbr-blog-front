<script setup lang="ts">
import { GetPosts } from '@/api_client/blog_admin_api';
import PostList from '@/components/PostList/PostList.vue';
import { onMounted, ref } from 'vue';
import type { Post } from '@/models/PostModel';

const posts = ref<Array<Post>>();

onMounted(async () => {
  posts.value = (await GetPosts()).data;
})
</script>

<template>
    <div>
        <RouterLink to="/admin/blog/new"><button>New post</button></RouterLink>
        <RouterLink to="/admin/blog/bin"><button>Bin</button></RouterLink>
        <p v-if="posts">
            <PostList :posts="ref(posts)"/>
        </p>
        <div v-else>
            No posts to show
        </div>
    </div>
</template>
