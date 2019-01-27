'use strict';

CreateSlider.prototype._onThumbMouseDown = function(event) {
	if (event.target === this._thumbElementLeft) {
		document.addEventListener('mousemove', this._mouseMoveForSlider);
		document.addEventListener('mouseup', this._mouseUpForSlider);
	} else {
		event.target.addEventListener('click', this._clickMoveOnSlider);
	}
};

CreateSlider.prototype._onThumbClickMove = function(event) {
	this._xThumbLeft = event.clientX - this._containerPosition.x  - this._thumbElementLeft.clientWidth / 2;

	this._thumbElementLeft.style.left = this._xThumbLeft + 'px';
	this._fillElementLeft.style.width =  parseInt(this._thumbElementLeft.style.left) + 5 + 'px';
};

CreateSlider.prototype._onDocumentMousemove = function(event) {
	let maxX = this._thumbElementRightPosition.x - this._containerPosition.x - this._thumbElementRight.offsetWidth;
	this._xThumbLeft = event.clientX - this._containerPosition.x - this._thumbElementLeft.clientWidth / 2;

	if (this._xThumbLeft < 0) {
		this._xThumbLeft = 0;
	}

	if (this._xThumbLeft > maxX) {
		this._xThumbLeft = maxX;
	}

	this._thumbElementLeft.style.left = this._xThumbLeft + 'px';
	this._fillElementLeft.style.width =  parseInt(this._thumbElementLeft.style.left) + 5 + 'px';
};

CreateSlider.prototype._onDocumentMouseup = function() {
	document.removeEventListener('mousemove', this._mouseMoveForSlider);
	document.removeEventListener('mouseup', this._mouseUpForSlider);
};



function CreateSlider(sliderElement) {
	sliderElement.innerHTML = `
    <div class="slider__value range">
			<div class="range__value range__value--min">10</div>
			<div class="range__value range__value--max">10000</div>
		</div>
		<div class="slider__container">
			<div class="slider__fill slider__fill--left"></div>
			<div class="slider__fill slider__fill--right"></div>
			<div class="slider__thumb slider__thumb--left"></div>
			<div class="slider__thumb slider__thumb--right"></div>
		</div>
  `;

	this._mouseDownForSlider = this._onThumbMouseDown.bind(this);
	this._mouseMoveForSlider = this._onDocumentMousemove.bind(this);
	this._mouseUpForSlider = this._onDocumentMouseup.bind(this);
	this._clickMoveOnSlider = this._onThumbClickMove.bind(this);

	this._thumbElementLeft = sliderElement.querySelector('.slider__thumb--left');
	this._thumbElementRight = sliderElement.querySelector('.slider__thumb--right');
	this._containerElement = sliderElement.querySelector('.slider__container');
	this._fillElementLeft = sliderElement.querySelector('.slider__fill--left');
	this._fillElementRight = sliderElement.querySelector('.slider__fill--right');
	this._containerPosition = this._containerElement.getBoundingClientRect();
	this._thumbElementLeftPosition = this._thumbElementLeft.getBoundingClientRect();
	this._thumbElementRightPosition = this._thumbElementRight.getBoundingClientRect();

	// this._xThumbLeft = this._thumbElementLeftPosition.x - this._thumbElementLeft.clientWidth / 2;
	// this._xThumbRight = this._thumbElementRightPosition.x - this._thumbElementRight.clientWidth / 2;
	this._fillElementLeft.style.width = this._thumbElementLeftPosition.x - this._containerPosition.x + 5 + 'px';
	this._fillElementRight.style.width = this._containerPosition.x + this._containerElement.clientWidth - this._thumbElementRightPosition.x - 5 + 'px';

	this._containerElement.addEventListener('mousedown', this._mouseDownForSlider);
}

const slider1 = new CreateSlider( document.querySelector('#slider1') );
