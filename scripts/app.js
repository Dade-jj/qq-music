import './tab.js'
import { Recommend } from './recommend.js'
import { MusicPlayer } from './music_player.js'
import { TopList } from './topList.js'
import { Search } from './search.js'

    let recommend = new Recommend(document.querySelector('#rec-view')).launch()
    let topList = new TopList(document.querySelector('#rank-view')).launch()
    let search = new Search(document.querySelector('#search-view'));
    let musicPlayer = new MusicPlayer(document.querySelector('#player'));
    document.querySelector('.btn-download').addEventListener('click', () => {
        musicPlayer.show()
    })

    onHashChange()
    addEventListener('hashchange', onHashChange)

    function onHashChange() {
        let hash = location.hash
        if (/^#player\?.+/.test(hash)) {
            let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
            let options = matches && matches.reduce((res, cur) => {
                let arr = cur.split('=')
                res[arr[0]] = decodeURIComponent(arr[1])
                return res
            }, {})

            musicPlayer.play(options)
        } else {
            musicPlayer.hide()
        }
    }
