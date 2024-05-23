import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class Ship {
  constructor(scene) {
    this.speed = {
      vel: 0,
      rot: 0,
    };

    this.boat = null; // Placeholder for the loaded model
    this.scene = scene;
    this.loadShipModel();
  }

  async loadShipModel() {
    const loader = new GLTFLoader();

    try {
      const gltf = await loader.loadAsync("assets/ship/scene.gltf");

      scene.add(gltf.scene);
      gltf.scene.scale.set(100, 100, 100);
      gltf.scene.position.set(5, 30, 0);
      gltf.scene.rotation.y = 1.5;

      this.boat = gltf.scene;
    } catch (error) {
      console.error("Error loading ship model:", error);
    }
  }

  stop() {
    this.speed.vel = 0;
    this.speed.rot = 0;
  }

  update() {
    if (this.boat) {
      this.boat.rotation.y += this.speed.rot;
      this.boat.translateX(this.speed.vel);

      // Update position based on GUI values
      this.boat.position.x += this.speed.vel * Math.cos(this.boat.rotation.y);
      this.boat.position.z += this.speed.vel * Math.sin(this.boat.rotation.y);

      const time = performance.now() * 0.001;
      this.boat.position.y = Math.sin(time) * 2;
    }
  }
}

export default Ship;
