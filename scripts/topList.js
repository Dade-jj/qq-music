import { lazyload } from './lazyload.js'
import { TOPLIST_URL } from './constants.js'

export class TopList {
    constructor(el) {
        this.$el = el
    }

    launch() {
        fetch(TOPLIST_URL)
            .then(res => res.json())
            .then(json => this.render(json.data.topList))
        return this
    }

    render(list) {
        this.$el.querySelector('.toplist').innerHTML = list.map(item => 
            `
            <li class="top-item" data-id="4" data-type="0">
                <div class="top-item-media">
                    <a href="#">
                        <img class="lazyload" data-src="${item.picUrl}" src="">
                    </a>
                </div>
                <div class="top-item-info">
                    <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
                        <ul class="top-item-list">
                            ${this.songlist(item.songList)}
                        </ul>
                </div>
            </li>
            `
        ).join('');

        lazyload(this.$el.querySelectorAll('.lazyload'))
    }

    songlist(songs) {
        return songs.map((song, i) => 
        `
        <li class="top-item-song">
            <i class="song-index">${i + 1}</i>
            <span class="song-name">${song.songname}</span>- ${song.singername}
        </li>
        `
        ).join('')
    }
}