import React from "react";

const WeatherIcon = () => {
  return (
    <svg
    className="absolute -top-8 -right-40"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    height="150px"
   
  >
    <defs>
      <linearGradient
        id="c"
        x1={99.5}
        x2={232.6}
        y1={30.7}
        y2={261.4}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#f3f7fe" />
        <stop offset={0.5} stopColor="#f3f7fe" />
        <stop offset={1} stopColor="#deeafb" />
      </linearGradient>
      <linearGradient
        id="a"
        x1={1381.3}
        x2={1399.5}
        y1={-1144.7}
        y2={-1097.4}
        gradientTransform="rotate(-9 8002.567 8233.063)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#0b65ed" />
        <stop offset={0.5} stopColor="#0a5ad4" />
        <stop offset={1} stopColor="#0950bc" />
      </linearGradient>
      <linearGradient
        xlinkHref="#a"
        x1={1436.7}
        x2={1454.9}
        y1={-1137}
        y2={-1089.7}
        gradientTransform="rotate(-9 8009.537 8233.037)"
      />
      <linearGradient
        xlinkHref="#a"
        x1={1492.1}
        x2={1510.3}
        y1={-1129.3}
        y2={-1082.1}
        gradientTransform="rotate(-9 8016.566 8233.078)"
      />
      <linearGradient
        id="b"
        x1={78}
        x2={118}
        y1={63.4}
        y2={132.7}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#fbbf24" />
        <stop offset={0.5} stopColor="#fbbf24" />
        <stop offset={1} stopColor="#f59e0b" />
      </linearGradient>
      <symbol id="d" viewBox="0 0 196 196">
        <circle
          cx={98}
          cy={98}
          r={40}
          fill="url(#b)"
          stroke="#f8af18"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <path
          fill="none"
          stroke="#fbbf24"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={12}
          d="M98 31.4V6m0 184v-25.4M145.1 51l18-17.9M33 163l18-17.9M51 51L33 33m130.1 130.1l-18-18M6 98h25.4M190 98h-25.4"
        >
          <animateTransform
            additive="sum"
            attributeName="transform"
            dur="6s"
            repeatCount="indefinite"
            type="rotate"
            values="0 98 98; 45 98 98"
          />
        </path>
      </symbol>
      <symbol id="e" viewBox="0 0 350 222">
        <path
          fill="url(#c)"
          stroke="#e6effc"
          strokeMiterlimit={10}
          strokeWidth={6}
          d="M291 107l-2.5.1A83.9 83.9 0 00135.6 43 56 56 0 0051 91a56.6 56.6 0 00.8 9A60 60 0 0063 219l4-.2v.2h224a56 56 0 000-112z"
        />
      </symbol>
      <symbol id="f" viewBox="0 0 363 258">
        <use xlinkHref="#d" width={196} height={196} />
        <use
          xlinkHref="#e"
          width={350}
          height={222}
          transform="translate(13 36)"
        />
      </symbol>
    </defs>
    <use
      xlinkHref="#f"
      width={363}
      height={258}
      transform="translate(68 109)"
    />
    <use
      xlinkHref="#o"
      width={129}
      height={57}
      transform="translate(191.5 343.5)"
    />
  </svg>
  );
};

export default WeatherIcon;
