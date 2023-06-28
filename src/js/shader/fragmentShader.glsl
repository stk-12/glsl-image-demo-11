varying vec2 vUv;
varying float vDistortion;
uniform float uTime;
uniform sampler2D uTex;
uniform sampler2D uTex2;

void main() {
  vec2 uv = vUv;

  // vec3 color = texture2D(uTex, uv).rgb;

  vec3 color;

  if (gl_FrontFacing) {
    color = texture2D(uTex, uv).rgb;
  } else {
    color = texture2D(uTex2, uv).rgb;
  }

  gl_FragColor = vec4(color, 1.0);
}