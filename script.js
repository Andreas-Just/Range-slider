'use strict';

CreateSlider.prototype._onDocumentMousemove = function(event) {
	let x = event.clientX - this._containerPosition.x - this._thumbElement.offsetWidth / 2;
	let maxX = this._containerElement.clientWidth - this._thumbElement.offsetWidth;

	if (x < 0) {
		x = 0;
	}

	if (x > maxX) {
		x = maxX;
	}

	this._thumbElement.style.left = x + 'px';
};
CreateSlider.prototype._onDocumentMouseup = function() {
	document.removeEventListener('mousemove', this._mouseMoveForSlider);
	document.removeEventListener('mouseup', this._mouseUpForSlider);
};
CreateSlider.prototype._onThumbMouseDown = function() {
	document.addEventListener('mousemove', this._mouseMoveForSlider);
	document.addEventListener('mouseup', this._mouseUpForSlider);
};

function CreateSlider(sliderElement) {
	// this === slider1
	let x = 1;

	sliderElement.innerHTML = `
    <div class="slider__value range">
			<div class="range__value range__value--min">10</div>
			<div class="range__value range__value--max">9990</div>
		</div>
		<div class="slider__container">
			<div class="slider__thumb slider__thumb--left"></div>
			<div class="slider__thumb slider__thumb--right"></div>
		</div>
  `;

	this._mouseMoveForSlider = this._onDocumentMousemove.bind(this);
	this._mouseUpForSlider = this._onDocumentMouseup.bind(this);
	this._mouseDownForSlider = this._onThumbMouseDown.bind(this);

	this._thumbElement = sliderElement.querySelector('.slider__thumb--left');
	this._containerElement = sliderElement.querySelector('.slider__container');
	this._containerPosition = this._containerElement.getBoundingClientRect();

	this._thumbElement.addEventListener('mousedown', this._mouseDownForSlider);
}

const slider1 = new CreateSlider( document.querySelector('#slider1') );
