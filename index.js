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

function drawPoint({x,y})
{
    const size = 20
    ctx.fillStyle = RECTANGLE_COLOR
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

function screen(point)
{
    point.x = (point.x + 1) * game.width / 2
    point.y = (1 - point.y) * game.height / 2
    return point
}

function project3Dto2D({x, y, z})
{
    return {
        x: x / z,
        y: y / z,
    }
}

clear()
drawPoint(screen(project3Dto2D({x: 0, y: 0, z: 1})))