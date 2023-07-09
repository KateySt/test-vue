<template>
  <div v-if="posts.length > 0">
    <h3>List posts</h3>
    <transition-group name="user-list">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.postId"
          @click="$emit('update', post.postId)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">
    List post is empty
  </h2>
</template>

<script lang="ts">
import PostItem from "./PostItem.vue";
import {Component, Prop, Vue} from "vue-facing-decorator";

@Component({
  components: {
    PostItem
  }
})
export default class PostList extends Vue {
  @Prop() readonly posts!: [];
}
</script>

<style scoped>
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}

.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.4s ease;
}

.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.user-list-move {
  transition: transform 0.4s ease;
}
</style>