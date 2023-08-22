import { PulseLoader } from "react-spinners";

export default function Spinner({ fullWidth }) {
  if (fullWidth) {
    return (
      <div className="w-full flex justify-center">
        <PulseLoader color={"#0e0e0e"} speedMultiplier={2} />
      </div>
    );
  }
  return <PulseLoader color={"#0e0e0e"} speedMultiplier={2} />;
}
