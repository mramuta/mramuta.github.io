const constraints = window.constraints = {
  audio: false,
  video: true
};

const recorderInterval = [];
function handleSuccess(stream, delay) {
  const recorder = new MediaRecorder(stream)
  const video = document.querySelector('video');
  const restart = ({ data }) => {
    console.log("RESTART!!!!!  " + delay + "  " + new Date())
    video.src = URL.createObjectURL(data)
    recorder.start()
  }

  video.autoplay = true

  recorder.addEventListener('dataavailable', restart)
  recorder.start()
  
  recorderInterval.push(window.setInterval(recorder.stop.bind(recorder), delay * 1000));
}

function clearVideo(){
  recorderInterval.forEach(interval =>{
    window.clearInterval(interval)  
  })
}


let stream;

async function initWithoutClick(delay) {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream, delay);
  } catch (e) {
    console.log(e);
  }
}

const slider = document.getElementById("slider");
const output = document.getElementById("delay-value");

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  clearVideo()
  handleSuccess(stream, this.value)
}

initWithoutClick(slider.value)
