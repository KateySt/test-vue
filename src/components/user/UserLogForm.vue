<template>
  <form @submit.prevent>
    <h4>Login: </h4>
    <my-input
        v-model="user.email"
        type="email"
        placeholder="email"
    />
    <my-input
        v-model="user.password"
        type="password"
        placeholder="password"
    />
    <my-button
        style="align-self: flex-end; margin-top: 15px"
        @click="loginUser"
    >
      Login
    </my-button>
  </form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-facing-decorator';
import {LogUser} from "@/components/interfaces/LogUser";

@Component
export default class UserForm extends Vue {
  @Prop() readonly userProps!: LogUser;

  user = {
    email: '',
    password: ''
  };

  loginUser(): void {
    this.$emit('create', this.user);
    this.user.email = '';
    this.user.password = '';
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
