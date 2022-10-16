import { Ring } from "@uiball/loaders";

export const Spinner = ({ size, lineWeight, speed, color }) => {
  return (
    <Ring
      size={size || 50}
      lineWeight={lineWeight || 5}
      speed={speed || 1}
      color={color || "#000"}
    />
  )
}