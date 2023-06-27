varying vec2 vUv;
varying float vDistortion;
uniform float uTime;
uniform sampler2D uTex;

void main() {
  vec2 uv = vUv;

  vec3 color = texture2D(uTex, uv).rgb;

  gl_FragColor = vec4(color, 1.0);
}