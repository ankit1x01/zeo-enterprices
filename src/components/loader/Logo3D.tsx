// @ts-nocheck
'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import * as THREE from 'three';

interface Logo3DProps {
  uniforms: {
    uTime: { value: number };
    uSweepProgress: { value: number };
    uFresnelStrength: { value: number };
    uDrawProgress: { value: number };
  };
  // Individual component refs for GSAP animation
  crownRef: React.RefObject<THREE.Group | null>;
  ornamentsLeftRef: React.RefObject<THREE.Group | null>;
  ornamentsRightRef: React.RefObject<THREE.Group | null>;
  outerRingRef: React.RefObject<THREE.Mesh | null>;
  innerRingRef: React.RefObject<THREE.Mesh | null>;
  gssRef: React.RefObject<THREE.Group | null>;
  ribbonRef: React.RefObject<THREE.Group | null>;
}

export default function Logo3D({
  uniforms,
  crownRef,
  ornamentsLeftRef,
  ornamentsRightRef,
  outerRingRef,
  innerRingRef,
  gssRef,
  ribbonRef,
}: Logo3DProps) {
  // Helper to compile our custom gold material
  const createGoldMaterial = (isRing = false) => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(1.0, 0.78, 0.38), // Rich sRGB polished 24K gold
      metalness: 1.0,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 1.0,
    });

    mat.onBeforeCompile = (shader) => {
      // Bind uniforms
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uSweepProgress = uniforms.uSweepProgress;
      shader.uniforms.uFresnelStrength = uniforms.uFresnelStrength;
      shader.uniforms.uDrawProgress = uniforms.uDrawProgress;

      // Vertex shader modifications
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        varying vec3 vWorldPosition;
        varying vec3 vLocalPosition;
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        vLocalPosition = position;
        `
      );

      // Fragment shader modifications
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
        varying vec3 vWorldPosition;
        varying vec3 vLocalPosition;

        uniform float uTime;
        uniform float uSweepProgress;
        uniform float uFresnelStrength;
        uniform float uDrawProgress;

        // Simple procedural 3D noise for micro-scratches
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
        `
      );

      // Perturb normals to create fine procedural micro-scratches
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <normal_fragment_maps>',
        `
        #include <normal_fragment_maps>
        
        // Compute high-frequency micro scratches
        vec3 scratchPos = vWorldPosition * 350.0;
        float scratch = noise3D(scratchPos) * 0.05;
        normal = normalize(normal + vec3(scratch));
        `
      );

      // Inject custom reflection sweep and Fresnel glow
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <lights_physical_fragment>',
        `
        #include <lights_physical_fragment>

        // Calculate view direction
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        // Fresnel glow
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5);
        vec3 fresnelGlow = vec3(1.0, 0.85, 0.4) * fresnel * uFresnelStrength * 1.5;

        // Sweeping reflection highlight band
        // sweep moves along X+Y diagonal
        float sweepCoord = vWorldPosition.x + vWorldPosition.y * 0.4;
        float sweepCenter = uSweepProgress * 6.0 - 3.0; // range
        float distToSweep = abs(sweepCoord - sweepCenter);
        float sweepIntensity = smoothstep(0.5, 0.0, distToSweep);
        vec3 sweepColor = vec3(1.0, 0.9, 0.6) * sweepIntensity * 2.0;

        // Apply specular additions
        reflectedLight.directSpecular += sweepColor * 0.8;
        reflectedLight.indirectSpecular += fresnelGlow * 0.5;
        `
      );

      // Handle clipping & molten glow for the outer drawing ring
      if (isRing) {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <dithering_fragment>',
          `
          #include <dithering_fragment>

          // Polar angle clockwise from top (0 to 2*PI)
          float angle = atan(vLocalPosition.x, vLocalPosition.y);
          if (angle < 0.0) angle += 2.0 * 3.14159265;
          
          float maxAngle = uDrawProgress * 2.0 * 3.14159265;

          if (angle > maxAngle) {
            discard;
          }

          // Molten gold drawing tip glow
          float gap = maxAngle - angle;
          if (gap < 0.18 && uDrawProgress < 0.99 && uDrawProgress > 0.005) {
            float moltenEdge = smoothstep(0.18, 0.0, gap);
            gl_FragColor.rgb += vec3(2.5, 0.8, 0.1) * moltenEdge * 2.5; // Intense orange/gold bloom emission
          }
          `
        );
      }
    };

    return mat;
  };

  const createTealMaterial = () => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.04, 0.45, 0.32), // Polished corporate teal (#0d7c5b)
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.85,
    });

    mat.onBeforeCompile = (shader) => {
      // Bind uniforms
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uSweepProgress = uniforms.uSweepProgress;
      shader.uniforms.uFresnelStrength = uniforms.uFresnelStrength;

      // Vertex shader modifications
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        varying vec3 vWorldPosition;
        varying vec3 vLocalPosition;
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        vLocalPosition = position;
        `
      );

      // Fragment shader modifications
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
        varying vec3 vWorldPosition;
        varying vec3 vLocalPosition;

        uniform float uTime;
        uniform float uSweepProgress;
        uniform float uFresnelStrength;

        // Simple procedural 3D noise for micro-scratches
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
        `
      );

      // Perturb normals to create fine procedural micro-scratches
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <normal_fragment_maps>',
        `
        #include <normal_fragment_maps>
        
        // Compute high-frequency micro scratches
        vec3 scratchPos = vWorldPosition * 350.0;
        float scratch = noise3D(scratchPos) * 0.05;
        normal = normalize(normal + vec3(scratch));
        `
      );

      // Inject custom reflection sweep and teal Fresnel glow
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <lights_physical_fragment>',
        `
        #include <lights_physical_fragment>

        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5);
        vec3 fresnelGlow = vec3(0.2, 0.85, 0.6) * fresnel * uFresnelStrength * 1.5;

        float sweepCoord = vWorldPosition.x + vWorldPosition.y * 0.4;
        float sweepCenter = uSweepProgress * 6.0 - 3.0;
        float distToSweep = abs(sweepCoord - sweepCenter);
        float sweepIntensity = smoothstep(0.5, 0.0, distToSweep);
        vec3 sweepColor = vec3(0.4, 0.95, 0.75) * sweepIntensity * 2.0;

        reflectedLight.directSpecular += sweepColor * 0.8;
        reflectedLight.indirectSpecular += fresnelGlow * 0.5;
        `
      );
    };

    return mat;
  };

  // Materials
  const goldMat = useMemo(() => createGoldMaterial(false), [uniforms]);
  const outerRingMat = useMemo(() => createGoldMaterial(true), [uniforms]);
  const tealMat = useMemo(() => createTealMaterial(), [uniforms]);

  // Procedural geometries definition
  
  // 1. Crown 2D Path
  const crownGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.6, -0.2);
    shape.lineTo(0.6, -0.2);
    shape.lineTo(0.55, 0.05);
    shape.lineTo(0.5, 0.3);        // Point 1 (far right)
    shape.lineTo(0.35, 0.1);       // Valley 1
    shape.lineTo(0.24, 0.52);      // Point 2 (mid right)
    shape.lineTo(0.12, 0.2);       // Valley 2
    shape.lineTo(0.0, 0.65);       // Point 3 (tall center)
    shape.lineTo(-0.12, 0.2);      // Valley 3
    shape.lineTo(-0.24, 0.52);     // Point 4 (mid left)
    shape.lineTo(-0.35, 0.1);      // Valley 4
    shape.lineTo(-0.5, 0.3);       // Point 5 (far left)
    shape.lineTo(-0.55, 0.05);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.03,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Crown Tips (Spheres sitting on the points)
  const crownTips = useMemo(() => {
    return [
      { pos: new THREE.Vector3(-0.5, 0.3, 0.08), radius: 0.045 },
      { pos: new THREE.Vector3(-0.24, 0.52, 0.08), radius: 0.045 },
      { pos: new THREE.Vector3(0.0, 0.65, 0.08), radius: 0.06 },
      { pos: new THREE.Vector3(0.24, 0.52, 0.08), radius: 0.045 },
      { pos: new THREE.Vector3(0.5, 0.3, 0.08), radius: 0.045 },
    ];
  }, []);

  // 2. Outer Ring Geometry (Thicker ring)
  const outerRingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 2.5, 0, Math.PI * 2, false);
    
    const hole = new THREE.Path();
    hole.absarc(0, 0, 2.32, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.025,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // 3. Inner Ring Geometry (Thinner ring)
  const innerRingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 2.05, 0, Math.PI * 2, false);
    
    const hole = new THREE.Path();
    hole.absarc(0, 0, 2.0, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.01,
      bevelThickness: 0.015,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // 4. Laurel Ornaments (Leaf Geometry)
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.18, 0.22, 0.02, 0.45);
    shape.quadraticCurveTo(-0.18, 0.22, 0, 0);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.008,
      bevelThickness: 0.012,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Laurel branches setup: generate leaf instances along an arc
  const leftLaurelLeaves = useMemo(() => {
    const leaves = [];
    const count = 7;
    // Radius matches slightly outside outer ring (R=2.5)
    const baseRadius = 2.62;
    // Angle from bottom-left to top-left
    const startAngle = Math.PI * 1.15; // 207 degrees
    const endAngle = Math.PI * 0.65;   // 117 degrees
    
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const angle = startAngle + t * (endAngle - startAngle);
      
      const px = baseRadius * Math.cos(angle);
      const py = baseRadius * Math.sin(angle);
      
      // Rotate leaf to align with the circle curve tangent + angle outward
      const rotationZ = angle - Math.PI / 2 + 0.35; 
      
      // Staggered scales (leaf gets smaller towards top)
      const scale = (0.75 + (1 - t) * 0.35) * 1.1;

      leaves.push({
        id: i,
        pos: new THREE.Vector3(px, py, 0.05),
        rot: new THREE.Euler(0, 0, rotationZ),
        scale: new THREE.Vector3(scale, scale, scale),
      });
    }
    return leaves;
  }, []);

  const rightLaurelLeaves = useMemo(() => {
    // Symmetrically mirrored right branch
    return leftLaurelLeaves.map((leaf) => {
      const px = -leaf.pos.x;
      const py = leaf.pos.y;
      const rotZ = -leaf.rot.z;
      
      return {
        ...leaf,
        pos: new THREE.Vector3(px, py, leaf.pos.z),
        rot: new THREE.Euler(0, 0, rotZ),
      };
    });
  }, [leftLaurelLeaves]);

  // 5. Ribbon Geometry
  const ribbonGeometries = useMemo(() => {
    // Center banner shape
    const centerShape = new THREE.Shape();
    centerShape.moveTo(-1.5, -2.0);
    centerShape.quadraticCurveTo(0, -2.3, 1.5, -2.0);
    centerShape.lineTo(1.45, -2.35);
    centerShape.quadraticCurveTo(0, -2.65, -1.45, -2.35);
    centerShape.closePath();

    const centerExtrude = {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.025,
    };
    const centerGeo = new THREE.ExtrudeGeometry(centerShape, centerExtrude);

    // Left folder tail (placed slightly behind)
    const leftTailShape = new THREE.Shape();
    leftTailShape.moveTo(-1.4, -2.15);
    leftTailShape.lineTo(-2.0, -2.4);
    leftTailShape.lineTo(-1.85, -2.68);
    leftTailShape.lineTo(-1.35, -2.4);
    leftTailShape.closePath();

    const tailExtrude = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.01,
      bevelThickness: 0.015,
    };
    const leftTailGeo = new THREE.ExtrudeGeometry(leftTailShape, tailExtrude);

    // Right folder tail
    const rightTailShape = new THREE.Shape();
    rightTailShape.moveTo(1.4, -2.15);
    rightTailShape.lineTo(2.0, -2.4);
    rightTailShape.lineTo(1.85, -2.68);
    rightTailShape.lineTo(1.35, -2.4);
    rightTailShape.closePath();
    const rightTailGeo = new THREE.ExtrudeGeometry(rightTailShape, tailExtrude);

    return { centerGeo, leftTailGeo, rightTailGeo };
  }, []);

  return (
    <group>
      {/* 1. Crown Group */}
      <group ref={crownRef} position={[0, 1.82, 0.05]} scale={[0, 0, 0]}>
        <mesh geometry={crownGeometry} material={goldMat} castShadow receiveShadow />
        {crownTips.map((tip, idx) => (
          <mesh key={idx} position={tip.pos} material={goldMat} castShadow>
            <sphereGeometry args={[tip.radius, 16, 16]} />
          </mesh>
        ))}
      </group>

      {/* 2. Laurel Ornaments Left Branch */}
      <group ref={ornamentsLeftRef}>
        {leftLaurelLeaves.map((leaf) => (
          <group key={`l-${leaf.id}`} position={leaf.pos} rotation={leaf.rot} scale={[0, 0, 0]}>
            <mesh geometry={leafGeometry} material={goldMat} castShadow receiveShadow />
          </group>
        ))}
      </group>

      {/* 3. Laurel Ornaments Right Branch */}
      <group ref={ornamentsRightRef}>
        {rightLaurelLeaves.map((leaf) => (
          <group key={`r-${leaf.id}`} position={leaf.pos} rotation={leaf.rot} scale={[0, 0, 0]}>
            <mesh geometry={leafGeometry} material={goldMat} castShadow receiveShadow />
          </group>
        ))}
      </group>

      {/* 4. Outer Ring Mesh */}
      <mesh
        ref={outerRingRef}
        geometry={outerRingGeometry}
        material={outerRingMat}
        position={[0, 0, 0.05]}
        scale={[1, 1, 1]}
        castShadow
        receiveShadow
      />

      {/* 5. Inner Ring Mesh */}
      <mesh
        ref={innerRingRef}
        geometry={innerRingGeometry}
        material={goldMat}
        position={[0, 0, 0.07]}
        scale={[0, 0, 0]}
        castShadow
        receiveShadow
      />

      {/* 6. Ribbon Group */}
      <group ref={ribbonRef}>
        {/* Main Ribbon Center Banner */}
        <group position={[0, 0, 0.08]} scale={[0, 0, 0]}>
          <mesh geometry={ribbonGeometries.centerGeo} material={tealMat} castShadow receiveShadow />
        </group>
        {/* Left Ribbon Tail (tucked slightly back in Z) */}
        <group position={[0, 0, 0.02]} scale={[0, 0, 0]}>
          <mesh geometry={ribbonGeometries.leftTailGeo} material={tealMat} castShadow receiveShadow />
        </group>
        {/* Right Ribbon Tail (tucked slightly back in Z) */}
        <group position={[0, 0, 0.02]} scale={[0, 0, 0]}>
          <mesh geometry={ribbonGeometries.rightTailGeo} material={tealMat} castShadow receiveShadow />
        </group>
      </group>

      {/* 7. GSS Letters Group (Rendered serif text) */}
      <group ref={gssRef} position={[0, 0, 0.1]} scale={[0, 0, 0]}>
        {/* Letter G */}
        <Text3D
          font="/fonts/gentilis_regular.typeface.json"
          size={0.62}
          height={0.16}
          curveSegments={16}
          bevelEnabled
          bevelThickness={0.025}
          bevelSize={0.015}
          bevelOffset={0}
          bevelSegments={4}
          material={tealMat}
          position={[-0.66, -0.32, 0]}
          castShadow
        >
          G
        </Text3D>
        {/* Letter S */}
        <Text3D
          font="/fonts/gentilis_regular.typeface.json"
          size={0.62}
          height={0.16}
          curveSegments={16}
          bevelEnabled
          bevelThickness={0.025}
          bevelSize={0.015}
          bevelOffset={0}
          bevelSegments={4}
          material={tealMat}
          position={[-0.13, -0.32, 0]}
          castShadow
        >
          S
        </Text3D>
        {/* Letter S */}
        <Text3D
          font="/fonts/gentilis_regular.typeface.json"
          size={0.62}
          height={0.16}
          curveSegments={16}
          bevelEnabled
          bevelThickness={0.025}
          bevelSize={0.015}
          bevelOffset={0}
          bevelSegments={4}
          material={tealMat}
          position={[0.39, -0.32, 0]}
          castShadow
        >
          S
        </Text3D>
      </group>
    </group>
  );
}
