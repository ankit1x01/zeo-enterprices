// @ts-nocheck
'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  EffectComposer, 
  Bloom, 
  DepthOfField, 
  Vignette, 
  Noise 
} from '@react-three/postprocessing';
import * as THREE from 'three';
import Logo3D from './Logo3D';

interface LoaderSceneProps {
  uniforms: {
    uTime: { value: number };
    uSweepProgress: { value: number };
    uFresnelStrength: { value: number };
    uDrawProgress: { value: number };
  };
  cameraZ: { value: number }; // Animated by GSAP
  gatherProgress: { value: number }; // Animated by GSAP
  // Component refs passed down for GSAP
  crownRef: React.RefObject<THREE.Group | null>;
  ornamentsLeftRef: React.RefObject<THREE.Group | null>;
  ornamentsRightRef: React.RefObject<THREE.Group | null>;
  outerRingRef: React.RefObject<THREE.Mesh | null>;
  innerRingRef: React.RefObject<THREE.Mesh | null>;
  gssRef: React.RefObject<THREE.Group | null>;
  ribbonRef: React.RefObject<THREE.Group | null>;
  // Logo floating offset
  logoFloatOffset: { value: number };
}

// Background Shader Plane
function CinematicBackground({ uTime }: { uTime: { value: number } }) {
  const bgMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: uTime,
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        
        float noise2D(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f*f*(3.0-2.0*f);
          return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
        }

        void main() {
          // Centered radial gradient
          float dist = length(vUv - vec2(0.5));
          float gradient = smoothstep(0.1, 0.95, dist);
          
          // Deep luxurious dark gradient colors
          vec3 centerColor = vec3(0.045, 0.045, 0.05);
          vec3 edgeColor = vec3(0.002, 0.002, 0.003);
          vec3 baseBg = mix(centerColor, edgeColor, gradient);
          
          // Extremely micro animated film grain/noise
          float grain = noise2D(vUv * 750.0 + vec2(uTime * 0.2, uTime * 0.15)) * 0.007;
          
          // Volumetric drifting fog patches
          float fog = noise2D(vUv * 2.5 + vec2(uTime * 0.03, -uTime * 0.015)) * 0.006;
          
          vec3 finalColor = baseBg + vec3(grain) + vec3(fog);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      depthWrite: false,
      depthTest: false,
    });
  }, [uTime]);

  return (
    <mesh position={[0, 0, -8]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={bgMaterial} attach="material" />
    </mesh>
  );
}

