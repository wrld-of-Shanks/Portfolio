export const ditherVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const ditherFragmentShader = `
uniform float uTime;
uniform float uScrollProgress;
uniform vec2 uMouse;
uniform vec3 uAccentColor;
uniform float uDitherScale;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

float bayer2x2(vec2 p) {
  float b = fract(dot(p, vec2(0.5, 0.5)));
  return b;
}

float bayer4x4(vec2 p) {
  vec2 a = step(1.0, fract(p * 0.5));
  vec2 b = fract(p * 0.5);
  float val = (a.x + a.y * 2.0 + b.x * 4.0 + b.y * 8.0) / 16.0;
  return val;
}

float bayer8x8(vec2 p) {
  vec2 c = floor(mod(p, 8.0));
  float a = step(1.0, mod(c.x, 2.0));
  float b = step(1.0, mod(c.y, 2.0));
  float d = (a + b * 2.0) * 4.0;
  vec2 e = floor(mod(c * 0.5, 4.0));
  float f = step(1.0, mod(e.x, 2.0));
  float g = step(1.0, mod(e.y, 2.0));
  return (d + f + g * 2.0) / 16.0;
}

float computeLuminance(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec3 lightDir = normalize(vec3(1.0, 1.5, 2.0));
  float diff = max(dot(vNormal, lightDir), 0.0);
  float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
  rim = pow(rim, 2.5);

  float baseLuminance = 0.15 + diff * 0.85;

  vec2 ditherCoord = gl_FragCoord.xy * uDitherScale;
  float dither = bayer8x8(ditherCoord);

  float threshold = dither;
  float bw = step(threshold, baseLuminance);
  vec3 ditheredColor = vec3(bw);

  float edgeDetect = fwidth(computeLuminance(ditheredColor)) * 3.0;
  ditheredColor += edgeDetect * 0.15;

  vec3 rimColor = uAccentColor * rim * 2.0;
  float rimMask = smoothstep(0.3, 0.9, rim);
  rimColor *= rimMask;

  float scanline = sin(gl_FragCoord.y * 1.5 + uTime * 0.5) * 0.02;
  ditheredColor += scanline;

  vec3 finalColor = mix(ditheredColor, rimColor + vec3(1.0), rimMask * 0.8);

  float edgeGlow = smoothstep(0.7, 1.0, rim) * 0.6;
  finalColor = mix(finalColor, uAccentColor, edgeGlow);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export const particleVertexShader = `
attribute float aSize;
attribute float aPhase;
attribute float aSpeed;

uniform float uTime;
uniform float uScrollProgress;

varying float vAlpha;
varying float vPhase;

void main() {
  vPhase = aPhase;

  vec3 pos = position;
  float t = uTime * aSpeed + aPhase;

  pos.x += sin(t * 0.7) * 0.3;
  pos.y += cos(t * 0.5) * 0.4 + uScrollProgress * 2.0;
  pos.z += sin(t * 0.3) * 0.2;

  vAlpha = 0.3 + 0.7 * abs(sin(t * 2.0));

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleFragmentShader = `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
  gl_FragColor = vec4(uColor, alpha);
}
`;

export const scanlineVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const scanlineFragmentShader = `
uniform float uTime;
uniform float uScrollProgress;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  float line = abs(sin(vUv.y * uResolution.y * 0.02 + uTime * 0.3));
  float mask = step(0.98, line);

  float sweep = smoothstep(0.0, 0.05, abs(fract(vUv.y - uTime * 0.1 - uScrollProgress * 0.5) - 0.5) * 2.0);
  float sweepLine = (1.0 - sweep) * 0.4;

  float alpha = (mask * 0.03 + sweepLine) * 0.3;

  gl_FragColor = vec4(0.769, 0.0, 0.0, alpha);
}
`;
