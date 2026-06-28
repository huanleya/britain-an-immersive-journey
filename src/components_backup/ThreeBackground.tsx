import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    // Add atmospheric background fog
    scene.fog = new THREE.FogExp2(0x050505, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle geometry - thousands of drifting dust motes
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const angles = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in a 3D box
      positions[i * 3] = (Math.random() - 0.5) * 40;     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z

      speeds[i] = 0.005 + Math.random() * 0.015;
      angles[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom circular particle texture (using Canvas fallback to avoid loading external asset)
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(201, 176, 124, 0.8)"); // Accent color (#C9B07C)
        grad.addColorStop(0.3, "rgba(201, 176, 124, 0.2)");
        grad.addColorStop(1, "rgba(201, 176, 124, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: createCircleTexture(),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interactive tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 3;
      mouse.targetY = -(event.clientY / window.innerHeight - 0.5) * 3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = newWidth;
        height = newHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
      }
    });
    
    resizeObserver.observe(container);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Damp mouse movement for premium lag/inertia effect (Apple website physics)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax rotation of particle system based on mouse
      particles.rotation.y = mouse.x * 0.15;
      particles.rotation.x = mouse.y * 0.15;

      // Update and drift individual particles
      const positionsArr = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Subtle sinusoidal drift
        angles[i] += 0.002;
        positionsArr[i * 3 + 1] += speeds[i]; // Float upward
        positionsArr[i * 3] += Math.sin(angles[i]) * 0.002; // Drift left-right

        // Recycle particles that move out of bounds
        if (positionsArr[i * 3 + 1] > 20) {
          positionsArr[i * 3 + 1] = -20;
          positionsArr[i * 3] = (Math.random() - 0.5) * 40;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Rotate camera ever so slightly
      camera.position.x += (mouse.x - camera.position.x) * 0.02;
      camera.position.y += (mouse.y - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-ambient-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
