import { Environment } from "@react-three/drei";

function Light({ isDay }) {
  return (
    <>
      {isDay ? (
        <>
          {/* <ambientLight intensity={0.5} color="#e6e1d6" /> */}
          <directionalLight
            intensity={1}
            position={[-3, 5, 3]}
            color="#fff1cc"
          />
          <Environment
            environmentIntensity={1}
            preset="forest"
            environmentRotation={[0, 0, 1]}
          />
        </>
      ) : (
        <>
          <directionalLight
            color="#5AC0E3"
            intensity={1}
            position={[-1, 1, 1]}
          />
          <ambientLight
            color="#A5BAEB"
            intensity={0.14}
            position={[-1, 1, 1]}
          />
          <Environment preset="night" environmentIntensity={0.5} />
          {/* <ambientLight color="#2B2E36" intensity={0.4} /> */}
        </>
      )}
    </>
  );
}

export default Light;
