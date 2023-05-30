let sceneView = document.querySelector('.scene');
let scene = new THREE.Scene();
scene.background = new THREE.Color(  0x01a3ee)
let camera = new THREE.PerspectiveCamera(75 , 600/550);
camera.position.set(0 ,0 ,8)
let renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(600,550);
sceneView.appendChild( renderer.domElement );

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 0);
light.castShadow = true;
scene.add(light);
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

let forme = new THREE.SphereGeometry(0.15,100);
let type = new THREE.MeshBasicMaterial({color : 0xffce30});
let pointBox = [
     p = new THREE.Mesh(forme , type ),
     p1 = new THREE.Mesh(forme , type ),
     p2 = new THREE.Mesh(forme , type ),
     p3 = new THREE.Mesh(forme , type ),
     p4 = new THREE.Mesh(forme , type ),
     p5 = new THREE.Mesh(forme , type ),
     p6 = new THREE.Mesh(forme , type ),
     p7 = new THREE.Mesh(forme , type ),
     p8 = new THREE.Mesh(forme , type ),
     p9 = new THREE.Mesh(forme , type ),
     p10 = new THREE.Mesh(forme , type ),
     p11 = new THREE.Mesh(forme , type ),
     p12 = new THREE.Mesh(forme , type ),
     p13 = new THREE.Mesh(forme , type ),
     p14 = new THREE.Mesh(forme , type ),
     p15 = new THREE.Mesh(forme , type ),
     p16 = new THREE.Mesh(forme , type ),
     p17 = new THREE.Mesh(forme , type ),
     p18 = new THREE.Mesh(forme , type ),
     p19 = new THREE.Mesh(forme , type ),
     p20 = new THREE.Mesh(forme , type ),
];

let formeOrg = new THREE.BoxGeometry(1,10,10);
let typeOrg = new THREE.MeshBasicMaterial({ color: 0x808080 });
let Org = new THREE.Mesh(formeOrg,typeOrg);
Org.receiveShadow = true;
scene.add(Org);
Org.rotation.z = -Math.PI / 2 ;
Org.position.set(0,-5,0);

pointBox.map((e)=> {
    Org.add(e);
    e.castShadow = true
});

const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

function animation() {
    requestAnimationFrame(animation)
	renderer.render( scene, camera );
}
animation();