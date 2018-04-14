(function(){
    let slider = new Slider({
        el: document.querySelector("#slider"),
        sliders: [
            {link: '#1', image: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000001Qcn7I1vVwHC.jpg'},
            {link: '#2', image: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000003zOYtr0XJ0iN.jpg'},
            {link: '#3', image: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000000NUcZh2V2e8F.jpg'},
            {link: '#4', image: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000002Fui0K0Sseqm.jpg'},
            {link: '#5', image: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000004cPC5K3en38H.jpg'}
        ]
    });
    window.slider = slider;
})()