// Particle System Component
function LuxuryParticles({ 
  uTime, 
  gatherProgress 
}: { 
  uTime: { value: number }; 
  gatherProgress: { value: number } 
}) {
  const particlesRef = useRef<THREE.Points | null>(null);
  const bgParticlesRef = useRef<THREE.Points | null>(null);

  const particleCount = 1000;
  const bgCount = 500;

  // Generate target coordinates by sampling the logo shapes
  const particleData = useMemo(() => {
    const startPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const bgPositions = new Float32Array(bgCount * 3);

    // 1. Background particles (sparse sphere layout)
    for (let i = 0; i < bgCount; i++) {
      const radius = 3.5 + Math.random() * 5.0;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      bgPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      bgPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
    }

    // 2. Logo gathering particles
    for (let i = 0; i < particleCount; i++) {
      // Starting positions spread randomly
      const radius = 2.0 + Math.random() * 4.0;
      const angle = Math.random() * Math.PI * 2.0;
      startPositions[i * 3] = radius * Math.cos(angle) + (Math.random() - 0.5) * 1.5;
      startPositions[i * 3 + 1] = radius * Math.sin(angle) + (Math.random() - 0.5) * 1.5;
      startPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.0;

      // Sample a target point on the logo elements
      const elementChoice = i % 6;
      let tx = 0, ty = 0, tz = 0;

      if (elementChoice === 0 || elementChoice === 1) {
        // Outer Ring (Radius 2.4)
        const ringAngle = Math.random() * Math.PI * 2.0;
        const thicknessOffset = (Math.random() - 0.5) * 0.15;
        tx = (2.4 + thicknessOffset) * Math.cos(ringAngle);
        ty = (2.4 + thicknessOffset) * Math.sin(ringAngle);
        tz = (Math.random() - 0.5) * 0.15;
      } else if (elementChoice === 2) {
        // Inner Ring (Radius 2.02)
        const ringAngle = Math.random() * Math.PI * 2.0;
        const thicknessOffset = (Math.random() - 0.5) * 0.05;
        tx = (2.025 + thicknessOffset) * Math.cos(ringAngle);
        ty = (2.025 + thicknessOffset) * Math.sin(ringAngle);
        tz = (Math.random() - 0.5) * 0.1;
      } else if (elementChoice === 3) {
        // Crown (Centered locally at y=1.82, width x ~[-0.6, 0.6], height y ~[0, 0.65])
        tx = (Math.random() - 0.5) * 1.1;
        ty = 1.82 + (Math.random() - 0.3) * 0.6;
        tz = (Math.random() - 0.5) * 0.15;
      } else if (elementChoice === 4) {
        // Ribbon (at bottom, y ~[-2.5, -2.0], width x ~[-1.6, 1.6])
        tx = (Math.random() - 0.5) * 3.0;
        ty = -2.3 + (Math.random() - 0.5) * 0.4;
        tz = (Math.random() - 0.5) * 0.15;
      } else {
        // Laurel Leaves (Outer flanking, radius 2.62, left angle [117, 207], right angle [-27, 63])
        const leftSide = Math.random() > 0.5;
        const angle = leftSide 
          ? Math.PI * (1.15 - Math.random() * 0.5) 
          : Math.PI * (-0.15 + Math.random() * 0.5);
        const radius = 2.62 + (Math.random() - 0.5) * 0.1;
        tx = radius * Math.cos(angle);
        ty = radius * Math.sin(angle);
        tz = (Math.random() - 0.5) * 0.1;
      }

      targetPositions[i * 3] = tx;
      targetPositions[i * 3 + 1] = ty;
      targetPositions[i * 3 + 2] = tz;
    }

    return { startPositions, targetPositions, bgPositions };
  }, []);

  // Custom vertex/fragment shaders for particles
  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: uTime,
        uGatherProgress: { value: 0.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uGatherProgress;
        attribute vec3 aTargetPosition;
        varying vec3 vColor;
        varying float vAlpha;

        // Simplex-like 3D noise
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + .1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float noise3D(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f*f*(3.0-2.0*f);
          return mix(mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),
                         mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
                     mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                         mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
        }

        // Curl Noise calculation
        vec3 computeCurl(vec3 p) {
          float e = 0.08;
          vec3 dx = vec3(e, 0.0, 0.0);
          vec3 dy = vec3(0.0, e, 0.0);
          vec3 dz = vec3(0.0, 0.0, e);

          float p_x0 = noise3D(p - dx);
          float p_x1 = noise3D(p + dx);
          float p_y0 = noise3D(p - dy);
          float p_y1 = noise3D(p + dy);
          float p_z0 = noise3D(p - dz);
          float p_z1 = noise3D(p + dz);

          float x = (p_y1 - p_y0) - (p_z1 - p_z0);
          float y = (p_z1 - p_z0) - (p_x1 - p_x0);
          float z = (p_x1 - p_x0) - (p_y1 - p_y0);

          return normalize(vec3(x, y, z) / (2.0 * e));
        }

        void main() {
          // Compute fluid-like Curl field
          vec3 curlPos = position * 0.5 + vec3(uTime * 0.1, uTime * 0.05, 0.0);
          vec3 curl = computeCurl(curlPos);

          // Dampen curl flow as they converge onto the logo
          vec3 currentDrift = curl * 1.5 * (1.0 - uGatherProgress * 0.98);
          
          // Interpolate start to target position
          vec3 finalPos = mix(position + curl * 2.0, aTargetPosition, uGatherProgress);
          finalPos += currentDrift;

          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Size attenuation with subtle flickering
          float flicker = 0.8 + 0.45 * sin(uTime * 4.0 + hash(position));
          gl_PointSize = (14.0 / -mvPosition.z) * flicker;

          // Warm golden gradient color based on position
          vColor = vec3(1.0, 0.76 + 0.22 * noise3D(position * 10.0), 0.35 + 0.25 * noise3D(position * 5.0));
          
          // Fade in particles
          vAlpha = smoothstep(0.05, 0.4, uTime) * 0.85;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          // Soft radial particle shape
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float intensity = smoothstep(0.5, 0.15, dist);
          
          // Core spark brightness
          vec3 finalColor = vColor * intensity;
          
          gl_FragColor = vec4(finalColor, vAlpha * intensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [uTime]);

  const bgMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: uTime,
      },
      vertexShader: `
        uniform float uTime;
        varying float vAlpha;

        float hash(vec3 p) {
          p = fract(p * 0.3183099 + .1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        void main() {
          // Constant slow background floating
          vec3 drift = vec3(
            sin(uTime * 0.08 + position.x * 2.0) * 0.4,
            cos(uTime * 0.05 + position.y * 2.0) * 0.3,
            sin(uTime * 0.06 + position.z * 1.5) * 0.4
          );

          vec3 finalPos = position + drift;
          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          float flicker = 0.7 + 0.3 * sin(uTime * 2.0 + hash(position));
          gl_PointSize = (12.0 / -mvPosition.z) * flicker;

          vAlpha = smoothstep(0.5, 1.2, uTime) * 0.45;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float intensity = smoothstep(0.5, 0.2, dist);
          // Very subtle warm tint
          vec3 color = vec3(1.0, 0.82, 0.45) * intensity;
          gl_FragColor = vec4(color, vAlpha * intensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [uTime]);

  useFrame(() => {
    if (particleMaterial) {
      particleMaterial.uniforms.uGatherProgress.value = gatherProgress.value;
    }
  });

  return (
    <group>
      {/* Logo gathering particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.startPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-aTargetPosition"
            args={[particleData.targetPositions, 3]}
          />
        </bufferGeometry>
        <primitive object={particleMaterial} attach="material" />
      </points>

      {/* Atmospheric background particles */}
      <points ref={bgParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.bgPositions, 3]}
          />
        </bufferGeometry>
        <primitive object={bgMaterial} attach="material" />
      </points>
    </group>
  );
}

export default function LoaderScene({
  uniforms,
  cameraZ,
  gatherProgress,
  crownRef,
  ornamentsLeftRef,
  ornamentsRightRef,
  outerRingRef,
  innerRingRef,
  gssRef,
  ribbonRef,
  logoFloatOffset,
}: LoaderSceneProps) {
  const { camera } = useThree();
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const logoGroupRef = useRef<THREE.Group | null>(null);

  // Update clock/time uniform and camera position/handheld drift
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Update global shader time uniform
    uniforms.uTime.value = time;

    // Apply Z coordinates animated by GSAP
    camera.position.z = cameraZ.value;

    // Subtle handheld camera shake (very slow, smooth, low amplitude)
    const shakeX = Math.sin(time * 0.75) * 0.0045 + Math.cos(time * 1.5) * 0.002;
    const shakeY = Math.cos(time * 0.6) * 0.0045 + Math.sin(time * 1.25) * 0.002;

    // Tiny slow orbit camera movement
    const orbitX = Math.sin(time * 0.22) * 0.035;
    const orbitY = Math.cos(time * 0.17) * 0.035;

    camera.position.x = shakeX + orbitX;
    camera.position.y = shakeY + orbitY;
    camera.lookAt(0, 0, 0);

    // Dynamic point light movement creating shifting reflections
    if (pointLightRef.current) {
      pointLightRef.current.position.x = Math.sin(time * 0.45) * 5.0;
      pointLightRef.current.position.y = Math.cos(time * 0.35) * 4.0;
      pointLightRef.current.position.z = 2.5 + Math.sin(time * 0.25) * 1.5;
    }

    // Imperceptible 2px (0.015 units) floating on the logo group
    if (logoGroupRef.current) {
      logoGroupRef.current.position.y = logoFloatOffset.value * Math.sin(time * 0.8) * 0.02;
    }
  });

  return (
    <>
      {/* Background radial gradient with animated noise */}
      <CinematicBackground uTime={uniforms.uTime} />

      {/* Volumetric Fog */}
      <fogExp2 attach="fog" args={['#030304', 0.018]} />

      {/* Atmospheric Lighting Rig */}
      
      {/* Ambient base */}
      <ambientLight intensity={0.45} color="#151820" />

      {/* Key Light (Warm, jewelry studio feel) */}
      <directionalLight 
        position={[6, 5, 6]} 
        intensity={3.8} 
        color="#ffe2a8" 
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill Light (Cool, provides premium contrast) */}
      <directionalLight 
        position={[-6, 3, 2]} 
        intensity={1.2} 
        color="#c8e6ff" 
      />

      {/* Rim Light (High intensity, highlights bevels from behind) */}
      <directionalLight 
        position={[0, 4, -6]} 
        intensity={5.5} 
        color="#ffd890" 
      />

      {/* Animating shimmers highlight light */}
      <pointLight 
        ref={pointLightRef} 
        position={[0, 0, 3]} 
        intensity={2.8} 
        distance={12} 
        color="#fff4df" 
      />

      {/* Particle System */}
      <LuxuryParticles uTime={uniforms.uTime} gatherProgress={gatherProgress} />

      {/* 3D Crest Logo Group */}
      <group ref={logoGroupRef} position={[0, 0, 0]}>
        <Logo3D
          uniforms={uniforms}
          crownRef={crownRef}
          ornamentsLeftRef={ornamentsLeftRef}
          ornamentsRightRef={ornamentsRightRef}
          outerRingRef={outerRingRef}
          innerRingRef={innerRingRef}
          gssRef={gssRef}
          ribbonRef={ribbonRef}
        />
      </group>

      {/* Post Processing Stack */}
      <EffectComposer disableNormalPass>
        {/* Antialiasing is handled by FXAA in three.js canvas, plus post-processing */}
        <Bloom 
          luminanceThreshold={0.88} 
          luminanceSmoothing={0.3} 
          intensity={1.3} 
          mipmapBlur
        />
        <DepthOfField 
          focusDistance={4.2} 
          focalLength={0.4} 
          bokehScale={5.0} 
        />
        <Noise opacity={0.018} />
        <Vignette eskil={false} offset={0.12} darkness={1.1} />
      </EffectComposer>
    </>
  );
}
