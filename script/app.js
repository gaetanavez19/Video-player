const player = {}

player.$container = document.querySelector('.player')
player.$html = document.querySelector('body')
player.$video = player.$container.querySelector('video')
player.$play_pause = player.$container.querySelector('.play_pause')
player.$seek = player.$container.querySelector('.seek')
player.$fill = player.$seek.querySelector('.fill')
player.$fullScreen = player.$container.querySelector('.full-screen')
player.$skip = player.$container.querySelector('[data-skip]')
player.$mute = player.$container.querySelector('.mute') 
player.$informations = player.$html.querySelector('.informations')
player.$informationsButton = player.$html.querySelector('.arrow-infos')
player.$controls = player.$container.querySelector('.controls')
player.$soundSeek = player.$container.querySelector('.soundSeek')
player.$soundFill = player.$container.querySelector('.soundFill')
player.$soundCircle = player.$container.querySelector('.soundCircle')
player.$progressCircle = player.$container.querySelector('.progressCircle')


// PLAY_PAUSE //

player.$video.addEventListener('play', () =>
{
  player.$play_pause.style.background = "url(images/pause.png) no-repeat"
  player.$play_pause.style.backgroundSize = "contain"

})
player.$video.addEventListener('pause', () =>
{
  player.$play_pause.style.background = "url(images/play.png) no-repeat"
  player.$play_pause.style.backgroundSize = "contain"

})

player.$video.addEventListener('click', () =>
{
  const playScreen = player.$video.paused? 'play' : 'pause'
  player.$video[playScreen]()
})

player.$video.style.background = "url(images/play.png) no-repeat)"
player.$play_pause.addEventListener('click', () =>
{
  if (player.$video.paused){
      player.$video.play()
  }
  else {
      player.$video.pause()
  }
})

window.addEventListener("keydown", KeyPress, false)
function KeyPress(key){
  if(key.keyCode == "32"){
    if (player.$video.paused)
    player.$video.play()
    else
    player.$video.pause()
  }
}

// FULL SCREEN // 

player.$video.style.background = "url(images/fullScreen.png) no-repeat)"
player.$fullScreen.addEventListener('click', () =>
{
  player.$html.classList.toggle('is-fullscreen')

  // if (player.$video.webkitRequestFullScreen){
  // player.$video.webkitRequestFullScreen() 
  // }
  // else{
  // player.$video.webkitexitFullScreen()
  // }
})

window.addEventListener("keydown", keyFullScreen, false)
function keyFullScreen(keyFullScreen){
  if((keyFullScreen.keyCode == "13") || (keyFullScreen.keyCode == "27")) {
    player.$html.classList.toggle('is-fullscreen') }
  }


// FULL SCREEN ON DOUBLE-CLICK

player.$video.addEventListener('dblclick', () =>
{
  player.$html.classList.toggle('is-fullscreen')
})

// SKIP -5s //

player.$skip.addEventListener('click', skip)
function skip()
{
  player.$video.currentTime += parseFloat(this.dataset.skip)
}

// SEEK //

player.$seek.addEventListener('click', (_event) =>
{
  const mouseX = _event.clientX
  const bounding = player.$seek.getBoundingClientRect()
  const ratio = (mouseX - bounding.left) / bounding.width
  const time = ratio * player.$video.duration
  player.$video.currentTime = time
})

const loop = () =>
{
  window.requestAnimationFrame(loop) 

  const ratio = player.$video.currentTime / player.$video.duration
  player.$fill.style.transform = `scaleX(${ratio})`
  const bounding = player.$seek.getBoundingClientRect()
  const translate = ratio * bounding.width
  player.$progressCircle.style.transform = `translateX(${ translate - 4}px)`
}
loop()

// SOUND MUTE//

player.$mute.addEventListener('click', () =>
{
  if (player.$video.muted){
  player.$video.muted = false
  player.$mute.style.background = "url(images/unMute.png) no-repeat"
  player.$mute.style.backgroundSize = "contain"
  }
  else {
  player.$video.muted = true
  player.$mute.style.background = "url(images/mute.png) no-repeat"
  player.$mute.style.backgroundSize = "contain"
  }
})

// SOUND SLIDER

player.$soundSeek.addEventListener('click', (_eventSound) =>
{
  const mouseX = _eventSound.clientX
  const bounding = player.$soundSeek.getBoundingClientRect()
  const ratioSound = (mouseX - bounding.left) / bounding.width
  player.$video.volume = ratioSound
  loopVolume()

  const translate = ratioSound * bounding.width
  player.$soundCircle.style.transform = `translateX(${ translate - 4}px)`
})

loopVolume()
function loopVolume(){
  const scale = player.$video.volume / 1
  player.$soundFill.style.transform = `scaleX(${ scale})`
}

// INFORMATION BUTTON 

player.$informationsButton.addEventListener('click', () =>
{
  player.$informationsButton.classList.toggle('is-open')
  player.$informations.classList.toggle('is-open')
})



