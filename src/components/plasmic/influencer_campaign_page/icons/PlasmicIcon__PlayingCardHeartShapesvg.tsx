// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type PlayingCardHeartShapesvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function PlayingCardHeartShapesvgIcon(
  props: PlayingCardHeartShapesvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      data-name={"Layer 1"}
      viewBox={"0 0 122.88 109.37"}
      height={"1em"}
      width={"1em"}
      style={{
        fill: "currentcolor",

        ...(style || {}),
      }}
      className={classNames("plasmic-default__svg", className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M61.44 19.23a41.21 41.21 0 019.81-11.94C90.05-8 117.34 1.91 122.25 26a28.34 28.34 0 01-.25 13.11c-2.28 8.31-9.89 16.72-18 24.42-3.89 3.69-7.64 7.13-11.32 10.56-11.45 10.73-22.72 22-31.18 35.28-8.5-13.3-19.79-24.55-31.25-35.28-3.67-3.43-7.42-6.87-11.31-10.56-8.15-7.7-15.75-16.11-18-24.42A28.34 28.34 0 01.63 26c4.91-24.11 32.2-34 51-18.73a41.24 41.24 0 019.82 11.94z"
        }
        fill={"currentColor"}
        fillRule={"evenodd"}
      ></path>
    </svg>
  );
}

export default PlayingCardHeartShapesvgIcon;
/* prettier-ignore-end */
