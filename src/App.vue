<template>
  <div class="app">
    <div v-if="!user.userId">
      <my-button
          @click="showLogin"
          style="margin: 15px 0;"
      >
        Login
      </my-button>
      <my-dialog v-model:show="dialogAuthLog">
        <user-log-form
            @create="loginUser"
        />
      </my-dialog>
      <my-button
          @click="showRegist"
          style="margin: 15px 0;"
      >
        Registration
      </my-button>
      <my-dialog v-model:show="dialogAuthReg">
        <user-form
            @create="createUser"
        />
      </my-dialog>
    </div>

    <my-button
        v-if="user.userId"
        @click="logout"
        style="margin: 15px 0;"
    >
      Logout
    </my-button>

    <my-button
        v-if="user.userId"
        @click="showDialog"
        style="margin: 15px 0;"
    >
      Creat post
    </my-button>
    <my-dialog v-model:show="dialog">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <post-list
        :posts="post"
        :userId="user.userId"
        @update="openUpdatePost"
        v-if="!isPostLoading"
    />
    <div v-else-if="isPostLoading">Loading...</div>

    <my-dialog
        v-model:show="dialogUpdate"
    >
      <post-form
          @create="changePost"
          :post="oldPost"
      />
    </my-dialog>

  </div>
</template>

<script lang="ts">
import PostList from "./components/posts/PostList.vue";
import PostForm from "./components/posts/PostForm.vue";
import {usePostsStore} from "@/store/PostStore";
import {useUserStore} from "@/store/UserStore";
import {Component, Vue} from "vue-facing-decorator";
import {Post} from "@/components/interfaces/Post";
import UserForm from "@/components/user/UserForm.vue";
import UserLogForm from "@/components/user/UserLogForm.vue";
import {NewUser} from "@/components/interfaces/NewUser";
import {LogUser} from "@/components/interfaces/LogUser";
import MyButton from "@/components/UI/MyButton.vue";
import {Profile} from "@/components/interfaces/Profile";

@Component({
  components: {
    MyButton,
    UserLogForm,
    UserForm,
    PostList,
    PostForm
  }
})
export default class App extends Vue {
  post: Post[] = usePostsStore().posts;
  user = {} as Profile;
  dialog = false;
  dialogUpdate = false;
  dialogAuthLog = false;
  dialogAuthReg = false;
  isPostLoading = false;
  oldPost = {} as Post;

  async createPost(post: Post) {
    await usePostsStore().createPost(useUserStore().profile.userId, post);
    this.post = usePostsStore().posts;
    this.dialog = false;

  }

  openUpdatePost(post: Post) {
    this.oldPost = post;
    if (post.userId === useUserStore().profile.userId) {
      this.dialogUpdate = true;
    }
  }

  async changePost(post: Post) {
    await usePostsStore().updatePost(useUserStore().profile.userId, this.oldPost.postId, post);
    this.post = usePostsStore().posts;
    this.dialogUpdate = false;
  }

  async mounted() {
    this.isPostLoading = true;
    await usePostsStore().getListPost();
    this.post = usePostsStore().posts;
    this.isPostLoading = false;
  }

  showDialog() {
    this.dialog = true;
  }

  showLogin() {
    this.dialogAuthLog = true;
  }

  showRegist() {
    this.dialogAuthReg = true;
  }

  async createUser(user: NewUser) {
    await useUserStore().registration(user);
    this.user = useUserStore().profile;
    this.dialogAuthReg = false;
  }

  async loginUser(user: LogUser) {
    await useUserStore().login(user);
    this.user = useUserStore().profile;
    this.dialogAuthLog = false;
  }

  logout() {
    useUserStore().logout();
    this.user = useUserStore().profile;
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
