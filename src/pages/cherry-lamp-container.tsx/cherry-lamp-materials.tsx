import { MeshTransmissionMaterial } from "@react-three/drei";
import { Color } from "three";

export function StemMaterial() {
  const stemColor = "#6bc846";
  return (
    <meshPhysicalMaterial
      roughness={0}
      color={stemColor}
      envMapIntensity={0.2}
    />
  );
}

export function CherryMaterial() {
  const cherryColor = "#FF0047";
  return (
    <meshPhysicalMaterial
      roughness={0}
      color={cherryColor}
      envMapIntensity={0.2}
    />
  );
}

export function LampMaterial() {
  return (
    <MeshTransmissionMaterial
      backside
      backsideThickness={5}
      thickness={2}
      background={new Color().setHex(0xffffff)}
    />
  );
}
