const BACKGROUND_COLOR = "#101010"
const RECTANGLE_COLOR = "#50FF50"

console.log(game)
game.width = 800
game.height = 800
const ctx = game.getContext("2d")
console.log(ctx)

function clear()
{
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, game.width, game.height)
}

function drawPoint(x,y)
{
    const size = 20
    ctx.fillStyle = RECTANGLE_COLOR
    ctx.fillRect(x, y, size, size)
}

clear()
drawPoint(100, 100)