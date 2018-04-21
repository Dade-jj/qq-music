class Search {
    constructor(el) {
        this.$el = el;
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        this.$songs = this.$el.querySelector('.song-list')
        this.keyword = ''
        this.page = 1
        this.perpage = 20 
    }

    onKeyUp(event) {
        let keyword = event.target.value.trim()
        if (event.key !== 'Enter') return
        this.search(keyword)
    }

    search(keyword) {
        this.keyword = keyword
        fetch(`https://qq-music-api.now.sh/search?keyword=${this.keyword}&page=${this.page}`)
        .then(res => res.json())
        .then(json => json.data.song.list)
        .then(songs => this.append(songs))
    }

    append(songs) {
        let html = songs.map(song => `
            <li class="icon icon-music">
                <div class="song-name ellipsis">${song.songname}</div>
                <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(' ')}</div>
            </li>
        `).join('')
        this.$songs.insertAdjacentHTML('beforeend', html)
    }
}