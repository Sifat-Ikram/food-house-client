<template>
    <Navbar />
    <div class="w-11/12 mx-auto">
        <h1 class="my-10 text-3xl font-semibold">Ordered Food Item:</h1>
        <div class="grid w-11/12 grid-cols-1 gap-10 mx-auto lg:grid-cols-2">
            <div v-for="item in cartItem" :key="item.id">
                <div class="flex items-center gap-8 border-2 rounded-md">
                    <div>
                        <img :src="item.image" class="w-48 h-48 rounded-md" />
                    </div>
                    <div class="flex flex-col pt-5">
                        <h1>Recipe Name: {{ item.name }}</h1>
                        <h1>Category: {{ item.category }}</h1>
                        <h1>Price: {{ item.price }}</h1>
                        <button @click="deleteItem(item)"
                            class="w-20 mt-5 border-red-800 btn btn-outline hover:text-white hover:bg-red-800">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2';
import axiosPublic from '../../common/AxiosPublic.js'
import Navbar from '../../shared/Navbar.vue'

export default {
    name: "MyDashboard",
    components: {
        Navbar
    },
    data() {
        return {
            cartItem: []
        }
    },
    methods: {
        async fetchCartData() {
            try {
                const response = await axiosPublic.get('/cart');
                this.cartItem = response.data;
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        },
        async deleteItem(item) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axiosPublic.delete(`/cart/${item.id}`);
                    this.cartItem = this.cartItem.filter(cartItem => cartItem.id !== item.id)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Deleted Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });

        }
    },
    created() {
        this.fetchCartData();
    }
}
</script>