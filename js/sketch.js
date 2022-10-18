// init renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor("#000000");
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.body.appendChild( renderer.domElement );

// init scene
var scene = new THREE.Scene();

// world save
const save = () => {
  const output = scene.toJSON();
  const data = JSON.stringify(output);
  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'world.json';
  link.href = url;
  link.click();
}

// create seed
noise.seed(Math.random() * 100000);

// create camera and window
let height = window.innerHeight;
let width = window.innerWidth;
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 30000);
camera.position.set(0, 100 ,0);
var controls = new THREE.OrbitControls(camera);


// directional light
const directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.y = 100;
directionalLight.position.z = 50;
directionalLight.castShadow = true;
scene.add( directionalLight );

// functions to create different blocks
function stoneBlock(x, y, z) {
    const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial({ color: 0x888C8D});
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    scene.add( cube );
}

function grassBlock(x, y, z) {
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x1E821E});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    scene.add(cube);
}

function waterBlock(x, y, z) {
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    scene.add(cube);
}

function logBlock(x, y, z) {
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x725c42 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);
}

function leafBlock(x, y, z) {
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x618a3d });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);
}

async function draw() {
  //create 3d terrain using noise.perlin()
  for (let x = -100; x < 100; x++) {
      for (let z = -100; z < 100; z++) {
        let y = Math.round(noise.perlin2(x / 80, z / 80) * 30 + 5);
        //generate terrain
        if (y <= 0) {
          waterBlock(x, 0, z);
        } else if (y < 15 && y > 0) {
          grassBlock(x, y, z);
        } else {
          stoneBlock(x, y, z);
        }
        // generate trees
        if (y > 2 && y < 15) {
          if (Math.random() < 0.0025) {
            logBlock(x, y + 1, z);
            logBlock(x, y + 2, z);
            logBlock(x, y + 3, z);
            leafBlock(x, y + 4, z);
            leafBlock(x + 1, y + 4, z);
            leafBlock(x - 1, y + 4, z);
            leafBlock(x, y + 4, z + 1);
            leafBlock(x, y + 4, z - 1);
            leafBlock(x + 1, y + 4, z + 1);
            leafBlock(x - 1, y + 4, z - 1);
            leafBlock(x + 1, y + 4, z - 1);
            leafBlock(x - 1, y + 4, z + 1);
            leafBlock(x, y + 5, z);
          }
        }
      
    }
  }
}
draw();

// Render Loop
var render = function () {
    requestAnimationFrame( render );

  console.log( renderer.info.render.triangles );
  controls.update();
  // Render the scene
  renderer.render(scene, camera);
};

render();
save();