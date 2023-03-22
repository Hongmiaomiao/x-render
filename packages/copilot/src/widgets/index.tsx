import React, { ComponentType } from 'react';
import TwoPercent from './TwoPercent'

type Widgets = {
  [key: string]: any;
};

export function withWrap(Comp: ComponentType<any>) {
  return (props: any) => {
    const { addons, schema, globalProps, ...otherProps } = props;
    return <Comp {...otherProps} />;
  };
}


export const widgets: Widgets = {
	TwoPercent
};

export const defaultWidgetNameList = Object.keys(widgets);
