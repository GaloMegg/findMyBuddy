import { ActivityIndicator } from "react-native";
/**
 * Renders a loader component with the specified color and size.
 *
 * @param {string} color - The color of the loader. Defaults to '#0000ff'.
 * @param {string} size - The size of the loader. Defaults to 'small'.
 * @return {JSX.Element} The rendered loader component.
 */
const Loader = ({ color, size = "large" }) => {
  return <ActivityIndicator size={size} color={color} />;
};
export default Loader;
