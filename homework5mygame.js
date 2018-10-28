//#3 MyGame
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rand = function (num) {
  return Math.floor(Math.random() * num);
}
canvas.width = 700;
canvas.height = 550;

const backGround = new Image();
backGround.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-MFFgIvfgKeGLhQkFv9cA8UPnTFOXHYTpHChUryojyWJmKYfuvA';

const Hero = new Image();
Hero.src = 'https://mbtskoudsalg.com/images/cartoon-ghost-png.png';

const badGuys = new Image();
badGuys.src = 'https://i.pinimg.com/originals/77/d9/4d/77d94d850efa36d3c9d10e0543b33fc6.png';
const theVillains = function (count, canvasWidth, canvasHeight) {
  const arr = [];

  for (let i = 0; i < count; i++) {

    const evilObj = {
      width: 60,
      height: 60,
      x: rand(canvasWidth - 60),
      y: rand(canvasHeight - 60),
      xDelta: 1.5,
      yDelta: 1.5,
      image:badGuys,

      draw1: function () {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

      },
      update1: function () {
        this.x += this.xDelta;
        this.y += this.yDelta;
        if (this.x + this.width >= canvasWidth || this.x <= 0) { this.xDelta = -1 * (this.xDelta) }
        if (this.y <= 0 || this.y + this.height >= canvasHeight) { this.yDelta = -1 * (this.yDelta) }
      }
    };
    arr[i] = evilObj;
  }
  return arr;
};

let countObj = theVillains(6, canvas.width, canvas.height);
const draw1 = function () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backGround, 0, 0, canvas.width, canvas.height);
  for (let i = 0; i < countObj.length; i++) {

    countObj[i].draw1();

  }
}

const GameOver = function () {
  for (let i = 0; i < countObj.length; i++) {
    if (countObj[i].x + countObj[i].width >= ghost.x && countObj[i].x <= ghost.x + ghost.width && countObj[i].y + countObj[i].height >= ghost.y && countObj[i].y <= ghost.y + ghost.height) {
     alert("Game over !!!")
    }
  }
}
const update1 = function () {
  for (let i = 0; i < countObj.length; i++) {
    countObj[i].update1();
  }
};
const ghost = {
  x: 0,
  y: 450,
  width: 75,
  height: 100,
  xDelta: 0,
  yDelta: 0,
  image: Hero,
  draw: function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },
  update: function () {
    this.x += this.xDelta;
    this.y += this.yDelta;
  },
};

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
document.addEventListener('keydown', function (event) {
  if (event.keyCode === rightKey) {
    ghost.xDelta = 4;
  } if (event.keyCode === leftKey) {
    ghost.xDelta = -4;
  };
}, false);
document.addEventListener('keydown', function (event) {
  if (event.keyCode === upKey) {
    ghost.yDelta = -4;
  } if (event.keyCode === downKey) {
    ghost.yDelta = 4;
  };
}, false);
document.addEventListener('keyup', function (event) {

  ghost.yDelta = 0;


}, false);

document.addEventListener('keyup', function (event) {

  ghost.xDelta = 0;


}, false);

const loop = function () {

  GameOver();

  draw1();
  update1();
  ghost.draw();
  ghost.update();

  requestAnimationFrame(loop);
};
loop();
