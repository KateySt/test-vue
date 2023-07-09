<template>
  <form @submit.prevent>
    <h4>Creating post: </h4>
    <my-input
        v-focus
        v-model="newPost.title"
        type="text"
        placeholder="title"
    />
    <my-input
        v-model="newPost.body"
        type="text"
        placeholder="text"
    />
    <my-button
        style="align-self: flex-end; margin-top: 15px"
        @click="createPost"
    >
      Create
    </my-button>
  </form>
</template>

<script lang="ts">
import { Post } from '@/components/interfaces/Post';
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component
export default class PostForm extends Vue {
  @Prop() readonly post!: Post;

  newPost = {
    title: '',
    body: '',
  };

  createPost(): void {
    this.$emit('create', this.newPost);
    this.newPost.title = '';
    this.newPost.body = '';
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
