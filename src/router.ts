import HomeView from '@/views/MainView.vue';
import BlogView from '@/views/BlogView.vue';
import ContactsView from '@/views/ContactsView.vue';
import AboutView from '@/views/AboutView.vue';
import PostView from '@/views/PostView.vue';
import AdminView from '@/views/Admin/AdminView.vue';
import AdminBlogView from '@/views/Admin/AdminBlogView.vue';
import AdminHomeView from '@/views/Admin/AdminHomeView.vue';
import AdminContactsView from '@/views/Admin/AdminContactsView.vue';
import AdminAboutView from '@/views/Admin/AdminAboutView.vue';
import AdminBinView from '@/views/Admin/AdminBinView.vue';

import { createRouter, createWebHistory } from 'vue-router'
import AdminPostEditorView from './views/Admin/AdminPostEditorView.vue';
import { Post } from './models/PostModel';

const routes = [
  { path: '/', component: HomeView },
  { path: '/blog', component: BlogView },
  { path: '/blog/:id', component: PostView, props: true },
  { path: '/contacts', component: ContactsView },
  { path: '/about', component: AboutView },

  { path: '/admin', 
    component: AdminView,
    children: [
      {
        path: 'home',
        component: AdminHomeView,
      },
      {
        path: 'blog',
        component: AdminBlogView,
      },
      {
        path: 'blog/bin',
        component: AdminBinView,
      },
      {
        path: 'blog/:id',
        component: PostView,
      },
      {
        path: 'blog/:id/edit',
        component: AdminPostEditorView,
        props: true
      },
      {
        path: 'blog/new',
        component: AdminPostEditorView,
        props: true
      },
      {
        path: 'contacts',
        component: AdminContactsView,
      },
      {
        path: 'about',
        component: AdminAboutView,
      },
    ], },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})