async function main() {
    // get element declerations
    let displaybody = document.querySelector(".displaybody")
    // this gets the music in array format to create card first
    let music = await getMusic()
    createCard2(music)
    let play_pausebutton = document.querySelector(".play-pause")
    let playcard = document.querySelectorAll(".playcard")
    let next = document.querySelector(".next")
    let previous = document.querySelector(".previous")
    let lsongname = document.querySelector(".lsongname")
    let play_pause_img = document.getElementById("play_pause")
    let current = document.querySelector('.currentTime')
    let dur = document.querySelector(".totalTime");
    let circle = document.querySelector(".circle");
    let seekinside = document.querySelector(".seekbarinside")
    let volumecircle = document.querySelector(".volumecircle");
    let volumeseekinside = document.querySelector(".volumeseekbarinside")
    let musicindex = 0
    let volumevalue = 1
    let audio = new Audio()

    // runs the main part of music when the card is created 
    music_func(music)
    // This creates the playlis card of the music by getting the url of the music 
    async function createCard2(music) {
        for (let index = 0; index < music.length - 1; index++) {
            let element = music[index];
            element="https://spoclipse.000webhostapp.com/music"+element.split(".com")[1]
            console.log(element)
            let Artistname = element.split(".com/")[1].replaceAll("%20", " ").split("-")[0]
            let Songname = element.split(".com/")[1].replaceAll("%20", " ").split("-")[1]
            Songname = Songname.slice(0, Songname.length - 4)

            let div = document.createElement(`div`)
            div.className = "playcard"
            div.innerHTML = `
                        <div class="playcardImage">
                            <img src="images/cover1.jpg" alt="">
                        </div>
                        <div class="playcardText">
                        <div class="playcardTextHead">${Artistname}</div>
                            <div class="playcardTextDisc">${Songname}</div>
                            </div>
                        <div class="play_playcard">
                            <img src="images/play.svg" alt="">
                            </div>
                            `

            displaybody.append(div)
        }
    }

    // This is the main function of music where the play starta
    async function music_func() {
        let musicindex = 0
        audio.src = music[musicindex]
        console.log(audio.src)
        totalDuration = await getAudioDuration(audio)


        update_name(audio)

        // This is for playing song which album is clicked
        playcard.forEach(element => {
            element.addEventListener("click", async () => {
                let disc = element.querySelector(".playcardTextDisc")
                for (let index = 0; index < music.length; index++) {
                    let nowmusic = music[index];
                    let cSongname = nowmusic.split(".com/")[1].replaceAll("%20", " ").split("-")[1]
                    cSongname = cSongname.slice(0, cSongname.length - 4)
                    if (disc.innerHTML == cSongname) {
                        audio.src = music[index]

                    }
                }
                showTime(audio)
                play_pause(audio)
                getAudioDuration(audio)
                update_name(audio)
                totalDuration = await getAudioDuration(audio)

            }
            )
        });

        // COntrol buttons functionalities
        // play-pause
        document.addEventListener('keydown', async (e) => {
            if (e.code === "Space" || e.code=="k" || e.code=="K" ) {
                showTime(audio)
                play_pause(audio)
                totalDuration = await getAudioDuration(audio)

            }
        });

        play_pausebutton.addEventListener("click", async () => {
            showTime(audio)
            play_pause(audio)
            totalDuration = await getAudioDuration(audio)

        }
        )
        // next song
        document.addEventListener('keydown', async (e) => {
            if (e.code === "ArrowRight") {
                play_next(audio, music);
                totalDuration = await getAudioDuration(audio)

            }
        });

        next.addEventListener("click", async () => {
            play_next(audio, music);
            totalDuration = await getAudioDuration(audio)

        })

        // previous song
        document.addEventListener('keydown', async (e) => {
            if (e.code === "ArrowLeft") {
                play_previous(audio, music);
                totalDuration = await getAudioDuration(audio)

            }
        });

        previous.addEventListener("click", async () => {
            play_previous(audio, music);
            totalDuration = await getAudioDuration(audio)

        })
        // for seek 
        document.addEventListener('keydown', async (e) => {
            switch (e.key) {
                case "0":
                    value = 0
                    seektime(value);
                    break;
                case "1":
                    value = 10
                    seektime(value);
                    break;
                case "2":
                    value = 20
                    seektime(value);
                    break;
                case "3":
                    value = 30
                    seektime(value);
                    break;
                case "4":
                    value = 40
                    seektime(value);
                    break;
                case "5":
                    value = 50
                    seektime(value);
                    break;
                case "6":
                    value = 60
                    seektime(value);
                    break;
                case "7":
                    value = 70
                    seektime(value);
                    break;
                case "8":
                    value = 80
                    seektime(value);
                    break;
                case "9":
                    value = 90
                    seektime(value);
                    break;
            }
        });

        // for uncolored seekbar
        let seek = document.querySelector(".seekbar")
        seek.addEventListener("click", (e) => {
            value = (e.offsetX / e.target.getBoundingClientRect().width) * 99
            seektime(value)
        })
        // it is a function to seek audio time and the seekbar to the percent given in value
        async function seektime(value) {
            await showTime(audio)
            // console.log(totalDuration);
            audio.currentTime = (totalDuration * value) / 99
        }
    }
    // for volume
    let volumeseek = document.querySelector(".volumeseekbar")
    let volumeimage = document.getElementById("volumeimg")
    document.addEventListener("keydown",(e)=>{
        if(e.key=="m" || e.key=="M"){
        toggleMute();
        }
    })
    volumeimage.addEventListener("click",()=>{
        toggleMute();
    })
        function toggleMute(){
        console.log(audio.volume);
        // console.log(volumevalue);
        
        
        if (audio.volume == 0) {
            audio.volume = volumevalue
            volumeimage.src = "images/sound.svg"
            volumeseekinside.style.width = 88 * volumevalue + 2 + "px"
            volumecircle.style.left = volumevalue * 94 + "%"

        }
        else {
            audio.volume = 0;
            volumeseekinside.style.width = 0 + "px"
            volumecircle.style.left = "0%"
            volumeimage.src = "images/mute.svg"

        }
        if(parseFloat(volumevalue) <= 0.02){
            audio.volume=1
            volumevalue=1
            console.log('too low');
            volumeseekinside.style.width = 88 + "px"
            volumecircle.style.left = "94%"
            volumeimage.src = "images/sound.svg"

        }
    }
    volumeseek.addEventListener("click", (e) => {
        volumevalue = (e.offsetX / e.target.getBoundingClientRect().width)
        volumeseektime(volumevalue)
    })
    // it is a function to seek audio time and the seekbar to the percent given in value
    async function volumeseektime(volumevalue) {
        console.log(volumevalue);

        if (volumevalue < 0.02) {
            audio.volume=0
            console.log('too low');
            volumeseekinside.style.width = 0 + "px"
            volumecircle.style.left = "0%"
            volumeimage.src = "images/mute.svg"


        }
        else {
            volumeimage.src = "images/sound.svg"
            volumeseekinside.style.width = 88 * volumevalue + 2 + "px"
            volumecircle.style.left = volumevalue * 100 + "%"
        }
        audio.volume = volumevalue;
    }


    // Getting music from url which is hosted (gives in array of music)
    async function getMusic() {
        let response = await fetch("https://spoclipse.000webhostapp.com/music/")
        let data = await response.text()
        let div = document.createElement("div")
        div.innerHTML = data
        let links = div.getElementsByTagName("a")
        let songs = []
        for (let index = 0; index < links.length; index++) {
            var element = links[index].href;
            if (element.endsWith(".mp3")) {
                element="https://spoclipse.000webhostapp.com/music"+element.split(".com")[1]
                songs.push(element)

            }
        }
        return (songs)
    }

    // Updates the footer music name to whichever audio passed by splitting 
    async function update_name(audio) {
        let lsong = audio.src.split(".com/")[1].replaceAll("%20", " ")
        lsong = lsong.slice(0, lsong.length - 4)
        lsongname.innerHTML = lsong;
    }
    async function play_pause(audio) {
        if (audio.paused) {
            audio.play();
            play_pause_img.src = 'images/pause.svg'
        }
        else {
            audio.pause();
            play_pause_img.src = 'images/play.svg'
        }
    }

    // plays the next song of array 
    async function play_next(audio, music) {
        audio.pause()
        if (musicindex <= (music.length - 2)) {
            musicindex++;
        }
        else {
            musicindex = 0;
        }
        // console.log(musicindex);

        audio.src = music[musicindex]
        getAudioDuration(audio)
        update_name(audio)
        play_pause_img.src = 'images/pause.svg'
        audio.play()


    }

    // plays the previous song of array
    async function play_previous(audio, music) {
        audio.pause()
        if (musicindex > 0) {
            musicindex--;
        }
        else {
            musicindex = music.length - 2;
        }
        // console.log(musicindex);

        audio.src = music[musicindex]
        getAudioDuration(audio)
        update_name(audio)
        play_pause_img.src = 'images/pause.svg'
        audio.play()


    }

    // Gets the duration of the music by using loadedmetadata
    /*
    async function getAudioDuration(audio) {
        return new Promise((resolve, reject) => {
            audio.onloadedmetadata = function () {
                let dur = document.querySelector(".totalTime");
                let totalDuration = audio.duration;
                let minutes = Math.floor(totalDuration / 60);
                let seconds = Math.floor(totalDuration % 60);
                dur.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                resolve()
    
            };
            audio.onerror = function (error) {
                reject(error);
            };
        });
    }
    */
    /*Both are same so i used down one but the upper one is also correct*/


    async function getAudioDuration(audio) {
        return new Promise((resolve, reject) => {
            audio.addEventListener("loadedmetadata", function () {
                let totalDuration = audio.duration;
                let minutes = Math.floor(totalDuration / 60);
                let seconds = Math.floor(totalDuration % 60);
                dur.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                resolve(totalDuration)

            })
        })
    }

    // updates the current music duration in one second 
    async function showTime(audio) {
        setInterval(() => {
            currentSecf = parseFloat(audio.currentTime)
            currentSec = parseInt(audio.currentTime)
            minutes = parseInt(currentSec / 60)
            second = currentSec - (minutes * 60)
            if (minutes < 10) {
                firstterm = "0" + minutes
            }
            else if (minutes >= 10) {
                firstterm = minutes;
            }
            if (second < 10) {
                secondterm = "0" + second
            }
            else if (second >= 10) {
                secondterm = second;
            }
            current.innerHTML = firstterm + ":" + secondterm;
            circle.style.left = (currentSec / totalDuration) * 99 + "%"
            seekinside.style.width = (currentSec / totalDuration) * 99 + "%"


        }, 10);


    }
    // Hamburger
    let mainleft = document.querySelector(".mainleft")
    let mainright = document.querySelector(".mainright")
    let hamburger = document.querySelector(".hamburger")
    hamburger.addEventListener("click", () => {
        mainleft.style.left = 0;
        mainright.style.opacity = 0.5;

    })
    let close = document.querySelector(".close")
    close.addEventListener("click", () => {
        mainleft.style.left = "-312px";
        mainright.style.opacity = 1;

    })



}
main();