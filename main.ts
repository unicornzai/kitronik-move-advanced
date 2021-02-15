function showRemoteSignal (x: number, y: number) {
    if (isRemote) {
        if (y < 0) {
            iconUp(y)
        } else {
            iconDown(y)
        }
        if (x < 0) {
            iconLeft(x)
        } else {
            iconRight(x)
        }
    }
}
function sendRadioSignal (x: number, y: number) {
    if (isRemote) {
        radio.sendValue("accX", x)
        radio.sendValue("accY", y)
        showRemoteSignal(input.acceleration(Dimension.X), input.acceleration(Dimension.Y))
    }
}
function iconDown (strength: number) {
    iconDirection(strength, 2, 4, 2, 3)
    iconDirection(-1, 2, 0, 2, 1)
}
function moveRobot (throttle: number) {
    if (throttle > 0) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, throttle / 13)
    } else {
        Kitronik_Move_Motor.stop()
    }
}
function iconLeft (strength: number) {
    iconDirection(strength, 0, 2, 1, 2)
    iconDirection(-1, 4, 2, 3, 2)
}
function iconUp (strength: number) {
    iconDirection(strength, 2, 0, 2, 1)
    iconDirection(-1, 2, 4, 2, 3)
}
radio.onReceivedValue(function (name, value) {
    if (name == "accX") {
        throttle = value
    } else if (name == "accY") {
    	
    }
})
function iconRight (strength: number) {
    iconDirection(strength, 4, 2, 3, 2)
    iconDirection(-1, 0, 2, 1, 2)
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (!(isRemote)) {
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
        basic.clearScreen()
    }
})
function iconDirection (strength: number, x1: number, y1: number, x2: number, y2: number) {
    if (Math.abs(strength) > 950) {
        led.plotBrightness(x1, y1, 255)
        led.plotBrightness(x2, y2, 255)
    } else if (Math.abs(strength) > 750) {
        led.plotBrightness(x1, y1, 175)
        led.plotBrightness(x2, y2, 175)
    } else if (Math.abs(strength) > 550) {
        led.plotBrightness(x1, y1, 100)
        led.plotBrightness(x2, y2, 100)
    } else if (Math.abs(0) > 350) {
        led.plotBrightness(x1, y1, 50)
        led.plotBrightness(x2, y2, 50)
    } else {
        led.unplot(x1, y1)
        led.unplot(x2, y2)
    }
}
let throttle = 0
let isRemote = false
radio.setFrequencyBand(24)
radio.setGroup(34)
radio.setTransmitSerialNumber(false)
isRemote = false
let isRobot = true
throttle = 0
basic.forever(function () {
    sendRadioSignal(input.acceleration(Dimension.X), input.acceleration(Dimension.Y))
    moveRobot(throttle)
})
