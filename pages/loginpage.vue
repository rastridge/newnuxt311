<template>
  <div id="loginpage">
    <div class="topsectioncenter">
      <div
        v-if="!auth.isLoggedIn"
        class="topsectionitem p-3"
      >
        <div class="text-center mb-5">
          <div class="md:text-xl font-medium mb-3">Login Admin User</div>
        </div>
        <FormKit
          type="form"
          submit-label="Login"
          @submit="handleSubmit"
        >
          <display-alert />
          <FormKit
            type="text"
            name="username"
            label="Username"
            validation="length:3"
            validation-visibility="live"
            :validation-messages="{
              matches: 'Username must be at least 3 chars',
            }"
          />
          <FormKit
            type="password"
            name="password"
            label="Password"
            validation="length:5"
            validation-visibility="live"
            :validation-messages="{
              matches: 'Password must be at least 5 chars',
            }"
          />

          <div class="flex align-items-center justify-content-between mb-6">
            <nuxt-link
              to="/resetpassword"
              class="text-sm no-underline ml-2 text-blue-500 text-right cursor-pointer"
              active-class="active"
              ><a>Forgot password?</a></nuxt-link
            >
          </div>
        </FormKit>
        <display-cancelform />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()

  const handleSubmit = async (state) => {
    if (state.username && state.password) {
      auth.login(state.username, state.password) // pinia auth store
    }
  }
</script>
