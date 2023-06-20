const listBtn = document.getElementById('list');
const page1 = document.getElementById('page1');
let isView = false;
let pageView = () => {
    if (isView) {
        page1.style.transform = `scale(0) translateY(-200px)`;
        isView = false;
    } else {
        page1.style.transform = `scale(1) translateY(0px)`;
        isView = true;
    }
    listBtn.classList.toggle('active');
}
listBtn.addEventListener('click', pageView);
//songs files
let Song = [
    {
        music: '/Audio/Faded.mp3',
        img: '/Images/faded.png',
        name: 'Faded'
    },
    {
        music: '/Audio/fallingdown.mp3',
        img: '/Images/fallingdown.jpg',
        name: 'Falling Down'
    },
    {
        music: '/Audio/Rather Be.mp3',
        img: '/Images/ratherbe.jpg',
        name: 'Rather Be'
    },
    {
        music: '/Audio/stay.mp3',
        img: '/Images/stay.png',
        name: 'Stay'
    },
    {
        music: '/Audio/music (1).mp3',
        img: '/Images/stay.png',
        name: 'Music 1'
    }
];

let currentSong = 0;
let isToggle = false;

//music codes 
const audio = document.createElement('audio');
const circle = document.querySelector('.bd_circle');
const play = document.querySelector('#play');
const next = document.querySelector('.fa-backward');
const prev = document.querySelector('.fa-forward');
const currentT = document.querySelector('.current');
const durationT = document.querySelector('.duration');
const bar = document.querySelector('.pro_bar');
const Name = document.querySelector('.song_name');
const img = document.querySelector('img');
const listSong = document.querySelector('.list_songs');

//load songs
let loadSong = () => {
    audio.src = Song[currentSong].music;
    Name.textContent = Song[currentSong].name;
    img.src = Song[currentSong].img;
    audio.load();
    audio.addEventListener('ended', NextSong);
}

//Play && Pause using tineary Operator
let PlayPause = () => {
    isToggle ? PauseSong() : PlaySong();
}

//Play Song
let PlaySong = () => {
    audio.play();
    isToggle = true;
    //play.classList.add('fa-pause');
    play.innerHTML = `<i class="fa fa-pause"></i>`;
}

//Pause Song
let PauseSong = () => {
    audio.pause();
    isToggle = false;
    //play.classList.remove('fa-play');
    play.innerHTML = `<i class="fa fa-play"></i>`;
}

//Next Song
let NextSong = () => {
    if (currentSong < Song.length - 1) {
        currentSong += 1;
    } else {
        currentSong = 0;
    }
    loadSong(currentSong);
    PlaySong();
}

//Prev Song
let PrevSong = () => {
    if (currentSong > 0) {
        currentSong -= 1;
    } else {
        currentSong = Song.length - 1;
    }
    loadSong(currentSong);
    PlaySong();
}
//formate Time
let formateTime = (time) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute < 10 ? '0' : ''}${minute} : ${second < 10 ? '0' : ''}${second}`;
}
//TimeShow && Process Bar responsesive
let TimeBar = () => {
    const { currentTime: current, duration } = audio;
    currentT.innerHTML = formateTime(current);
    durationT.innerHTML = formateTime(duration);

    const parcentance = (current / duration) * 90;
    bar.style.width = `${parcentance}%`;
}
loadSong(currentSong);

// Function to create a list item for each song
let createListItem = (index) => {
  const li = document.createElement('li'); 
  li.textContent = Song[index].name;

  li.addEventListener('click', function () {
    currentSong = index;
    loadSong();
    PlaySong();
  }); return li;
};
// Display the music names in the list
Song.forEach(function(song,index) {
        const li = createListItem(index);
        listSong.appendChild(li);
});
audio.addEventListener('timeupdate', TimeBar);
play.addEventListener('click', PlayPause);
next.addEventListener('click', NextSong);
prev.addEventListener('click', PrevSong);
