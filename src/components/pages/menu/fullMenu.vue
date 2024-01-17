<template>
    <div>
        <Navbar />
        <div>
            <h1 class="text-4xl font-semibold mt-10 text-center">Our menu</h1>
            <div v-if="menuData.length > 0" class="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-5">
                <div v-for="item in menuData" :key="item.id" class="card shadow-xl image-full">
                    <figure>
                        <img :src="item.image" class="w-72" alt="Menu Item Image" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">{{ item.name }}</h2>
                        <p> Category: {{ item.category }}</p>
                        <p> Price: {{ item.price }}</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">
                                <RouterLink :to="`/PageDetails/${item._id}`">View Details</RouterLink>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/shared/Navbar.vue';
import axiosPublic from '../../common/AxiosPublic.js'
export default {
    name: 'fullMenu',
    components: {
        Navbar
    },
    data() {
        return {
            menuData: []
        }
    },
    mounted() {
        this.fetchMenuData();
    },
    methods: {
        async fetchMenuData() {
            const response = await axiosPublic.get('/menu');
            this.menuData = response.data;
        }
    },

}

</script>