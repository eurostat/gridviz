# Map, hover and pointer events

- `Map` methods and options are the public surface for hosts. If a host needs something private, add a public method here rather than having the host reach in.
- `Map._pointer` (the hover given back after a redraw) comes from pointer events filtered by `pointerType`: a browser's mouse events from a tap would leave a phantom pointer that brings the tooltip back after every touch pan.
- A touch `pointerdown` anywhere also calls `clearHover()`: scrolls and drags make no mouse events, so nothing else would hide the tooltip. `test:browser` checks both on a phone.
- D3's double-tap zoom comes from a `touchend` with no active touches: use its transform, not `targetTouches`, for the view. A redraw during a gesture must replace its canvas snapshot or the next gesture frame shows stale tiles.
