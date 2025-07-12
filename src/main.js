import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RESOLUTION } from './config.js';
import { createRandomTexture } from './texture.js';

// Scene
const scene = new THREE.Scene();

// Camera (orthographic)
let aspect = window.innerWidth / window.innerHeight;
const viewSize = 1;
const camera = new THREE.OrthographicCamera(
  -aspect * viewSize, aspect * viewSize,
   viewSize, -viewSize,
   0.1, 10
);
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls (wheel-to-zoom, drag-to-pan)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enableZoom   = true;
controls.enablePan    = true;
controls.target.set(0, 0, 0);
controls.update();

// Pixel quad: geometry matches resolution aspect so pixels stay square
const texture = createRandomTexture(RESOLUTION.width, RESOLUTION.height);
const resAspect = RESOLUTION.width / RESOLUTION.height;
const geometry = new THREE.PlaneGeometry(resAspect * 2, 2);
const material = new THREE.MeshBasicMaterial({ map: texture });
const quad = new THREE.Mesh(geometry, material);
scene.add(quad);

// Resize handling: only update camera & renderer, quad stays same size/aspect
window.addEventListener('resize', () => {
  aspect = window.innerWidth / window.innerHeight;
  camera.left   = -aspect * viewSize;
  camera.right  =  aspect * viewSize;
  camera.top    =  viewSize;
  camera.bottom = -viewSize;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
(function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
})();