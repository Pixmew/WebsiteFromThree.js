import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RGBA_ASTC_10x10_Format } from 'three'


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Objects
const geometry = new THREE.TorusKnotGeometry(5, 2, 200 ,16);

// Materials

var material = new THREE.MeshPhysicalMaterial()
material.roughness = 0.01;
//material.metalness = 0.7;
material.color = new THREE.Color(0xffffff)


// Mesh
const TorusoKnot = new THREE.Mesh(geometry,material)
TorusoKnot.scale.x = 5
TorusoKnot.scale.y = 5
TorusoKnot.scale.z = 5
scene.add(TorusoKnot)
TorusoKnot.position.set(0,0,0)


// Lights

const pointlight1 = new THREE.PointLight( 0xff0000, 1, 500 );
pointlight1.position.set( 0, 100, 20);
scene.add( pointlight1 );

const pointlight2 = new THREE.PointLight( 0x0000ff, 1, 500 );
pointlight2.position.set( 100, 20, 70);
scene.add( pointlight2 );



const pointlight3 = new THREE.PointLight( 0x00ff00, 1, 500 );
pointlight3.position.set( -100, 20, 70);
scene.add( pointlight3 );






//gui.add(geometry);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)

camera.position.x = 0
camera.position.y = 0
camera.position.z = 200
scene.add(camera)

 

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Controls
//const controls = new OrbitControls(camera, renderer.domElement)
//controls.enableDamping = true

/**
 * Animate
 */



const clock = new THREE.Clock()
var time = 0;
function ev(event){
    
    time += 0.05;
}

document.addEventListener('scroll' , ev);


    


const tick = () =>
{
    
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //TorusoKnot.rotation.y = .5 * elapsedTime
    TorusoKnot.setRotationFromAxisAngle(new THREE.Vector3(1,1,2) , elapsedTime * 0.1 + time);
    
    // Update Orbital Controls
     //controls.update()

    // Render
    renderer.render(scene, camera)
    //time = 0;
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()