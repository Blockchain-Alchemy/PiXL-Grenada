// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type BlackCommentsBubbleSvgrepoComsvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function BlackCommentsBubbleSvgrepoComsvgIcon(
  props: BlackCommentsBubbleSvgrepoComsvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      version={"1.1"}
      x={"0"}
      y={"0"}
      xmlSpace={"preserve"}
      viewBox={"0 0 28 28"}
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
          "M28 12.195c0 5.299-6.268 9.594-14 9.594-.16 0-.316-.013-.475-.017-4.553 4.238-10.887 3.591-10.887 3.591 3.275-.674 4.743-2.488 5.287-4.535C3.239 19.277 0 16 0 12.195c0-5.298 6.268-9.594 14-9.594 7.732.002 14 4.296 14 9.594z"
        }
      ></path>
    </svg>
  );
}

export default BlackCommentsBubbleSvgrepoComsvgIcon;
/* prettier-ignore-end */
