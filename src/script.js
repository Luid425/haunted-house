console.time("Timer1");
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({
  width: 250,
  closed: true,
  title: "Haunted house",
}).hide();
window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    if (gui._hidden) gui.show();
    else gui.hide();
  }
});
gui.add(location, "href").name("url");

let preset = {};
const memo = {
  savePreset() {
    // save current values to an object
    preset = gui.save();
    loadButton.enable();
  },
  loadPreset() {
    gui.load(preset);
  },
};
gui.add(memo, "savePreset");
const loadButton = gui.add(memo, "loadPreset").disable();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Fog
 */
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

// AxesHelper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

/**
 * Textures
 */
// LoadingManager

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("[loadingManager] Start");
};
loadingManager.onLoad = () => {
  console.log("[loadingManager] all complete");
};
loadingManager.onError = () => {
  console.log("on Error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const doorColorTexture = textureLoader.load(
  "/textures/door/color.jpg",
  () => {
    console.log("[doorColorTexture] load complete");
  },
  () => {
    console.log("[doorColorTexture] load progress");
  },
  () => {
    console.log("[doorColorTexture] load error");
  }
);
const doorAlphaTexture = textureLoader.load(
  "/textures/door/alpha.jpg",
  () => {
    console.log("[doorAlphaTexture] load complete");
  },
  () => {
    console.log("[doorAlphaTexture] load progress");
  },
  () => {
    console.log("[doorAlphaTexture] load error");
  }
);
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg",
  () => {
    console.log("[doorAmbientOcclusionTexture] load complete");
  },
  () => {
    console.log("[doorAmbientOcclusionTexture] load progress");
  },
  () => {
    console.log("[doorAmbientOcclusionTexture] load error");
  }
);
const doorHeightTexture = textureLoader.load(
  "/textures/door/height.jpg",
  () => {
    console.log("[doorHeightTexture] load complete");
  },
  () => {
    console.log("[doorHeightTexture] load progress");
  },
  () => {
    console.log("[doorHeightTexture] load error");
  }
);
const doorNormalTexture = textureLoader.load(
  "/textures/door/normal.jpg",
  () => {
    console.log("[doorNormalTexture] load complete");
  },
  () => {
    console.log("[doorNormalTexture] load progress");
  },
  () => {
    console.log("[doorNormalTexture] load error");
  }
);
const doorMetalnessTexture = textureLoader.load(
  "/textures/door/metalness.jpg",
  () => {
    console.log("[doorMetalnessTexture] load complete");
  },
  () => {
    console.log("[doorMetalnessTexture] load progress");
  },
  () => {
    console.log("[doorMetalnessTexture] load error");
  }
);
const doorRoughnessTexture = textureLoader.load(
  "/textures/door/roughness.jpg",
  () => {
    console.log("[doorRoughnessTexture] load complete");
  },
  () => {
    console.log("[doorRoughnessTexture] load progress");
  },
  () => {
    console.log("[doorRoughnessTexture] load error");
  }
);

// Walls textures
const bricksColorTexture = textureLoader.load(
  "/textures/bricks/color.jpg",
  () => {
    console.log("[bricksColorTexture] load complete");
  },
  () => {
    console.log("[bricksColorTexture] load progress");
  },
  () => {
    console.log("[bricksColorTexture] load error");
  }
);
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg",
  () => {
    console.log("[bricksAmbientOcclusionTexture] load complete");
  },
  () => {
    console.log("[bricksAmbientOcclusionTexture] load progress");
  },
  () => {
    console.log("[bricksAmbientOcclusionTexture] load error");
  }
);
const bricksNormalTexture = textureLoader.load(
  "/textures/bricks/normal.jpg",
  () => {
    console.log("[bricksNormalTexture] load complete");
  },
  () => {
    console.log("[bricksNormalTexture] load progress");
  },
  () => {
    console.log("[bricksNormalTexture] load error");
  }
);
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg",
  () => {
    console.log("[bricksRoughnessTexture] load complete");
  },
  () => {
    console.log("[bricksRoughnessTexture] load progress");
  },
  () => {
    console.log("[bricksRoughnessTexture] load error");
  }
);

