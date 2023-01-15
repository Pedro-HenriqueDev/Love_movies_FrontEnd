<script>

export default {
    
    data() {
        let loved = false
        return {
            loved
        }
    },
    props: {
        movie: Object
    },
    methods: {
        imgLink: (link) => {
            return process.env.VUE_APP_IMAGE + link
        },
        textLenght: (text) => {
            if(text.length > 30) {
                return `${text.slice(0,30)}...`
            }
            return text
        },
        love(idMovie, heart) {
            if(heart == "fullHeart") {
                this.loved = false
                return
            }
            this.loved = true
        }
    }
}
</script>

<template>
    

<div class="w-72 card-height bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <router-link :to="{name: 'Movie', params: {id: movie.id}}">
        <img class="rounded-t-lg" :src="imgLink(movie.poster_path)" alt="" />
    </router-link>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{textLenght(movie.title)}} </h5>
        </a>
        <div class="flex items-end justify-between">
            <span class="bg-blue-100 h-5 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{{movie.vote_average}}</span>
            <div class="text-white font-medium rounded-lg text-sm px-5 text-center">
                <div v-if="loved">
                    <img class="w-8 h-8" @click="love(movie.id, 'fullHeart')" src="../assets/coracaored.png" alt="">
                </div>
                <div v-else-if="loved == false">
                    <img class="w-8 h-8" @click="love(movie.id, 'emptyHeart')" src="../assets/bordcoracao.png" alt="">
                </div>
            </div>
        </div>
        
    </div>
</div>

        

</template>



<style scope>
.card-height {
    height: 590px;
}
</style>