function foreverRobot () {
    calcAcceleration()
    calcSpeed()
    moveRobotWithMomentum()
}
function foreverRemote () {
    calcRadioSignal(input.acceleration(Dimension.X), input.acceleration(Dimension.Y))
    sendRadioSignal()
    showRemoteSignal()
}
function moveRobotWithMomentum () {
    if (throttle == -4) {
        Kitronik_Move_Motor.stop()
    } else if (speed > minSpeed) {
        if (direction == 0) {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
        } else if (direction == 2) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Wide)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, speed)
        } else if (direction == 3) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, speed)
        } else if (direction == 4) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, speed)
        } else if (direction == -2) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Wide)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, speed)
        } else if (direction == -3) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, speed)
        } else if (direction == -4) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, speed)
        }
    } else {
        Kitronik_Move_Motor.stop()
    }
}
function showRemoteSignal () {
    if (isRemote) {
        if (throttle > 0) {
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
function calcSpeed () {
    tempSpeed = (speed + acceleration) * friction
    if (tempSpeed < maxSpeed) {
        if (-0.6 < tempSpeed && tempSpeed < 0.6) {
            speed = minSpeed
        } else {
            speed = tempSpeed
        }
    } else {
        speed = maxSpeed
    }
}
function sendRadioSignal () {
    radio.sendValue("x", direction)
    radio.sendValue("y", throttle)
}
function iconDown (strength: number) {
    iconDirection(strength, 2, 4, 2, 3, 1, 4, 3, 4)
}
function moveRobot () {
    if (throttle > 0) {
        if (direction == 0) {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
        } else if (direction == 2) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Wide)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, speed)
        } else if (direction == 3) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, speed)
        } else if (direction == 4) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, speed)
        } else if (direction == -2) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Wide)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, speed)
        } else if (direction == -3) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, speed)
        } else if (direction == -4) {
            Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, speed)
        }
    } else if (throttle == -4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    } else {
        Kitronik_Move_Motor.stop()
    }
}
function normaliseSignal (signal: number) {
    if (Math.abs(signal) > 1500) {
        return 0
    } else if (Math.abs(signal) > 1400) {
        return (signal > 0) ? 4 : -4
    } else if (Math.abs(signal) > 400) {
        return (signal > 0) ? 3 : -3
    } else if (Math.abs(signal) > 150) {
        return (signal > 0) ? 2 : -2
    } else if (Math.abs(signal) > 140) {
        return (signal > 0) ? 1 : -1
    } else {
        return 0
    }
}
function calcRadioSignal (x: number, y: number) {
    if (isRemote) {
        direction = normaliseSignal(x)
        if (input.buttonIsPressed(Button.AB)) {
            throttle = -4
            direction = 0
        } else if (input.buttonIsPressed(Button.A)) {
            throttle = 4
        } else if (input.buttonIsPressed(Button.B)) {
            throttle = 0
        } else {
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
    if (name == "y") {
        throttle = value
    }
    if (name == "x") {
        direction = value
    }
})
function iconRight (strength: number) {
    iconDirection(strength, 4, 2, 3, 2, 4, 1, 4, 3)
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (!(isRemote)) {
        isRobot = false
        basic.clearScreen()
        myImage = images.createImage(`
            . . . . .
            # . . . .
            # . . . .
            # . . . .
            . . . . .
            `)
        myImage.scrollImage(1, 25)
        myImage.scrollImage(1, 25)
        myImage.scrollImage(1, 25)
        myImage.scrollImage(1, 25)
        myImage.scrollImage(1, 25)
        basic.clearScreen()
        isRemote = true
    }
})
function calcAcceleration () {
    if (throttle > 0) {
        if (acceleration <= 0) {
            acceleration = 1.5
        }
        tempAcceleration = acceleration * 1.1
        if (tempAcceleration < maxAcceleration) {
            acceleration = tempAcceleration
        } else {
            acceleration = maxAcceleration
        }
    } else {
        if (acceleration > 0.6) {
            acceleration = acceleration * 0.85
        } else {
            acceleration = 0
        }
    }
}
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
let myImage: Image = null
let tempSpeed = 0
let maxSpeed = 0
let minSpeed = 0
let speed = 0
let friction = 0
let tempAcceleration = 0
let maxAcceleration = 0
let acceleration = 0
let direction = 0
let throttle = 0
let isRobot = false
let isRemote = false
radio.setGroup(34)
radio.setTransmitSerialNumber(false)
isRemote = false
isRobot = true
throttle = 0
direction = 0
acceleration = 0
maxAcceleration = 11
tempAcceleration = 0
friction = 0.9
speed = 0
minSpeed = 5
maxSpeed = 100
tempSpeed = 0
basic.forever(function () {
    if (isRemote) {
        foreverRemote()
    } else if (isRobot) {
        foreverRobot()
    }
})
