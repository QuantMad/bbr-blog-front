<script setup lang="ts">

</script>

<template>
    <div>
        <RouterLink to="/admin/home">Home</RouterLink>
        <RouterLink to="/admin/blog">Blog</RouterLink>
        <RouterLink to="/admin/about">About</RouterLink>
        <RouterLink to="/admin/contacts">Contacts</RouterLink>

        <RouterView/>
    </div>
</template>
