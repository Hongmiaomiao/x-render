import FormRender, { widgets as defaultWidget } from 'form-render'
import { widgets as extralWidget } from './widgets'
import React from 'react';

// form-render
export type {
  default as FR,
  Schema,
  FRProps,
  FormInstance,
  FormParams,
  FieldParams,
  WatchProperties,
  SchemaType,
  SchemaBase,
  ValidateParams,
  ResetParams,
  RuleItem,
} from 'form-render'

// table-render
export type {
  TableRenderProps,
  ProColumnsType,
  SearchProps,
} from './table.type';

const FR = (props: any) => {
	const { widgets, ...rest } = props;
  return <FormRender widgets={{ ...extralWidget, ...widgets }} {...rest} />;
};

export const widgets = { ...defaultWidget, ...extralWidget };

export { mapping, useForm, connectForm, SearchForm } from 'form-render'

export { default as TableRender } from 'table-render'
export { default as ZaFormDrawer} from './components/ZaFormDrawer/index'


export default FR;
