<template>
    <Navbar />
    <div class="min-h-screen bg-base-200">
        <div class="flex-col space-y-10 hero-content">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">SignIn now!</h1>
            </div>
            <div class="w-1/2 mx-auto shadow-2xl card shrink-0 bg-base-100">
                <form class="card-body">
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
                    <div class="mt-6 form-control">
                        <button @click.prevent="signIn" class="btn btn-primary">SignIn</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../../shared/Navbar.vue"
import { signIn } from "../../provider/AuthProvider"
import Swal from "sweetalert2"
export default {
    name: 'SignIn',
    components: { Navbar },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async signIn() {
            try {
                await signIn(this.email, this.password)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully signed in",
                    showConfirmButton: false,
                    timer: 1000
                });
                this.$router.push('/');
            } catch (error) {
                console.error('Error signing up:', error);
            }
        }
    }
}
</script>