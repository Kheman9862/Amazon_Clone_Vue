<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2 class="text-center">Profile Page {{ $auth.$state.user.name }}</h2>
          <a href="#" @click="onLogout">Logout</a>
          <form action>
            <!-- Name -->
            <div class="a-spacing-top-medium">
              <label style="margin-bottom:0px;">Name</label>
              <input
                v-model="name"
                type="text"
                class="a-input-text"
                style="width:100%"
                :placeholder="$auth.$state.user.name"
              />
            </div>
            <!-- Email -->
            <div class="a-spacing-top-medium">
              <label style="margin-bottom:0px;">E-mail</label>
              <input
                v-model="email"
                type="email"
                class="a-input-text"
                style="width:100%"
                :placeholder="$auth.$state.user.email"
              />
            </div>

            <!-- Password -->
            <div class="a-spacing-top-medium">
              <label style="margin-bottom:0px;">Password</label>
              <input v-model="password" type="password" class="a-input-text" style="width:100%" />
            </div>

            <hr />
            <!-- Button Submit -->
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onUpdateProfile">Update</span>
                </span>
              </span>
            </div>
          </form>
          <br />
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async onUpdateProfile() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        let response = await this.$axios.$put("/api/auth/user", data);
        if (response.success) {
          this.name = "";
          this.email = "";
          this.password = "";
          await this.$auth.fetchUser();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onLogout() {
      await this.$auth.logout();
    }
  }
};
</script>