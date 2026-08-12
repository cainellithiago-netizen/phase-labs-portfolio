// This file contains the Three.js hero scene and custom cursor logic.
const heroCanvas = document.getElementById('hero-canvas');
const customCursor = document.querySelector('.custom-cursor');
const cursorCore = document.querySelector('.cursor-core');
const cursorRing = document.querySelector('.cursor-ring');

let mouse = { x: 0.5, y: 0.5 };
let target = { x: 0.5, y: 0.5 };
let hovered = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5.8);

const renderer = new THREE.WebGLRenderer({
  canvas: heroCanvas,
  alpha: true,
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0x000000, 0);

const ambient = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambient);

const point = new THREE.PointLight(0x8fa3ff, 1.6, 16, 2);
point.position.set(2.5, 2.2, 3.2);
scene.add(point);

const point2 = new THREE.PointLight(0x7f92ff, 1.2, 14, 2);
point2.position.set(-2.4, -1.4, 2.8);
scene.add(point2);

const sphereGeo = new THREE.IcosahedronGeometry(1.45, 128);
const sphereMat = new THREE.ShaderMaterial({
  transparent: true,
  opacity: 0.86,
  depthWrite: false,
  side: THREE.DoubleSide,
  blending: THREE.NormalBlending,
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uGlow: { value: 0.16 },
    uTint: { value: new THREE.Color(0.35, 0.45, 0.92) },
  },
  vertexShader: `
    uniform float uTime;
    varying vec3 vPos;
    varying vec3 vNormal;
    void main() {
      vPos = position;
      vNormal = normal;
      float noise = sin(position.y * 4.5 + uTime * 0.9) * 0.04;
      vec3 displaced = position + normal * noise;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uGlow;
    uniform vec3 uTint;
    varying vec3 vPos;
    varying vec3 vNormal;
    void main() {
      float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 2.0);
      float pulse = 0.22 + 0.08 * sin(uTime * 1.2 + length(vPos.xy) * 3.2);
      vec3 base = vec3(0.015, 0.04, 0.10) + uTint * 0.14;
      vec3 glow = vec3(0.3, 0.45, 0.82) * pow(fresnel + pulse, 1.35);
      vec3 color = base + glow * 0.22;
      float alpha = mix(0.08, 0.18, fresnel) * 0.78;
      gl_FragColor = vec4(color, alpha);
    }
  `,
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(0, 0, 0);
scene.add(sphere);

const ringGroup = new THREE.Group();
scene.add(ringGroup);

const ringConfigs = [
  { radius: 2.05, thickness: 0.010, color: 0x7b8bff, speed: 0.0011, tilt: 0.12 },
  { radius: 2.35, thickness: 0.009, color: 0xa5b3ff, speed: -0.0009, tilt: -0.26 },
  { radius: 2.75, thickness: 0.009, color: 0x7c96ff, speed: 0.0013, tilt: 0.08 },
];

ringConfigs.forEach((cfg, index) => {
  const geo = new THREE.TorusGeometry(cfg.radius, cfg.thickness, 64, 240);
  const mat = new THREE.MeshBasicMaterial({
    color: cfg.color,
    transparent: true,
    opacity: 0.24,
    blending: THREE.AdditiveBlending,
  });
  const ring = new THREE.Mesh(geo, mat);
  ring.rotation.x = Math.PI / 2 + cfg.tilt;
  ring.rotation.y = index * 0.35;
  ring.userData = cfg;
  ringGroup.add(ring);
});

const particleCount = 80;
const particleGroup = new THREE.Group();
scene.add(particleGroup);

for (let i = 0; i < particleCount; i++) {
  const size = Math.random() * 0.025 + 0.008;
  const geometry = new THREE.SphereGeometry(size, 10, 10);
  const material = new THREE.MeshBasicMaterial({
    color: 0xc8dcff,
    transparent: true,
    opacity: 0.01 + Math.random() * 0.04,
    blending: THREE.NormalBlending,
  });
  const particle = new THREE.Mesh(geometry, material);
  const radius = 1.9 + Math.random() * 1.25;
  const angle = Math.random() * Math.PI * 2;
  particle.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 0.75, Math.sin(angle) * radius);
  particle.userData = {
    angle,
    radius,
    speed: 0.0007 + Math.random() * 0.0009,
    drift: (Math.random() - 0.5) * 0.00005,
  };
  particleGroup.add(particle);
}

