import { searchUrl } from "./helper.js";

export class Search {
    constructor(el) {
        this.$el = el;
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        this.$songs = this.$el.querySelector('.song-list')
        this.$loading = this.$el.querySelector('.search-loading')
        this.keyword = ''
        this.page = 1
        this.songs = [];
        this.nomore = false;
        this.perpage = 20
        this.fetching = false;
        this.onscroll = this.onScroll.bind(this); 
        window.addEventListener('scroll',this.onscroll)
    }

    onScroll(event) {
        if(this.nomore) return;
        if(document.documentElement.clientHeight + pageYOffset + 50 >= document.body.scrollHeight) {
            this.search(this.keyword,this.page + 1)
        }
    }

    onKeyUp(event) {
        let keyword = event.target.value.trim()
        if(!keyword) {
            this.reset()
        }
        if (event.keyCode !== 13) return
        this.search(keyword)
    }

    reset() {
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.$songs.innerHTML = '' 
    }

    search(keyword,page) {
        if(this.fetching) return;
        this.showLoading();
        this.keyword = keyword
        this.fetching = true;
        fetch(searchUrl(this.keyword, page || this.page))
        .then(res => res.json())
        .then(json => {
            this.page = json.data.song.curpage
            this.nomore = (json.message === 'no results')
            this.songs.push(...json.data.song.list);
            return json.data.song.list
        })
        .then(songs => {
            this.append(songs)
        })
        .then(() => {
            this.fetching = false
            this.$loading.classList.remove("show")
        })
        .catch(() => this.fetching = false)
    }

    append(songs) {
        let html = songs.map(song => {
            let artist = song.singer.map(s => s.name).join(' ')
            return ` 
            <a class="song-item"
           href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
                <i class="icon icon-music"></i>
                <div class="song-name ellipsis">${song.songname}</div>
                <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(' ')}</div>
            </a>`}).join('')
        this.$songs.insertAdjacentHTML('beforeend', html)
    }

    showLoading() {
        this.$loading.classList.add("show");
    }
}