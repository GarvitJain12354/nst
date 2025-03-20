// Import the necessary Three.js components
const scene = new THREE.Scene();

// Set up OrthographicCamera
const aspect = window.innerWidth / window.innerHeight;
const cameraSize = 10;
const camera = new THREE.OrthographicCamera(
    -cameraSize * aspect, 
    cameraSize * aspect,  
    cameraSize,           
    -cameraSize,          
    0.1,                  
    1000                  
);
camera.position.set(0, 10, 20); // Adjusted for optimal view
camera.lookAt(scene.position); 

// Create a WebGL renderer and configure transparency, encoding, and tone mapping
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2; 

// Append renderer to the specific div with ID 'shreya'
const container = document.getElementById('shreya');
if (container) {
    container.appendChild(renderer.domElement);
} else {
    console.error("Element with ID 'shreya' not found.");
}

// Add ambient light for base illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Add a spotlight for focused lighting with shadow support
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(10, 20, 10);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.5;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
scene.add(spotLight);

// Add a point light for glow effect
const pointLight = new THREE.PointLight(0xfefefe, 1.2, 500);
pointLight.position.set(0, 5, -5);
scene.add(pointLight);

// Create a group for the hammer
const hammerGroup = new THREE.Group();
scene.add(hammerGroup);

// Load the hammer model
const loader = new THREE.GLTFLoader();
let hammer;

loader.load(
    'stylized_fatasy_hammer/scene.gltf',  
    (gltf) => {
        hammer = gltf.scene;
        hammer.scale.set(7, 7, 7);
        hammer.position.set(0, 0, 0); 
        hammer.rotation.z = 0; // Set hammer to horizontal
        hammer.rotation.y = 0; // Rotate hammer 180 degrees
        hammer.castShadow = true;

        hammer.traverse((node) => {
            if (node.isMesh) {
                node.material.metalness = 0.8;
                node.material.roughness = 0.5;
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        hammerGroup.add(hammer); 
    },
    undefined,
    (error) => console.error("Error loading GLTF model:", error)
);

// Animate the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the hammer continuously around its Y-axis
    hammerGroup.rotation.x += 0.01;

    renderer.render(scene, camera);
}

// Resize handling
window.addEventListener("resize", () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = -cameraSize * aspect;
    camera.right = cameraSize * aspect;
    camera.top = cameraSize;
    camera.bottom = -cameraSize;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation loop
animate();
