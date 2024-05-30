import { Vector3 } from 'three';
import Force from '../Force';

class WaveForce extends Force {
  // W = 1/2 . 𝜌. 𝐶𝑑. 𝐴. 𝑢. |𝑈| + 𝜌 ⋅ 𝐶𝑀 ⋅ 𝑉 . ⅆ𝑢 / ⅆ𝑡

  constructor() {
    super();
  };

  compute_direction(movement) {
    if (movement)
      return movement.clone().normalize().negate();
    return new Vector3();
  };

  // calculate(Cd, frontArea, density, volume, movement) {
  //   const cd = Cd;
  //   const A = frontArea;
  //   const p = density;
  //   const v = velocityLength;

  //   this.direction = this.compute_direction(movement);

  //   const strength = 0.5 * c * A * p * (v ** 2);

  //   const D = this.direction.clone().multiplyScalar(strength);

  //   return D;
  // };
};

export default WaveForce;