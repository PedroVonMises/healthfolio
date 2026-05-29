"use client";

import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader";

export default function DemoOne() {
  return (
    <div className="app-container">
      <CyberneticGridShader style={{ position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0 }} />
      <div className="overlay-content">
        <h1 className="title">Cybernetic Grid</h1>
        <p className="description">An Interactive WebGL Shader</p>
      </div>
    </div>
  );
}
