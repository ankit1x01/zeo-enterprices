"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

interface CityNode {
    name: string;
    lat: number;
    lng: number;
    phone: string;
    email: string;
    address: string;
}

const CITIES: CityNode[] = [
    {
        name: "Gwalior (Main Office)",
        lat: 26.2183,
        lng: 78.1828,
        phone: "+91-9453368173",
        email: "care@gstsuvidhasupport.in",
        address: "Siddheshwar Nagar, Kalpi Bridge Colony, Near Morar Police Station, Gwalior, MP - 474007"
    },
    {
        name: "Indore",
        lat: 22.7196,
        lng: 75.8577,
        phone: "+91-9453368173",
        email: "care@gstsuvidhasupport.in",
        address: "Vijay Nagar Commercial Hub, Scheme No 54, Indore, MP - 452010"
    },
    {
        name: "Bhopal",
        lat: 23.2599,
        lng: 77.4126,
        phone: "+91-9453368173",
        email: "care@gstsuvidhasupport.in",
        address: "MP Nagar Zone-II, Near Board Office Square, Bhopal, MP - 462011"
    },
    {
        name: "Pune",
        lat: 18.5204,
        lng: 73.8567,
        phone: "+91-9453368173",
        email: "care@gstsuvidhasupport.in",
        address: "Kharadi IT Park, Off Nagar Road, Pune, MH - 411014"
    },
    {
        name: "Bangalore",
        lat: 12.9716,
        lng: 77.5946,
        phone: "+91-9453368173",
        email: "care@gstsuvidhasupport.in",
        address: "Outer Ring Road, Kadubeesanahalli, Bangalore, KA - 560103"
    }
];

