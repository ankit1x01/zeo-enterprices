// @ts-nocheck
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';
import styles from './LoaderOverlay.module.css';
import LoaderScene from './LoaderScene';

interface LoaderOverlayProps {
  onComplete: () => void;
}

export default function LoaderOverlay({ onComplete }: LoaderOverlayProps) {
  const [isLoadedTextActive, setIsLoadedTextActive] = useState(false);
  const [isTimelineFinished, setIsTimelineFinished] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [statusText, setStatusText] = useState('Initializing Cryptographic Session...');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);

  // Logo component refs
  const crownRef = useRef<THREE.Group | null>(null);
  const ornamentsLeftRef = useRef<THREE.Group | null>(null);
  const ornamentsRightRef = useRef<THREE.Group | null>(null);
  const outerRingRef = useRef<THREE.Mesh | null>(null);
  const innerRingRef = useRef<THREE.Mesh | null>(null);
  const gssRef = useRef<THREE.Group | null>(null);
  const ribbonRef = useRef<THREE.Group | null>(null);

  // Animated values driving the shader and camera
  const uniforms = useRef({
    uTime: { value: 0 },
    uSweepProgress: { value: -0.2 },
    uFresnelStrength: { value: 0.0 }, // Starts black/no-glow
    uDrawProgress: { value: 0.0 },
  });

  const cameraZ = useRef({ value: 8.5 }); // Camera starts far away
  const gatherProgress = useRef({ value: 0.0 });
  const logoFloatOffset = useRef({ value: 0.0 });

  useEffect(() => {
    // 1. Add loading-active class to body to prevent scroll & hide actual navbar logo
    document.body.classList.add('loading-active');

    // Create the GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTimelineFinished(true);
      }
    });

    // Staggered trust status checklist sequence
    tl.call(() => setStatusText('Initializing Cryptographic Session...'), [], 0.0);
    tl.call(() => setStatusText('Sandbox Workspace Verification Active...'), [], 1.1);
    tl.call(() => setStatusText('Validating Secure GSTN Endpoints...'), [], 2.1);
    tl.call(() => setStatusText('Synchronizing Compliance Ledger...'), [], 3.1);
    tl.call(() => setStatusText('Secure Workspace Ready.'), [], 4.2);

    // --- TIMELINE ANIMS ---

    // 0.3s - Tiny gold spark appears (Fresnel strength bump / flash)
    tl.to(uniforms.current.uFresnelStrength, {
      value: 1.5,
      duration: 0.4,
      ease: 'power2.out',
    }, 0.3);

    // 0.5s - Soft ambient glow (Fresnel settles to warm glow)
    tl.to(uniforms.current.uFresnelStrength, {
      value: 0.6,
      duration: 0.6,
      ease: 'power1.inOut',
    }, 0.5);

    // 1.2s - Particles begin moving toward the logo
    tl.to(gatherProgress.current, {
      value: 1.0,
      duration: 1.2,
      ease: 'power3.inOut',
    }, 1.2);

    // 1.6s - Laurel leaves (ornaments) are forged from particles (staggered scales)
    tl.add(() => {
      if (ornamentsLeftRef.current && ornamentsRightRef.current) {
        const leftLeaves = ornamentsLeftRef.current.children;
        const rightLeaves = ornamentsRightRef.current.children;

        gsap.to(leftLeaves, {
          scaleX: 1.1,
          scaleY: 1.1,
          scaleZ: 1.1,
          duration: 0.9,
          stagger: 0.07,
          ease: 'power2.out',
        });

        gsap.to(rightLeaves, {
          scaleX: 1.1,
          scaleY: 1.1,
          scaleZ: 1.1,
          duration: 0.9,
          stagger: 0.07,
          ease: 'power2.out',
        });
      }
    }, 1.6);

    // 2.0s - Outer ring draws clockwise using molten gold shader progress
    tl.to(uniforms.current.uDrawProgress, {
      value: 1.0,
      duration: 1.2,
      ease: 'power2.inOut',
    }, 2.0);

    // 2.5s - Inner ring appears
    tl.add(() => {
      if (innerRingRef.current) {
        gsap.to(innerRingRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
        });
      }
    }, 2.5);

    // 3.0s - Ribbon forms
    tl.add(() => {
      if (ribbonRef.current) {
        const ribbonChildren = ribbonRef.current.children;
        gsap.to(ribbonChildren, {
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'back.out(1.2)',
        });
      }
    }, 3.0);

    // 3.4s - Crown rises from below with overshoot
    tl.add(() => {
      if (crownRef.current) {
        gsap.fromTo(crownRef.current.position, 
          { y: 1.0 }, 
          {
            y: 1.82,
            duration: 0.85,
            ease: 'back.out(1.3)',
          }
        );
        gsap.to(crownRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.85,
          ease: 'back.out(1.3)',
        });
      }
    }, 3.4);

    // 3.8s - GSS letters extrude from center
    tl.add(() => {
      if (gssRef.current) {
        gsap.to(gssRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.8,
          ease: 'back.out(1.1)',
        });
      }
    }, 3.8);

    // Continuous slow camera push-in from Z=8.5 to 7.0 over the first part
    tl.to(cameraZ.current, {
      value: 6.8,
      duration: 4.2,
      ease: 'power1.out',
    }, 0);

    // 4.2s - Camera moves closer (cinematic push-in)
    tl.to(cameraZ.current, {
      value: 5.0,
      duration: 1.2,
      ease: 'power2.inOut',
    }, 4.2);

    // 4.5s - Custom reflection sweep sweeps across the gold shader
    tl.fromTo(uniforms.current.uSweepProgress, 
      { value: -0.25 },
      {
        value: 1.25,
        duration: 1.6,
        ease: 'power2.inOut',
      },
      4.5
    );

    // 5.0s - Everything pauses, float begins, text fades in
    tl.to(logoFloatOffset.current, {
      value: 1.0,
      duration: 1.0,
      ease: 'sine.inOut',
    }, 5.0);

    tl.add(() => {
      setIsLoadedTextActive(true);
    }, 5.0);

    return () => {
      tl.kill();
    };
  }, []);

  // Handle the exit morph transition
  const handleProceed = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const container = containerRef.current;
    const canvasWrapper = canvasWrapperRef.current;
    const navLogo = document.getElementById('navbar-logo');

    if (!container || !canvasWrapper) {
      // Fallback if elements are missing
      document.body.classList.remove('loading-active');
      onComplete();
      return;
    }

    // 1. Zoom camera forward (flypast effect) and scale logo down
    const exitTl = gsap.timeline({
      onComplete: () => {
        // Remove class to restore scroll and show actual navbar logo
        document.body.classList.remove('loading-active');
        onComplete();
      }
    });

    // Zoom camera past the logo
    exitTl.to(cameraZ.current, {
      value: 2.2,
      duration: 1.2,
      ease: 'power3.inOut',
    }, 0);

    // Scale down logo components
    if (crownRef.current) exitTl.to(crownRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.inOut' }, 0);
    if (ornamentsLeftRef.current) exitTl.to(ornamentsLeftRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.inOut' }, 0);
    if (ornamentsRightRef.current) exitTl.to(ornamentsRightRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.inOut' }, 0);
    if (outerRingRef.current) exitTl.to(outerRingRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.inOut' }, 0);
    if (innerRingRef.current) exitTl.to(innerRingRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.inOut' }, 0);
    if (gssRef.current) exitTl.to(gssRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.inOut' }, 0);
    if (ribbonRef.current) exitTl.to(ribbonRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.inOut' }, 0);

    // Fade out ambient/fresnel glow
    exitTl.to(uniforms.current.uFresnelStrength, { value: 0.0, duration: 0.8 }, 0);

    // 2. Animate canvas wrapper to morph (shrink and translate) to navbar logo
    if (navLogo) {
      const rect = navLogo.getBoundingClientRect();
      
      // Apply initial absolute dimensions before morphing
      const startWidth = window.innerWidth;
      const startHeight = window.innerHeight;

      // Class to toggle fixed positioning
      canvasWrapper.classList.add(styles.canvasMorph);

      // Set explicit starting layout
      gsap.set(canvasWrapper, {
        top: 0,
        left: 0,
        width: startWidth,
        height: startHeight,
        borderRadius: '0px',
      });

      // Animate to navbar logo bounding box
      exitTl.to(canvasWrapper, {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        borderRadius: '8px',
        opacity: 0, // Fade out as it arrives
        duration: 1.2,
        ease: 'power4.inOut',
      }, 0);
    } else {
      // Fallback: fade out canvas wrapper in place
      exitTl.to(canvasWrapper, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 0);
    }

    // 3. Fade out the background and overlay text container
    exitTl.to(container, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.2);
  };

  // Automatically trigger exit transition 1.5 seconds after it finishes loading (if user doesn't click)
  useEffect(() => {
    if (isTimelineFinished) {
      const timer = setTimeout(() => {
        handleProceed();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isTimelineFinished]);

  return (
    <div 
      ref={containerRef} 
      className={`${styles.loaderContainer} ${isLoadedTextActive ? styles.active : ''} ${isTransitioning ? styles.morphing : ''}`}
    >
      {/* 3D WebGL Canvas */}
      <div ref={canvasWrapperRef} className={styles.canvasWrapper}>
        <Canvas
          camera={{ fov: 45, near: 0.1, far: 50, position: [0, 0, 8.5] }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: true,
          }}
          dpr={[1, 2]} // Adaptive Device Pixel Ratio
        >
          <LoaderScene
            uniforms={uniforms.current}
            cameraZ={cameraZ.current}
            gatherProgress={gatherProgress.current}
            crownRef={crownRef}
            ornamentsLeftRef={ornamentsLeftRef}
            ornamentsRightRef={ornamentsRightRef}
            outerRingRef={outerRingRef}
            innerRingRef={innerRingRef}
            gssRef={gssRef}
            ribbonRef={ribbonRef}
            logoFloatOffset={logoFloatOffset.current}
          />
        </Canvas>
      </div>

      {/* HTML UI Text Overlays */}
      <div className={styles.uiOverlay}>
        <h1 className={styles.title}>GST Suvidha Support</h1>
        <p className={styles.subtitle}>
          {statusText}
          {statusText !== 'Secure Workspace Ready.' && (
            <span className={styles.dots}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          )}
        </p>
        
        {/* Manual skip/enter button */}
        <button 
          className={styles.proceedBtn}
          onClick={handleProceed}
          disabled={isTransitioning}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
