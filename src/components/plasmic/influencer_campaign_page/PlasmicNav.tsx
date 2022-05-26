// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: oYWp5DRpUvyyRAKjSJya8K
// Component: 1NPCYKvqMbV
import * as React from "react";

import * as p from "@plasmicapp/react-web";
import * as ph from "@plasmicapp/host";

import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants
} from "@plasmicapp/react-web";
import Button from "../../Button"; // plasmic-import: S20px5CzyEuzZP/component

import { useScreenVariants as useScreenVariantse9M6Sv34SLfhdD } from "./PlasmicGlobalVariant__Screen"; // plasmic-import: E9M6Sv34sLfhdD/globalVariant

import "@plasmicapp/react-web/lib/plasmic.css";

import projectcss from "./plasmic_influencer_campaign_page.module.css"; // plasmic-import: oYWp5DRpUvyyRAKjSJya8K/projectcss
import sty from "./PlasmicNav.module.css"; // plasmic-import: 1NPCYKvqMbV/css

import ChecksvgIcon from "./icons/PlasmicIcon__Checksvg"; // plasmic-import: IradBadVvV69_r/icon
import image2MIhSelbVr from "./images/image2.png"; // plasmic-import: mIHSelbVr/picture

export type PlasmicNav__VariantMembers = {
  synced: "synced";
};

export type PlasmicNav__VariantsArgs = {
  synced?: SingleBooleanChoiceArg<"synced">;
};

type VariantPropType = keyof PlasmicNav__VariantsArgs;
export const PlasmicNav__VariantProps = new Array<VariantPropType>("synced");

export type PlasmicNav__ArgsType = {};
type ArgPropType = keyof PlasmicNav__ArgsType;
export const PlasmicNav__ArgProps = new Array<ArgPropType>();

export type PlasmicNav__OverridesType = {
  root?: p.Flex<"div">;
  freeBox?: p.Flex<"div">;
  link?: p.Flex<"a">;
  img?: p.Flex<typeof p.PlasmicImg>;
  spacer?: p.Flex<"div">;
  syncButton?: p.Flex<typeof Button>;
  text?: p.Flex<"div">;
  svg?: p.Flex<"svg">;
};

export interface DefaultNavProps {
  synced?: SingleBooleanChoiceArg<"synced">;
  className?: string;
}

export const defaultNav__Args: Partial<PlasmicNav__ArgsType> = {};

