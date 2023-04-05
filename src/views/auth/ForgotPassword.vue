<template>
    <div>
        <section class="container">
            <div class="form">
                <div class="form-content">
                    <header>
                        <img src="../../assets/Logo/1.svg" alt="" style="width: 100px">
                    </header>

                    <form v-on:submit.prevent="forgetPassword">
                        <div class="field input-field">
                            <input type="email" name="email" v-model="forget_pass_data.email" placeholder="Enter Email" class="input">
                        </div>

                        <div class="field button-field">
                            <button type="submit">Reset password</button>
                        </div>
                    </form>

                </div>

            </div>
        </section>

    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        name: 'MyLogin',
        title: 'InterPort - Forget Password',

        data() {
            return {
                forget_pass_data:{
                    email: ''
                }
            }
        },
        computed: {
            ...mapState({
                message: state => state.success_message
            })
        },

        methods: {
            forgetPassword: async function(){
                try {
                    let formData = new FormData();

                    formData.append('email', this.forget_pass_data.email);

                    await this.$store.dispatch('forget_password', formData).then(() => {
                        this.$swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: 'Reset password link send your email!please check inbox',
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        this.forget_pass_data={};
                    })
                }catch (e) {
                    console.log(e);
                }
            }
        }
    };
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200&display=swap');

    *{
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container{
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fbfefb;
    }

    .form{
        max-width: 430px;
        width: 100%;
        padding: 30px;
        border-radius: 6px;
        background-color: #fff;
        box-shadow: 0 5px 5px 5px #f0eff5;
    }

    header{
        font-size: 28px;
        font-weight: 600;
        color: #232836;
        text-align: center;
    }

    form{
        margin-top: 30px;
    }

    .form .field{
        position: relative;
        height: 50px;
        width: 100%;
        margin-top: 20px;
        border-radius: 6px;
    }

    .field input,
    .field button{
        height: 100%;
        width: 100%;
        border: none;
        font-size: 16px;
        font-weight: 400;
        border-radius: 6px;
    }
    .field button{
        color: #fff;
        background-color: #0171d3;
        transition: all 0.3s ease;
        cursor: pointer;
        border: 1px solid #86848c;
    }

    .field button:hover{
        background-color: #1177ff;
        color: white;
    }

    .field input{
        outline: none;
        padding: 0 15px;
        border: 1px solid #CACACA;
    }

    .field input:focus{
        border-bottom-width: 2px;
    }

    .eye-icon{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 18px;
        color: #8b8b8b;
        cursor: pointer;
        padding: 5px;
    }

    .form-link{
        text-align: center;
        margin-top: 10px;
    }

    .form-link span,
    .form-link a{
        font-size: 14px;
        font-weight: 400;
        color: #232836;
    }

    .form a{
        color: #0171d3;
        text-decoration: none;
    }

    .form-content a:hover{
        text-decoration: underline;
    }
    .btn a{
        color: #f0f3f6;
        text-decoration: none;
    }
    .line{
        position: relative;
        height: 1px;
        width: 100%;
        margin: 36px 0;
        background-color: #d4d4d4;
    }

    .line::before{
        content: 'or';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #FFF;
        color: #8b8b8b;
        padding: 0 15px;
    }

    .media-option a{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a.facebook{
        color: #fff;
        background-color: #4267b2;
    }

    a.facebook .facebook-icon{
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
    img.google-img{
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
    }

    img.google-img{
        height: 20px;
        width: 20px;
        object-fit: cover;
    }

    a.google{
        border: 1px solid #7e9af4;
        background-color: #fbf8f6;
    }

    a.google span{
        font-weight: 500;
        opacity: 0.6;
        color: #232836;
    }

    @media screen and (max-width: 400px) {

        form{
            padding: 15px 10px;
        }

    }
</style>