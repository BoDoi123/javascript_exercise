/* 
    1. Render songs 
    2. Scroll top
    3. Play / pause / seek
    4. CD rotate
    5. Next / prev
    6. Random
    7. Next / Repeat when ended
    8. Active song
    9. Scroll active song into view
    10. Play song when click
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const app = {
	currentIndex: 0,
	isPlaying: false,
	isChanging: false,
	isRandom: false,
	isRepeat: false,
	songs: [
		{
			name: "Cô Gái Vàng Remix",
			singer: "HuyR (QTrung Remix)",
			path: "../assets/music/CoGaiVangX9277ThichHonQTrungMashupRemix.mp3",
			image: "../assets/img/CoGaiVangRemix.jpg",
		},
		{
			name: "Đồng Xanh",
			singer: "Vy Oanh",
			path: "../assets/music/DongXanh.mp3",
			image: "../assets/img/DongXanh.jpg",
		},
		{
			name: "Lấy Chồng Sớm Làm Gì",
			singer: "",
			path: "../assets/music/LayChongSomLamGi.mp3",
			image: "../assets/img/LayChongSomLamGi.jpg",
		},
		{
			name: "Mất Kết Nối",
			singer: "Dương Domic",
			path: "../assets/music/MatKetNoi.mp3",
			image: "../assets/img/MatKetNoi.jpg",
		},
		{
			name: "Một Đêm Say",
			singer: "Thịnh Suy",
			path: "../assets/music/MotDemSay.mp3",
			image: "../assets/img/MotDemSay.jpg",
		},
		{
			name: "Một Đêm Say (Biển Của Hy Vọng)",
			singer: "Quân AP",
			path: "../assets/music/MotDemSayBienCuaHyVong.mp3",
			image: "../assets/img/MotDemSayBienCuaHyVong.jpg",
		},
		{
			name: "Tràn Bộ Nhớ",
			singer: "Dương Domic",
			path: "../assets/music/TranBoNho.mp3",
			image: "../assets/img/MatKetNoi.jpg",
		},
		{
			name: "Yêu Anh Em Nhé",
			singer: "Huyr",
			path: "../assets/music/YeuAnhEmNhe.mp3",
			image: "../assets/img/YeuAnhEmNhe.jpg",
		},
		{
			name: "Yêu Nhau Đi Em Ơi",
			singer: "Châu Khải Phong",
			path: "../assets/music/YeuNhauDiEmOi.mp3",
			image: "../assets/img/YeuNhauDiEmOi.jpg",
		},
		{
			name: "You Are My Crush",
			singer: "",
			path: "../assets/music/YouAreMyCrush.mp3",
			image: "../assets/img/YouAreMyCrush.jpg",
		},
	],
	indexes: [],
	randomIndexes: [],
	randomSongs: [],
	render() {
		const htmls = this.songs.map((song, index) => {
			this.indexes.push(index);
			return `
                <div class="song ${
					index === this.currentIndex ? "active" : ""
				}">
					<div
						class="thumb"
						style="
							background-image: url('${song.image}');
						"
					></div>
					<div class="body">
						<h3 class="title">${song.name}</h3>
						<p class="author">${song.singer}</p>
					</div>
					<div class="option">
						<i class="fas fa-ellipsis-h"></i>
					</div>
				</div>
            `;
		});

		$(".playlist").innerHTML = htmls.join("\n");
	},
	defineProperties() {
		Object.defineProperty(this, "currentSong", {
			get() {
				if (this.isRandom) {
					return this.randomSongs[this.currentIndex];
				}
				return this.songs[this.currentIndex];
			},
		});
	},
	handleEvents() {
		const _this = this;
		const cdWidth = cd.offsetWidth;
		const listSong = $$(".song");
		console.log(listSong);

		// Xử lý CD quay / dừng
		const cdThumbAnimate = cdThumb.animate(
			[{ transform: "rotate(360deg)" }],
			{
				duration: 10000, // 10 second
				iterations: Infinity,
			}
		);
		cdThumbAnimate.pause();

		// Xử lý phóng to / thu nhỏ CD
		document.addEventListener("scroll", (e) => {
			const scrollTop =
				window.screenY || document.documentElement.scrollTop;

			const newCdWidth = cdWidth - scrollTop;

			cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
			cd.style.opacity = newCdWidth / cdWidth;
		});

		// Xử lý khi click play
		playBtn.addEventListener("click", () => {
			_this.isPlaying = !_this.isPlaying;
			player.classList.toggle("playing");

			if (_this.isPlaying) {
				audio.play();
				cdThumbAnimate.play();
			} else {
				audio.pause();
				cdThumbAnimate.pause();
			}
		});

		// Khi tiến độ bài hát thay đổi
		audio.addEventListener("timeupdate", (e) => {
			if (_this.isChanging) {
				return;
			}

			if (audio.duration) {
				const progressPercent = Math.floor(
					(audio.currentTime / audio.duration) * 100
				).toFixed(0);
				progress.value = progressPercent;
			}
		});

		// Xử lý khi tua
		progress.addEventListener("change", (e) => {
			const seekTime = (audio.duration / 100) * e.target.value;
			audio.currentTime = seekTime;
		});

		progress.addEventListener("mousedown", () => {
			_this.isChanging = true;
		});

		progress.addEventListener("mouseup", () => {
			_this.isChanging = false;
		});

		// Khi next bài hát
		nextBtn.addEventListener("click", () => {
			if (!_this.isPlaying) {
				player.classList.add("playing");
				_this.isPlaying = true;
				cdThumbAnimate.play();
			}

			progress.value = 0;
			_this.nextSong();
			audio.play();
		});

		// Khi prev bài hát
		prevBtn.addEventListener("click", () => {
			if (!_this.isPlaying) {
				player.classList.add("playing");
				_this.isPlaying = true;
				cdThumbAnimate.play();
			}

			progress.value = 0;
			_this.prevSong();
			audio.play();
		});

		// Khi phát random bài hát
		randomBtn.addEventListener("click", (e) => {
			_this.isRandom = !_this.isRandom;
			randomBtn.classList.toggle("active");

			if (_this.isRandom) {
				resultRandom = [
					..._this.shuffleSong([..._this.songs], [..._this.indexes]),
				];
				_this.randomSongs = [
					_this.songs[_this.currentIndex],
					...resultRandom[0],
				];
				_this.randomIndexes = [_this.currentIndex, ...resultRandom[1]];
				_this.currentIndex = 0;
			} else {
				_this.randomSongs = [];
				_this.randomIndexes = [];
			}

			console.log(_this.randomSongs);
			console.log(_this.randomIndexes);
		});

		// Next / repeat khi chạy xong bài hát
		audio.addEventListener("ended", () => {
			if (_this.isRepeat) {
				progress.value = 0;
				audio.play();
				return;
			}

			nextBtn.click();
		});

		// Khi repeat bài hát
		repeatBtn.addEventListener("click", () => {
			_this.isRepeat = !_this.isRepeat;
			repeatBtn.classList.toggle("active");
		});

		// Khi active bài hát
		listSong.forEach((song, index) => {
			song.addEventListener("click", () => {
				progress.value = 0;
				$(".song.active").classList.remove("active");
				song.classList.add("active");
				_this.changeSong(index);
				_this.isPlaying = true;
				player.classList.add("playing");
				audio.play();
				cdThumbAnimate.play();
			});
		});

		audio.addEventListener("play", () => {
			$(".song.active").classList.remove("active");

			if (_this.isRandom) {
				listSong[_this.randomIndexes[_this.currentIndex]].classList.add(
					"active"
				);
				return;
			}

			listSong[_this.currentIndex].classList.add("active");
			_this.scrollToActiveSong();
		});
	},

	loadCurrentSong() {
		heading.textContent = this.currentSong.name;
		cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
		audio.src = this.currentSong.path;
	},

	// Các hàm xử lý chức năng
	nextSong() {
		this.currentIndex++;

		if (this.currentIndex >= this.songs.length) {
			this.currentIndex = 0;
		}

		this.loadCurrentSong();
	},
	prevSong() {
		this.currentIndex--;

		if (this.currentIndex < 0) {
			this.currentIndex = this.songs.length - 1;
		}

		this.loadCurrentSong();
	},
	shuffleSong(array, array1) {
		array.splice(this.currentIndex, 1);
		array1.splice(this.currentIndex, 1);
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));

			[array[i], array[j]] = [array[j], array[i]];
			[array1[i], array1[j]] = [array1[j], array1[i]];
		}

		return [array, array1];
	},
	scrollToActiveSong() {
		setTimeout(() => {
			$(".song.active").scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}, 200);
	},
	changeSong(index) {
		this.currentIndex = index;
		this.loadCurrentSong();
	},

	start() {
		// Render Playlist
		this.render();

		// Định nghĩa các thuộc tính cho Object
		this.defineProperties();

		// Lắng nghe / xử lý các sự kiện (DOM Events)
		this.handleEvents();

		// Tải thông tin bài hát đầu tiên vào UI Khi chạy ứng dụng
		this.loadCurrentSong();
	},
};

app.start();
