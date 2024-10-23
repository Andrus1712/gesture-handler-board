import Svg, { Path } from "react-native-svg";

export function SvgComponent2(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={50}
      height={50}
      viewBox="0 0 495 495"
      {...props}>
      <Path
        d="M247.5 424.833v-60H60V146.309h187.5v-60H0v338.524h227.5v30h40v-30z"
        style={{
          fill: "#bddbff",
        }}
      />
      <Path
        d="M110 454.833h275v40H110z"
        style={{
          fill: "#9bc9ff",
        }}
      />
      <Path
        d="M247.251 78.024 172.058 2.831l-28.285 28.284 55.194 55.194h40z"
        style={{
          fill: "#2488ff",
        }}
      />
      <Path
        d="m295.536 86.309 57.858-57.858L325.109.167l-86.142 86.142z"
        style={{
          fill: "#005ece",
        }}
      />
      <Path
        d="M247.5 86.309v60H435v218.524H247.5v60H495V86.309z"
        style={{
          fill: "#9bc9ff",
        }}
      />
      <Path
        d="M60 146.309h187.5v218.525H60z"
        style={{
          fill: "#00479b",
        }}
      />
      <Path
        d="M247.5 146.309H435v218.525H247.5z"
        style={{
          fill: "#003068",
        }}
      />
    </Svg>
  );
}
