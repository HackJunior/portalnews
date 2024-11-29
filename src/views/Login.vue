<template>
  <div class="login-view">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/AdminPanel/LoginForm.vue";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa; /* Background light gray for contrast */
}
</style>
