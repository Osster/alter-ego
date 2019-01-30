import {WOW} from 'wowjs';
// import Vue from 'vue';
import sprite from "../src/images/svg_symbols.svg";

const wow = new WOW(
	{
		boxClass: 'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset: 0,          // distance to the element when triggering the animation (default is 0)
		mobile: true,       // trigger animations on mobile devices (default is true)
		live: true,       // act on asynchronously loaded content (default is true)
		callback: function (box) {
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
		pageScrollDraw: 0,
		mainNavigation: false,
		mainNavigationStyle: '',
		mainNavigationLi: false,
		mainNavigationStyleLi: 'opacity: 0; transform: matrix(1, 0, 0, 1, 0, -180); transition:  all 0.5s ease;',
		showLanding: true,
		drawHover: true,
		items: [
			{name: 'event', url: '/event.html', delay: '1s'},
			{name: 'content', url: '/content.html', delay: '2s'},
			{name: 'digital', url: '/digital.html', delay: '3s'},
			{name: 'contact', url: '/contact.html', delay: '4s'}
		]
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
		pageScrollDraw(val) {
			if (val *0.6 > window.outerHeight) {
				this.drawHover = false;
			} else {
				this.drawHover = true;
			}
		},
	},
	methods: {
		shuffle: function () {
			this.itemscust = _.shuffle(this.itemscust)
		},
		handleMenu() {
			const body = document.body;
			this.mainNavigation = !this.mainNavigation;
			this.mainNavigationStyle = this.mainNavigation
				? 'transform: matrix(1, 0, 0, 1, 0, 0); transition:  all .5s ease;'
				: 'transform: translate(100%, 0%) matrix(1, 0, 0, 1, 0, 0); transition:  all .5s ease;';
			this.mainNavigationLi = !this.mainNavigationLi;

			this.mainNavigationStyleLi = this.mainNavigationLi
				? 'opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0); transition:  all .5s ease; transition-delay: 0.5s;'
				: 'opacity: 0; transform: matrix(1, 0, 0, 1, 0, -180); transition:  all .5s ease;';

			// this.items.length
			// var p = this.items.length;
			// for (let j = 1; j <= p; j++) {
			//
			// 	this.mainNavigationStyleLi = this.mainNavigationLi
			// 		? 'opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0); transition:  all .5s ease; transition-delay:' + 0.5*j + 's;'
			// 		: 'opacity: 0; transform: matrix(1, 0, 0, 1, 0, -180); transition:  all .5s ease;';
			// }

			// this.items.forEach (
			// 	this.mainNavigationStyleLi = this.mainNavigationLi
			// 		? 'opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0); transition:  all .5s ease; transition-delay:' + 0.5 + 's;'
			// 		: 'opacity: 0; transform: matrix(1, 0, 0, 1, 0, -180); transition:  all .5s ease;'
			// );

			if (this.mainNavigation) {
				body.classList.add('navigation-visible');
			} else {
				body.classList.remove('navigation-visible');
			}
		},

		handlePageScroll(e) {
			this.pageScroll = e.pageY;
			this.pageScrollDraw = e.pageY;
		}
	},
});
