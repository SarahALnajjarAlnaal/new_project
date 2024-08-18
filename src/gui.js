import { GUI } from "lil-gui";

function makeGui(output, physicalVariables, paramaters, updateSunFun) {
  const gui = new GUI();
  //const physicsFolder = gui.addFolder("Physics");

  gui.add(physicalVariables, 'checkbox').name('Check').onChange((value) => {
    // Handle checkbox change
    // console.log(`Checkbox is now ${value ? 'checked' : 'unchecked'}`);
    if(physicalVariables.checkbox)
    physicalVariables.checkbox=value;
  else
  physicalVariables.checkbox=value;

  // console.log(physicalVariables.checkbox);
    // Add any functionality you want to trigger when the checkbox is toggled
  });


  gui.add(physicalVariables, "mass", 35000, 84000000).name("Mass");
  gui.add(physicalVariables, "gravity", 0, 20).name("Gravity");
  gui.add(physicalVariables, "currentRPM", 0, 30).name("RPM");
  gui
    .add(physicalVariables, "propellerDiameter", 0, 10)
    .name("Propeller Diameter");
  gui.add(physicalVariables, "propellerArea", 0, 20).name("propeller Area");
  gui.add(physicalVariables, "waterDensity", 0, 1025).name("Water Density");
  gui.add(physicalVariables, "angleRudder", -9, 9).name("angle Rudder");

  const waveDirectionFolder = gui.addFolder('Wave');
  
    // Wave Velocity Amplitude
    waveDirectionFolder.add(physicalVariables, 'waveVelocityAmplitudeTemp', 0.01, 10).name('Wave Amplitude')
    .onChange((value) => {
        setTimeout(() => {
            physicalVariables.waveVelocityAmplitude = value;
            console.log("changed!----")
            console.log("rest----",(physicalVariables.wavePeriod - (physicalVariables.time % (physicalVariables.wavePeriod)))* 1000)
       
        },((physicalVariables.wavePeriod - (physicalVariables.time % (physicalVariables.wavePeriod)))* 1000)); 
    });

    waveDirectionFolder.add(physicalVariables.waveDirectionTemp, 'x', -1, 1).step(0.1).name('x')
    .onChange((value) => {
        setTimeout(() => {
            physicalVariables.waveDirection.x = value;
            console.log("changed!----")
            console.log("rest----",(physicalVariables.wavePeriod - (physicalVariables.time % (physicalVariables.wavePeriod)))* 1000)
            
        },((physicalVariables.wavePeriod - (physicalVariables.time % (physicalVariables.wavePeriod)))* 1000)); 
    });
    
    waveDirectionFolder.add(physicalVariables.waveDirectionTemp, 'z', -1, 1).step(0.1).name('z')
    .onChange((value) => {
        setTimeout(() => {
            physicalVariables.waveDirection.z = value;
            console.log("changed!----")
            console.log("rest----",(physicalVariables.wavePeriod - (physicalVariables.time % (physicalVariables.wavePeriod)))* 1000)
            
        },((physicalVariables.wavePeriod - (physicalVariables.time % (physicalVariables.wavePeriod)))* 1000)); 
    });
    waveDirectionFolder.close();

  const windPhysicsFolder = gui.addFolder("Wind");
  windPhysicsFolder
    .add(physicalVariables, "windVelocity")
    .min(0)
    .max(30)
    .name("Wind Velocity")
    .listen();
  windPhysicsFolder
    .add(physicalVariables.windDirection, "x", -1, 1)
    .step(0.1)
    .name("x");
  windPhysicsFolder
    .add(physicalVariables.windDirection, "z", -1, 1)
    .step(0.1)
    .name("z");
  windPhysicsFolder.close();

  const outgui = new GUI({ title: "Output" });
  outgui.domElement.classList.add("output");
  outgui.add(output, "WeightX").disable().domElement.classList.add("weight");
  outgui.add(output, "WeightY").disable().domElement.classList.add("weight");
  outgui.add(output, "WeightZ").disable().domElement.classList.add("weight");

  outgui
    .add(output, "BuoyancyX")
    .disable()
    .domElement.classList.add("buoyancy");
  outgui
    .add(output, "BuoyancyY")
    .disable()
    .domElement.classList.add("buoyancy");
  outgui
    .add(output, "BuoyancyZ")
    .disable()
    .domElement.classList.add("buoyancy");

  outgui
    .add(output, "WaterResistanceX")
    .disable()
    .domElement.classList.add("waterResistance");
  outgui
    .add(output, "WaterResistanceY")
    .disable()
    .domElement.classList.add("waterResistance");
  outgui
    .add(output, "WaterResistanceZ")
    .disable()
    .domElement.classList.add("waterResistance");

  outgui.add(output, "ThrustX").disable().domElement.classList.add("thrust");
  outgui.add(output, "ThrustY").disable().domElement.classList.add("thrust");
  outgui.add(output, "ThrustZ").disable().domElement.classList.add("thrust");

  outgui.add(output, "WindX").disable().domElement.classList.add("wind");
  outgui.add(output, "WindY").disable().domElement.classList.add("wind");
  outgui.add(output, "WindZ").disable().domElement.classList.add("wind");

  outgui.add(output, "WaveX").disable().domElement.classList.add("Wave");
  outgui.add(output, "WaveY").disable().domElement.classList.add("Wave");
  outgui.add(output, "WaveZ").disable().domElement.classList.add("Wave");

  outgui
    .add(output, "AccelerationX")
    .disable()
    .domElement.classList.add("acceleration");
  outgui
    .add(output, "AccelerationY")
    .disable()
    .domElement.classList.add("acceleration");
  outgui
    .add(output, "AccelerationZ")
    .disable()
    .domElement.classList.add("acceleration");

  outgui
    .add(output, "VelocityX")
    .disable()
    .domElement.classList.add("velocity");
  outgui
    .add(output, "VelocityY")
    .disable()
    .domElement.classList.add("velocity");
  outgui
    .add(output, "VelocityZ")
    .disable()
    .domElement.classList.add("velocity");

  outgui
    .add(output, "PositionX")
    .disable()
    .domElement.classList.add("position");
  outgui
    .add(output, "PositionY")
    .disable()
    .domElement.classList.add("position");
  outgui
    .add(output, "PositionZ")
    .disable()
    .domElement.classList.add("position");

  return { outgui };
}
export default makeGui;
