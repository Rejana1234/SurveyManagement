<template>
  <div>
    <section class="container">
      <div class="form">
        <div class="form-content">
          <header>
            <img src="../../assets/Logo/1.svg" alt="" style="width: 100px" />
          </header>

          <form v-on:submit.prevent="login">
            <div class="field input-field">
              <input
                type="email"
                name="email"
                v-model="loginData.email"
                placeholder="Email"
                class="input"
              />
            </div>

            <div class="field input-field">
              <input
                v-if="showPassword"
                type="text"
                name="password"
                v-model="loginData.password"
                class="password"
              />
              <input
                v-else
                type="password"
                name="password"
                v-model="loginData.password"
                placeholder="Password"
                class="password"
              />
              <!-- <i class="bx bx-hide eye-icon" @click="toggleShow"></i> -->
              <i
                class="bx eye-icon"
                :class="{ 'bx-hide': showPassword, 'bx-show': !showPassword }"
                @click="toggleShow"
              ></i>
            </div>

            <div class="form-link">
              <router-link class="forget-pass" to="/forget_password">
                Forget Password?
              </router-link>
            </div>

            <div class="field button-field">
              <button type="submit">Login</button>
            </div>
          </form>

          <div class="form-link">
            <span
              >Already have an account?
              <a href="" class="signup-link">Signup</a></span
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "MyLogin",
  title: "InterPort - Login",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      showPassword: false,
      loginData: {
        email: "",
        password: "",
      },

      errors: {},
    };
  },

  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    login: async function () {
      try {
        let formData = new FormData();
        formData.append("email", this.loginData.email);
        formData.append("password", this.loginData.password);

        await this.$store.dispatch("login", formData).then(() => {
          this.$router.push({ path: "/dashboard" });
          this.loginData = {};
        });
      } catch (e) {
        switch (e.response.status) {
          case 422:
            this.errors = e.response.data.errors;
            break;
          default:
            this.$swal.fire({
              icon: "error",
              text: "Invalid Email or Password",
              title: e.response.data.result,
            });
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200&display=swap");

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fbfefb;
}

.form {
  max-width: 430px;
  width: 100%;
  padding: 30px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 5px 5px 5px #f0eff5;
}

header {
  font-size: 28px;
  font-weight: 600;
  color: #232836;
  text-align: center;
}

form {
  margin-top: 30px;
}

.form .field {
  position: relative;
  height: 50px;
  width: 100%;
  margin-top: 20px;
  border-radius: 6px;
}

.field input,
.field button {
  height: 100%;
  width: 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  border-radius: 6px;
}

.field button {
  color: #fff;
  background-color: #0171d3;
  transition: all 0.3s ease;
  cursor: pointer;
}

.field button:hover {
  background-color: #016dcb;
}

.field input {
  outline: none;
  padding: 0 15px;
  border: 1px solid #cacaca;
}

.field input:focus {
  border-bottom-width: 2px;
}

.eye-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #8b8b8b;
  cursor: pointer;
  padding: 5px;
}

.form-link {
  text-align: center;
  margin-top: 10px;
}

.form-link span,
.form-link a {
  font-size: 14px;
  font-weight: 400;
  color: #232836;
}

.form a {
  color: #0171d3;
  text-decoration: none;
}

.form-content a:hover {
  text-decoration: underline;
}
.btn a {
  color: #f0f3f6;
  text-decoration: none;
}
.line {
  position: relative;
  height: 1px;
  width: 100%;
  margin: 36px 0;
  background-color: #d4d4d4;
}

.line::before {
  content: "or";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  color: #8b8b8b;
  padding: 0 15px;
}

.media-option a {
  display: flex;
  align-items: center;
  justify-content: center;
}

a.facebook {
  color: #fff;
  background-color: #4267b2;
}

a.facebook .facebook-icon {
  height: 28px;
  width: 28px;
  color: #0171d3;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.facebook-icon,
img.google-img {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
}

img.google-img {
  height: 20px;
  width: 20px;
  object-fit: cover;
}

a.google {
  border: 1px solid #7e9af4;
  background-color: #fbf8f6;
}

a.google span {
  font-weight: 500;
  opacity: 0.6;
  color: #232836;
}

@media screen and (max-width: 400px) {
  form {
    padding: 15px 10px;
  }
}
</style>
