# Map, hover and pointer events

- `Map` methods and options are the public surface for hosts. If a host needs something private, add a public method here rather than having the host reach in.
- `Map._pointer` (the hover given back after a redraw) comes from pointer events filtered by `pointerType`: a browser's mouse events from a tap would leave a phantom pointer that brings the tooltip back after every touch pan.
- A touch `pointerdown` anywhere also calls `clearHover()`: scrolls and drags make no mouse events, so nothing else would hide the tooltip. `test:browser` checks both on a phone.
