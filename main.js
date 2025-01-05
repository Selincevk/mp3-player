const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

// !
let index;
// !
let loop = true;
// !
const songsList = [
  {
    name: "Are You Ready",
    link: "assets/are-you-ready.mp3",
    artist: "Karsu",
    image: "img/karsu.jpg",
  },
  {
    name: "Diet Mountain Dew",
    link: "assets/diet-mountain.mp3",
    artist: "Lana Del Rey",
    image: "img/lana.jpg",
  },
  {
    name: "Tu Y Yo",
    link: "assets/Tu-y-yo.mp3",
    artist: "Glow",
    image: "img/glow.jpg",
  },
  {
    name: "Ma Babe",
    link: "assets/ma-babe.mp3",
    artist: "Stefania-Faydee",
    image: "img/ma-babe.jpg",
  },
  {
    name: "Push 2 Start",
    link: "assets/push2start.mp3",
    artist: "Tyla",
    image: "img/tyla.jpg",
  },
  {
    name: "Sah Sah",
    link: "assets/sahsah.mp3",
    artist: "Marshmello x Nancy Ajram",
    image: "img/sahsah.jpg",
  },
 {
  name: "Henna",
  link: "assets/henna.mp3",
  artist: "Sandra N",
  image: "img/sandra.jpg",
 }
];

// ! Atama
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  // todo: Zaman 
  audio.onloadedmetadata = () => {
    maxDuration.innerHTML = timeFormatter(audio.duration)
  }

  playListContainer.classList.add('hide')

  playAudio()

};

// ! ÇAL
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
}
//  setSong(3)



// ! ŞARKI BİTTİĞİNDE KENDİLİĞİNDEN NEXT
audio.onended = () => {
  nextSong ()
}

// ! DURDUR
const pauseAudio = () => {
  audio.pause()
  pauseButton.classList.add('hide')
  playButton.classList.remove('hide')
}

// ! NEXT 
const nextSong = () => {
  if (loop) {
    if (index == (songsList.length -1)) {
      index = 0
    } else {
      index += 1
    }
    setSong (index)
  
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length)
    setSong (randIndex)
  }
  playAudio ()
}

// ! PREV
const previousSong = () => {
  pauseAudio()
  if (index > 0) {
    index -= 1 
  } else {
    index = songsList. length - 1
  }
  setSong(index)
  playAudio()
}

// ! TİME
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60) 
  // örneğin : 125 saniye ise 2dk oluyor 
  minute = minute < 10 ? "0" + minute : minute
  let second = Math.floor (timeInput % 60)
  // örneğin: 125 saniye ise kalan 5 - 05 yazar
  second = second < 10 ? "0" + second : second
  return `${minute} : ${second}`
}

// ! REPEAT 
repeatButton.addEventListener("click",() => {
  if (repeatButton.classList.contains('active')) {
      repeatButton.classList.remove('active')
      audio.loop = false
  }else {
      repeatButton.classList.add('active')
      audio.loop = true
  }
})

// ! KRIŞTIRICI

shuffleButton.addEventListener('click',()=>{
  if (shuffleButton.classList.contains('active')) {
      shuffleButton.classList.remove('active')
      loop = true
  }else {
      shuffleButton.classList.add('active')
      loop = false
  }
})

// ! ANLIK ZAMAN 
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
  
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))
    
}, 1000); 

// ! LİST EKRAN
playListButton.addEventListener('click',()=>{
  playListContainer.classList.remove('hide')
})




// ! LİST CLOSE
closeButton.addEventListener('click',()=>{
  playListContainer.classList.add('hide')
})


// ! LİST 
const initializePlaylist = () =>{
  for(let i in songsList){ 
      playListSongs.innerHTML += `<li class="playlistSong"
      onclick="setSong(${i})">
      <div class="playlist-image-container">
          <img src="${songsList[i].image}"/>
      </div>
      <div class="playlist-song-details">
          <span id="playlist-song-name">
              ${songsList[i].name}
          </span>
          <span id="playlist-song-artist-album">
              ${songsList[i].artist}
          </span>
      </div>
      </li>`
  }
}

// ! BAR
progressBar.addEventListener('click',(event)=>{

  let coordStart = progressBar.getBoundingClientRect().left

  let coordEnd = event.clientX

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth

  currentProgress.style.width = progress * 100 + "%"

  audio.currentTime = progress * audio.duration

  audio.play()
  pauseButton.classList.remove('hide')
  playButton.classList.add('hide')

})





// ! ZAMAN GÜNCELLEME
audio.addEventListener('timeupdate',() => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime) })



// * TIKLANILDIĞINDA
// ! 
nextButton.addEventListener("click",nextSong)

// ! PAUSE
pauseButton.addEventListener("click", pauseAudio)

// ! PLAY
playButton.addEventListener("click", playAudio)

// ! PREV
prevButton.addEventListener("click", previousSong)


// ! EKRAN YÜKLEME
window.onload = () => {
  index = 0
  setSong(index)
  pauseAudio()
  initializePlaylist()
  }

