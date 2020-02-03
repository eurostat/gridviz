# Gridded statistics visualization tool

The aim of this project is to effectively render gridded statistics client-side.  
After numerous experiments, we concluded that WebGL was the best method for achieving this.

![alt text](https://github.com/eurostat/EuroGridLayer/blob/master/preview.png "Eurostat population grid") 

In terms of performance, funnily enough Three.js has been the best at rendering a 2D grid.

## [Live demo](https://eurostat.github.io/EuroGridLayer/main)

## Installation

This particular project uses node.js and webpack as development tools.

- In the 'main' folder, with node.js installed:
- run 'npm install' from the command line
- Then run 'npm start' to launch a dev server and navigate to http://localhost:8080/
  See package.json for more info.
