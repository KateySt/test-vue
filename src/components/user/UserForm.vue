<template>
  <form @submit.prevent>
    <h4>Creating user: </h4>
    <my-input
        v-focus
        v-model="user.name"
        type="text"
        placeholder="name"
    />
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
        @click="createUser"
    >
      Registration
    </my-button>
  </form>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-facing-decorator';
import {NewUser} from "@/components/interfaces/NewUser";

@Component
export default class UserForm extends Vue {
  @Prop() readonly userProps!: NewUser;

  user = {
    name: '',
    email: '',
    password: ''
  };

  createUser(): void {
    this.$emit('create', this.user);
    this.user.name = '';
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
