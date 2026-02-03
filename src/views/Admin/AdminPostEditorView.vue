<script setup lang="ts">
    import { CreatePost, EditPost, GetPost } from "@/api_client/blog_admin_api";
    import { Post } from "@/models/PostModel"
import { router } from "@/router";
    import { onMounted, ref, type Ref } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const id = route.fullPath != "/admin/blog/new" ? route.params.id as unknown as number : 0;

    const postData = ref<Post>();

    onMounted(async () => {
        _GetPost();
    })

    async function _GetPost() {
        postData.value = id != 0 ? (await GetPost(id)).data : new Post(0, "title", "content", false);
    }

    async function Submit() {
        if (!postData.value) return;

        let post = postData.value;

        let isNewPost: boolean = post.id == 0;

        if (isNewPost) {
            let newPost = (await CreatePost(post)).data;
            router.push("/admin/blog/" + newPost.id + "/edit");
        } else {
            let result = await EditPost(post.id, post);
            if (result.status == 200) {
                post = result.data;
            }
        }
    }

</script>

<template>
    <p v-if="postData">
        <input type="text" v-model="postData.title"></input>
        <textarea v-model="postData.content"></textarea>
        <button v-on:click="Submit()">Подтвердить</button>
    </p>
</template>

<style scoped>
textarea {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
}
</style>
