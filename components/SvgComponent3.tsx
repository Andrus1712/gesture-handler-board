import Svg, { Path } from "react-native-svg";

export function SvgComponent3(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={50}
      height={50}
      viewBox="0 0 495 495"
      {...props}>
      <Path
        d="M142.199 0h40v92.546h-40zM227.5 0h40v92.546h-40zM312.801 0h40v92.546h-40z"
        style={{
          fill: "#bddbff",
        }}
      />
      <Path
        d="M142.199 402.454h40V495h-40zM227.5 402.454h40V495h-40zM312.801 402.454h40V495h-40zM402.454 141.944H495v40h-92.546zM402.454 227.246H495v40h-92.546zM402.454 312.546H495v40h-92.546z"
        style={{
          fill: "#9bc9ff",
        }}
      />
      <Path
        d="M0 141.944h92.546v40H0zM0 227.246h92.546v40H0zM0 312.546h92.546v40H0z"
        style={{
          fill: "#bddbff",
        }}
      />
      <Path
        d="M247.5 326.065h-78.564v-157.13H247.5V92.546H92.546v309.908H247.5z"
        style={{
          fill: "#2488ff",
        }}
      />
      <Path
        d="M402.454 92.546H247.5v76.389h78.564v157.13H247.5v76.389h154.954z"
        style={{
          fill: "#005ece",
        }}
      />
      <Path
        d="M168.936 168.935H247.5v157.13h-78.564z"
        style={{
          fill: "#ffda44",
        }}
      />
      <Path
        d="M247.5 168.935h78.564v157.13H247.5z"
        style={{
          fill: "#ffcd00",
        }}
      />
    </Svg>
  );
}
