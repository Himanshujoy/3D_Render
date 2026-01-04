// Constants for colors
const BACKGROUND_COLOR = "#101010"
const RECTANGLE_COLOR = "#50FF50"

import { objects, getObject } from "./data.js"

// Setup canvas
console.log(game)
game.width = 800
game.height = 800
const ctx = game.getContext("2d")
console.log(ctx)

// Clear the canvas
function clear()
{
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, game.width, game.height)
}

// Draw a point as a rectangle
function drawPoint({x,y})
{
    const size = 20
    ctx.fillStyle = RECTANGLE_COLOR
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
}

// Draw line between two points
function drawLine(point1, point2)
{
    ctx.beginPath()
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.strokeStyle = RECTANGLE_COLOR
    ctx.lineWidth = 4
    ctx.stroke()
}

// Convert normalized device coordinates to screen coordinates
function screen(point)
{
    point.x = (point.x + 1) * game.width / 2
    point.y = (1 - point.y) * game.height / 2
    return point
}

// Project 3D point to 2D
function project3Dto2D({x, y, z})
{
    return {
        x: x / z,
        y: y / z,
    }
}

// Rotate point around Y-axis
function rotate_Yaxis(point, angle)
{
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return {
        x: point.x * cos - point.z * sin,
        y: point.y,
        z: point.x * sin + point.z * cos
    }
}

// Animation parameters
const FPS = 60
let dz = 1;
let angle = 0;

// populate simple dropdown and select initial object
const selectEl = document.getElementById("objectSelect")
if (selectEl) {
    Object.keys(objects).forEach(name => {
        const opt = document.createElement("option")
        opt.value = name
        opt.textContent = name
        selectEl.appendChild(opt)
    })
}

let { points3D, edges } = getObject("cube")
if (selectEl) selectEl.value = "cube"

if (selectEl) {
    selectEl.addEventListener("change", (e) => {
        const obj = getObject(e.target.value)
        points3D = obj.points3D
        edges = obj.edges
    })
}

// read toggle controls (rotation and dz translation)
const rotateEl = document.getElementById("rotateToggle")
const dzEl = document.getElementById("dzToggle")
let enableRotation = rotateEl ? rotateEl.checked : true
let enableDZ = dzEl ? dzEl.checked : false
if (rotateEl) rotateEl.addEventListener("change", e => enableRotation = e.target.checked)
if (dzEl) dzEl.addEventListener("change", e => enableDZ = e.target.checked)

// Function to translate points along the Z-axis
function translateZ(points, dz)
{
    return {x: points.x, y: points.y, z: points.z + dz}
}

// Main animation loop
function frame()
{
    // Update Logic
    const dtime = 1 / FPS;
    if (enableDZ) dz += dtime * 0.5
    if (enableRotation) angle += dtime * Math.PI; // for rotation

    clear()
    // for Drawing Points
    // for(const p of points3D)
    // {
    //     drawPoint(screen(project3Dto2D(translateZ(rotate_Yaxis(p, angle), dz))))
    // }

    // for Drawing Edges
    for(const e of edges)
    {
        const p1 = screen(project3Dto2D(translateZ(rotate_Yaxis(points3D[e[0]], angle), dz)))
        const p2 = screen(project3Dto2D(translateZ(rotate_Yaxis(points3D[e[1]], angle), dz)))
        drawLine(p1, p2)
    }

    setTimeout(frame, 1000 / FPS);
}

setTimeout(frame, 1000 / FPS);