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

  calculate(rho, Cd, A, u, CM, V, du_dt,movement) {
    const F_D = 0.5 * rho * Cd * A * u * Math.abs(u) * 0.002;
    const F_I = rho * CM * V * du_dt;

    this.direction = this.compute_direction(movement);

    const strength = F_D + F_I;
    
    const Wa = this.direction.clone().multiplyScalar(strength);
    return Wa;
  }
  
};

export default WaveForce;