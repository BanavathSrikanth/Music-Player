// Default animated cover image
const defaultCover = "./media/default1.gif";

// List of songs
let songs = [
  {
    title: "Go",
    artist: "NEFFEX",
    file: "./media/Go_-_NEFFEX.mp3",
    cover: "./media/468-thumbnail.png",
  },
  {
    title: "Premalo",
    artist: "Unknown Artist",
    file: "./media/Song2.mp3",
    cover: "", 
  },
  {
    title: "Ninnu Kori varnam",
    artist: "Unknown Artist",
    file: "./media/Song3.mp3",
    
  },
];


let song = document.getElementById("song");
let progress = document.getElementById("progress");
let ctrlIcon = document.getElementById("ctrlIcon");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let cover = document.getElementById("cover");

let currentSong = 0;

// Load and set current song info
function loadSong(index) {
  const selected = songs[index];
  song.src = selected.file;
  title.textContent = selected.title;
  artist.textContent = selected.artist;

  // Set cover: use default if missing or empty
  if (!selected.cover || selected.cover.trim() === "") {
    cover.src = defaultCover;
  } else {
    cover.src = selected.cover;
  }

  song.load();
}

// Play song
function playSong() {
  song.play();
  ctrlIcon.classList.remove("fa-play");
  ctrlIcon.classList.add("fa-pause");
}

// Pause song
function pauseSong() {
  song.pause();
  ctrlIcon.classList.remove("fa-pause");
  ctrlIcon.classList.add("fa-play");
}

// Toggle play/pause
function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

// Play next song
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}

// Play previous song
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

// Initial song load
loadSong(currentSong);

// Update progress bar on time update
song.ontimeupdate = function () {
  progress.value = song.currentTime;
};

// Set max duration when metadata is loaded
song.onloadedmetadata = function () {
  progress.max = song.duration;
};

// Seek song using progress bar
progress.onchange = function () {
  song.currentTime = progress.value;
  playSong();
};

// Bind next/prev icons to events
document.querySelector(".fa-forward").addEventListener("click", nextSong);
document.querySelector(".fa-backward").addEventListener("click", prevSong);