export default function Interactive3DGlobe() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [activeCity, setActiveCity] = useState<CityNode>(CITIES[0]);
    const targetRotationRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        let animationFrameId: number;

        // Scene Setup
        const scene = new THREE.Scene();

        // Camera Setup
        const camera = new THREE.PerspectiveCamera(
            45,
            canvas.clientWidth / canvas.clientHeight,
            1,
            1000
        );
        camera.position.z = 180;

        // Renderer Setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        // Globe Group (holds globe mesh, nodes, and arcs)
        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        // Globe Sphere geometry & material
        const radius = 55;
        const sphereGeo = new THREE.SphereGeometry(radius, 40, 40);
        
        // Minimalist tech grid texture using wireframe
        const sphereMat = new THREE.MeshBasicMaterial({
            color: 0x0d7c5b, // Emerald wireframe, readable on light backdrop
            wireframe: true,
            transparent: true,
            opacity: 0.25,
        });
        const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
        globeGroup.add(globeMesh);

        // Add a secondary slightly larger particle sphere for depth
        const particleGeo = new THREE.SphereGeometry(radius + 1.5, 25, 25);
        const particleMat = new THREE.PointsMaterial({
            color: 0x0d7c5b, // Teal / Emerald
            size: 1.5,
            transparent: true,
            opacity: 0.45,
        });
        const particleSphere = new THREE.Points(particleGeo, particleMat);
        globeGroup.add(particleSphere);

        // Helper to convert lat/lng to 3D Cartesian coordinates
        const convertLatLngToVector3 = (lat: number, lng: number, r: number) => {
            const phi = (90 - lat) * (Math.PI / 180);
            const theta = (lng + 180) * (Math.PI / 180);

            const x = -(r * Math.sin(phi) * Math.sin(theta));
            const y = r * Math.cos(phi);
            const z = r * Math.sin(phi) * Math.cos(theta);

            return new THREE.Vector3(x, y, z);
        };

        // Create glowing texture for pins
        const createPinTexture = () => {
            const size = 32;
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
                gradient.addColorStop(0, "rgba(202, 138, 4, 1)"); // Darkened gold for contrast on light backdrop
                gradient.addColorStop(0.3, "rgba(13, 124, 91, 0.8)"); // Emerald
                gradient.addColorStop(0.7, "rgba(13, 124, 91, 0.15)");
                gradient.addColorStop(1, "rgba(13, 124, 91, 0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, size, size);
            }
            return new THREE.CanvasTexture(canvasEl);
        };

        const pinMaterial = new THREE.PointsMaterial({
            size: 7,
            map: createPinTexture(),
            transparent: true,
            blending: THREE.NormalBlending,
            depthWrite: false,
        });

        // Add City Node Pins & Pulsing Rings
        const pinsGeometry = new THREE.BufferGeometry();
        const pinPositions: number[] = [];
        const ringGroups: THREE.Mesh[] = [];

        CITIES.forEach(city => {
            const pos = convertLatLngToVector3(city.lat, city.lng, radius);
            pinPositions.push(pos.x, pos.y, pos.z);

            // Add an interactive pulsing wave ring at coordinates
            const ringGeo = new THREE.RingGeometry(0.5, 3.5, 30);
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0xca8a04, // Gold, darkened for a light backdrop
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.copy(pos);
            ring.lookAt(new THREE.Vector3(0, 0, 0)); // Point ring normal outward
            globeGroup.add(ring);
            ringGroups.push(ring);
        });

        pinsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(pinPositions, 3));
        const pinsSystem = new THREE.Points(pinsGeometry, pinMaterial);
        globeGroup.add(pinsSystem);

        // Draw Arcs connecting the network (curves between coordinates)
        const curveMaterial = new THREE.LineBasicMaterial({
            color: 0xca8a04, // Gold connecting lines, darkened for a light backdrop
            transparent: true,
            opacity: 0.5,
            blending: THREE.NormalBlending,
        });

        for (let i = 0; i < CITIES.length; i++) {
            const startPos = convertLatLngToVector3(CITIES[i].lat, CITIES[i].lng, radius);
            const endPos = convertLatLngToVector3(
                CITIES[(i + 1) % CITIES.length].lat, 
                CITIES[(i + 1) % CITIES.length].lng, 
                radius
            );

            // Calculate bezier control point bulging outwards
            const midPoint = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
            const distance = startPos.distanceTo(endPos);
            midPoint.normalize().multiplyScalar(radius + distance * 0.25); // bulge outward proportionally

            const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);
            const points = curve.getPoints(30);
            const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
            const arcLine = new THREE.Line(curveGeo, curveMaterial);
            globeGroup.add(arcLine);
        }

        // Mouse Drag / Interaction Setup
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        const handleMouseDown = () => {
            isDragging = true;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y,
            };

            if (isDragging) {
                targetRotationRef.current.y += deltaMove.x * 0.005;
                targetRotationRef.current.x += deltaMove.y * 0.005;
                // Clamp vertical rotations to avoid flipping upside down
                targetRotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationRef.current.x));
            }

            previousMousePosition = {
                x: e.clientX,
                y: e.clientY,
            };
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        // Touch Interaction Support for mobile
        const handleTouchStart = (e: TouchEvent) => {
            isDragging = true;
            if (e.touches.length === 1) {
                previousMousePosition = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                };
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging || e.touches.length !== 1) return;
            const deltaMove = {
                x: e.touches[0].clientX - previousMousePosition.x,
                y: e.touches[0].clientY - previousMousePosition.y,
            };

            targetRotationRef.current.y += deltaMove.x * 0.008;
            targetRotationRef.current.x += deltaMove.y * 0.008;
            targetRotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationRef.current.x));

            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleMouseUp);

        // Auto-Resize handler
        const resizeObserver = new ResizeObserver(() => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
        resizeObserver.observe(canvas.parentElement || canvas);

        // Initial orientation target (align focus to Gwalior)
        const calculateTargetRotation = (city: CityNode) => {
            // Formula to align the selected city directly with camera (+Z axis)
            const phi = (city.lat * Math.PI) / 180;
            const lambda = (city.lng * Math.PI) / 180;

            // Target rotations to map the sphere coordinate system
            const targetY = -lambda - Math.PI / 2;
            const targetX = phi;

            return { x: targetX, y: targetY };
        };

        // Setup Gwalior as starting target
        const initialRot = calculateTargetRotation(CITIES[0]);
        targetRotationRef.current = initialRot;
        globeGroup.rotation.x = initialRot.x;
        globeGroup.rotation.y = initialRot.y;

        // Pulse Ring animation variables
        let pulseTime = 0;

        // Animation Loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Interpolate towards the target rotation (smooth camera flight/panning)
            if (!isDragging) {
                globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * 0.05;
                globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * 0.05;
            } else {
                // If user is dragging manually, update the targets to match actual rotation
                targetRotationRef.current.y = globeGroup.rotation.y;
                targetRotationRef.current.x = globeGroup.rotation.x;
            }

            // Animate pulsing waves/rings
            pulseTime += 0.035;
            const pulseScale = 1 + Math.sin(pulseTime * 4) * 0.3;
            const pulseOpacity = 0.8 - Math.sin(pulseTime * 4) * 0.3;

            ringGroups.forEach(ring => {
                ring.scale.set(pulseScale, pulseScale, 1);
                if (ring.material instanceof THREE.MeshBasicMaterial) {
                    ring.material.opacity = pulseOpacity;
                }
            });

            // Gentle wobble/rotation on the outer points sphere
            particleSphere.rotation.y += 0.001;

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            canvas.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleMouseUp);

            sphereGeo.dispose();
            sphereMat.dispose();
            particleGeo.dispose();
            particleMat.dispose();
            pinMaterial.dispose();
            curveMaterial.dispose();
            pinsGeometry.dispose();
            
            ringGroups.forEach(ring => {
                ring.geometry.dispose();
                if (ring.material instanceof THREE.Material) {
                    ring.material.dispose();
                }
            });

            renderer.dispose();
        };
    }, []);

    // Set focus on a specific city (rotate camera to node)
    const handleCitySelect = (city: CityNode) => {
        setActiveCity(city);
        
        // Calculate coordinate rotation targets
        const phi = (city.lat * Math.PI) / 180;
        const lambda = (city.lng * Math.PI) / 180;

        // Apply alignment rotations
        targetRotationRef.current.y = -lambda - Math.PI / 2;
        targetRotationRef.current.x = phi;
    };

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem",
            background: "var(--deep-navy)",
            padding: "2.5rem",
            color: "var(--text-primary)",
            border: "1px solid rgba(15,23,42,0.08)",
            boxShadow: "var(--shadow-xl)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Visual background grid */}
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: "linear-gradient(rgba(13, 124, 91, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 124, 91, 0.03) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                pointerEvents: "none"
            }} />

            {/* Left Column: Interactive 3D Canvas */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "450px" }}>
                <div style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "rgba(3, 13, 26, 0.8)",
                    border: "1px solid var(--secondary-gss)",
                    padding: "6px 12px",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: 700,
                    color: "var(--white)",
                    zIndex: 10
                }}>
                    3D Interactive GMB Map
                </div>
                <canvas 
                    ref={canvasRef} 
                    style={{ 
                        width: "100%", 
                        height: "100%", 
                        cursor: "grab", 
                        touchAction: "none"
                    }} 
                />
                <div style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: "var(--text-light-muted)",
                    opacity: 0.8,
                    marginTop: "-15px",
                    pointerEvents: "none"
                }}>
                    ℹ Drag the 3D globe to rotate manually
                </div>
            </div>

            {/* Right Column: Interactive Details Panel */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 2 }}>
                <div>
                    <h3 style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        marginBottom: "1.5rem",
                        color: "var(--primary-gss-hover)"
                    }}>
                        Our Office Network
                    </h3>

                    {/* City Selector Buttons */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
                        {CITIES.map((city) => (
                            <button
                                key={city.name}
                                onClick={() => handleCitySelect(city)}
                                style={{
                                    padding: "8px 14px",
                                    background: activeCity.name === city.name ? "var(--secondary-gss)" : "rgba(15, 23, 42, 0.05)",
                                    border: activeCity.name === city.name ? "1px solid var(--secondary-gss)" : "1px solid rgba(15, 23, 42, 0.12)",
                                    color: activeCity.name === city.name ? "var(--white)" : "var(--text-primary)",
                                    cursor: "pointer",
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                    transition: "all 0.2s ease",
                                    fontFamily: "Montserrat, sans-serif"
                                }}
                            >
                                {city.name.split(" ")[0]}
                            </button>
                        ))}
                    </div>

                    {/* Active City Card */}
                    <div style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        borderLeft: "4px solid var(--primary-gss-hover)",
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem"
                    }}>
                        <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                            <Building2 size={20} style={{ color: "var(--primary-gss-hover)" }} />
                            <span>{activeCity.name}</span>
                        </h4>

                        <p style={{ color: "var(--text-light-muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0, display: "flex", alignItems: "flex-start", gap: "10px" }}>
                            <MapPin size={18} style={{ color: "var(--secondary-gss)", flexShrink: 0, marginTop: "2px" }} />
                            <span>{activeCity.address}</span>
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                            <p style={{ color: "var(--text-light-muted)", fontSize: "0.95rem", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                                <Phone size={18} style={{ color: "var(--secondary-gss)" }} />
                                <a href={`tel:${activeCity.phone.replace(/[^0-9+]/g, '')}`} style={{ color: "var(--text-primary)", textDecoration: "none" }}>{activeCity.phone}</a>
                            </p>
                            <p style={{ color: "var(--text-light-muted)", fontSize: "0.95rem", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                                <Mail size={18} style={{ color: "var(--secondary-gss)" }} />
                                <a href={`mailto:${activeCity.email}`} style={{ color: "var(--text-primary)", textDecoration: "none" }}>{activeCity.email}</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "2rem" }}>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-light-muted)", margin: 0 }}>
                        All offices are equipped with fully certified CAs and IT consultants. We help list, verify, and resolve suspensions for GMB locations locally.
                    </p>
                </div>
            </div>
        </div>
    );
}
