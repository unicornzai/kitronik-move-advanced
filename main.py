def showRemoteSignal(x: number, y: number):
    if isRemote:
        if y < 0:
            iconUp(y)
        else:
            iconDown(y)
        if x < 0:
            iconLeft(x)
        else:
            iconRight(x)
def calcRemoteSignal(x: number, y: number):
    if isRemote:
        if abs(x) > 450:
            pass
        elif abs(x) > 250:
            pass
        elif abs(x) > 150:
            pass
        elif abs(x) > 100:
            pass
        elif abs(x) > 50:
            pass
        else:
            pass
def sendRadioSignal(x: number, y: number):
    if isRemote:
        radio.send_value("accX", x)
        radio.send_value("accY", y)
        showRemoteSignal(input.acceleration(Dimension.X),
            input.acceleration(Dimension.Y))
def iconDown(strength: number):
    iconDirection(strength, 2, 4, 2, 3)
    iconDirection(-1, 2, 0, 2, 1)
def moveRobot(throttle: number):
    if isRobot:
        if throttle > 0:
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, throttle / 13)
            images.arrow_image(ArrowNames.NORTH).show_image(0)
        else:
            basic.show_icon(IconNames.NO)
            Kitronik_Move_Motor.stop()
def iconLeft(strength: number):
    iconDirection(strength, 0, 2, 1, 2)
    iconDirection(-1, 4, 2, 3, 2)
def iconUp(strength: number):
    iconDirection(strength, 2, 0, 2, 1)
    iconDirection(-1, 2, 4, 2, 3)

def on_received_value(name, value):
    global throttle
    if name == "accY":
        throttle = value
radio.on_received_value(on_received_value)

def iconRight(strength: number):
    iconDirection(strength, 4, 2, 3, 2)
    iconDirection(-1, 0, 2, 1, 2)

def on_logo_touched():
    global isRobot, isRemote
    if not (isRemote):
        isRobot = False
        isRemote = True
        led.plot_brightness(2, 2, 255)
        led.plot_brightness(1, 1, 45)
        led.plot_brightness(2, 1, 45)
        led.plot_brightness(3, 1, 45)
        led.plot_brightness(1, 2, 45)
        led.plot_brightness(3, 2, 45)
        led.plot_brightness(1, 3, 45)
        led.plot_brightness(2, 3, 45)
        led.plot_brightness(3, 3, 45)
        basic.pause(1000)
        basic.clear_screen()
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

def iconDirection(strength: number, x1: number, y1: number, x2: number, y2: number):
    if abs(strength) > 450:
        led.unplot(x1, y1)
        led.unplot(x2, y2)
    elif abs(strength) > 250:
        led.plot_brightness(x1, y1, 255)
        led.plot_brightness(x2, y2, 255)
    elif abs(strength) > 150:
        led.plot_brightness(x1, y1, 100)
        led.plot_brightness(x2, y2, 100)
    elif abs(strength) > 100:
        led.plot_brightness(x1, y1, 50)
        led.plot_brightness(x2, y2, 50)
    elif abs(0) > 50:
        led.plot_brightness(x1, y1, 25)
        led.plot_brightness(x2, y2, 25)
    else:
        led.unplot(x1, y1)
        led.unplot(x2, y2)
throttle = 0
isRobot = False
isRemote = False
radio.set_group(34)
radio.set_transmit_serial_number(False)
isRemote = False
isRobot = True
throttle = 0

def on_forever():
    sendRadioSignal(input.acceleration(Dimension.X),
        input.acceleration(Dimension.Y))
basic.forever(on_forever)
