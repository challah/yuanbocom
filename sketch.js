const circleDm = 25;
const headNum = 6;
const yuanGraphics = [];
let yuanHead;
let rot = 0;
let zombo;
let increment = 1;

function preload() {
  yuanHead = loadImage("./images/yuan.png");
  zombo = loadSound("zombo.mp3");
}

function setup() {
//YOOOO! You can apply tint() in setup. Storing that new image will give you better performance than applying the tint every frame (that would lag) 
  for (let i = 0; i < headNum; i++) {
    let newGraphic = createGraphics(64, 64);
    newGraphic.colorMode(HSL);
    newGraphic.tint((360 / headNum) * i, 70, 60);
    newGraphic.image(yuanHead, 0, 0, 64, 64);
    yuanGraphics.push(newGraphic);
  }

  let scaryButton = createButton("ZOMBO 🔊");
  scaryButton.id("scary-button");
  scaryButton.mousePressed(zomboPlay);
  scaryButton.parent('button-container')

  let canvas = createCanvas(400, 400);
  canvas.parent('p5-container');
  colorMode(HSL);
  angleMode(DEGREES);
  imageMode(CENTER);
}

function draw() {
  background(220);
  push();
  translate(width / 2, height / 2);
  image(yuanHead, 0, 0, 64, 64);

  if (rot >= 360) {
    rot = 0;
  } else {
    rot+= increment;
  }
  polygon(0, 0, 74, 6, rot);
  pop();

  if (!zombo.isPlaying()) {
    document.querySelector("#scary-button").innerHTML = "ZOMBO 🔊";
    increment = 1;
  } else {
    document.querySelector("#scary-button").innerHTML = "Gah, stop!";
    increment = 3;
  }
}

function polygon(x, y, radius, npoints, rotation = 0) {
  let angle = 360 / npoints;
  let i = 0;
  for (let a = 0 + rotation; a < 360 + rotation; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    image(yuanGraphics[i], sx, sy, 64, 64);
    i++;
  }
}

function zomboPlay() {
  if (zombo.isPlaying()) {
    // .isPlaying() returns a boolean
    zombo.stop();
    // document.querySelector("#scary-button").innerHTML = "ZOMBO";
  } else {
    zombo.play();
    // document.querySelector("#scary-button").innerHTML = "Gah, stop!";
  }
}

const headerText = document.querySelector('h1').innerText;
const text = headerText.split("");
document.querySelector('h1').innerHTML = (text.reduce(rainbowText, ""));
function rainbowText(result, letter, i, source) {
  const color = `hsl(${i / source.length * 360}, 100%, 50%)`;
  return result += `<span style="color: ${color};">${letter}</span>`;
}
