import { WOW } from 'wowjs';
// import Vue from 'vue';
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


new Vue({
  el: '#wrapper',
  data: {
    pageScroll: 0,
    mainNavigation: false,
    mainNavigationStyle: '',
    showLanding: true,
  },
  mounted() {
    document.removeEventListener('scroll', this.handlePageScroll);
    document.addEventListener('scroll', this.handlePageScroll);
  },
  watch: {
    pageScroll(val) {
      if (val > window.outerHeight) {
        this.showLanding = false;
      } else {
        this.showLanding = true;
      }
    },
  },
  methods: {
    handleMenu() {
      const body = document.body;
      this.mainNavigation = !this.mainNavigation;
      this.mainNavigationStyle = this.mainNavigation
        ? 'transform: matrix(1, 0, 0, 1, 0, 0); transition:  all .5s ease;'
        : 'transform: translate(100%, 0%) matrix(1, 0, 0, 1, 0, 0);' +
		  'transition:  all .5s ease;';

      if (this.mainNavigation) {
        body.classList.add('navigation-visible');
      } else {
        body.classList.remove('navigation-visible');
      }
    },
    handlePageScroll(e) {
      this.pageScroll = e.pageY;
    },
  },
});
//
// new Vue({
// 	el: '.header-right',
// 	data: {
// 		pageScroll: 0,
// 		mainNavigation: false,
// 		mainNavigationStyle: '',
// 		showLanding: true,
// 	},
// 	mounted() {
// 		document.removeEventListener('scroll', this.handlePageScroll);
// 		document.addEventListener('scroll', this.handlePageScroll);
// 	},
// 	watch: {
// 		pageScroll(val) {
// 			if (val > window.outerHeight) {
// 				this.showLanding = false;
// 			} else {
// 				this.showLanding = true;
// 			}
// 		},
// 	},
// 	methods: {
// 		handleMenu() {
// 			const body = document.body;
// 			this.mainNavigation = !this.mainNavigation;
// 			this.mainNavigationStyle = this.mainNavigation
// 				? 'transform: matrix(1, 0, 0, 1, 0, 0);'
// 				: 'transform: translate(100%, 0%) matrix(1, 0, 0, 1, 0, 0);';
//
// 			if (this.mainNavigation) {
// 				body.classList.add('navigation-visible');
// 			} else {
// 				body.classList.remove('navigation-visible');
// 			}
// 		},
// 		handlePageScroll(e) {
// 			this.pageScroll = e.pageY;
// 		},
// 	},
// });

// // global menu
// if ($('#blog-detail .blogs-photo').length > 0) {
// 	if (this.pageYOffset <= $('#blog-detail .blogs-photo').height()) {
// 		$('.header-right').removeClass('ms-active');
// 	} else {
// 		$('.header-right').addClass('ms-active');
// 	}
// } else {
// 	$('.header-right').removeClass('ms-active');
// }
// if ($('#project-detail .project-photo').length > 0) {
// 	if (this.pageYOffset <= $('#project-detail .project-photo').height()) {
// 		$('.header-right').removeClass('ms-active');
// 	} else {
// 		$('.header-right').addClass('ms-active');
// 	}
// } else {
// 	$('.header-right').removeClass('ms-active');
// }
// // global menu