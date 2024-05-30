import { Vector3 } from "three";

import WeightForce from './Forces/WeightForce';
import BuoyancyForce from './Forces/BuoyancyForce';
import DragForce from './Forces/DragForce';
import ThurstForce from './Forces/ThurstForce';
import WindForce from './Forces/WindForce';

import hYaw from './Torques/hYaw';
import WaterResistanceForce from "./Forces/WaterResistanceForce";
import WaveForce from "./Forces/WaveForce";

class PhysicsWorld {

  target; // ship 
  controls;

  acceleration;
  velocity;
  movement;
  angleY; // for turn ship around Y
  
  constants;
  editableConstants;
  physicalVariables;

  sizes; // for ship , rudder , propeller

  output;

  forces;
  torques;


  constructor(target, controls) {
    this.target = target;
    this.controls = controls;
    
    this.acceleration = new Vector3();
    this.velocity = new Vector3();
    this.movement = new Vector3();
    
    // this.angularVelocityY = 0;
    // this.angularVelocityZ = 0;
    this.angleY = 0;
    // this.angleZ = 0;

    this.constants = {
      c: 0.1, // معامل الاحتكاك
      cd: 0.8 // معامل السحب
    };

    this.editableConstants = {
      //later
      
    };

    this.sizes = {
      //ship
      length: 120,
      height: 12,
      width: 60,
      //rudder
      rudderWidth: 6,
      rudderHeight: 10,

    };

    this.forces = {
      W: new WeightForce(),
      B: new BuoyancyForce(),
      R: new WaterResistanceForce(),
      T: new ThurstForce(),
      Wi: new WindForce(),
      // wa: new WaveForce()
    };
    this.torques = {
      H: new hYaw(this.forces.R), 
    };

    this.physicalVariables = {
      start: false,
      // showCollision: false,
      // collide: true,
    
      gravity: 9.8,
      AirDensity:1.2,
      waterDensity: 1025,

      //ship 
      mass: 100 * 1000,
      volume: 0, // later..

      //propeller
      currentRPM: 0,
      propellerDiameter: 8,
      propellerArea:0, 

      //ruddder
      rudderArea: 0, 
      horizontalRudder: 0,
    
      windVelocity: 0,
      windDirection: { x: 0, y: 0, z: 0 },
    };

    this.output = {
      WeightX: 0,
      WeightY: 0,
      WeightZ: 0,
    
      BuoyancyX: 0,
      BuoyancyY: 0,
      BuoyancyZ: 0,
    
      DragX: 0,
      DragY: 0,
      DragZ: 0,
    
      ThrustX: 0,
      ThrustY: 0,
      ThrustZ: 0,
      Thrust: 0,
    
      WindX: 0,
      WindY: 0,
      WindZ: 0,
    
      AccelerationX: 0,
      AccelerationY: 0,
      AccelerationZ: 0,
    
      VelocityX: 0,
      VelocityY: 0,
      VelocityZ: 0,
    
      PositionX: 0,
      PositionY: 0,
      PositionZ: 0,
      
      Acceleration: 0,
      Velocity: 0,
      
    };

  }
  

  calculate_mass() {
    const mass = this.physicalVariables.mass;

    return mass;
  };

  calculate_gravity() {
    const gravity = this.physicalVariables.gravity;

    return gravity;
  };

  calculate_AirDensity(){

  };

  calculate_waterDensity(){

  }

  calculate_volume() {
  
  };


  calculate_WaterResistanceArea() {
    
    const sideArea = this.sizes.length  * this.sizes.height ;
    const frontArea = 1/3 * this.sizes.width  * this.sizes.height ; // 1/3 forntArea because of Bow

    // const sideFactor = Math.abs(Math.cos(angleZ));
    // const frontFactor = Math.abs(Math.sin(angleZ));

    return 1/3 *( sideArea * 2 + frontArea); // just in water
  };

  calculate_WindArea() {
    
    const sideArea = this.sizes.length  * this.sizes.height ;
    const frontArea = 1/3 * this.sizes.width  * this.sizes.height ; // 1/3 forntArea because of Bow

    // const sideFactor = Math.abs(Math.cos(angleZ));
    // const frontFactor = Math.abs(Math.sin(angleZ));

    return 2/3 *( sideArea * 2 + frontArea); // just in Air
  };

  calculate_velocityLength() {
    return this.velocity.length();
  };

  calculate_rpm() {
    return this.physicalVariables.currentRPM;
  };

  calculate_diameter() {
  };

  calculate_propellerArea(){

  };


  calculate_rudderArea() {
    //projection

    const width = this.sizes.rudderWidth;
    const height = this.sizes.rudderHeight;

    return width * height;
  };

  calculate_windVelocityLength() {
    const windVelocityLength = this.physicalVariables.windVelocity;

    return windVelocityLength;
  }

