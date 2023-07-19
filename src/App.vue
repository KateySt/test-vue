<template>
  <div class="app">
    <div v-if="!user.token">
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
        v-if="user.token"
        @click="logout"
        style="margin: 15px 0;"
    >
      Logout
    </my-button>

    <my-button
        v-if="user.token"
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
        :userId="getUserId()"
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
import {NewPost} from "@/components/interfaces/NewPost";
import jwt_decode from "jwt-decode";

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

  async createPost(post: NewPost) {
    await usePostsStore().createPost({
      title: post.title,
      body: post.body,
      authorId: this.getUserId(),
    });
    this.post = usePostsStore().posts;
    this.dialog = false;
  }

  openUpdatePost(post: Post) {
    this.oldPost = post;
    if (post.userId === this.getUserId()) {
      this.dialogUpdate = true;
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getUserId() {
    if (this.user.token)
      return this.getDecodedAccessToken(this.user.token).sub;
  }

  async changePost(post: Post) {
    await usePostsStore().updatePost({
      postId: this.oldPost.postId,
      title: post.title,
      body: post.body,
      userId: this.oldPost.userId,
      dateCreated: this.oldPost.dateCreated
    });
    this.post = usePostsStore().posts;
    this.dialogUpdate = false;
  }

  async mounted() {
    this.isPostLoading = true;
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      this.user = JSON.parse(storedProfile);
    }
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
