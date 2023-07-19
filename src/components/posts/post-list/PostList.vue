<template>
  <div v-if="posts.length>0">
    <h3>List posts</h3>
    <transition-group name="user-list">
      <post-item
          v-for="post in posts"
          :post="post"
          :userId="userId"
          :key="post.postId"
          @click="$emit('update', post)"
      />
    </transition-group>
  </div>
  <div v-else><strong>Number of posts:</strong> {{ posts.length }}</div>
</template>

<script lang="ts">
import PostItem from "../post-item/PostItem.vue";
import {Component, Prop, Vue} from "vue-facing-decorator";

@Component({
  components: {
    PostItem
  }
})
export default class PostList extends Vue {
  @Prop() readonly posts!: [];
  @Prop() readonly userId!: string;
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