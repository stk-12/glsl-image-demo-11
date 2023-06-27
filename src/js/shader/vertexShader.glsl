varying vec2 vUv;
varying float vDistortion;
uniform float uTime;
uniform float uProg;
float PI = 3.141592653589793238;

const float maxDelay = 0.5;
const float duration = 1.0 - maxDelay;

#pragma glslify: rotateY = require(glsl-rotate/rotateY);
#pragma glslify: pnoise = require(glsl-noise/periodic/3d);

void main() {
  vUv = uv;
  vec3 pos = position;


  // float distortion = pnoise((pos + uTime * 10.0), vec3(10.0) * 1.5) * 80.0 * uProg;
  // float distortion = pnoise((pos + uTime * 10.0), vec3(10.0) * 1.5) * 80.0;
  // pos.z += distortion;

  // vDistortion = distortion * 0.001;

  float delay = ((pos.x + pos.y) * 0.5) * maxDelay;
  float tProg = clamp(uProg - delay, 0.0, duration) / duration;

  pos = rotateY(pos, PI * tProg);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}