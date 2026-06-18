"use client";

import React, { useState, useRef, MouseEvent } from "react";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.5s ease, box-shadow 0.5s ease",
    });
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const pctX = x / rect.width - 0.5;
        const pctY = y / rect.height - 0.5;

        const maxTilt = 12;
        const rotateX = -pctY * maxTilt;
        const rotateY = pctX * maxTilt;

        setTiltStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.25), 0 0 25px rgba(13, 124, 91, 0.25)",
        });

        setGlarePos({
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100,
            opacity: 1,
        });
    };

    const handleMouseLeave = () => {
        setTiltStyle({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
            transition: "transform 0.5s ease, box-shadow 0.5s ease",
            boxShadow: "none",
        });

        setGlarePos({ x: 50, y: 50, opacity: 0 });
    };

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                position: "relative",
                transformStyle: "preserve-3d",
                cursor: "pointer",
                overflow: "hidden",
                ...tiltStyle,
            }}
        >
            {/* Cursor-tracked specular glare */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 99,
                    borderRadius: "inherit",
                    opacity: glarePos.opacity,
                    transition: glarePos.opacity === 0 ? "opacity 0.5s ease" : "opacity 0.1s ease",
                    background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`,
                    mixBlendMode: "screen",
                }}
            />

            {/* Content with depth pop */}
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d", height: "100%" }}>
                {children}
            </div>
        </div>
    );
}
