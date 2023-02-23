/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";

export interface LoadingProps {
  loading: boolean;
  children: React.ReactNode;
  type?: "spinner" | "dots";
  cover?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  loading,
  type = "spinner",
  cover = false,
  children,
}) => {
  if (type === "spinner") {
    return loading ? (
      <div className="flex justify-center pt-[30%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          xmlSpace="preserve"
          className="h-full max-h-[40px] w-full max-w-[40px] scale-125 "
        >
          <path
            fill="#000"
            d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    ) : (
      <>{children}</>
    );
  }

  return loading ? (
    <svg
      viewBox="0 0 80 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
      className="h-[20px] w-[80px] scale-75"
    >
      <circle cx="10" cy="10" r="10">
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.9s"
          values="1;0;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="40" cy="10" r="10">
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0.6s"
          dur="0.9s"
          values="0;1;0"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="70" cy="10" r="10">
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0.3s"
          dur="0.9s"
          values="1;0;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  ) : (
    <>{children}</>
  );
};
