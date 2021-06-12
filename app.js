const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Player class
class Player {

  constructor(x, y, radius, colour){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = colour;
  }

  draw(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.colour;
    c.fill();
  }

}

// Projectile class
class Projectile{
  constructor(x, y, radius, colour, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = colour;
    this.velocity = velocity;
  }

  draw(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.colour;
    c.fill();
  }

  update(){
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }

}

// Enemy class
class Enemy{
  constructor(x, y, radius, colour, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = colour;
    this.velocity = velocity;
  }

  draw(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.colour;
    c.fill();
  }

  update(){
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }

}

function spawnEnemies () {
  setInterval(() => {
    const x = Math.random()* canvas.width;
    const y = Math.random()* canvas.height;
    const theta = Math.atan2(x - canvas.width / 2, y - canvas.height / 2);
    const radius = Math.random()*30;
    const colour = 'green';
    const velocity = {
      x:  -1 * Math.sin(theta),
      y: - 1* Math.cos(theta)
    }

    enemies.push(new Enemy(x, y, radius, colour, velocity))

  }, 1000)
}








// Whenever the user clicks a new projectile is added to the array
const projectiles = [];
const enemies = [];








// Instantiate player
const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 30, 'blue');

// Instantiate projectiles
window.addEventListener('click', (e) => {
  const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX -canvas.width / 2);
  projectiles.push(new Projectile (x, y, 5, 'red', {x: 2*Math.cos(angle), y: 2*Math.sin(angle)}));
})


function showScore(score){
  c.fillStyle = 'white';
  c.font = "30px Arial";
  c.fillText('Score: ' + score, 50, 50, 140);
  console.log(score);
}


// keep track of the score
let score = 0;

function animate() {

// Clear the canvas
c.clearRect(0, 0, canvas.width, canvas.height);
// Draw the player
player.draw();
// Update the position of each
projectiles.forEach((projectile) => {
  projectile.update();
  });

// Update each enemy in the enemies array
enemies.forEach((enemy, index) => {

  enemy.update();


  const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

if (dist - enemy.radius - player.radius < 1){
    showScore(score);
    cancelAnimationFrame();
  }

  projectiles.forEach((projectile, projectileIndex) => {
    const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
    if (dist < enemy.radius){
      enemies.splice(index, 1);
      projectiles.splice(projectileIndex, 1);
      score += 1
    }
  })

})

showScore(score);

requestAnimationFrame(animate);
}







// Start the animation
animate();
spawnEnemies();



































