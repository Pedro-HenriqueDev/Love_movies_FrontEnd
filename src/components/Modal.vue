<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    hidden: Boolean,
    message: String
})
</script>

<template>
    <div class="fixed flex justify-center align-center z-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" :class="[props.hidden ? 'hidden' : 'flex']">
    <div class="relative w-full h-full max-w-md md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-6 text-center">
                <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{{props.message}}</h3>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

</style>