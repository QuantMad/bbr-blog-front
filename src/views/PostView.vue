<script setup lang="ts">
import { GetPost } from '@/api_client/blog_api';
import { GetPost as admGetPost} from '@/api_client/blog_admin_api';
import type { Post } from '@/models/PostModel';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const post = ref<Post>();
const id = route.params.id as unknown as number;

const isAdminView = route.fullPath.includes('/admin/blog');

onMounted(async () => {
  post.value = (isAdminView ? (await admGetPost(id)) : (await GetPost(id))).data;
})

</script>

<template>
  <p v-if="post">
    <div>
        <h1>{{ post.title }}</h1>
        <div>{{ post.content }}</div>
    </div>
  </p>
  <p v-else>
    <div>
      Failed to load post with id: {{ id }}
    </div>
  </p>
</template>
