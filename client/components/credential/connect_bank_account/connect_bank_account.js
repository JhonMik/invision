import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  computed: {
    environment() {
      return process.env;
    }
  },
}
