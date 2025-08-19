// Array to hold all particle objects
let particles = [];
const numParticles = 100;

// Settings for the particle connections
const connectDistance = 100; // The maximum distance to draw a line

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.size = 5;
  }

  // Update particle's position
  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  // Draw the particle
  show() {
    noStroke();
    fill('rgba(255, 255, 255, 0.8)');
    circle(this.pos.x, this.pos.y, this.size);
  }

  // Handle screen edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  // Check for nearby particles and draw lines
  connect(particles) {
    for (let other of particles) {
      if (other !== this) {
        const d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < connectDistance) {
          // Map distance to line opacity for a fade effect
          const alpha = map(d, 0, connectDistance, 0.6, 0);
          stroke(`rgba(255, 255, 255, ${alpha})`);
          strokeWeight(1);
          line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        }
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the particles
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0); // Black background

  // Update and display all particles
  for (let p of particles) {
    p.update();
    p.show();
    p.connect(particles); // Check for connections
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Re-initialize particles on resize to avoid weird behavior
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}