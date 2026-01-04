# 3D Render

Small demo project containing a basic 3D rendering example using vanilla JS. Inspired by [Tsoding](https://www.youtube.com/watch?v=qjWkNZ0SXfo) and added features such as a data file for storing points and edges for different models, and dropdown for which model to render, and toggles for rotation, translation, display vertex, and colour picker

## Files

- `index.html` — HTML entry point and simple controls.
- `index.js` — Main JavaScript file that initializes the 3D rendering and animation loop.
- `data.js` — Geometry data for multiple objects (named models with `points3D` and `edges`).

## Available objects

The project ships with a few example models. Change the selection from the dropdown (above the animation) to view a different object:

- `cube`
- `pyramid`
- `tetrahedron`
-  `Penguin`

## Selecting objects

Use the dropdown labeled **Object** above the canvas to switch which model is rendered. The dropdown is populated from `data.js` at runtime; you can add new entries there and they will appear automatically.

## Run (serve over HTTP)

ES modules (used by `index.js`) must be served over HTTP. Do not open `index.html` via `file://` — that causes a CORS/blocking error. From the project root run:

Python 3:

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Node (http-server):

```bash
npx http-server -p 8000
# then open http://localhost:8000 in your browser
```

## Notes

- To change the default initially-selected object, edit the default name in `index.js` (the code sets `cube` by default).
- Suggested next steps: add usage examples, screenshots, or a `start` script in `package.json`.

## Author

Himanshu Srivastava