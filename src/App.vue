<template>
  <div class="app">
    <div v-if="!auth">
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

    <div v-if="auth">
      <my-button
          @click="logout"
          style="margin: 15px 0;"
      >
        Logout
      </my-button>
    </div>

    <my-button v-if="auth"
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
        @update="openUpdatePost"
    />


    <my-dialog v-model:show="dialogUpdate">
      <post-form
          @create="changePost"
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

@Component({
  components: {
    MyButton,
    UserLogForm,
    UserForm,
    PostList,
    PostForm
  }
})
export default class extends Vue {
  post = usePostsStore().posts;
  user = useUserStore().profile;
  auth = false;
  dialog = false;
  dialogUpdate = false;
  dialogAuthLog = false;
  dialogAuthReg = false;
  postId = '';

  createPost(post: Post) {
    usePostsStore().createPost(this.user.id, post);
    this.dialog = false;
  }

  openUpdatePost(postId: string) {
    this.postId = postId;
    this.dialogUpdate = true;
  }

  changePost(post: Post) {
    usePostsStore().updatePost(this.user.id, this.postId, post);
    this.dialogUpdate = false;
  }

  mounted() {
    usePostsStore().getListPost()
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

  createUser(user: NewUser) {
    useUserStore().registration(user);
    this.dialogAuthReg = false;
    this.auth = true;
  }

  loginUser(user: LogUser) {
    useUserStore().login(user);
    this.dialogAuthLog = false;
    this.auth = true;
  }

  logout() {
    useUserStore().logout()
    this.auth = false;
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
