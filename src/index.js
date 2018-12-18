import { WOW } from 'wowjs';
import Vue from 'vue';
import sprite from "../src/images/svg_symbols.svg";

const wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  mounted() {
    console.log('vue mounted');
  },
  methods: {
    toggleMenu() {
      console.log('toggleMenu');
    }
  },
});