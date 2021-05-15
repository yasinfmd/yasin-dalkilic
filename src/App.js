import React from 'react'
import './App.css';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import anime from 'animejs/lib/anime.es.js';
import sound from './sound/piano.mp3'

import front from './assets/front.png'
import back from './assets/back.png'
import up from './assets/up.png'
import down from './assets/down.png'
import right from './assets/right.png'
import left from './assets/left.png'

let camera, scene, renderer, controls;
let geometry, mesh;
const mouse = new THREE.Vector2();
function App() {

  const canvasRef = React.useRef();
  const onNavigate = (key) => {
    switch (key) {
      case 'github':
        window.open('https://github.com/yasinfmd/', '_blank');
        break;
      case 'youtube':
        window.open('https://www.youtube.com/channel/UCEsQUEuxqOtzYYSVJIUs22A', '_blank');
        break;
      default:
        break;
    }
  }

  const render = () => {
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    mesh.rotation.z += 0.01

    renderer.render(scene, camera);
  }
  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const setup = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 30000);
    camera.position.set(-900, -200, -900)
    const ambientLight = new THREE.AmbientLight(0xffffff, .3)

    scene.add(ambientLight)

    geometry = new THREE.BoxBufferGeometry(10000, 10000, 10000);
    const materials = [
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(front), side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(back), side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(up), side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(down), side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(right), side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(left), side: THREE.DoubleSide }),
    ]
    mesh = new THREE.Mesh(geometry, materials)
    scene.add(mesh)

    controls = new OrbitControls(camera, canvasRef.current);

    controls.addEventListener("change", render)
    controls.minDistance = 500;
    controls.maxDistance = 5000;
    controls.update();
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setAnimationLoop(render);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.addEventListener("mousemove", onMouseMove)
    // canvasRef.current.addEventListener("click", onMouseClick)


    window.addEventListener('resize', onWindowResize);
  }

  React.useEffect(() => {
    setup()
    animateInitText()
  }, [])
  const animateInitText = () => {
    var textWrapper = document.querySelector('.ml14 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: true })
      .add({
        targets: '.ml14 .line',
        scaleX: [0, 1],
        opacity: [0.5, 1],
        easing: "easeInOutExpo",
        duration: 900
      }).add({
        targets: '.ml14 .letter',
        opacity: [0, 1],
        translateX: [40, 0],
        translateZ: 0,
        scaleX: [0.3, 1],
        easing: "easeOutExpo",
        duration: 800,
        offset: '-=600',
        delay: (el, i) => 150 + 25 * i
      }).add({
        targets: '.ml14',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
  }


  return (
    <>

      <div className="audioWrapper">

        <audio controls autoPlay={true} loop>
          <source src={sound} type="audio/mpeg" />
        </audio>
      </div>
      <div className="lookAt">
        <h2 className="rotate">Take a</h2>
        <h2>👀</h2>
      </div>

      <h1 className="ml14 ">
        <span className="text-wrapper">
          <span className="letters">Hi, I'am Yasin Dalkılıç</span>
          <span className="line"></span>
        </span>
      </h1>

      <h1 className="ml14 onLeft pointer" onClick={() => {
        onNavigate('github')
      }}>
        <span className="text-wrapper">
          <span className="letters">MyGithub</span>
          <span className="line"></span>
        </span>
      </h1>
      <h1 className="ml14 onRight pointer" onClick={() => {
        onNavigate('youtube')
      }}>
        <span className="text-wrapper">
          <span className="letters">MyChannel</span>
          <span className="line"></span>
        </span>
      </h1>

      <canvas ref={canvasRef} id="canvas" />


    </>
  );
}

export default App;
