const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider')
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
function TogglePlay() {
    console.log('hello');
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function UpdateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
function Skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);

}

function UpdateRange() {
    video.volumn = this.value;
    video.playbackRate= this.value;
}

function HandleProgress() {
    
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    
}
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
video.addEventListener('click', TogglePlay);
toggle.addEventListener('click', TogglePlay);

video.addEventListener('play', UpdateButton);
video.addEventListener('pause', UpdateButton);
video.addEventListener('timeupdate', HandleProgress);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', Skip));
ranges.forEach(range => range.addEventListener('change', UpdateRange));
progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));