"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CyberneticGridShaderProps {
  baseColor?: [number, number, number]; // [r, g, b] normalized (0 to 1)
  pulseColor?: [number, number, number]; // [r, g, b] normalized (0 to 1)
  className?: string;
  style?: React.CSSProperties;
}

const CyberneticGridShader: React.FC<CyberneticGridShaderProps> = ({
  baseColor,
  pulseColor,
  className = "shader-container",
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  // Monitor theme changes on <html> tag
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme as 'light' | 'dark');

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.attributeName === 'data-theme') {
            const nextTheme = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(nextTheme as 'light' | 'dark');
          }
        }
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });

      return () => observer.disconnect();
    }
  }, []);

  // Update uniforms dynamically when theme or color props change
  useEffect(() => {
    if (uniformsRef.current) {
      const isDark = theme === 'dark';
      // Lighter gray for dark mode backdrop, dark gray for light mode backdrop
      const defaultBase = isDark ? [0.28, 0.28, 0.3] : [0.12, 0.12, 0.12];
      const defaultPulse = isDark ? [0.95, 0.15, 0.25] : [0.8, 0.05, 0.15];

      const currentBase = baseColor || defaultBase;
      const currentPulse = pulseColor || defaultPulse;

      uniformsRef.current.iBaseColor.value.setRGB(currentBase[0], currentBase[1], currentBase[2]);
      uniformsRef.current.iPulseColor.value.setRGB(currentPulse[0], currentPulse[1], currentPulse[2]);
    }
  }, [theme, baseColor, pulseColor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1) Renderer, Scene, Camera, Clock
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    // 2) GLSL Shaders
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform vec3 iBaseColor;
      uniform vec3 iPulseColor;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233)))
                     * 43758.5453123);
      }

      void main() {
        // normalize coords around center
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy)
                     / iResolution.y;
        vec2 mouse = (iMouse - 0.5 * iResolution.xy)
                     / iResolution.y;

        float t         = iTime * 0.2;
        float mouseDist = length(uv - mouse);

        // warp effect around mouse
        float warp = sin(mouseDist * 20.0 - t * 4.0) * 0.1;
        warp *= smoothstep(0.4, 0.0, mouseDist);
        uv += warp;

        // grid lines
        vec2 gridUv = abs(fract(uv * 10.0) - 0.5);
        float line  = pow(1.0 - min(gridUv.x, gridUv.y), 50.0);

        // base grid color pulsing
        vec3 color     = iBaseColor
                       * line
                       * (0.5 + sin(t * 2.0) * 0.2);

        // energetic pulses along grid
        float energy = sin(uv.x * 20.0 + t * 5.0)
                     * sin(uv.y * 20.0 + t * 3.0);
        energy = smoothstep(0.8, 1.0, energy);
        color += iPulseColor * energy * line;

        // glow around mouse
        float glow = smoothstep(0.1, 0.0, mouseDist);
        color += vec3(1.0) * glow * 0.5;

        // subtle noise
        color += random(uv + t * 0.1) * 0.05;

        // Calculate alpha based on line presence, glow and energy, with a baseline noise alpha
        float alpha = clamp(line * 0.8 + glow * 0.6 + 0.02, 0.0, 1.0);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    // 3) Uniforms, Material, Mesh
    // Determine initial colors based on active theme
    const isDark = (document.documentElement.getAttribute('data-theme') || 'light') === 'dark';
    const defaultBase = isDark ? [0.28, 0.28, 0.3] : [0.12, 0.12, 0.12];
    const defaultPulse = isDark ? [0.95, 0.15, 0.25] : [0.8, 0.05, 0.15];

    const initialBase = baseColor || defaultBase;
    const initialPulse = pulseColor || defaultPulse;

    const uniforms = {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse:      { value: new THREE.Vector2(
                       window.innerWidth / 2,
                       window.innerHeight / 2
                     ) },
      iBaseColor:  { value: new THREE.Color(initialBase[0], initialBase[1], initialBase[2]) },
      iPulseColor: { value: new THREE.Color(initialPulse[0], initialPulse[1], initialPulse[2]) }
    };

    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh     = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4) Resize handler
    const onResize = () => {
      const width  = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height);
    };
    window.addEventListener('resize', onResize);
    onResize(); // set initial size

    // 5) Mouse handler
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.iMouse.value.set(
        e.clientX - rect.left,
        rect.height - (e.clientY - rect.top)
      );
    };
    window.addEventListener('mousemove', onMouseMove);

    // 6) Animation loop
    renderer.setAnimationLoop(() => {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });

    // 7) Cleanup on unmount
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);

      renderer.setAnimationLoop(null);

      const canvas = renderer.domElement;
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }

      material.dispose();
      geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position:      'absolute',
        top:           0,
        left:          0,
        width:         '100%',
        height:        '100%',
        zIndex:        -1,
        pointerEvents: 'none',
        ...style
      }}
      aria-label="Cybernetic Grid animated background"
    />
  );
};

export default CyberneticGridShader;