// Grass Tectures
const grassColorTexture = textureLoader.load(
  "/textures/ground/gs_color.jpg",
  () => {
    console.log("[grassColorTexture] load complete");
  },
  () => {
    console.log("[grassColorTexture] load progress");
  },
  () => {
    console.log("[grassColorTexture] load error");
  }
);
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/ground/gs_ambient.jpg",
  () => {
    console.log("[grassAmbientOcclusionTexture] load complete");
  },
  () => {
    console.log("[grassAmbientOcclusionTexture] load progress");
  },
  () => {
    console.log("[grassAmbientOcclusionTexture] load error");
  }
);
const grassNormalTexture = textureLoader.load(
  "/textures/ground/gs_normal.jpg",
  () => {
    console.log("[grassNormalTexture] load complete");
  },
  () => {
    console.log("[grassNormalTexture] load progress");
  },
  () => {
    console.log("[grassNormalTexture] load error");
  }
);
const grassRoughnessTexture = textureLoader.load(
  "/textures/ground/gs_roughness.jpg",
  () => {
    console.log("[grassRoughnessTexture] load complete");
  },
  () => {
    console.log("[grassRoughnessTexture] load progress");
  },
  () => {
    console.log("[grassRoughnessTexture] load error");
  }
);
const grassHeightTexture = textureLoader.load(
  "/textures/ground/gs_height.png",
  () => {
    console.log("[grassHeightTexture] load complete");
  },
  () => {
    console.log("[grassHeightTexture] load progress");
  },
  () => {
    console.log("[grassHeightTexture] load error");
  }
);

grassColorTexture.repeat.set(20, 20);
grassAmbientOcclusionTexture.repeat.set(20, 20);
grassNormalTexture.repeat.set(20, 20);
grassRoughnessTexture.repeat.set(20, 20);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;


/**
 * House
 */
// House container
const house = new THREE.Group();
scene.add(house);

// Walls
const wall_dimension = {
  height: 2.5,
  width: 4,
  depth: 4,
};

const wallsMaterial = new THREE.MeshStandardMaterial({
  map: bricksColorTexture,
  aoMap: bricksAmbientOcclusionTexture,
  normalMap: bricksNormalTexture,
  roughnessMap: bricksRoughnessTexture,
  roughness: 0.8,
  aoMapIntensity: 3.3,
});

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    wall_dimension.width,
    wall_dimension.height,
    wall_dimension.depth
  ),
  wallsMaterial
);

walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = wall_dimension.height / 2;
house.add(walls);
// Debug
const folderWallsMaterial = gui.addFolder("wallsMaterial");
folderWallsMaterial.add(wallsMaterial, "roughness", 0, 1, 0.0001);
folderWallsMaterial.add(wallsMaterial, "aoMapIntensity", 0, 5, 0.0001);

//Roof
const roof_dimension = {
  radius: 3.5,
  height: 1,
  radialSegments: 4,
};
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(
    roof_dimension.radius,
    roof_dimension.height,
    roof_dimension.radialSegments
  ),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = wall_dimension.height + roof_dimension.height / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door
const door_dimension = {
  width: 2,
  height: 2,
};

const doorGeometry = new THREE.PlaneGeometry(
  door_dimension.width,
  door_dimension.height,
  100,
  100
);
const doorMaterial = new THREE.MeshStandardMaterial({
  map: doorColorTexture,
  transparent: true,
  alphaMap: doorAlphaTexture,
  aoMap: doorAmbientOcclusionTexture,
  aoMapIntensity: 3.3,
  displacementMap: doorHeightTexture,
  displacementScale: 0.07,
  normalMap: doorNormalTexture,
  metalnessMap: doorMetalnessTexture,
  roughnessMap: doorRoughnessTexture,
});

const door = new THREE.Mesh(doorGeometry, doorMaterial);

door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = door_dimension.height / 2 - 0.1;
door.position.z = wall_dimension.width / 2 + 0.01;

