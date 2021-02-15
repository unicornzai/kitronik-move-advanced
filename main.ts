input.onGesture(Gesture.TiltLeft, function () {
	
})
let accY = 0
let accX = 0
input.setAccelerometerRange(AcceleratorRange.EightG)
led.setDisplayMode(DisplayMode.Greyscale)
led.plotBrightness(0, 0, 45)
led.plotBrightness(2, 2, 255)
basic.forever(function () {
    accX = input.acceleration(Dimension.X)
    accY = input.acceleration(Dimension.Y)
})
