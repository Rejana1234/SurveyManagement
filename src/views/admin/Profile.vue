<template>
  <div id="profile">
    <div class="card">
      <form action="" v-on:submit.prevent="profileUpdate">
        <h2>Profile Update</h2>
        <div class="profile_row">
          <div class="user_image">
            <div class="profile_image" v-if="preview">
              <img
                :src="preview"
                alt=""
                style="width: 100%; height: 250px; border-radius: 5%"
              />
            </div>

            <div class="profile_image" v-else>
              <img
                :src="user_info.image"
                alt=""
                style="width: 100%; height: 250px; border-radius: 5%"
              />
            </div>

            <input
              type="file"
              name="image"
              id="file"
              ref="userImage"
              @change="previewImage"
            />
            <label for="file">choose image file</label>
          </div>
          <div>
            <div class="user_signature">
              <div class="profile_signature" v-if="preview_signature">
                <img
                  :src="preview_signature"
                  alt=""
                  style="width: 100%; height: 250px; border-radius: 5%"
                />
              </div>

              <div class="profile_signature" v-else>
                <img
                  :src="user_info.signature"
                  alt=""
                  style="width: 100%; height: 250px; border-radius: 5%"
                />
              </div>
              <input
                type="file"
                name="signature"
                id="file1"
                ref="userSignature"
                @change="previewSignature"
              />
              <label for="file1">choose signature file</label>
            </div>
          </div>
          <div class="user_information">
            <div class="row">
              <div class="col-25">
                <label>Name</label>
              </div>
              <div class="col-75">
                <input
                  type="text"
                  v-model="user_info.name"
                  id="name"
                  name="name"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-25">
                <label>Email</label>
              </div>
              <div class="col-75">
                <input
                  disabled
                  type="email"
                  v-model="user_info.email"
                  id="email"
                  name="email"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-25">
                <label>Phone</label>
              </div>
              <div class="col-75">
                <input
                  type="text"
                  v-model="user_info.phone"
                  id="phone"
                  name="phone"
                />
              </div>
            </div>

            <div class="row" style="margin-top: 20px">
              <input type="submit" value="Save" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "InterPortProfile",
  title: "InterPort - Profile",

  data() {
    return {
      preview: null,
      preview_signature: null,
      //   signature: "",
      //   image: "",
      user_Info: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("token"),
    };
  },

  computed: {
    ...mapState({
      user_info: (state) => state.edit_user_info,
      message: (state) => state.success_message,
    }),
  },

  mounted() {
    this.user_edit(this.user_Info.id);
    // this.image = this.user_Info.image + '<?=base64_encode($Data)?>';
    // this.signature = this.user_Info.signature;
    // console.log(this.image);
  },

  methods: {
    ...mapActions({
      user_edit: "edit_user",
    }),

    previewImage: function (event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    previewSignature: function (event) {
      //   console.log("object");
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview_signature = e.target.result;
        };
        this.signature = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    profileUpdate: async function () {
      try {
        let formData = new FormData();
        // this.image= this.user_Info.image;

        formData.append("name", this.user_info.name);
        formData.append("email", this.user_info.email);
        formData.append("phone", this.user_info.phone);
        if (this.preview || this.preview_signature) {
          formData.append("image", this.image);
          formData.append("signature", this.signature);
        }

        // formData.append('user_type', this.user_data.user_type);
        formData.append("token", this.token);

        await this.$store.dispatch("profile_update", formData).then(() => {
          this.$swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: this.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
#profile {
  padding: 0px 5px 0px 5px;
  margin: 0px 15px 0px 15px;
}

.profile_row {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1.5rem;
}

.user_image {
  width: 100%;
  text-align: center;
  justify-content: center;
  margin-top: 15px;
}
.user_signature {
  width: 100%;
  text-align: center;
  justify-content: center;
  margin-top: 15px;
}

.profile_image {
  width: 50%;
  height: 250px;
  border: 1px solid var(--color-gray-light);
  border-radius: 5%;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 10px;
}
.profile_signature {
  width: 50%;
  height: 250px;
  border: 1px solid var(--color-gray-light);
  border-radius: 5%;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 10px;
}

.user_image [type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

.user_image [type="file"] + label {
  background: #f15d22;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Rubik", sans-serif;
  font-size: inherit;
  font-weight: 500;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;
}

.user_signature [type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

.user_signature [type="file"] + label {
  background: #f15d22;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Rubik", sans-serif;
  font-size: inherit;
  font-weight: 500;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;
}

.user_information {
  width: 100%;
}
</style>
