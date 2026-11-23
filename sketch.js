// ml5.js: Classifying Drawings with DoodleNet (Mouse)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/9.1-doodlenet.html
// https://youtu.be/ABN_DWnM5GQ

// Template: https://editor.p5js.org/codingtrain/sketches/AHgkwgPdc
// Mouse: https://editor.p5js.org/codingtrain/sketches/6LLnGY1VY
// Video: https://editor.p5js.org/codingtrain/sketches/fxFKOn3il

//Arnelle Comrie, November 2026

let clearButton;
let canvas;

let doodleClassifier;
let resultsDiv;

function setup() {
  canvas = createCanvas(800, 600);
  clearButton = createButton('Abandon Ship!');
  clearButton.mousePressed(clearCanvas);
  background(400);
  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  resultsDiv = createDiv('model loading');
}

function modelReady() {
  console.log('model loaded');
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // console.log(results);
  let content = `${results[0].label} 
                 ${nf(100 * results[0].confidence, 2, 1)}%<br/>
                 ${results[1].label} 
                 ${nf(100 * results[1].confidence, 2, 1)}%`;

  resultsDiv.html(content);
  doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  background(400);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
let r = map(mouseX, 0, width, 0, 255);
let g = map(mouseY, 0, height, 0, 255);
    document.body.style.backgroundColor = `rgb(${r}, ${g}, 150)`;
  }
}
