<template>
  
  <div class="flex flex-col">
    <a-input
      class="border rounded py-1 w-full"
      @input="handleSearch"
    />

    <div id="lauches" class="flex flex-col mt-10 h-auto max-h-96 overflow-y-auto overflow-x-hidden" @scroll="handleScroll">
      <m-card v-for="(launch, key) in launches" :key="key" :launch-details="launch" />

      <a-loading
        v-if="!$store.state.noData"
        :class="{ 'opacity-0': !$store.state.isLoading, 'opacity-100': $store.state.isLoading }"
      />

      <p class="text-center" v-else>End of list</p>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  layout: 'App',

  computed: {
    ...mapState({
        launches: (state) => state.launches
    }),
  },

  async asyncData( ctx ) {
    await ctx.store.dispatch('getLaunches')
  },

  methods: {
    handleSearch( str ) {
      this.$store.dispatch('getLaunch', str)
    },

    handleScroll() {
      const el = document.getElementById("lauches")
      let height = el.scrollHeight - el.clientHeight;
      let offset = (el.scrollTop / height) * 100;

      if( offset == 100 ) {
        this.$store.dispatch('getLaunches')
      }
    }
  },
}
</script>
