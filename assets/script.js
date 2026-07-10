const OH_HONEY = [
    "  ____   ___  _   _  ____  _   _\n / __ \\ / _ \\| \\ | |/ __ \\| \\ | |\n| |  | | | | |  \\| | |  | |  \\| |\n| |  | | | | | . \\` | |  | | . \\` |\n| |__| | |_| | |\\  | |__| | |\\  |\n \\____/ \\___/|_| \\_|\\____/|_| \\_|",
    "   ___   ___   ___   ___   ___\n  / _ \\ / _ \\ / _ \\ / _ \\ / _ \\\n | | | | | | | | | | | | | | | |\n | |_| | |_| | |_| | |_| | |_| |\n  \\___/ \\___/ \\___/ \\___/ \\___/",
    "  __  __  ___  _   _\n |  \\/  |/ _ \\| \\ | |\n | |\\/| | | | |  \\| |\n | |  | | |_| | |\\  |\n |_|  |_|\\___/|_| \\_|",
    "  ______   ___   ___\n |  ____| |__ \\ / _ \\\n | |__       ) | | | |\n |  __|     / /| | | |\n | |____   / /_| |_| |\n |______| |____|\\___/",
    "  __   __  ___\n |  | |  |/ _ \\\n |  |_| | | | |\n |   _  | | | |\n |  | | | | |_| |\n |__| |_|\\___/",
    "  _____  _   _  _____\n |  __ \\| \\ | |/ ____|\n | |__) |  \\| | (___\n |  _  /| . \\` |\\___ \\\n | | \\ \\| |\\  |____) |\n |_|  \\_\\_| \\_|_____/"
];

const AUDIO_SRC = "https://tahakara.dev/assets/lorem.mp3";
const AUDIO_VOLUME = 0.47;

const scene = document.querySelector(".sence");
const audio = document.createElement("audio");
audio.src = AUDIO_SRC;
audio.volume = AUDIO_VOLUME;
audio.preload = "auto";
document.body.appendChild(audio);

let sceneRevealed = false;
let debuggerSequenceActive = false;
let debuggerIntervalId = null;
let debuggerFrameIndex = 0;

function revealScene() {
    if (sceneRevealed || !scene) {
        return;
    }

    sceneRevealed = true;
    scene.classList.add("is-visible");
    audio.play().catch(() => {});
}

function isDebuggerOpen() {
    const widthGap = Math.abs(window.outerWidth - window.innerWidth);
    const heightGap = Math.abs(window.outerHeight - window.innerHeight);

    return widthGap > 160 || heightGap > 160;
}

function startDebuggerSequence() {
    if (debuggerSequenceActive) {
        return;
    }

    debuggerSequenceActive = true;
    debuggerFrameIndex = 0;
    debuggerIntervalId = window.setInterval(() => {
        console.clear();
        console.log(OH_HONEY[debuggerFrameIndex]);
        debuggerFrameIndex = (debuggerFrameIndex + 1) % OH_HONEY.length;
    }, 120);
}

function stopDebuggerSequence() {
    if (debuggerIntervalId !== null) {
        window.clearInterval(debuggerIntervalId);
        debuggerIntervalId = null;
    }

    debuggerSequenceActive = false;
}

function syncDebuggerState() {
    if (isDebuggerOpen()) {
        startDebuggerSequence();
        return;
    }

    stopDebuggerSequence();
}

document.addEventListener("click", revealScene, { once: true });
window.addEventListener("load", syncDebuggerState);
window.addEventListener("resize", syncDebuggerState);
window.setInterval(syncDebuggerState, 500);