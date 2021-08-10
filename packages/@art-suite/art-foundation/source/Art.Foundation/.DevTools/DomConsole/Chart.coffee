Atomic = require 'art-atomic'
Foundation = require 'art-foundation'
{point, rgbColor, rect, Matrix} = Atomic
{inspect, log} = Foundation

module.exports = class Chart
  @bar: (numbers, options={})->
    range = options.range
    pixelsPerPoint = options.pixelsPerPoint || 2
    fontSize = options.fontSize || 10
    margin = options.margin || if range then fontSize*1.4 else 0
    bgColor = rgbColor options.bgColor || rgbColor 1,1,1,0
    chartBgColor = rgbColor options.chartBgColor || "#fff7f0"
    barColor = rgbColor options.barColor || "rgba(0,0,0,.5)"
    textColor = rgbColor options.textColor || "orange"
    minWidth = options.minWidth || 50
    size = options.size || point numbers.length * 4, 50 + 2 * margin

    if options.barWidth
      size = size.withX numbers.length * options.barWidth

    size = size.withX minWidth if size.x < minWidth
    barWidth = size.x / numbers.length

    drawMatrix = Matrix.scale pixelsPerPoint

    out = new Art.Canvas.Bitmap size.mul pixelsPerPoint
    out.pixelsPerPoint = pixelsPerPoint
    out.clear bgColor

    drawArea = rect 0, margin, size.w, size.h - 2 * margin
    out.drawRectangle drawMatrix, drawArea, chartBgColor
    pos = drawArea.left
    maxNumber = 0
    for i in numbers
      maxNumber = i if i > maxNumber

    for i in numbers
      percent = i / maxNumber
      height = drawArea.h * percent
      barArea = rect(pos, drawArea.bottom - height, barWidth, height).round()
      out.drawRectangle drawMatrix, barArea, barColor
      pos+=barWidth

    if range
      out.drawText Matrix.translate(0,fontSize).mul(drawMatrix), "max: "+maxNumber, size:fontSize, color:textColor
      out.drawText Matrix.translate(0,size.y  ).mul(drawMatrix), range[0], size:fontSize, color:textColor
      out.drawText Matrix.translate(size      ).mul(drawMatrix), range[1], size:fontSize, color:textColor, align:"right"

    out
