"use strict";


var Photo = function ( options ) {

	this.el = {};

	this.src = "";

	this.sizes = [
		{ 
			size: "tiny",
			path : "/img/photos/tiny/" 
		},
		{ 
			size: "small",
			path : "/img/photos/small/" 
		},
		{ 
			size: "full",
			path : "/img/photos/large/" 
		}
	];

	this.imageEl = {};

	this.determineWhichSizeToLoad = function () {

		// Are we on a retina screen?
		if ( window.devicePixelRatio > 1 ) {

			// If so, load 'small' into img src
			this.imageEl.src = this.sizes[1].path;

		} else {

			// Otherwise load 'tiny' into img src
			this.imageEl.src = this.sizes[0].path;

		}

	};

	this.bindEvents = function () {

	};

	this.initialize = function () {

		// Assign DOM elements
		this.el = options.el;

		this.imageEl = this.el.querySelector("img");

		// Load image paths from HTML

		this.src = this.el.dataset.src;

		this.sizes.forEach( function ( size, index ) {
			size.path += this.src;
		}.bind( this ) );
		
		this.determineWhichSizeToLoad();

		this.bindEvents();

		return this;
	};

	return this.initialize();
}


var PhotoGallery = {

	photoList : [],

	modal : document.querySelector(".modal-photo-viewer"),
	modalImg : document.querySelector(".modal-photo-viewer img"),
	modalPhotoIndex : 0,

	
	showPhotoModalViewerWithPhoto : function ( Photo ) {
	
		// Show modal with full image src
		this.modal.classList.add("show");

		// Set photo context
		this.modalPhotoIndex = this.photoList.indexOf( Photo );

		// fade in via async function
		window.setTimeout( function () {

			this.modal.classList.add("animate");

			this.loadPhotoIntoModalViewer( Photo );

			// Provide fade-in for image swap
			if ( this.modalImg.complete ) {
				this.handleModalImgLoad.apply( this.modalImg );
			} else {
				this.modalImg.addEventListener("load", this.handleModalImgLoad );
			}

		}.bind( this ), 50);

	},

	handleModalImgLoad : function ( ) {
		this.classList.add("ready");
	},

	loadPhotoIntoModalViewer : function ( Photo ) {
		this.modalImg.src = Photo.sizes[2].path;
	},

	modalElementWasClicked : function ( eventObj ) {
		this.modal.classList.remove("animate");
		this.modal.classList.remove("ready");
		this.modalImg.removeEventListener("load", this.handleModalImgLoad );
		window.setTimeout( function () {
			this.modal.classList.remove("show");
			// Remove whatever image is currently loaded
			this.modalImg.src = "/img/null.png";
			
		}.bind(this), 300 );
	},

	modalNextButtonWasClicked : function ( eventObj ) {

		eventObj.stopPropagation();

		// Fade out whatever image we're currently viewing
		this.modalImg.classList.remove("ready");

		// Get next photo based on current index...

		// But first, did we reach the end?
		if ( this.modalPhotoIndex >= ( this.photoList.length - 1 ) ) {
			this.modalPhotoIndex = 0;
		} else {

			// If we didn't get to the end, continue forward.
			this.modalPhotoIndex++;
		}
		

		this.loadPhotoIntoModalViewer( this.photoList[this.modalPhotoIndex] );

	},

	modalPreviousButtonWasClicked : function ( eventObj ) {

		eventObj.stopPropagation();

		// Fade out whatever image we're currently viewing
		this.modalImg.classList.remove("ready");

		// Get next photo based on current index...

		// But first, did we reach the beginning?
		if ( this.modalPhotoIndex <= 0 ) {
			this.modalPhotoIndex = this.photoList.length - 1;
		} else {

			// If we didn't get to the end, continue backwards.
			this.modalPhotoIndex--;
		}
		
		this.loadPhotoIntoModalViewer( this.photoList[this.modalPhotoIndex] );

	},


	bindEvents : function () {
		this.modal.querySelector(".next").addEventListener("click", this.modalNextButtonWasClicked.bind( this ) );
		this.modal.querySelector(".previous").addEventListener("click", this.modalPreviousButtonWasClicked.bind( this ) );

		this.photoList.forEach( function ( photo ) {
			photo.el.addEventListener("click", this.showPhotoModalViewerWithPhoto.bind( this, photo ) );
		}.bind(this ));

		// Modal events
		this.modal.addEventListener("click", this.modalElementWasClicked.bind(this));
	},


	init : function () {

		if ( !document.querySelector(".photos.page") ) {
			return false;
		}
		
		var photos = document.querySelectorAll(".photo");
		

		Array.prototype.forEach.call( photos, function ( element ) {
			this.photoList.push( new Photo( { el : element } ) );
		}.bind( this ) );

		// console.log( this.photoList );

		// 

		// // Photo events
		// Array.prototype.forEach.call( photos, function ( photoEl, index ) {

		// 	// Handle clicks
		// 	photoEl.addEventListener( "click", function ( eventObj ) {

		// 		var fullImageSrc = this.dataset.fullImagePath;

		// 		modal.querySelector("img").src = fullImageSrc;

		// 		// Show modal with full image src
		// 		modal.classList.add("show");
		// 		console.log( this.parentNode );
		// 		console.log( Array.prototype.indexOf.call( this.parentNode.children, this ) );

		// 		// fade in via async function
		// 		window.setTimeout( function () {

		// 			modal.classList.add("animate");

		// 			// Provide fade-in for image swap
		// 			if ( modalImg.complete ) {
		// 				handleModalImgLoad.apply( modalImg );
		// 			} else {
		// 				modalImg.addEventListener("load", handleModalImgLoad );
		// 			}
		// 		}, 50);
				
		// 	} );

		// 	// Handle image loads
		// 	photoEl.querySelector("img").addEventListener("load", function ( eventObj ) {
		// 		this.classList.add("ready");
		// 	})
		// } );
	

		
		this.bindEvents();

	}

}.init();

