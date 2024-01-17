<template>
    <Navbar />
    <div class="min-h-screen bg-base-200">
        <div class="hero-content flex-col space-y-10">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Signup now!</h1>
            </div>
            <div class="card shrink-0 shadow-2xl bg-base-100 w-1/2 mx-auto">
                <form class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Full Name</span>
                        </label>
                        <input type="text" v-model="name" placeholder="Enter Your Full Name" class="input input-bordered"
                            required />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="email" v-model="email" placeholder="Enter Your email" class="input input-bordered"
                            required />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="password" v-model="password" placeholder="Enter password" class="input input-bordered"
                            required />
                    </div>
                    <div class="form-control mt-6">
                        <button @click.prevent="signUp" class="btn btn-primary">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../../shared/Navbar.vue"
import { register } from "../../provider/AuthProvider"
import axiosPublic from "@/components/common/AxiosPublic"
import Swal from "sweetalert2"
export default {
    name: 'SignUp',
    components: { Navbar },
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async signUp() {
            try {
                const userInfo = {
                    "name" : this.name,
                    "email": this.email,
                    "password": this.password
                }
                await register(this.email, this.password)
                axiosPublic.post('/user', userInfo)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are signed up",
                    showConfirmButton: false,
                    timer: 1500
                });
                this.$router.push('/');
            } catch (error) {
                console.error('Error signing up:', error);
            }
            
        }
    }
}
</script>