const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = $('.header');
const cdBack = $('.cd-thumb');
const audio = $('#audio');
const player = $('.player');
const playBtn = $('.btn-toggle-play');
let song = $$('.song');
let playlist = $('.playlist');
let volume_range = $('.volume__range');
let btnNext = $('.btn-next');
let btnPrev = $('.btn-prev');
let btnRandom = $('.btn-random');
let btnRepeat = $('.btn-repeat');
let volume__mute = $('.volume');
let currentIndex = 0;
const progress = $('.progress');


const app ={
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs :[
        {
            img: './asset/img/DLTTAD.jfif',
            title: 'Đừng Làm Trái Tim Anh Đau',
            author: 'Sơn Tùng MTP',
            music: './music/SƠN TÙNG M-TP - ĐỪNG LÀM TRÁI TIM ANH ĐAU - OFFICIAL MUSIC VIDEO.mp3'
        },
        {
            img: './asset/img/chimotdemnuathoi.jpg',
            title: 'Chỉ Một Đêm Nữa Thôi',
            author: 'RPT MCK ft Tlinh',
            music: './music/06. Chỉ Một Đêm Nữa Thôi - RPT MCK ( ft. tlinh ) - - 99_ - the album.mp3'
        },
        {
            img: '../music_play/asset/img/CTCHT.jfif',
            title: 'Chúng Ta Của Hiện Tại',
            author: 'Sơn Tùng MTP',
            music: '../music_play/music/Chúng Ta Của Hiện Tại.mp3'
        },
        {
            img: '../music_play/asset/img/exhateme1.jpg',
            title: 'Ex Hate Me (part 2)',
            author: 'B Ray ft AMEE',
            music: '../music_play/music/Ex\'s Hate Me - B Ray x Masew (Ft AMEE) - Official MV.mp3'
        },
        {
            img: '../music_play/asset/img/exhateme.jpg',
            title: 'Ex Hate Me',
            author: 'B Ray ft AMEE',
            music: '../music_play/music/AMEE x B RAY - Exs Hate Me (Part 2) - Lyric Video (from album dreAMEE).mp3'
        },
        {
            img: '../music_play/asset/img/hungdao.jpg',
            title: 'Họp Đoàn - 60 năm Hưng Đạo',
            author: 'Thanh Niên Hưng Đạo',
            music: '../music_play/music/HỌP ĐOÀN - TRẠI KỶ NIỆM 60 NĂM THANH NIÊN HƯNG ĐẠO.mp3'
        },
        {
            img: '../music_play/asset/img/haytraochoanh.jfif',
            title: 'Đừng làm trái tim anh đau',
            author: 'Sơn Tùng MTP',
            music: '../music_play/music/SƠN TÙNG M-TP - HÃY TRAO CHO ANH ft. Snoop Dogg - Official MV.mp3'
        },
        {
            img: '../music_play/asset/img/leluuly.jfif',
            title: 'Lệ Lưu Ly',
            author: 'Vũ Phụng Tiên',
            music: '../music_play/music/LỆ LƯU LY - VŨ PHỤNG TIÊN x DT TẬP RAP x DRUM7 - OFFICIAL MUSIC VIDEO.mp3'
        },
        {
            img: '../music_play/asset/img/noinaycoanh.jfif',
            title: 'Nơi Này Có Anh',
            author: 'Sơn Tùng MTP',
            music: '../music_play/music/NƠI NÀY CÓ ANH - OFFICIAL MUSIC VIDEO - SƠN TÙNG M-TP.mp3'
        },
        {
            img: '../music_play/asset/img/taivisao.jfif',
            title: 'Tại Vì Sao?',
            author: 'RPT MCK',
            music: '../music_play/music/RPT MCK - TẠI VÌ SAO - Official Music Video.mp3'
        },
      

    ],
    defaultProperties: function(){
        Object.defineProperty(this, 'songCurrent', {
            get: function(){
                return this.songs[currentIndex];
            }
        })
    },
    render: function(){
        let htmls = this.songs.map((song,index)=>
        {
            return `
            <div class="song${(index === currentIndex)?' active':''}" index="${index}">
                <div class="thumb" style="background-image: url(${song.img})"></div>
                <div class="body">
                <h3 class="title">${song.title}</h3>
                <p class="author">${song.author}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>           
            `
        }
        )
        
        playlist.innerHTML = htmls.join('\n');
    },
    handleEvent: function(){
        let cdWith = $('.cd').offsetWidth;
        // xuli cd quay va dung
        cdBackRotate= cdBack.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        });
        cdBackRotate.pause();

        // xu li cuon chuot che cd
        document.onscroll = function(){            
            let scrolTop = window.scrollY || document.documentElement.scrollTop;
            let newCd = (cdWith - (scrolTop/2.5));
            
            $('.cd').style.width =   (newCd <0)? 0: newCd + 'px';
            $('.cd').style.opacity =   newCd/ cdWith;                   
        }
        // xuli next, prev bai hat
        btnNext.addEventListener('click',() =>{ 
           
            if(app.isRandom){
                app.randomSong();
            }else{
                app.nextSong();
            }
            player.classList.remove('playing');
            audio.play();
            app.render();
            app.scrollAcctiveSong();


        });
        btnPrev.addEventListener('click',() =>{ 
            if(app.isRandom){
                app.randomSong();
                
            }else{
                app.prevSong();
            }
            player.classList.remove('playing');
            audio.play();
            app.render();
            app.scrollAcctiveSong();


        });
        // xuli on/off random
        btnRandom.addEventListener('click', ()=>{
            app.isRandom = !app.isRandom;
            btnRandom.classList.toggle('active',this.isRandom);
        })
        // xuli bat tat repeat
        btnRepeat.addEventListener('click', ()=>{
            app.isRepeat = !app.isRepeat;
            btnRepeat.classList.toggle('active',this.isRepeat);
        })
        // xuli thay doi am thanh
  
        volume_range.oninput = (e)=>{
                
            audio.volume =(e.target.value)/100;             
        }
      
         
       
    },




    // load first song if new 
    loadCurrentSong: function(){
        
        header.textContent = this.songs[currentIndex].title ;
        cdBack.style.backgroundImage = `url('${ this.songs[currentIndex].img}')`;
        audio.src = this.songs[currentIndex].music;
       
       
        
    },
    playSong: function(){
        playBtn.addEventListener('click',()=>{
           if(app.isPlaying){
                audio.pause();
           }
            else{
                audio.play();
            }
           
        })

        // xu ly khi bai hat duoc play
        audio.onplay = function(){
            player.classList.toggle('playing');
            app.isPlaying = true;
            cdBackRotate.play();
            
            
            
        }
        // xu ly khi bai hat bi pause

        audio.onpause = function(){
            player.classList.toggle('playing');
            app.isPlaying = false;
            cdBackRotate.pause();          

        }
        // xu li khi bai hat thay doi
        audio.ontimeupdate= function(){
            if(audio.duration){
                let progressPercent = Math.floor(audio.currentTime/ audio.duration *100);
                progress.value = progressPercent;
            }
            
           }
        
        // xu li khi bai hat thay doi vitri
        progress.oninput= function(e){
         audio.currentTime = (e.target.value/100 * audio.duration);                  
        }   
        // xuli khi hat het bai
        audio.onended = function(){
           
            if(app.isRepeat){
                progress.value = 0;
                audio.play();                
                
            }else{
                btnNext.click();
            }
        }
       // xuly khi click vao bai hat
       playlist.addEventListener('click', (e)=>{
            let clickSong = e.target.closest('.song:not(.active)');
            let clickOption = e.target.closest('.option');
        if(clickSong|| clickOption){
            if(clickSong){
                currentIndex = Number(clickSong.getAttribute("index"));
                app.loadCurrentSong();
                app.render();
                audio.play();
                player.classList.remove('playing');
            }

            if(clickOption) {
                // xuli khi nhan vao option 
            
            }
        }

       })
    },
    nextSong: function(){
            currentIndex++;
            if(currentIndex > app.songs.length-1 ){
                currentIndex = 0;
            };
            app.loadCurrentSong();
    }, 
    prevSong: function(){
            currentIndex--;
            if(currentIndex <1 ){
                currentIndex = app.songs.length -1;
            };
            app.loadCurrentSong();
    },
    randomSong: function(){
        let randomIndex = currentIndex;
        do{
            currentIndex = Math.floor(Math.floor(Math.random()*app.songs.length));

        }while(currentIndex === randomIndex);
        app.loadCurrentSong();
    },
    scrollAcctiveSong: function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "end",
                
            })
        }, 300);
    },
    start: function(){
        //dinh nghia
        this.defaultProperties();
       
        // load currentSong in new login
        this.loadCurrentSong();
        // play bai hat 
        this.playSong();
        // render playlist
        this.render();
        // next
        
       
        // xuly su kien dom event
        this.handleEvent();
        
    }

}
app.start();