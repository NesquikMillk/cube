import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Отрисовщик
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setClearColor(0xe0e0e0, 1); // Фон
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

// Создание сцены
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  10
);
camera.position.z = 2;

// Управление камерой
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 5;
controls.enablePan = false;
controls.enableZoom = false;

// Создание красного куба
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xff0000, // Красный цвет
  roughness: 0.5,
  metalness: 0,
  flatShading: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Освещение
scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444, 3));
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(1, 1, 1);
scene.add(light);

// Обновление размеров рендера
function updateSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

// Анимация
function animate() {
  updateSize();

  // Анимация вращения куба
  cube.rotation.y = Date.now() * 0.001;

  renderer.render(scene, camera);
}

// Обработка изменения размеров окна
window.addEventListener('resize', updateSize);