house.add(door);
// Debug
const folderDoorMaterial = gui.addFolder("doorMaterial");
folderDoorMaterial
  .add(doorMaterial, "aoMapIntensity", 0, 5, 0.0001)
  .onChange((value) => console.log(value));
folderDoorMaterial
  .add(doorMaterial, "displacementScale", 0, 1, 0.0001)
  .onFinishChange((value) => console.log(value));
folderDoorMaterial.add(doorMaterial, "roughness", 0, 1, 0.0001);
folderDoorMaterial.add(doorMaterial, "metalness", 0, 1, 0.0001);
folderDoorMaterial.add(door.position, "y", 0, 2, 0.0001);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2; // Random angle
  const radius = 3.5 + Math.random() * 5.5; // Random radius
  const x = Math.cos(angle) * radius; // Get the x position using cosinus
  const z = Math.sin(angle) * radius; // Get the z position using sinus

  // Create the mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  // Position
  grave.position.set(x, 0.3, z);

  // Rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.castShadow = true;
  // Add to the graves container
  graves.add(grave);
}

// map: doorColorTexture,
//   transparent: true,
//   alphaMap: doorAlphaTexture,
//   aoMap: doorAmbientOcclusionTexture,
//   aoMapIntensity: 3.3,
//   displacementMap: doorHeightTexture,
//   displacementScale: 0.07,
//   normalMap: doorNormalTexture,
//   metalnessMap: doorMetalnessTexture,
//   roughnessMap: doorRoughnessTexture,
// Floor
const floorMaterial = new THREE.MeshStandardMaterial({
  map: grassColorTexture,
  aoMap: grassAmbientOcclusionTexture,
  normalMap: grassNormalTexture,
  roughnessMap: grassRoughnessTexture,
  displacementMap: grassHeightTexture,
  displacementScale: 0.01,
  // wireframe: true,
});
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 50, 50),
  floorMaterial
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);
// Debug
const folderGrassMaterial = gui.addFolder("floorMaterial");
folderGrassMaterial.add(floorMaterial, "roughness", 0, 1, 0.0001);
folderGrassMaterial.add(floorMaterial, "aoMapIntensity", 0, 5, 0.0001);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
const folderAmbientLight = gui.addFolder("ambientLight");
folderAmbientLight.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 3, -2);
moonLight.target = walls;
scene.add(moonLight);
// Debug
const folderMoonLight = gui.addFolder("moonLight");
folderMoonLight.add(moonLight, "intensity").min(0).max(1).step(0.001);
folderMoonLight
  .add(moonLight.position, "x")
  .min(-6)
  .max(6)
  .step(0.001)
  .listen();
folderMoonLight.add(moonLight.position, "y").min(-6).max(6).step(0.001);
folderMoonLight
  .add(moonLight.position, "z")
  .min(-6)
  .max(6)
  .step(0.001)
  .listen();

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 1, 4);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghost3);

// Ghost Helper
const sphereSize = 0.02;

// const ghost1LightHelper = new THREE.PointLightHelper(ghost1, sphereSize);
// scene.add(ghost1LightHelper);
// const ghost2LightHelper = new THREE.PointLightHelper(ghost2, sphereSize);
// scene.add(ghost2LightHelper);
// const ghost3LightHelper = new THREE.PointLightHelper(ghost3, sphereSize);
// scene.add(ghost3LightHelper);

// Light Helper
// const moonLightHelper = new THREE.PointLightHelper(
//   moonLight,
//   sphereSize,
//   0xffff00
// );
// scene.add(moonLightHelper);

// const doorLighttHelper = new THREE.PointLightHelper(
//   doorLight,
//   sphereSize,
//   0x0000ff
// );
// scene.add(doorLighttHelper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Camera helper
// const helper = new THREE.CameraHelper(camera);
// scene.add(helper);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

/**
 * Shadows
 */
moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

renderer.shadowMap.enabled = true;

moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

// ...

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

// ...

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

// ...

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

// ...

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

// ...

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

console.timeEnd("Timer1");
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // moonLight movement
  // moonLight.position.x = 3 * Math.cos(elapsedTime);
  // moonLight.position.z = 3 * Math.sin(elapsedTime);

  // Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
