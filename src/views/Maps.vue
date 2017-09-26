<template>
    <gmap-map
  :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
></gmap-map>
  
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD6WUtGUrpwz87rLzcYXBK7lGfOta90zqo',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})

export default {
  name: 'maps',
  components: {
    PulseLoader
  },
  data () {
    return {
      logs: []
    }
  }
}
</script>

