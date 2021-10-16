<template>
    <div class="border rounded shadow-md mb-4 p-4">
        <h2 class="font-bold text-3xl relative">{{ launchDetails.mission_name }} 
            <span 
                class="absolute ml-2 font-medium text-sm px-2"
                :class="status"
            >{{ status }}</span>
        </h2>
        
        <div class="transition-all overflow-hidden launch-container flex flex-col py-2 hidden">
            <div class="flex">
                <span class="text-sm text-gray-400">{{ posted }}</span>
            </div>
            <div>
                <div class="flex mt-5">
                    <div class="w-1/4">
                        <img v-if="launchDetails.links.mission_patch" class="w-full h-auto mx-auto" :src="this.launchDetails.links.mission_patch">
                        <span class="text-sm font-light italic" v-else>No image yet.</span>
                    </div>
                    <div class="w-3/4 px-3">
                        <p v-if="launchDetails.details" class="">
                            {{ launchDetails.details }}
                        </p>
                        <span class="text-sm font-light italic" v-else>No details yet.</span>
                    </div>
                </div>
            </div>
        </div>
        
        <button class="rounded bg-blue-500 text-white px-4 py-2 uppercase mt-5" @click.prevent="handleView($event)">view</button>
    </div>
</template>

<script>
export default {
    props: {
        launchDetails: {
            type: Object,
            default: {}
        }
    },

    computed: {
        status() {
            if( this.launchDetails.launch_success ) {
                return 'success'
            }
            else if( this.launchDetails.upcoming ) {
                return 'upcoming'
            } else {
                return 'failed'
            }
        },

        posted() {
            return this.launchDetails.last_ll_update ? this.$moment(this.launchDetails.last_ll_update).fromNow() : 'in a year'
        },
    },

    methods: {
        handleView( e ) {
            e.target.previousElementSibling.classList.toggle('hidden')
            e.target.textContent = (e.target.previousElementSibling.classList.contains('hidden')) ? 'View' : 'Hide'            
        }
    },
}
</script>

<style>
    .open {
        height: auto;
    }
    .success {
        background-color: #19e016;
    }
    .upcoming {
        background-color: #07e6ff;
    }
    .failed {
        background-color: #ed0000;
        color: #ffffff
    }
</style>