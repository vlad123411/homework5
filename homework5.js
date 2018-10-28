
	
	//#2
	const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const rand = function (num) {
  return Math.floor(Math.random() * num);
};
const colorArray = ["red", "yellow", "black"];
const boxcreator = function (count, canvasWidth, canvasHeight) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const obj = {
      width: 40,
      height: 40,
      x: rand(canvasWidth - 40),
      y: rand(canvasHeight - 40),
      xDelta: 2,
      yDelta: 2,
      color: colorArray[rand(colorArray.length)],
      draw: function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
      },
      update: function () {
        this.x += this.xDelta; //0
        this.y += this.yDelta;//width
        if (this.x + this.width >= canvasWidth || this.x <= 0) { this.xDelta = -1 * (this.xDelta) }
        if (this.y <= 0 || this.y + this.height >= canvasHeight) { this.yDelta = -1 * (this.yDelta) }
        
      }
    };
    arr[i] = obj;
  }
  return arr;
};
let countObj = boxcreator(20, canvas.width, canvas.height);
const draw = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < countObj.length; i++) {
    countObj[i].draw();
  }
}
const update = function () {
  for (let i = 0; i < countObj.length; i++) {
    countObj[i].update();
  }
}
const animate = function () {
  requestAnimationFrame(animate);
  draw();
  update();
}
animate();
