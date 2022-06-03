// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: oYWp5DRpUvyyRAKjSJya8K
// Component: 9dcKxjGUEU
import * as React from 'react';

import * as p from '@plasmicapp/react-web';
import * as ph from '@plasmicapp/host';

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
  ensureGlobalVariants,
} from '@plasmicapp/react-web';
import Nav from '../../Nav'; // plasmic-import: 1NPCYKvqMbV/component
import Button from '../../Button'; // plasmic-import: S20px5CzyEuzZP/component

import '@plasmicapp/react-web/lib/plasmic.css';

import projectcss from '../influencer_campaign_page/plasmic_influencer_campaign_page.module.css'; // plasmic-import: oYWp5DRpUvyyRAKjSJya8K/projectcss
import sty from './PlasmicDayPass.module.css'; // plasmic-import: 9dcKxjGUEU/css

import ChecksvgIcon from '../influencer_campaign_page/icons/PlasmicIcon__Checksvg'; // plasmic-import: IradBadVvV69_r/icon

export type PlasmicDayPass__VariantMembers = {};

export type PlasmicDayPass__VariantsArgs = {};
type VariantPropType = keyof PlasmicDayPass__VariantsArgs;
export const PlasmicDayPass__VariantProps = new Array<VariantPropType>();

export type PlasmicDayPass__ArgsType = {};
type ArgPropType = keyof PlasmicDayPass__ArgsType;
export const PlasmicDayPass__ArgProps = new Array<ArgPropType>();

export type PlasmicDayPass__OverridesType = {
  root?: p.Flex<'div'>;
  nav?: p.Flex<typeof Nav>;
  buyButton?: p.Flex<typeof Button>;
  checkButton?: p.Flex<typeof Button>;
};

export interface DefaultDayPassProps {
  className?: string;
}

export const defaultDayPass__Args: Partial<PlasmicDayPass__ArgsType> = {};

function PlasmicDayPass__RenderFunc(props: {
  variants: PlasmicDayPass__VariantsArgs;
  args: PlasmicDayPass__ArgsType;
  overrides: PlasmicDayPass__OverridesType;

  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;
  const args = Object.assign({}, defaultDayPass__Args, props.args);
  const $props = args;

  return (
    <React.Fragment>
      {}
      {}

      <div className={projectcss.plasmic_page_wrapper}>
        <div
          data-plasmic-name={'root'}
          data-plasmic-override={overrides.root}
          data-plasmic-root={true}
          data-plasmic-for-node={forNode}
          className={classNames(
            projectcss.all,
            projectcss.root_reset,
            projectcss.plasmic_default_styles,
            projectcss.plasmic_mixins,
            projectcss.plasmic_tokens,
            sty.root
          )}
        >
          <Nav
            data-plasmic-name={'nav'}
            data-plasmic-override={overrides.nav}
            className={classNames('__wab_instance', sty.nav)}
          />

          <Button
            data-plasmic-name={'buyButton'}
            data-plasmic-override={overrides.buyButton}
            className={classNames('__wab_instance', sty.buyButton)}
            color={'blue' as const}
          >
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__fz7ER
              )}
            >
              {'BUY DAY PASS'}
            </div>
          </Button>

          <Button
            data-plasmic-name={'checkButton'}
            data-plasmic-override={overrides.checkButton}
            className={classNames('__wab_instance', sty.checkButton)}
            color={'blue' as const}
          >
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__slV4G
              )}
            >
              {'CHECK DAY PASS'}
            </div>
          </Button>
        </div>
      </div>
    </React.Fragment>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ['root', 'nav', 'buyButton', 'checkButton'],
  nav: ['nav'],
  buyButton: ['buyButton'],
  checkButton: ['checkButton'],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: 'div';
  nav: typeof Nav;
  buyButton: typeof Button;
  checkButton: typeof Button;
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicDayPass__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicDayPass__VariantsArgs;
    args?: PlasmicDayPass__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicDayPass__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicDayPass__ArgsType, ReservedPropsType> &
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
      internalArgPropNames: PlasmicDayPass__ArgProps,
      internalVariantPropNames: PlasmicDayPass__VariantProps,
    });

    return PlasmicDayPass__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicDayPass';
  } else {
    func.displayName = `PlasmicDayPass.${nodeName}`;
  }
  return func;
}

export const PlasmicDayPass = Object.assign(
  // Top-level PlasmicDayPass renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements
    nav: makeNodeComponent('nav'),
    buyButton: makeNodeComponent('buyButton'),
    checkButton: makeNodeComponent('checkButton'),

    // Metadata about props expected for PlasmicDayPass
    internalVariantProps: PlasmicDayPass__VariantProps,
    internalArgProps: PlasmicDayPass__ArgProps,
  }
);

export default PlasmicDayPass;
/* prettier-ignore-end */
