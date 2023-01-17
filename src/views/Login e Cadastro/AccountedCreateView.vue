<template>
    <div class="h-screen w-full bg-gray-700 flex justify-center">
        <div class="w-full h-2/5 flex justify-center mt-10">
            <div class="sm:w-1/2 h-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center">
                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Conta criada</h5>
                <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Aproveita uma lista com mais de 30 mil filmes!</p>
                <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <router-link to="/login" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <div class="text-left">
                            <div class="-mt-1 font-sans text-sm font-semibold">Login</div>
                        </div>
                    </router-link>
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>