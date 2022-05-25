// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type _8520334RainbowForecastNightLightBeautyIconsvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function _8520334RainbowForecastNightLightBeautyIconsvgIcon(
  props: _8520334RainbowForecastNightLightBeautyIconsvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      width={"1em"}
      style={{
        stroke: "currentcolor",

        ...(style || {}),
      }}
      className={classNames("plasmic-default__svg", className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <g fill={"none"} data-name={"Layer 2"}>
        <path d={"M0 0h24v24H0z"}></path>

        <path
          d={"M6 16a6 6 0 0112 0M8 16a4 4 0 018 0"}
          stroke={"currentColor"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>

        <path
          d={"M20 16a8 8 0 00-16 0h6a2 2 0 014 0z"}
          stroke={"currentColor"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        ></path>
      </g>
    </svg>
  );
}

export default _8520334RainbowForecastNightLightBeautyIconsvgIcon;
/* prettier-ignore-end */
