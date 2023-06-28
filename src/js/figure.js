import * as THREE from "three";
import { gsap } from "gsap";
import vertexSource from "./shader/vertexShader.glsl";
import fragmentSource from "./shader/fragmentShader.glsl";

export default class Figure {
	constructor(el, scene) {
		this.$image = el;
		this.scene = scene

		this.loader = new THREE.TextureLoader()

		this.image = this.loader.load(this.$image.src)
		// this.hoverImage = this.loader.load(this.$image.dataset.hover)
    this.$image.style.opacity = 0
		this.sizes = new THREE.Vector2(0, 0)
		this.offset = new THREE.Vector2(0, 0)

    this.image2 = this.loader.load(this.$image.dataset.img)

    this.uniforms = {
      uTime: {
        value: 0.0
      },
      uTex: {
        value: this.texture
      },
      uTex2: {
        value: this.image2
      },
      uProg: {
        value: -0.5
      }
      // uResolution: {
      //   value: new THREE.Vector2(this.viewport.width, this.viewport.height)
      // },
      // uTexResolution: {
      //   value: new THREE.Vector2(2048, 1024)
      // },
    };

    this.clock = new THREE.Clock();

		this.getSizes()

		this.createMesh()

    this.onMouseEnter();
    this.onMouseLeave();
	}

  getSizes() {
		const { width, height, top, left } = this.$image.getBoundingClientRect()

		this.sizes.set(width, height)
		this.offset.set(left - window.innerWidth / 2 + width / 2, -top + window.innerHeight / 2 - height / 2)
	}

  createMesh() {
    //テクスチャ
    const loader = new THREE.TextureLoader();
    this.uniforms.uTex.value = loader.load(this.$image.src);

		this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexSource,
      fragmentShader: fragmentSource,
      side: THREE.DoubleSide
      // wireframe: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.setParams();

		this.scene.add(this.mesh)
	}

  setParams() {
		this.mesh.position.set(this.offset.x, this.offset.y, 0)
		this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
  }

  onMouseEnter() {
    this.$image.addEventListener('mouseenter',()=>{
      gsap.to(this.uniforms.uProg, {
        duration: 1.4,
        value: 1.0,
      })
    })
  }
  onMouseLeave() {
    this.$image.addEventListener('mouseleave',()=>{
      gsap.to(this.uniforms.uProg, {
        duration: 1.4,
        value: -0.5,
      })
    })
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime();
    this.uniforms.uTime.value = elapsedTime * 0.03;

    this.getSizes();
    this.setParams();
  }
}