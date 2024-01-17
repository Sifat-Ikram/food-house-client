<template>
    <div class="navbar hover:bg-[#0326C2] bg-[#0326C2]">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="text-white btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="0"
                    class="menu text-white bg-[#0326C2] menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                    <li v-for="(item, index) in navbarItems" :key="index">
                        <a class="text-xl font-bold text-white" :href="item.link">{{ item.label }}</a>
                    </li>
                </ul>
            </div>
            <a href="/" class="text-4xl text-white btn btn-ghost">Food House</a>
        </div>
        <div class="hidden navbar-center lg:flex">
            <ul class="px-1 menu menu-horizontal">
                <li v-for="(item, index) in navbarItems" :key="index">
                    <a class="text-xl font-bold text-white" :href="item.link">{{ item.label }}</a>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <button class="btn btn-primary" @click.prevent="signOut" v-if="signedIn">Sign out</button>
            <router-link v-if="!signedIn" to="/signIn" class="btn btn-primary">Sign in</router-link>
        </div>
    </div>
</template>

<script>
import { logOut, authState } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
export default {
    name: 'NavBar',
    data() {
        
        return {
            signedIn : true,
            navbarItems: [
                { label: 'Home', link: '/' },
                { label: 'Menu', link: '/fullMenu' },
                { label: 'Contact Us', link: '/contactUs' },
            ]
        };
    },
    methods: {
        handleAuthState(user) {
            console.log(user);
            this.signedIn = user;
            if (this.signedIn) {
                this.navbarItems.push({ label: 'Dashboard', link: '/myDashboard' });
            }
        },
        async signOut() {
            try {
                await logOut()
                console.log('User signed out successfully!');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are signed out",
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                console.error('Error signing up:', error);
            }
        },
    },
    mounted() {
        this.unsubscribeAuthState = authState(this.handleAuthState);
    }
}
</script>