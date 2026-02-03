<script setup lang="ts">

</script>

<template>
    <div class="nav">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/blog">Блог</RouterLink>
        <RouterLink to="/about">Обо мне</RouterLink>
        <RouterLink to="/contacts">Контакты</RouterLink>
    </div>

</template>

<style scoped>

    .nav {
        background-color: aquamarine; 
        font-size: x-large;
        display: flex;
        outline: 4px solid #9c04d4;
        outline-offset: 5px;
        margin: 10px;
    }

    .nav div {
        width: 15%;
        text-align: center;
    }

    .nav a {
        background-color: bisque;
        display: block;
        text-align: center;
        width: 16%;
        padding-left: 1%;
        padding-right: 1%;
    }

    @media(hover: hover) { 
        .nav a:hover {
            background-color: darkmagenta;
        }
    }

</style>