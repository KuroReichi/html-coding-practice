class Snackbar {
	constructor(value, options = {}) {
		this.options = {
			time: options.time ? Number(options.time) : 1000,
			direction: options.direction ? options.direction : "top",
			onclick: options.onclick ? options.onclick : undefined
		};
		if (this.options.direction !== "top" && this.options.direction !== "bottom") throw new ReferenceError("Unknown Direction: the available direction is top, and bottom");
		if (this.options.onclick !== "function" && !this.options.onclick) console.warn("Cannot run onclick event, because it's not a function.");
		this.elements = [document.createElement("div"), document.createElement("a")];
		this.elements[0].ontransitionend = () => {
			if (this.elements[0].style.top === "0px" && this.options.direction === "top") {
				setTimeout(() => { this.elements[0].style.top = "-100px"; }, this.options.time);
			} else if (this.elements[0].style.bottom === "0px" && this.options.direction === "bottom") {
				setTimeout(() => { this.elements[0].style.bottom = "-100px"; }, this.options.time);
			} else if (this.elements[0].style.top === "-100px" || this.elements[0].style.bottom === "-100px") {
				this.elements[0].remove();
			}
		};
		this.elements[0].setAttribute("style", `text-align: center; width: 100%; padding-top: 5px; height: 20px; position: fixed; ${this.options.direction}: -100px; left: 0px; transition: ${this.options.direction} 0.8s ease; background-color: rgba(0,0,0,0.6)`);
		this.elements[1].innerHTML = value;
		this.elements[1].setAttribute("style", `color: rgb(255,255,255); font-size: 13.5px; text-wrap: nowrap`);
		if (this.options.direction === "top") setTimeout(() => { this.elements[0].style.top = "0px"; }, 100);
		if (this.options.direction === "bottom") setTimeout(() => { this.elements[0].style.bottom = "0px"; }, 100);
		this.elements[0].onclick = () => {
			if (typeof this.options.onclick === "function") this.options.onclick();
		};
		document.body.appendChild(this.elements[0]);
		this.elements[0].appendChild(this.elements[1]);
		return this;
	}
}