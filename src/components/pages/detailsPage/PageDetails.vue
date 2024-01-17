<template>
    <div>
        <Navbar />
        <div v-for="item in menuData" :key="item._id" class="w-4/5 mx-auto space-y-10 mt-10">
            <img :src="item.image" class="w-full mx-auto h-[350px]" />
            <div class="space-y-5">
                <div class="flex justify-between">
                    <h1>Name: {{ item.name }}</h1>
                    <button @click="orderItem(item)" class="btn btn-primary">Add to Cart</button>
                </div>
                <h1>Category: {{ item.category }}</h1>
                <h1>Price: ${{ item.price }}</h1>
                <h1>Recipe Details: {{ item.recipe }}</h1>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '@/components/shared/Navbar.vue';
import axiosPublic from '@/components/common/AxiosPublic';
import Swal from 'sweetalert2';

export default {
    name: 'PageDetails',
    components: {
        Navbar
    },
    data() {
        return {
            menuData: []
        }
    },
    mounted() {
        const id = this.$route.params._id;
        this.fetchMenuData(id);
    },
    methods: {
        async fetchMenuData(_id) {
            const response = await axiosPublic('/menu', { params: { _id } });

            this.menuData = response.data;
        },
        async orderItem(item) {
            const cartInfo = {
                "itemId": item._id,
                "name": item.name,
                "image": item.image,
                "category": item.category,
                "price": item.price,
                "recipe": item.recipe,
            }
            const { data: addedCart } = await axiosPublic.get('/cart');
            
            const existedItem = addedCart.find(item => item.itemId === cartInfo.itemId);

            if (!existedItem) {
                await axiosPublic.post('/cart', cartInfo);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "This item is added to your cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire("This item is already ordered");
            }
        }
    },
}
</script>