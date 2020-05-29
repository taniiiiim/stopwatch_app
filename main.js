const MINUTE = 6000;
const SECOND = 100;
const MAX_TIME = 599999;
const FUNCTION_NAMES = [
  "Stopwatch",
  "Timer"
]

window.onload = () => {
  let fnc = document.getElementById("fnc");
  let startStop = document.getElementById("start-stop");
  let reset = document.getElementById("reset");
  let toggle = document.getElementById("toggle");
  let min = document.getElementById("min");
  let sec = document.getElementById("sec");
  let tenms = document.getElementById("tenms");

  let state = {
    initialTime: 0,
    time: 0,
    isRunning: false,
    functionName: "Stopwatch"
  }

  let timerId

  startStop.onclick = () => {
    process(state.functionName, state.isRunning);
  }

  reset.onclick = () => {
    resetTime(state.isRunning);
  }

  toggle.onclick = () => {
    toggleFunction(state.functionName);
  }

  let process = (functionName, isRunning) => {
    if (isRunning) {
      stop();
    } else {
      state.isRunning = true
      startStop.value = "Stop";
      toggle.disabled = true;
      if (functionName === "Stopwatch") {
        timerId = setInterval(() => {
          if (state.time === MAX_TIME) {
            stop();
            startStop.disabled = true;
            alert("It's time, you guys!!");
          } else {
            state.time += 1
            setTime(state.time);
          }
        }, 10);
      } else if (functionName === "Timer") {
        timerId = setInterval(() => {
          if (state.time === 0) {
            stop();
            startStop.disabled = true;
            alert("It's time, you guys!!");
          } else {
            state.time -= 1
            setTime(state.time);
          }
        }, 10);
      }
    }
  }

  let setTime = (time) => {
    min.innerHTML = ("0" + Math.floor(state.time / MINUTE )).slice(-2);
    sec.innerHTML = ("0" + Math.floor((state.time % MINUTE ) / SECOND)).slice(-2);
    tenms.innerHTML = ("0" + Math.floor((state.time % MINUTE ) % SECOND)).slice(-2);
  }

  let stop = () => {
    state.isRunning = false;
    clearInterval(timerId);
    startStop.value = "Start";
    toggle.disabled = false;
  }

  let resetTime = (isRunning) => {
    if (isRunning) {
      stop();
    } else {
      state.time = state.initialTime;
      setTime(state.time);
      startStop.disabled = false;
    }
  }

  let toggleFunction = (functionName) => {
    toggle_index = (FUNCTION_NAMES.findIndex(elem => elem === functionName) + 1) % FUNCTION_NAMES.length;
    state.functionName = FUNCTION_NAMES[toggle_index];
    fnc.innerHTML = state.functionName;
    switch (state.functionName) {
      case "Stopwatch":
        state.initialTime = 0;
        break;
      case "Timer":
        state.initialTime = 1 * MINUTE;
        break;
      default:
        state.initialTime = 0;
        break;
    }
    resetTime(state.isRunning);
  }
}
