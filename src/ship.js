import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export class Ship {
  constructor(scene) {
    loader.load("assets/ship/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(100, 100, 100);
      gltf.scene.position.set(5, 30, 0);
      gltf.scene.rotation.y = 1.5;

      this.ship = gltf.scene;
      this.speed = {
        vel: 0,
        rot: 0,
      };
    });
  }

  stop() {
    this.speed.vel = 0;
    this.speed.rot = 0;
  }

  update() {
    if (this.ship) {
      this.ship.rotation.y += this.speed.rot;
      this.ship.translateX(this.speed.vel);

      const time = performance.now() * 0.001;
      this.ship.position.y = Math.sin(time) * 2;
    }
  }
}
