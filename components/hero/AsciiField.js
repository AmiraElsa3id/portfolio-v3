"use client";

import { useEffect, useRef } from "react";

/*
  AsciiField — ported from assets/js/hero-ascii.js into a React effect.

  A WebGL 1 fragment shader draws a grid of ASCII glyphs; brightness is
  domain-warped noise plus a spotlight/ripple around the pointer. Theme
  colours are read from the active palette and refresh on "themechange".

  Performance, as in the original: pauses when off-screen (IntersectionObserver),
  DPR capped at 2, one still frame under prefers-reduced-motion, canvas hides
  itself if WebGL fails (revealing the CSS dot-grid fallback). The effect
  returns a cleanup that cancels the RAF and disconnects every observer/listener.
*/

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

const FRAG = `precision highp float;
uniform vec2 uRes;      // canvas size in device pixels
uniform float uTime;    // seconds
uniform vec2 uMouse;    // pointer in device pixels (origin bottom-left)
uniform vec3 uAccent;   // theme accent
uniform vec3 uGround;   // theme background
uniform vec3 uInk;      // theme text colour
uniform float uCell;    // half cell size in device px (cell = 2*uCell)

// hash + value noise + fbm (4 octaves)
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);
 for(int i=0;i<4;i++){v+=a*noise(p);p=R*p*2.03+1.7;a*=.5;}return v;}

// pick a 5x5 glyph by brightness g and test pixel p (-1..1 in the cell)
float glyph(float g,vec2 p){
 float c=4096.;                       // .
 if(g>.2)c=65600.;                    // :
 if(g>.32)c=332772.;                  // *
 if(g>.44)c=15255086.;                // o
 if(g>.56)c=23385164.;                // &
 if(g>.68)c=15252014.;                // 8
 if(g>.8)c=13199452.;                 // @
 if(g>.9)c=11512810.;                 // #
 vec2 q=floor(p*vec2(4.,-4.)+2.5);
 if(q.x<0.||q.x>4.||q.y<0.||q.y>4.)return 0.;
 float bit=q.x+5.*q.y;
 return mod(floor(c/exp2(bit)),2.);
}

void main(){
 vec2 cell=floor(gl_FragCoord.xy/(2.*uCell));
 vec2 cc=(cell+.5)*2.*uCell;            // cell centre
 vec2 uv=cc/uRes; float asp=uRes.x/uRes.y;
 vec2 p=(cc-.5*uRes)/uRes.y; float T=uTime*.11;
 // flowing texture (domain-warped noise)
 vec2 q=vec2(fbm(p*1.5+vec2(0.,T)),fbm(p*1.5+vec2(4.3,-T)));
 float f=fbm(p*1.7+2.4*q+vec2(T*.6,0.));
 // cursor spotlight + ripple
 float d=length(cc-uMouse)/uRes.y;
 float spot=exp(-d*d*10.);
 float wave=.5+.5*sin(d*40.-uTime*3.4);
 float g=pow(f,1.7)*1.25+spot*(.3+.4*wave);
 // keep the left side (desktop) / everything (phones) calmer
 float mask=asp>1.?smoothstep(.2,.72,uv.x):(.08+.4*smoothstep(.35,1.,uv.x));
 g=clamp(g*mask,0.,1.);
 vec2 lp=mod(gl_FragCoord.xy/uCell,2.)-1.;
 float on=g<.07?0.:glyph(g,lp);
 vec3 dim=mix(uGround,uInk,.42);
 vec3 col=mix(uGround,mix(dim,uAccent,clamp(spot*1.4,0.,1.)),on*(.3+.7*g));
 gl_FragColor=vec4(col,1.);
}`;

function hex(value) {
  const n = parseInt(String(value).replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function AsciiField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    function compile(type, src) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader));
      }
      return shader;
    }

    let program;
    try {
      program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
      }
    } catch (err) {
      console.warn("[hero-ascii] WebGL disabled:", err);
      canvas.style.display = "none";
      return;
    }
    gl.useProgram(program);
    canvas.setAttribute("data-ready", "true"); // used by the test suite

    // full-screen triangle
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    ["uRes", "uTime", "uMouse", "uAccent", "uGround", "uInk", "uCell"].forEach((name) => {
      U[name] = gl.getUniformLocation(program, name);
    });

    /* ---------- Colours from the active theme ---------- */
    let colors;
    function readTheme() {
      const cs = getComputedStyle(document.documentElement);
      const accent = cs.getPropertyValue("--accent").trim() || "#D4F53C";
      const ground = cs.getPropertyValue("--ground").trim() || "#0C0D0B";
      const ink = cs.getPropertyValue("--ink").trim() || "#EDEEE8";
      colors = { a: hex(accent), g: hex(ground), i: hex(ink) };
    }
    readTheme();

    function onThemeChange(event) {
      const detail = event.detail;
      if (detail) {
        colors = { a: hex(detail.accent), g: hex(detail.ground), i: hex(detail.ink) };
      } else {
        readTheme();
      }
      if (!running) draw();
    }
    window.addEventListener("themechange", onThemeChange);

    /* ---------- Size ---------- */
    let dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    }
    resize();

    let resizeObserver = null;
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    /* ---------- Pointer (smoothed) ---------- */
    const mouse = { x: 0.72, y: 0.5, tx: 0.72, ty: 0.5 }; // 0..1, y up
    let lastMove = -1e9;
    function onPointerMove(event) {
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      mouse.tx = (event.clientX - r.left) / r.width;
      mouse.ty = 1 - (event.clientY - r.top) / r.height;
      lastMove = performance.now();
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    /* ---------- Loop ---------- */
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let t = 4;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    let running = false;

    function draw() {
      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform1f(U.uTime, t);
      gl.uniform2f(U.uMouse, mouse.x * canvas.width, mouse.y * canvas.height);
      gl.uniform3fv(U.uAccent, colors.a);
      gl.uniform3fv(U.uGround, colors.g);
      gl.uniform3fv(U.uInk, colors.i);
      gl.uniform1f(U.uCell, 5 * dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function frame(now) {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (now - lastMove > 2500) {
        // idle drift
        mouse.tx = 0.72 + 0.14 * Math.sin(t * 0.35);
        mouse.ty = 0.5 + 0.18 * Math.sin(t * 0.27 + 1.3);
      }
      const k = Math.min(1, dt * 5);
      mouse.x += (mouse.tx - mouse.x) * k;
      mouse.y += (mouse.ty - mouse.y) * k;
      draw();
      if (visible && !reduce.matches) raf = requestAnimationFrame(frame);
      else running = false;
    }

    function start() {
      if (raf || reduce.matches) {
        draw();
        return;
      }
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    let intersectionObserver = null;
    if ("IntersectionObserver" in window) {
      intersectionObserver = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible) start();
      });
      intersectionObserver.observe(canvas);
    }
    if (reduce.addEventListener) reduce.addEventListener("change", start);

    draw();
    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      running = false;
      window.removeEventListener("themechange", onThemeChange);
      window.removeEventListener("pointermove", onPointerMove);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", resize);
      if (intersectionObserver) intersectionObserver.disconnect();
      if (reduce.removeEventListener) reduce.removeEventListener("change", start);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" data-js="ascii" aria-hidden="true" />;
}
