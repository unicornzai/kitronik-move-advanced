def sendRadioSignal():
    if isRemote:
        radio.send_value("accX", input.acceleration(Dimension.X))
        radio.send_value("accY", input.acceleration(Dimension.Y))

def on_logo_touched():
    global isRemote
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
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

isRemote = False
radio.set_frequency_band(24)
radio.set_group(34)
radio.set_transmit_serial_number(False)
isRemote = False
isRobot = True

def on_forever():
    sendRadioSignal()
basic.forever(on_forever)
