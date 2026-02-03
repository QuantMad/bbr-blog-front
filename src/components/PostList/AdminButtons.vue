<script setup lang="ts">
import { MoveToBin, Publish, Unpublish } from '@/api_client/blog_admin_api';
import { Post } from '@/models/PostModel';
import { type Ref } from 'vue';

const emit = defineEmits<{
  (e: 'moved_to_bin', post: Post): void
}>()

const props = defineProps<{
  postData: Ref<Post>,
}>();

async function _Publish(id: number, state: boolean) {
    let post = props.postData.value;
    post.published = state ? 
    (await Publish(id)).status == 200 : 
    !((await Unpublish(id)).status == 200);
}

async function _MoveToBin() {
    let post = props.postData.value;
    if ((await MoveToBin(post.id)).status == 200) {
        emit('moved_to_bin', post);
    }
}

</script>

<template>
    <div v-if="postData.value">
        <button v-on:click="_Publish(postData.value.id, !postData.value.published)">
            {{ postData.value.published ? "Unpublish" : "Publish" }}
        </button>
        <RouterLink :to="'/admin/blog/' + postData.value.id + '/edit'"><button>Edit</button></RouterLink>
        <button v-on:click="_MoveToBin()">Delete</button>
    </div>
</template>
