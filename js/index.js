const d = document, w = window

onload = async () => {
    player = new YT.Player('player', {
        height: '520',
        width: '640',
        videoId: 'o-YBDTqX_ZU',
        playerVars: { playsinline: 1, disablekb: 1, fs: 0, loop: 1 },
        events: { onReady: startVideo, onStateChange: player.playVideo }
    })
    var ready = false
    function startVideo() {
        if (!ready) { ready = true; return }
        d.getElementById('initial-loading').animate(
            [{ opacity: 1}, { opacity: 0 }],
            { fill: 'forwards', duration: 300 }
        )
        setTimeout(() => setInterval(() => player.playVideo(), 100), 200)
    }

    await new Promise(res => setTimeout(() => { res() }, 300))
    const bar = d.querySelector('#initial-loading .bar')
    const text = d.querySelector('#initial-loading .text')
    bar.style.height = '.5em', text.style.height = '1.5em'
    await new Promise(res => setTimeout(() => { res() }, 400))
    
    const assets = ['/offline.html', '/favicon.ico', '/index.html', '/pages/admin.html',
        ...['index', 'theme'].map(name => `/css/${name}.css`),
        ...['index', 'metw', 'metw-gui', 'util'].map(name => `/js/${name}.js`)]

    assets.forEach((v, i) => {
        setTimeout(() => { text.innerText = 'İndiriliyor: ' + v }, i * 220)
    })

    for (let i = 1; i <= 100; i++) {
        setTimeout(() => {
            bar.style.setProperty('--percentage', i + '%')
            if (i == 100) {
                setTimeout(() => { text.innerText = 'Hazırlanıyor' }, 200)
                setTimeout(() => { bar.style.setProperty('--percentage', '0%') }, 300)
                setTimeout(() => {
                    text.innerText = 'Hazırlanıyor'
                    setTimeout(() => { bar.style.setProperty('--percentage', '30%') }, 200)
                    setTimeout(() => { bar.style.setProperty('--percentage', '70%') }, 400)
                    setTimeout(() => { bar.style.setProperty('--percentage', '100%') }, 450)
                    setTimeout(() => { bar.style.height = '0', text.innerText = 'beta', d.body.focus(), startVideo() }, 475)
                }, 600)
            }
        }, assets.length * 2  * i)
    } 
}