const backgroundParticles = new THREE.Group();
scene.add(backgroundParticles);
for (let i = 0; i < 20; i++) {
  const size = 0.02 + Math.random() * 0.04;
  const geo = new THREE.SphereGeometry(size, 10, 10);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.06 + Math.random() * 0.08,
    blending: THREE.AdditiveBlending,
  });
  const p = new THREE.Mesh(geo, mat);
  p.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 5, -6 - Math.random() * 4);
  backgroundParticles.add(p);
}

const resizeHero = () => {
  const width = heroCanvas.clientWidth;
  const height = heroCanvas.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', () => {
  resizeHero();
});

resizeHero();

let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.45,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

const cursorState = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

const updateCursor = () => {
  customCursor.style.left = `${cursorState.x}px`;
  customCursor.style.top = `${cursorState.y}px`;
};

window.addEventListener('mousemove', (event) => {
  cursorState.x = event.clientX;
  cursorState.y = event.clientY;
  mouse.x = event.clientX / window.innerWidth;
  mouse.y = 1 - event.clientY / window.innerHeight;
  hovered = false;
  updateCursor();
});

const interactiveElements = document.querySelectorAll('button, a, .project-card, .hero-visual');
interactiveElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    customCursor.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    customCursor.classList.remove('cursor-hover');
  });
});

const rayMouse = new THREE.Vector2();
const tempVec = new THREE.Vector3();
let heroBounds = heroCanvas.getBoundingClientRect();

window.addEventListener('mousemove', (e) => {
  heroBounds = heroCanvas.getBoundingClientRect();
  const x = ((e.clientX - heroBounds.left) / heroBounds.width) * 2 - 1;
  const y = -((e.clientY - heroBounds.top) / heroBounds.height) * 2 + 1;
  rayMouse.set(x, y);
});

const clock = new THREE.Clock();

const animateHero = () => {
  const time = clock.getElapsedTime();
  sphereMat.uniforms.uTime.value = time;
  sphereMat.uniforms.uMouse.value.lerp(new THREE.Vector2(mouse.x, mouse.y), 0.08);

  const targetX = (mouse.x - 0.5) * 0.5;
  const targetY = (mouse.y - 0.5) * 0.5;
  sphere.rotation.x += (targetY - sphere.rotation.x) * 0.06;
  sphere.rotation.y += (targetX - sphere.rotation.y) * 0.08;

  ringGroup.children.forEach((ring, idx) => {
    const speed = ring.userData.speed;
    ring.rotation.z += speed;
    ring.rotation.x += Math.sin(time * 0.15 + idx) * 0.0009;
    ring.material.opacity = 0.2 + Math.abs(Math.sin(time * 0.12 + idx)) * 0.08;
  });

  particleGroup.children.forEach((particle) => {
    particle.userData.angle += particle.userData.speed;
    const x = Math.cos(particle.userData.angle) * particle.userData.radius;
    const z = Math.sin(particle.userData.angle) * particle.userData.radius;
    particle.position.x = x;
    particle.position.z = z;
    particle.position.y += Math.sin(time * 0.3 + particle.userData.radius) * particle.userData.drift;
    particle.material.opacity = 0.04 + Math.sin(time * 0.6 + particle.userData.radius) * 0.03;
  });

  backgroundParticles.rotation.y = time * 0.01;
  backgroundParticles.rotation.x = Math.sin(time * 0.02) * 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animateHero);
};

requestAnimationFrame(animateHero);
