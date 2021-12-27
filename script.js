import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
//creating variable

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001


// selecting the data-variables element 
const worldElem = document.querySelector('[data-world]')
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

//for window resizing and event 
setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })


setupGround() 
//creating the function for scaling



// creating repeat update loop for every single frame  and adding score 
let lasttime
let speedScale
let score
function update(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
        // we are doing this keep the frame time consistant as possible from the very first frame    
    }
    const delta = time - lastTime
    // delta is time btw frames
    
    updateGround(delta, speedScale)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    if (checkLose()) return handleLose()
    
    lasttime = time 
    window.requestAnimationFrame(update)
}

//dino actions
function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
        )
    }
    
    //frames speed
    function updateSpeedScale(delta) {
        speedScale += delta * SPEED_SCALE_INCREASE
    }
    
    //fuction for score track
    function updateScore(delta) {
        score += delta * 0.01
        scoreElem.textContent = Math.floor(score)
    }
    
    // key fuctionalities
    function handleStart() {
        lastTime = null
        speedScale = 1
        score = 0
        setupGround()
        setupDino()
        setupCactus()
        startScreenElem.classList.add("hide")
        window.requestAnimationFrame(update)
    }
    
    function handleLose() {
        setDinoLose()
        setTimeout(() => {
            document.addEventListener("keydown", handleStart, { once: true })
      startScreenElem.classList.remove("hide")
    }, 100)
}


    function setPixelToWorldScale(){
        //we can  use the variable to control th scale
        let worldToPixelScale
        if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
          worldToPixelScale = window.innerWidth / WORLD_WIDTH
        } else {
          worldToPixelScale = window.innerHeight / WORLD_HEIGHT
        }
      
        worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
        worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
      }
  