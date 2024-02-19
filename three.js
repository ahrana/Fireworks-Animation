  const colors = ['#b80257', '#233142', '#455d7a', '#f95959', '#e3e3e3'];
  
  let scene, camera, renderer;
  let fireworks = [];
  let particles = [];
  let fireworkCount = 15;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    for (let i = 0; i < fireworkCount; i++) {
      let firework = createFirework();
      fireworks.push(firework);
      scene.add(firework);
    }

    animate();
  }

  function createFirework() {
    let firework = new THREE.Group();
    let fireworkMaterial = new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)] });

    let fireworkGeometry = new THREE.SphereGeometry(1, 8, 8);
    let fireworkMesh = new THREE.Mesh(fireworkGeometry, fireworkMaterial);
    firework.add(fireworkMesh);

    let particleCount = 100;
    let particleMaterial = new THREE.PointsMaterial({ color: colors[Math.floor(Math.random() * colors.length)], size: 0.5 });

    let particleGeometry = new THREE.BufferGeometry();
    let particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 30;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    let particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    firework.add(particlesMesh);

    return firework;
  }

  function animate() {
    requestAnimationFrame(animate);
    fireworks.forEach(firework => {
      firework.position.y += 0.5;
      firework.rotation.y += 0.01;
      firework.children[1].rotation.y += 0.05;
      if (firework.position.y > 100) {
        firework.position.y = -100;
      }
    });
    renderer.render(scene, camera);
  }

  document.getElementById('fireButton').addEventListener('click', () => {
    fireworks.forEach(firework => {
      firework.position.x = (Math.random() - 0.5) * 200;
      firework.position.y = -100;
      firework.position.z = (Math.random() - 0.5) * 200;
    });
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  init();
