<script setup lang="ts">
    import { Post } from "@/models/PostModel"
    import { type Ref } from "vue";

    const props = defineProps<{
        postData: Ref<Post>,
        to: string
    }>()

</script>

<template>
    <div class="post_body">
         <div class="post_header">
        <RouterLink :to="to" >
           {{ postData.value.id + ": " + postData.value.title }}
        </RouterLink>
        <slot name="extra_controls"></slot>
        </div>
        <div class="post_content">{{ postData.value.content.substring(0, 100) + " ..." }}</div>
    </div>
</template>

<style scoped>

.post_body {
    background-color: chocolate;
    margin-bottom: 2%;
    padding: 1%;
}

.post_header {
    background-color: blueviolet;
    margin-bottom: 1%;
    padding-left: 1%;
    margin-right: 2%;
}

.post_content {
    background-color: cadetblue;
    padding: 1%;
    margin-left: 2%;
}

a {
    display: block;
    font-size: large;
}

</style>
