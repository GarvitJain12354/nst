const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / (window.innerHeight),
  0.1,
  1000
);
camera.position.set(0, -1, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById("simulation-area").appendChild(renderer.domElement);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 5, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Load texture and create cuboid material
const textureLoader = new THREE.TextureLoader();
const cuboidMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.8,
  metalness: 0.1,
});

const defaultTexturePath = "texture/flagstone.jpg";
textureLoader.load(defaultTexturePath, (texture) => {
  cuboidMaterial.map = texture;
  cuboidMaterial.needsUpdate = true;
});

// Responsive cuboid size
let cuboidGeometry = new THREE.BoxGeometry(4, 1, 4); // Default size
const cuboid = new THREE.Mesh(cuboidGeometry, cuboidMaterial);
cuboid.castShadow = true;
cuboid.receiveShadow = true;
cuboid.position.set(0, 0.5, 0);
cuboid.rotation.x = Math.PI / 4;
cuboid.rotation.y = Math.PI / 4;
scene.add(cuboid);

// Create a plane to receive shadows
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -3;
plane.receiveShadow = true;
scene.add(plane);

// Hovering effect variables
let hoverDirection = 1;
let hoverSpeed = 0.001;
let hoverAmplitude = 0.1;

// Resize handling
function adjustSceneForDevice() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update camera aspect ratio and projection matrix
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(width, height);

  // Adjust cuboid size based on screen width
  let scaleFactor = 1.2; // Default scale factor
  if (width < 768) {
    // Mobile devices
    scaleFactor = 0.8;
  } else if (width < 1024) {
    // Tablets
    scaleFactor = 1;
  }
  cuboid.scale.set(scaleFactor, scaleFactor, scaleFactor);
}

// Add event listener for resizing
window.addEventListener("resize", adjustSceneForDevice);

// Initial adjustment
adjustSceneForDevice();

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cuboid
  cuboid.rotation.y += 0.005;

  // Hovering effect
  cuboid.position.y += hoverDirection * hoverSpeed;

  // Reverse direction when reaching certain limits
  if (cuboid.position.y > 0.5 + hoverAmplitude) {
    hoverDirection = -1;
  } else if (cuboid.position.y < 0.5 - hoverAmplitude) {
    hoverDirection = 1;
  }

  renderer.render(scene, camera);
}

animate();
