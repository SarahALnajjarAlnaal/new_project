import { GUI } from 'lil-gui';


function makeGui( output,physicalVariables) {

   const gui = new GUI();
   //const physicsFolder = gui.addFolder("Physics");

   gui.add(physicalVariables, 'mass', 0, 200000).name('Mass');
   gui.add(physicalVariables, 'gravity', 0, 20).name('Gravity');
   gui.add(physicalVariables, 'currentRPM', 0, 20).name('RPM');
   gui.add(physicalVariables, 'propellerDiameter', 0, 20).name('Propeller Diameter');
   gui.add(physicalVariables, 'propellerArea', 0, 20).name('propeller Area');
   gui.add(physicalVariables, 'waterDensity', 0, 20).name('Water Density');
   //gui.add(physicsWorld, 'angleY', 0, 20).name('Rotation');

   const outgui = new GUI({ title: "Output" });
   outgui.domElement.classList.add("output");
    outgui.add(output, "WeightX").disable().domElement.classList.add("weight");
    outgui.add(output, "WeightY").disable().domElement.classList.add("weight");
    outgui.add(output, "WeightZ").disable().domElement.classList.add("weight");
 
    outgui.add(output, "BuoyancyX").disable().domElement.classList.add("buoyancy");
    outgui.add(output, "BuoyancyY").disable().domElement.classList.add("buoyancy");
    outgui.add(output, "BuoyancyZ").disable().domElement.classList.add("buoyancy");
 
    outgui.add(output, "WaterResistanceX").disable().domElement.classList.add("waterResistance");
    outgui.add(output, "WaterResistanceY").disable().domElement.classList.add("waterResistance");
    outgui.add(output, "WaterResistanceZ").disable().domElement.classList.add("waterResistance");
 
    outgui.add(output, "ThrustX").disable().domElement.classList.add("thrust");
    outgui.add(output, "ThrustY").disable().domElement.classList.add("thrust");
    outgui.add(output, "ThrustZ").disable().domElement.classList.add("thrust");
 
    outgui.add(output, "WindX").disable().domElement.classList.add("wind");
    outgui.add(output, "WindY").disable().domElement.classList.add("wind");
    outgui.add(output, "WindZ").disable().domElement.classList.add("wind");
 
    outgui.add(output, "AccelerationX").disable().domElement.classList.add("acceleration");
    outgui.add(output, "AccelerationY").disable().domElement.classList.add("acceleration");
    outgui.add(output, "AccelerationZ").disable().domElement.classList.add("acceleration");
 
    outgui.add(output, "VelocityX").disable().domElement.classList.add("velocity");
    outgui.add(output, "VelocityY").disable().domElement.classList.add("velocity");
    outgui.add(output, "VelocityZ").disable().domElement.classList.add("velocity");
 
    outgui.add(output, "PositionX").disable().domElement.classList.add("position");
    outgui.add(output, "PositionY").disable().domElement.classList.add("position");
    outgui.add(output, "PositionZ").disable().domElement.classList.add("position");



    return { outgui };
}
export default makeGui;