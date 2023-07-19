<template>
  <div class="post">
    <div>
      <div><strong>Title:</strong> {{ post.title }}</div>
      <div><strong>Text:</strong> {{ post.body }}</div>
      <div><strong>Data:</strong>{{ post.dateCreated }}</div>
    </div>
    <div class="post__btns">
      <my-button
          v-if="userId===post.userId"
          @click="$emit('update', post.postId)"
      >
        Change post
      </my-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Post} from '../../interfaces/Post';
import {Component, Prop, Vue} from "vue-facing-decorator";

@Component
export default class PostItem extends Vue {
  @Prop() readonly post!: Post;
  @Prop() readonly userId!: string;
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
}
</style>