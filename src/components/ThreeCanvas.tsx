import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Sun } from 'lucide-react';

interface ThreeCanvasProps {
  className?: string;
  theme?: 'gold' | 'emerald' | 'amber';
}

export default function ThreeCanvas({ className = '', theme = 'gold' }: ThreeCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [lightColor, setLightColor] = useState('#ffea79');
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(new THREE.Color(lightColor), 2.2);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffb703, 1.2);
    dirLight2.position.set(-4, -3, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xfff3b0, 1.5, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // Explorer 3D Composite Object: An Explorer Compass & Star Emblem
    const group = new THREE.Group();

    // 1. Outer Brass Rim (Torus)
    const rimGeom = new THREE.TorusGeometry(1.5, 0.16, 24, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xe6a117,
      metalness: 0.88,
      roughness: 0.18,
      wireframe: wireframe
    });
    const rim = new THREE.Mesh(rimGeom, rimMat);
    group.add(rim);

    // 2. Compass Base (Cylinder)
    const baseGeom = new THREE.CylinderGeometry(1.48, 1.48, 0.18, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x2b1c10,
      metalness: 0.4,
      roughness: 0.3,
      wireframe: wireframe
    });
    baseGeom.rotateX(Math.PI / 2);
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.position.z = -0.05;
    group.add(base);

    // 3. Dial Face Inner Disc (Circle)
    const dialGeom = new THREE.CircleGeometry(1.4, 48);
    const dialMat = new THREE.MeshStandardMaterial({
      color: 0xfff8ee,
      roughness: 0.5,
      metalness: 0.1,
      wireframe: wireframe
    });
    const dial = new THREE.Mesh(dialGeom, dialMat);
    dial.position.z = 0.05;
    group.add(dial);

    // 4. Central Cardinal Star Emblem
    const starGroup = new THREE.Group();
    const northConeGeom = new THREE.ConeGeometry(0.28, 0.95, 4);
    const northMat = new THREE.MeshStandardMaterial({
      color: 0xd9381e, // Red pointer for North
      metalness: 0.3,
      roughness: 0.2,
      wireframe: wireframe
    });
    const northCone = new THREE.Mesh(northConeGeom, northMat);
    northCone.position.y = 0.45;
    northCone.position.z = 0.14;
    starGroup.add(northCone);

    const southConeGeom = new THREE.ConeGeometry(0.28, 0.95, 4);
    const southMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Slate pointer for South
      metalness: 0.6,
      roughness: 0.25,
      wireframe: wireframe
    });
    southConeGeom.rotateZ(Math.PI);
    const southCone = new THREE.Mesh(southConeGeom, southMat);
    southCone.position.y = -0.45;
    southCone.position.z = 0.14;
    starGroup.add(southCone);

    // Center pivot jewel
    const jewelGeom = new THREE.SphereGeometry(0.18, 20, 20);
    const jewelMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.1
    });
    const jewel = new THREE.Mesh(jewelGeom, jewelMat);
    jewel.position.z = 0.2;
    starGroup.add(jewel);

    group.add(starGroup);

    // 5. Glass Lens Dome (Hemisphere with transparency)
    const glassGeom = new THREE.SphereGeometry(1.44, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.8);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 0.7,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      metalness: 0.1
    });
    glassGeom.rotateX(Math.PI / 2);
    const glass = new THREE.Mesh(glassGeom, glassMat);
    glass.position.z = 0.05;
    group.add(glass);

    // 6. Floating Sparkle Particles around the 3D compass
    const particlesCount = 28;
    const particleGeom = new THREE.DodecahedronGeometry(0.045);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x664400
    });

    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < particlesCount; i++) {
      const p = new THREE.Mesh(particleGeom, particleMat);
      const angle = (i / particlesCount) * Math.PI * 2;
      const radius = 1.9 + Math.random() * 0.7;
      p.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 1.2
      );
      group.add(p);
      particles.push(p);
    }

    scene.add(group);

    // Interaction handlers
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    domElement.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domElement.addEventListener('touchstart', onPointerDown);
    domElement.addEventListener('touchmove', onPointerMove);
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && !isDragging) {
        group.rotation.y += 0.008;
        group.rotation.x = Math.sin(elapsedTime * 0.8) * 0.18;
        starGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.25;
      }

      // Animate floating particles
      particles.forEach((p, idx) => {
        p.position.y += Math.sin(elapsedTime * 2 + idx) * 0.003;
        p.rotation.x += 0.02;
        p.rotation.y += 0.03;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      domElement.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      domElement.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
      rimGeom.dispose();
      baseGeom.dispose();
      dialGeom.dispose();
      northConeGeom.dispose();
      southConeGeom.dispose();
      jewelGeom.dispose();
      glassGeom.dispose();
      particleGeom.dispose();
    };
  }, [isRotating, wireframe, lightColor]);

  return (
    <div className={`relative flex flex-col items-center rounded-3xl bg-gradient-to-b from-amber-50/80 to-amber-100/60 p-4 border border-amber-200/80 shadow-inner overflow-hidden ${className}`}>
      {/* Top Tag & Controls */}
      <div className="w-full flex items-center justify-between mb-2 z-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Modelo 3D Interactivo
        </span>
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-xs border border-amber-200/60">
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pausar rotación' : 'Activar rotación'}
            className={`p-1.5 rounded-full text-xs transition-all ${
              isRotating ? 'bg-amber-500 text-white' : 'text-amber-800 hover:bg-amber-100'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setWireframe(!wireframe)}
            title="Modo malla (wireframe)"
            className={`p-1.5 rounded-full text-xs transition-all ${
              wireframe ? 'bg-amber-500 text-white' : 'text-amber-800 hover:bg-amber-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setLightColor(lightColor === '#ffea79' ? '#38bdf8' : '#ffea79')}
            title="Cambiar iluminación"
            className="p-1.5 rounded-full text-amber-800 hover:bg-amber-100 text-xs transition-all"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-56 sm:h-64 cursor-grab active:cursor-grabbing select-none"
      />

      <p className="text-[11px] text-amber-800/80 text-center mt-1 z-10 flex items-center gap-1 font-medium">
        <span>Arrolla o arrastra con el ratón para rotar en 360°</span>
      </p>
    </div>
  );
}
