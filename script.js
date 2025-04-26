// Initialize Parallax
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

// Clock Code
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const radius = width / 2;
ctx.translate(radius, radius);

function drawClock() {
  ctx.clearRect(-radius, -radius, width, height);
  
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hr = now.getHours();
  
  // Background
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
  
  // Hour marks
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 8;
  ctx.beginPath();
  for (let i = 0; i < 12; i++) {
    let angle = i * Math.PI / 6;
    ctx.moveTo((radius - 10) * Math.cos(angle), (radius - 10) * Math.sin(angle));
    ctx.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
  }
  ctx.stroke();
  
  // Hour hand
  ctx.save();
  ctx.rotate((Math.PI / 6) * (hr % 12) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -radius * 0.5);
  ctx.stroke();
  ctx.restore();
  
  // Minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.lineTo(0, -radius * 0.7);
  ctx.stroke();
  ctx.restore();
  
  // Second hand
  ctx.save();
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 2;
  ctx.rotate((Math.PI / 30) * sec);
  ctx.beginPath();
  ctx.moveTo(0, 20);
  ctx.lineTo(0, -radius * 0.8);
  ctx.stroke();
  ctx.restore();
}

setInterval(drawClock, 1000);
