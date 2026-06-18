"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Interactive3DHero() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        let animationFrameId: number;

        // Scene Setup
        const scene = new THREE.Scene();

        // Camera Setup
        const camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.set(0, -60, 150); // Angle the camera down to see the 3D depth of the grid
        camera.lookAt(0, 0, 0);

        // Renderer Setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Grid Dimensions (Columns & Rows)
        const columns = 45;
        const rows = 35;
        const spacing = 14;
        const totalPoints = columns * rows;

        // Bounding Box coordinates
        const gridWidth = (columns - 1) * spacing;
        const gridHeight = (rows - 1) * spacing;
        const startX = -gridWidth / 2;
        const startY = -gridHeight / 2;

        // Particles Geometry setup
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(totalPoints * 3);
        const colors = new Float32Array(totalPoints * 3);

        // Base color mappings
        // Primary GSS teal/emerald: #0d7c5b (R: 13, G: 124, B: 91)
        // Accent GSS gold: #e59f1c (R: 229, G: 159, B: 28)
        const colorTeal = new THREE.Color("#0d7c5b");
        const colorGold = new THREE.Color("#e59f1c");

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const index = r * columns + c;
                const idx = index * 3;

                // Set X and Y positions
                positions[idx] = startX + c * spacing;
                positions[idx + 1] = startY + r * spacing;
                positions[idx + 2] = 0; // Z starts at 0, updated in animation loop

                // Color interpolation: blend gold in the center, teal at margins
                const distToCenter = Math.sqrt(
                    ((c - columns / 2) / (columns / 2)) ** 2 +
                    ((r - rows / 2) / (rows / 2)) ** 2
                );
                
                const blendedColor = new THREE.Color().lerpColors(
                    colorGold,
                    colorTeal,
                    Math.min(distToCenter, 1)
                );

                colors[idx] = blendedColor.r;
                colors[idx + 1] = blendedColor.g;
                colors[idx + 2] = blendedColor.b;
            }
        }

        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        // Glow Texture for nodes
        const createGlowTexture = () => {
            const size = 64;
            const canvasEl = document.createElement("canvas");
            canvasEl.width = size;
            canvasEl.height = size;
            const ctx = canvasEl.getContext("2d");
            if (ctx) {
                const gradient = ctx.createRadialGradient(
                    size / 2,
                    size / 2,
                    0,
                    size / 2,
                    size / 2,
                    size / 2
                );
                gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.9)");
                gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, size, size);
            }
            return new THREE.CanvasTexture(canvasEl);
        };

        // Node Material
        const particleMaterial = new THREE.PointsMaterial({
            size: 4.5,
            vertexColors: true,
            map: createGlowTexture(),
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        // Nodes particle system
        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particleSystem);

        // Lines Geometry setup (creating horizontal and vertical grid lines)
        const lineIndices: number[] = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const current = r * columns + c;
                // Horizontal connection
                if (c < columns - 1) {
                    lineIndices.push(current, current + 1);
                }
                // Vertical connection
                if (r < rows - 1) {
                    lineIndices.push(current, current + columns);
                }
            }
        }

        const lineGeometry = new THREE.BufferGeometry();
        // The lines share positions attribute array with particleGeometry
        lineGeometry.setAttribute("position", particleGeometry.getAttribute("position"));
        lineGeometry.setIndex(lineIndices);

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x074633, // Rich dark teal
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending,
        });

        const gridLines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(gridLines);

        // Track Cursor
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        const handleMouseMove = (event: MouseEvent) => {
            // Map cursor coordinate bounds
            mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Resize Listener
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // Clock for wave speeds
        const clock = new THREE.Clock();

        // Animation Loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const time = clock.getElapsedTime();
            const positionArray = particleGeometry.attributes.position.array as Float32Array;

            // Interpolate mouse coordinates for inertia/smoothness
            mouse.x += (mouse.targetX - mouse.x) * 0.04;
            mouse.y += (mouse.targetY - mouse.y) * 0.04;

            // Angle camera shifts slightly based on mouse
            camera.position.x = mouse.x * 60;
            camera.position.y = -60 + mouse.y * 30;
            camera.lookAt(0, 10, 0);

            // Compute wavy mathematical functions to warp Z coordinates
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    const index = r * columns + c;
                    const idx = index * 3;

                    const x = positionArray[idx];
                    const y = positionArray[idx + 1];

                    // Standard ripple + sine wave calculation
                    const wave1 = Math.sin(c * 0.25 + time * 1.6) * 7;
                    const wave2 = Math.cos(r * 0.2 + time * 1.2) * 5;
                    
                    // Mouse gravity distortion: local repulsion / attraction
                    // Map mouse position into matching 3D space dimensions
                    const mouseWorldX = mouse.x * gridWidth * 0.6;
                    const mouseWorldY = mouse.y * gridHeight * 0.6;
                    const dx = x - mouseWorldX;
                    const dy = y - mouseWorldY;
                    const distToMouse = Math.sqrt(dx * dx + dy * dy);

                    let mouseInfluence = 0;
                    if (distToMouse < 160) {
                        // Creates a reactive bulge / drop under the cursor
                        mouseInfluence = Math.cos((distToMouse / 160) * Math.PI) * 16;
                    }

                    positionArray[idx + 2] = wave1 + wave2 + mouseInfluence;
                }
            }

            particleGeometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // Clean up WebGL assets on unmount
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);

            particleGeometry.dispose();
            lineGeometry.dispose();
            particleMaterial.dispose();
            lineMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1, // Render overlay behind elements
                pointerEvents: "none",
            }}
        />
    );
}
