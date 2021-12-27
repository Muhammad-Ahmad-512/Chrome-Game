// this is a helper file 

export function getCustomProperty(elem, prop){
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
    // this is to get the elements and their specific value if there is not then 0 and float is used cuz every thing in css is string
}

export function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value)
}

export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
  }
    //increment is to be get