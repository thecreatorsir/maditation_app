const app = () => {
  const song = document.querySelector(".song"),
    play = document.querySelector(".play"),
    outline = document.querySelector(".moving-outline circle"),
    video = document.querySelector(".vid-container video"),
    sounds = document.querySelectorAll(".sound-picker button");

  //time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelector = document.querySelectorAll(".time-selector button");
  //get the length of outline
  const outlineLength = outline.getTotalLength();

  //default duration
  let fakeDuration = 120;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // select sound
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //select duration
  timeSelector.forEach((item) => {
    item.addEventListener("click", (e) => {
      fakeDuration = e.target.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
      e.preventDefault();
    });
  });

  //creating a function specific to stop and play sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //animate cicle and time
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animate the circle

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animate text

    timeDisplay.textContent = `${minutes}:${seconds}`;
    //pause everything after finish
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};
app();