  calculate_windVelocityDirection() {
    const windX = this.physicalVariables.windDirection.x;
    const windY = this.physicalVariables.windDirection.y;
    const windZ = this.physicalVariables.windDirection.z;

    const windVelocityDirection = new Vector3(
      windX,
      windY,
      windZ
    );

    return windVelocityDirection;
  }

  
  calculateHAlpha() {
    const alpha = this.physicalVariables.horizontalRudder * Math.PI / 180;

    return alpha;
  }

  calculate_sigma() {
    //Sigma = Sum Of Forces
  
    const c =this.constants.c;
    const cd = this.constants.cd;

    const mass = this.calculate_mass();
    const gravity = this.calculate_gravity();
    const waterDensity = this.calculate_waterDensity();
    const airDensity = this.calculate_AirDensity();
    const volume = this.calculate_volume();

    const RArea = this.calculate_WaterResistanceArea();
    const WArea = this.calculate_WindArea();

    const rpm = this.calculate_rpm();
    const propellerDiameter = this.calculate_diameter();
    const propellerArea = this.calculate_propellerArea();
    
    const velocityLength = this.calculate_velocityLength();
    const movement = this.movement;
    const windVelocityDirection = this.calculate_windVelocityDirection();
    const windVelocityLength = this.calculate_windVelocityLength();

    const W = this.forces.W.calculate(mass, gravity);
    const B = this.forces.B.calculate(waterDensity, 0.3 * volume, gravity);
    const R = this.forces.R.calculate(c, RArea, waterDensity, velocityLength, movement);
    const T = this.forces.T.calculate(rpm, propellerDiameter, propellerArea, waterDensity, this.angleY);
    const Wi = this.forces.Wi.calculate(cd, WArea, airDensity, windVelocityLength, windVelocityDirection);

    //this.output.WeightX = W.x.toFixed(4)+" N";
    this.output.WeightY = W.y.toFixed(4) + " N";
    //this.output.WeightZ = W.z.toFixed(4)+" N";

    //this.output.BuoyancyX = B.x.toFixed(4)+" N";
    this.output.BuoyancyY = B.y.toFixed(4) + " N";
    //this.output.BuoyancyZ = B.z.toFixed(4)+" N";

    this.output.DragX = D.x.toFixed(4) + " N";
    this.output.DragY = D.y.toFixed(4) + " N";
    this.output.DragZ = D.z.toFixed(4) + " N";

    this.output.ThrustX = T.x.toFixed(4) + " N";
    this.output.ThrustY = T.y.toFixed(4) + " N";
    this.output.ThrustZ = T.z.toFixed(4) + " N";
    this.output.Thrust = T.length().toFixed(4) + " N";

    this.output.WindX = Wi.x.toFixed(4) + " N";
    this.output.WindY = Wi.y.toFixed(4) + " N";
    this.output.WindZ = Wi.z.toFixed(4) + " N";

    const Sigma = new Vector3().addVectors(
      W,
      new Vector3().addVectors(
        B,
        new Vector3().addVectors(
          R,
          new Vector3().addVectors(
            T,
            Wi
          )
        )
      )
    );

    return Sigma;
  }

  calculate_acceleration() {
    //a = sigma / m

    const sigma = this.calculate_sigma();
    const m = this.calculate_mass();

    const a = sigma.divideScalar(m); //  sigma / m

    this.acceleration = a.clone();

    this.output.AccelerationX = a.x.toFixed(4) + " m.s⁻²";
    this.output.AccelerationY = a.y.toFixed(4) + " m.s⁻²";
    this.output.AccelerationZ = a.z.toFixed(4) + " m.s⁻²";
    this.output.Acceleration = a.length().toFixed(4) + " m.s⁻²";

    return a;
  }

  calculate_velocity(deltaTime) {
    //v = a * t + v0

    const v0 = this.velocity;
    const t = deltaTime;
    const a = this.calculate_acceleration();

    const v = new Vector3().addVectors(v0, a.clone().multiplyScalar(t));

    this.velocity = v.clone();

    this.output.VelocityX = v.x.toFixed(4) + " m.s⁻¹"
    this.output.VelocityY = v.y.toFixed(4) + " m.s⁻¹"
    this.output.VelocityZ = v.z.toFixed(4) + " m.s⁻¹"
    this.output.Velocity = v.length().toFixed(4) + " m.s⁻¹"

    return v;
  }

  calculateMovement(deltaTime) {
    //delta position = 0.5 * a * t ^ 2 + v * t

    const t = deltaTime;
    const v = this.calculate_velocity(t);
    const a = this.acceleration;

    const d = new Vector3().addVectors(a.clone().multiplyScalar(0.5 * t ** 2), v.clone().multiplyScalar(t));

    this.movement = d.clone();

    return d;
  }

  calculateRotation(deltaTime) {
    //Calculate Angles From Torques

  }

  move(d) {

  }

  rotate(h, v) {
    //Rotate

    this.target.rotateTo(0, h, v);
  }

  update(deltaTime) {
    //Run All Above Functions And Simulate The Physics

  }
}

export default PhysicsWorld;