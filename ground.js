import { getCustomProperty, incrementCustomProperty, setCustomProperty} from "./updateCustomProperty.js"
// this for ground elements only / position
const SPEED = 0.05
const groundElems = document.querySelectorAll("[data-ground]")

// to script
export function updateGround(delta, speedScale) {
    //taking the position and updating it from css
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)
    
        if (getCustomProperty(ground, "--left") <= -300) {
          incrementCustomProperty(ground, "--left", 600)
        }
      })
    }

//for looping the ground
export function setupGround() {
    setCustomProperty(groundElems[0], "--left", 0)
    setCustomProperty(groundElems[1], "--left", 300)
  }