function PlasmicNav__RenderFunc(props: {
  variants: PlasmicNav__VariantsArgs;
  args: PlasmicNav__ArgsType;
  overrides: PlasmicNav__OverridesType;

  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;
  const args = Object.assign({}, defaultNav__Args, props.args);
  const $props = args;

  const globalVariants = ensureGlobalVariants({
    screen: useScreenVariantse9M6Sv34SLfhdD()
  });

  return (
    <p.Stack
      as={"div"}
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      hasGap={true}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        sty.root,
        { [sty.rootsynced]: hasVariant(variants, "synced", "synced") }
      )}
    >
      <p.Stack
        as={"div"}
        data-plasmic-name={"freeBox"}
        data-plasmic-override={overrides.freeBox}
        hasGap={true}
        className={classNames(projectcss.all, sty.freeBox)}
      >
        <a
          data-plasmic-name={"link"}
          data-plasmic-override={overrides.link}
          className={classNames(projectcss.all, projectcss.a, sty.link)}
          href={"/" as const}
        >
          <p.PlasmicImg
            data-plasmic-name={"img"}
            data-plasmic-override={overrides.img}
            alt={""}
            className={classNames(sty.img)}
            displayHeight={"auto" as const}
            displayMaxHeight={"none" as const}
            displayMaxWidth={"100%" as const}
            displayMinHeight={"0" as const}
            displayMinWidth={"0" as const}
            displayWidth={"77px" as const}
            loading={"lazy" as const}
            src={{
              src: image2MIhSelbVr,
              fullWidth: 75,
              fullHeight: 75,
              aspectRatio: undefined
            }}
          />
        </a>

        {(hasVariant(globalVariants, "screen", "mobileOnly") ? true : true) ? (
          <div
            data-plasmic-name={"spacer"}
            data-plasmic-override={overrides.spacer}
            className={classNames(projectcss.all, sty.spacer)}
          />
        ) : null}
        {true ? (
          <Button
            className={classNames("__wab_instance", sty.button__rTYny)}
            color={"blue" as const}
            link={"/about" as const}
          >
            {"About"}
          </Button>
        ) : null}
        {true ? (
          <Button
            className={classNames("__wab_instance", sty.button__ynUuJ)}
            color={"blue" as const}
            link={"/day-pass" as const}
          >
            {"Buy day pass"}
          </Button>
        ) : null}
        {(hasVariant(globalVariants, "screen", "mobileOnly") ? true : true) ? (
          <Button
            className={classNames("__wab_instance", sty.button__vEbLh)}
            color={"blue" as const}
            link={"/items" as const}
          >
            {"items"}
          </Button>
        ) : null}
        {(hasVariant(globalVariants, "screen", "mobileOnly") ? true : true) ? (
          <Button
            className={classNames("__wab_instance", sty.button__fqR2T)}
            color={"blue" as const}
            link={"/missions" as const}
          >
            {"missions"}
          </Button>
        ) : null}
        {(
          hasVariant(variants, "synced", "synced") &&
          hasVariant(globalVariants, "screen", "mobileOnly")
            ? true
            : hasVariant(variants, "synced", "synced")
            ? true
            : false
        ) ? (
          <Button
            className={classNames("__wab_instance", sty.button__cthf9, {
              [sty.buttonsynced__cthf9R2Qli]: hasVariant(
                variants,
                "synced",
                "synced"
              )
            })}
            color={"blue" as const}
          >
            {"Your Player"}
          </Button>
        ) : null}
        {(
          hasVariant(variants, "synced", "synced") &&
          hasVariant(globalVariants, "screen", "mobileOnly")
            ? true
            : hasVariant(variants, "synced", "synced")
            ? true
            : false
        ) ? (
          <Button
            className={classNames("__wab_instance", sty.button__av88F, {
              [sty.buttonsynced__av88Fr2Qli]: hasVariant(
                variants,
                "synced",
                "synced"
              )
            })}
            color={"red" as const}
            link={"/play" as const}
          >
            {"PLAY"}
          </Button>
        ) : null}
        {(hasVariant(globalVariants, "screen", "mobileOnly") ? true : true) ? (
          <Button
            data-plasmic-name={"syncButton"}
            data-plasmic-override={overrides.syncButton}
            className={classNames("__wab_instance", sty.syncButton)}
            color={"blue" as const}
            endIcon={
              <ChecksvgIcon
                data-plasmic-name={"svg"}
                data-plasmic-override={overrides.svg}
                className={classNames(projectcss.all, sty.svg)}
                role={"img"}
              />
            }
          >
            <div
              data-plasmic-name={"text"}
              data-plasmic-override={overrides.text}
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text,
                { [sty.textsynced]: hasVariant(variants, "synced", "synced") }
              )}
            >
              {hasVariant(variants, "synced", "synced") ? "unSync" : "Sync"}
            </div>
          </Button>
        ) : null}
      </p.Stack>
    </p.Stack>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: [
    "root",
    "freeBox",
    "link",
    "img",
    "spacer",
    "syncButton",
    "text",
    "svg"
  ],
  freeBox: ["freeBox", "link", "img", "spacer", "syncButton", "text", "svg"],
  link: ["link", "img"],
  img: ["img"],
  spacer: ["spacer"],
  syncButton: ["syncButton", "text", "svg"],
  text: ["text"],
  svg: ["svg"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: "div";
  freeBox: "div";
  link: "a";
  img: typeof p.PlasmicImg;
  spacer: "div";
  syncButton: typeof Button;
  text: "div";
  svg: "svg";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicNav__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicNav__VariantsArgs;
    args?: PlasmicNav__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicNav__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicNav__ArgsType, ReservedPropsType> &
    // Specify overrides for each element directly as props
    Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    // Specify props for the root element
    Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicNav__ArgProps,
      internalVariantPropNames: PlasmicNav__VariantProps
    });

    return PlasmicNav__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicNav";
  } else {
    func.displayName = `PlasmicNav.${nodeName}`;
  }
  return func;
}

export const PlasmicNav = Object.assign(
  // Top-level PlasmicNav renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    freeBox: makeNodeComponent("freeBox"),
    link: makeNodeComponent("link"),
    img: makeNodeComponent("img"),
    spacer: makeNodeComponent("spacer"),
    syncButton: makeNodeComponent("syncButton"),
    text: makeNodeComponent("text"),
    svg: makeNodeComponent("svg"),

    // Metadata about props expected for PlasmicNav
    internalVariantProps: PlasmicNav__VariantProps,
    internalArgProps: PlasmicNav__ArgProps
  }
);

export default PlasmicNav;
/* prettier-ignore-end */
