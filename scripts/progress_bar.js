export class ProgressBar {
    constructor(el, duration, start) {   
        this.$el = el;
        this.elapsed = 0
        this.duration = duration || 0
        this.progress = 0
        this.render()
        this.$progress = this.$el.querySelector('.progress-bar-progress')
        this.$elapsed = this.$el.querySelector('.progress-elapsed')
        this.$duration = this.$el.querySelector('.progress-duration')
        this.$elapsed.innerText = this.formatTime(this.elapsed)
        this.$duration.innerText = this.formatTime(this.duration)
        if(start) this.start()
    }

    start() {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.update.bind(this), 50)
    }

    pause() {
        clearInterval(this.intervalId)
    }

    update() {
        this.elapsed += 0.05
        this.progress = this.elapsed / this.duration
        this.$progress.style.transform = `translate(${this.progress * 100 - 100}%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)
    }

    reset(duration) {
        this.pause()
        this.elapsed = 0
        this.progress = 0
        if(duration) {
            this.duration = +duration
            this.$duration.innerText = this.formatTime(this.duration)
        }
    } 

    render() {
        this.$el.innerHTML = `
        <div class="progress-time progress-elapsed">00:00</div>
        <div class="progress-bar">
            <div class="progress-bar-progress"></div>
        </div>
        <div class="progress-time progress-duration"></div>
        `
    }

    formatTime(seconds) {
        if(seconds) {
            let min = Math.floor(seconds / 60)
            let sec = Math.floor(seconds % 60)
            if(min < 10) min = "0" + min;
            if(sec < 10) sec = "0" + sec;
            return `${min}:${sec}`
        }else {
            return `00:00`
        }
    }
   
}
