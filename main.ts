function sendRadioSignal () {
    if (isRemote) {
        radio.sendValue("accX", input.acceleration(Dimension.X))
        radio.sendValue("accY", input.acceleration(Dimension.Y))
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "accX") {
        throttle = value
    } else if (name == "accY") {
    	
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    isRemote = true
    led.plotBrightness(2, 2, 255)
    led.plotBrightness(1, 1, 45)
    led.plotBrightness(2, 1, 45)
    led.plotBrightness(3, 1, 45)
    led.plotBrightness(1, 2, 45)
    led.plotBrightness(3, 2, 45)
    led.plotBrightness(1, 3, 45)
    led.plotBrightness(2, 3, 45)
    led.plotBrightness(3, 3, 45)
    basic.pause(1000)
})
let throttle = 0
let isRemote = false
radio.setFrequencyBand(24)
radio.setGroup(34)
radio.setTransmitSerialNumber(false)
isRemote = false
let isRobot = true
throttle = 0
basic.forever(function () {
    sendRadioSignal()
})
