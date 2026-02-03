<script setup lang="ts">
import { DeleteFromBin, RestoreFromBin} from '@/api_client/blog_admin_api';
import { Post } from '@/models/PostModel';
import { type Ref } from 'vue';

const emit = defineEmits<{
  (e: 'restored', post: Post): void
  (e: 'deleted_permanently', post: Post): void
}>()

const props = defineProps<{
  postData: Ref<Post>,
}>();

async function _RestoreFromBin() {
    let post = props.postData.value;

    let result = await RestoreFromBin(post.id);
    if (result.status == 200) {
        emit('restored', post);
    }
}

async function _DeleteFromBin() {
    let post = props.postData.value;

    let result = await DeleteFromBin(post.id);
    if (result.status == 200) {
        emit('deleted_permanently', post);
    }
}

</script>

<template>
    <div v-if="postData">
        <button v-on:click="_RestoreFromBin()">
            Restore
        </button>
        <button v-on:click="_DeleteFromBin()">
            Delete permanently
        </button>
        
    </div>
</template>
