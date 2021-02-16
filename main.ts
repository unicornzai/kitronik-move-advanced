function foreverRemote () {
    calcRadioSignal(input.acceleration(Dimension.X), input.acceleration(Dimension.Y))
    sendRadioSignal()
    showRemoteSignal()
}
function showRemoteSignal () {
    if (isRemote) {
        if (throttle < 0) {
            iconUp(throttle)
            iconDown(0)
        } else {
            iconDown(throttle)
            iconUp(0)
        }
        if (direction < 0) {
            iconLeft(direction)
            iconRight(0)
        } else {
            iconRight(direction)
            iconLeft(0)
        }
    }
}
function sendRadioSignal () {
    radio.sendValue("direction", direction)
    radio.sendValue("throttle", throttle)
}
function iconDown (strength: number) {
    iconDirection(strength, 2, 4, 2, 3, 1, 4, 3, 4)
}
function moveRobot (throttle: number) {
    if (isRobot) {
        if (throttle > 0) {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, throttle / 13)
            images.arrowImage(ArrowNames.North).showImage(0)
        } else {
            basic.showIcon(IconNames.No)
            Kitronik_Move_Motor.stop()
        }
    }
}
function normaliseSignal (signal: number, limitUpper: boolean) {
    if (Math.abs(signal) > 750) {
        if (limitUpper) {
            if (signal < 0) {
                return 0
            }
        }
        return (signal > 0) ? 4 : -4
    } else if (Math.abs(signal) > 255) {
        return (signal > 0) ? 4 : -4
    } else if (Math.abs(signal) > 220) {
        return (signal > 0) ? 3 : -3
    } else if (Math.abs(signal) > 185) {
        return (signal > 0) ? 2 : -2
    } else if (Math.abs(signal) > 150) {
        return (signal > 0) ? 1 : -1
    } else {
        return 0
    }
}
function calcRadioSignal (x: number, y: number) {
    if (isRemote) {
        direction = normaliseSignal(x, false)
        throttle = normaliseSignal(y, true)
        if (Math.abs(x) > 900 || Math.abs(y) > 900) {
            direction = 0
            throttle = 0
        }
    }
}
function iconLeft (strength: number) {
    iconDirection(strength, 0, 2, 1, 2, 0, 1, 0, 3)
}
function iconUp (strength: number) {
    iconDirection(strength, 2, 0, 2, 1, 1, 0, 3, 0)
}
radio.onReceivedValue(function (name, value) {
    if (name == "throttle") {
        throttle = value
    }
})
function iconRight (strength: number) {
    iconDirection(strength, 4, 2, 3, 2, 4, 1, 4, 3)
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (!(isRemote)) {
        isRobot = false
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
function iconDirection (strength: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
    if (Math.abs(strength) == 4) {
        led.plotBrightness(x1, y1, 255)
        led.plotBrightness(x2, y2, 255)
        led.plotBrightness(x3, y3, 255)
        led.plotBrightness(x4, y4, 255)
    } else if (Math.abs(strength) == 3) {
        led.plotBrightness(x1, y1, 255)
        led.plotBrightness(x2, y2, 255)
        led.plotBrightness(x3, y3, 10)
        led.plotBrightness(x4, y4, 10)
    } else if (Math.abs(strength) == 2) {
        led.plotBrightness(x1, y1, 255)
        led.plotBrightness(x2, y2, 255)
        led.unplot(x3, y3)
        led.unplot(x4, y4)
    } else if (Math.abs(strength) == 1) {
        led.plotBrightness(x1, y1, 10)
        led.plotBrightness(x2, y2, 10)
        led.unplot(x3, y3)
        led.unplot(x4, y4)
    } else {
        led.unplot(x1, y1)
        led.unplot(x2, y2)
        led.unplot(x3, y3)
        led.unplot(x4, y4)
    }
}
let direction = 0
let throttle = 0
let isRobot = false
let isRemote = false
radio.setGroup(34)
radio.setTransmitSerialNumber(false)
isRemote = false
isRobot = true
throttle = 0
basic.forever(function () {
    if (isRemote) {
        foreverRemote()
    } else if (isRobot) {
    	
    }
})
