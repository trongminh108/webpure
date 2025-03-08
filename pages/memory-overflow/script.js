import { Init as InitWindow } from '../../components/window/window.js';

// Thay YOUR_VIDEO_ID bằng ID video YouTube của bạn
const videoId = 'qRuSS93OEfw';
// const videoId = 'CL13X-8o4h0';
let player;
let count = 1;
const lyricsData = [
    { start: 59.4, text: 'Tràn ngập bộ nhớ nhớ nhớ nhớ em' },
    { start: 62.84, text: 'Cho anh cảm giác không sao quên được' },
    { start: 66.72, text: 'Tràn ngập bộ nhớ nhớ nhớ nhớ em' },
    { start: 70.72, text: 'Nhưng anh mong có cảm giác này mãi' },
    { start: 75.44, text: 'Oh-uh-oh oh uh-oh-uh-oh' },
    { start: 79.28, text: 'Oh-uh-oh oh uh-oh-uh-oh' },
    { start: 82.72, text: 'Oh-uh-oh oh uh-oh-uh-oh' },
    { start: 86.24, text: 'Oh-uh-oh oh uh-oh-uh-oh' },
    { start: 90.72, text: 'Yêu thương sao cho họ vừa' },
    { start: 92.52, text: 'Hay anh đang lo thừa' },
    { start: 94.36, text: 'Cho anh mong như cơm bữa' },
    { start: 96.36, text: 'Em đừng xinh như thế nữa' },
    { start: 98.32, text: 'Loạn nhịp cả tim lên rồi' },
    { start: 99.88, text: 'Đầu này toàn là em mà thôi' },
    { start: 101.48, text: 'yeh eh y-yeh eh y-yeh' },
    { start: 104.48, text: 'Nỗi nhớ em cầu kỳ' },
    { start: 105.8, text: 'nên chẳng biết lý do là gì' },
    { start: 107.8, text: 'Hao tốn hơi nhiều GB' },
    { start: 109.56, text: 'Nên cần dùng thêm USB' },
    { start: 111.8, text: 'Nỗi nhớ em cầu kỳ' },
    { start: 113.28, text: 'Nên chẳng biết lý do là gì' },
    { start: 115.48, text: 'Hao tốn hơi nhiều GB' },
    { start: 117.0, text: 'Nên cần D O M I C' },
    { start: 119.68, text: 'Tràn ngập bộ nhớ nhớ nhớ nhớ em' },
    { start: 123.12, text: 'Cho anh cảm giác không sao quên được' },
    { start: 126.68, text: 'Tràn ngập bộ nhớ nhớ nhớ nhớ em' },
    { start: 130.48, text: 'Nhưng anh mong có cảm giác này mãi' },
    { start: 135.36, text: 'Oh-uh-oh oh uh-oh-uh-oh' },
    { start: 138.72, text: 'Oh-uh-oh oh uh-woh' },
    { start: 142.92, text: 'Oh-uh-oh oh uh-oh-uh-oh' },
    { start: 146.56, text: 'Oh-uh-oh oh uh-oh-uh-oh' },
    { start: 164.56, text: 'Tràn ngập bộ nhớ nhớ nhớ nhớ em' },
    { start: 168.12, text: 'Tràn ngập bộ nhớ nhớ nhớ nhớ em' },
    { start: 172.0, text: 'Tràn ngập bộ nhớ nhớ nhớ nhớ em' },
    { start: 175.56, text: 'Tràn ngập bộ nhớ nhớ nhớ nhớ em' },
];

const songsList = ['Dữ liệu quý', 'Pin dự phòng', 'Tràn bộ nhớ', 'Chập chờn'];

function Init() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        alert(
            'Để có trải nghiệm tốt nhất, vui lòng bật chế độ máy tính trên trình duyệt của bạn!'
        );
    }
    document.querySelector('#start').addEventListener('click', startSong);
    // document
    //     .querySelector('#create-window')
    //     .addEventListener('click', createWindow);
    onYouTubeIframeAPIReady();
}

function startSong() {
    if (player) {
        player.seekTo(53);
        player.playVideo();
    }
}

function pauseSong() {
    if (player) {
        player.stopVideo();
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videoId, // ID của video YouTube
        playerVars: {
            autoplay: 1, // Tự động phát
            start: 53, // Bắt đầu từ giây 58
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

function onPlayerReady(event) {
    event.target.setVolume(100);
    // document.getElementById('lyrics').innerHTML = 'Nhấn Start để bắt đầu!';
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        updateLyrics();
    }
}

function updateLyrics() {
    let currentIndex = 0;
    setInterval(() => {
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            let currentTime = player.getCurrentTime();

            if (
                currentIndex < lyricsData.length &&
                currentTime >= lyricsData[currentIndex].start
            ) {
                // let lyricsContainer = document.getElementById('lyrics');
                // lyricsContainer.innerHTML = '';
                for (let i = 0; i <= currentIndex; i++) {
                    // lyricsContainer.innerHTML = lyricsData[i].text;
                    if (i === currentIndex) {
                        const title =
                            songsList[
                                Math.floor(Math.random() * songsList.length)
                            ];
                        createWindow(title, lyricsData[i].text);
                    }
                }
                currentIndex++;
            }
        }
    }, 100);
}

function createWindow(title, content) {
    const body = document.querySelector('body');
    fetch('../../components/window')
        .then((res) => res.text())
        .then((data) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const component = doc.body.firstChild; // Lấy node đầu tiên

            InitWindow(component, count, title, content);
            count++;

            if (component) {
                component.style.transform = 'scale(0)';
                component.style.transition = 'transform 0.3s ease-out';

                document.body.appendChild(component);

                // Buộc trình duyệt nhận diện thay đổi trước khi áp dụng transform
                requestAnimationFrame(() => {
                    component.getBoundingClientRect(); // Kích hoạt reflow để trình duyệt cập nhật style
                    component.style.transform = 'scale(1)';
                });
            }
        })
        .catch((err) => {
            console.log('[ERROR]: ', err);
        });
}

Init();
