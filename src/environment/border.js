import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
const loader = new GLTFLoader();

export class Border {
  constructor(scene, camera, position = { x: 0, y: 0, z: 0 }) {
    this.camera = camera;
    loader.load("assets/border/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(100, 100, 100);
      gltf.scene.position.set(position.x, position.y, position.z);
      ///gltf.scene.position.set(+250, 20, +500);
      // gltf.scene.rotation.copy().y = -5;

      this.island = gltf.scene;
      this.island = {
        vel: 0,
        rot: 0,
      };
    });
  }
  get position() {
    if (this.island) {
      return this.island?.position;
    }
  }

  get rotation() {
    if (this.island) {
      return this.island.rotation;
    }
  }
}
