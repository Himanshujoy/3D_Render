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

const FPS = 60
let dz = 1;

const points3D = [
    {x:  0.5, y:  0.5, z:  0.5},
    {x: -0.5, y:  0.5, z:  0.5},
    {x:  0.5, y: -0.5, z:  0.5},
    {x: -0.5, y: -0.5, z:  0.5},

    {x:  0.5, y:  0.5, z: -0.5},
    {x: -0.5, y:  0.5, z: -0.5},
    {x:  0.5, y: -0.5, z: -0.5},
    {x: -0.5, y: -0.5, z: -0.5},
]

function translateZ(points, dz)
{
    return {x: points.x, y: points.y, z: points.z + dz}
}

function frame()
{
    const dtime = 1 / FPS;
    dz += dtime * 1
    clear()
    for(const p of points3D)
    {
        drawPoint(screen(project3Dto2D(translateZ(p, dz))))
    }
    setTimeout(frame, 1000 / FPS);
}

setTimeout(frame, 1000 / FPS);