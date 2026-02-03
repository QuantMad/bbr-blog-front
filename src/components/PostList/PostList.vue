<script setup lang="ts">

import { Post } from "@/models/PostModel"
import PostListItem from "./PostListItem.vue";
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import AdminButtons from "./AdminButtons.vue";
import AdminBinButtons from "./AdminButtonsBin.vue";

const route = useRoute();

enum PostListLocation {
  Blog,
  Admin,
  Bin,
  Undefined
}

const props = defineProps<{
  posts: Ref<Array<Post>>
}>()

function defineLocation(): PostListLocation {
  switch(route.fullPath) {
    case "/blog": return PostListLocation.Blog;
    case "/admin/blog": return PostListLocation.Admin;
    case "/admin/blog/bin": return PostListLocation.Bin;
    default: return PostListLocation.Undefined;
  }
}

const location = ref<PostListLocation>();

  onMounted(() => {
    location.value = defineLocation();
  })

function delete_from_list(post:Post) {
  let posts = props.posts.value;
  const index = posts.indexOf(post, 0);
  if (index > -1) {
    props.posts.value.splice(index, 1);
  }
}

</script>

<template>
  <p v-if="location == PostListLocation.Admin">
    <PostListItem v-for="post in posts.value" :post-data="ref(post)" :to="'/admin/blog/' + post.id">
      <template #extra_controls>
        <AdminButtons :post-data="ref(post)" v-on:moved_to_bin="delete_from_list"></AdminButtons>
      </template>
    </PostListItem>
  </p>
  <p v-else-if="location == PostListLocation.Bin">
    <PostListItem v-for="post in posts.value" :post-data="ref(post)" :to="'/admin/blog/' + post.id">
      <template #extra_controls>
        <AdminBinButtons :post-data="ref(post)" v-on:restored="delete_from_list" v-on:deleted_permanently="delete_from_list"></AdminBinButtons>
      </template>
    </PostListItem>
  </p>
  <p v-else-if="location == PostListLocation.Blog">
    <PostListItem v-for="post in posts.value" :post-data="ref(post)" :to="'/blog/' + post.id">
      <template #extra_controls>
      </template>
    </PostListItem>
  </p>
  <p v-else="">
    Здесь не должно этого быть...
  </p>
    
</template>
