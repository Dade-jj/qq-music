class Slider {
    constructor (options = {}) {
        this.$el = options.el;
        this.sliders = options.sliders;
        this.interval = options.interval || 3000
        this.index = 0;
        this.render();
        this.start();
    }

    render() {
        this.$el.innerHTML = `<div class="qq-slider-wrap"></div>`;
        this.$wrap = this.$el.firstElementChild;
        this.$wrap.style.width = `${this.sliders.length * 100}%`;
        this.$wrap.innerHTML = this.sliders.map(slide => 
            `<div class="qq-slider-item">
                <a href="${slide.link}">
                    <img src="${slide.image}">
                </a>
            </div>    
            `
        ).join('')
    }

    start() {
        setInterval(this.next.bind(this),this.interval)
    }

    next() {
        this.index += 1
        if (this.index === this.sliders.length) {
            this.$wrap.style.transform = `translateX(0)`
            this.index = 0;
            return;
        }
        let x = `-${this.index * 100 / this.sliders.length}%`
        this.$wrap.style.transform = `translateX(${x})`
    }
}