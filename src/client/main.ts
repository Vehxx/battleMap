import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RESOLUTION } from './config.js';
import { loadTextureFromServer } from './textureLoader';

// Scene setup
const scene = new THREE.Scene();
let aspect = window.innerWidth / window.innerHeight;
const viewSize = 1;
const camera = new THREE.OrthographicCamera(
  -aspect * viewSize, aspect * viewSize,
   viewSize, -viewSize,
   0.1, 10
);
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enableZoom   = true;
controls.enablePan    = true;
controls.target.set(0, 0, 0);
controls.update();

// Load texture from server and add to scene
loadTextureFromServer('ws://localhost:8080', (texture) => {
  const resAspect = RESOLUTION.width / RESOLUTION.height;
  const geometry = new THREE.PlaneGeometry(resAspect * 2, 2);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const quad = new THREE.Mesh(geometry, material);
  scene.add(quad);
});

// Resize handling
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
(function animate(): void {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
})();