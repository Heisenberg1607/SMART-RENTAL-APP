import { FadeLoader, PropagateLoader, RingLoader } from "react-spinners";

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <RingLoader
        color="#3682d6"
        height={15}
        margin={2}
        radius={2}
        speedMultiplier={2}
        width={5}
      />
    </div>
  );
}

export default Loader;
