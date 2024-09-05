import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
const loader = new GLTFLoader();

export class IslandModel {
  constructor(scene, camera) {
    this.camera = camera;
    loader.load("assets/island/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(10, 10, 10);

      gltf.scene.position.set(-250, 20, -500);
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
