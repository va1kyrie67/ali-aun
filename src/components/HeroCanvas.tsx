'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 7.5;

    // Procedural Reflection Canvas Texture (Glossy Chrome Specular)
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 512;
    envCanvas.height = 256;
    const ctx = envCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 256);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.45, '#2a2a2a');
      gradient.addColorStop(0.5, '#050505');
      gradient.addColorStop(1, '#555555');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 256);

      // Warm ivory reflection highlights
      ctx.fillStyle = '#efe9dc';
      [50, 190, 330, 450].forEach((pos) => {
        ctx.fillRect(pos, 30, 22, 130);
      });
    }

    const envMap = new THREE.CanvasTexture(envCanvas);
    envMap.mapping = THREE.EquirectangularReflectionMapping;

    // Master 3D Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Torus Knot Metallic Chrome Sculpture
    const knotGeometry = new THREE.TorusKnotGeometry(1.45, 0.4, 240, 36);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0xb9bcc2,
      metalness: 1.0,
      roughness: 0.16,
      envMap,
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    group.add(knot);

    // 2. Delicate Wireframe Icosahedron Cage
    const wireGeometry = new THREE.IcosahedronGeometry(3.1, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xefe9dc,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    group.add(wire);

    // 3. Floating Starry Particles & Stardust (450 Points)
    const particleCount = 450;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 4.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xefe9dc,
      transparent: true,
      opacity: 0.55,
    });
    const starField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starField);

    // Lighting
    const pointLight = new THREE.PointLight(0xffe2b8, 2.2, 30);
    pointLight.position.set(4, 3, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Resize Handler & Camera Positioning
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Negative camera X shifts the center object to the RIGHT side of the view
      camera.position.x = width > 800 ? -2.6 : 0;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    handleResize();

    // Mouse Pointer Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove);

    // Scroll-Linked Zoom & Fade via ScrollTrigger
    const scrollObj = { z: 0 };
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: canvas.parentElement || document.body,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scrollObj.z = self.progress;
      },
    });

    // Render Loop
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      time += prefersReducedMotion ? 0 : 0.012;

      // Smooth mouse parallax lerp
      group.rotation.y += (mouseX * 0.7 + time * 0.12 - group.rotation.y) * 0.04;
      group.rotation.x += (mouseY * 0.5 - group.rotation.x) * 0.04;

      // Independent rotational spins
      knot.rotation.x = time * 0.18;
      knot.rotation.z = time * 0.1;
      wire.rotation.y = -time * 0.05;
      starField.rotation.y = time * 0.02;

      // Scroll-linked scaling and depth
      group.position.z = -scrollObj.z * 5;
      group.scale.setScalar(Math.max(0.65, 1 - scrollObj.z * 0.3));

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      scrollTriggerInstance.kill();

      knotGeometry.dispose();
      knotMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      envMap.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gl"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}
