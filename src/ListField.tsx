import React, { Children, HTMLProps, ReactNode } from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';
import { connectField, filterDOMProps, joinName } from 'uniforms/es5';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';
import { ListDelField } from '.';

export type ListFieldProps<T> = {
  value: T[];
  children?: ReactNode;
  addIcon?: any;
  error?: boolean;
  info?: boolean;
  errorMessage?: string;
  initialCount?: number;
  itemProps?: {};
  labelCol?: any;
  label: string;
  wrapperCol?: any;
  name: string;
  showInlineError?: boolean;
} & Omit<HTMLProps<HTMLDivElement>, 'children' | 'name'>;

filterDOMProps.register('minCount');

function ListField<T>({
  children,
  error,
  errorMessage,
  info,
  initialCount,
  itemProps,
  label,
  labelCol,
  name,
  showInlineError,
  value,
  wrapperCol,
  ...props
}: ListFieldProps<T>) {
  return (
    <div {...filterDOMProps(props)}>
      <IonItem style={{ padding: 0 }}>
        {label && (
          <IonLabel>
            {label}
          </IonLabel>
        )}
        {/* Visual hack for padding */}
        <IonInput disabled />
        <ListAddField name={`${name}.$`} initialCount={initialCount} />{' '}
        <ListDelField name={`${name}.$`} />
      </IonItem>

      <div>
        {children
          ? value.map((item: any, index: number) =>
              Children.map(children as JSX.Element, child =>
                React.cloneElement(child, {
                  key: index,
                  label: '',
                  name: joinName(
                    name,
                    child.props.name && child.props.name.replace('$', index),
                  ),
                }),
              ),
            )
          : value.map((item: any, index: number) => (
              <ListItemField
                key={index}
                label={null}
                name={joinName(name, index)}
                {...itemProps}
              />
            ))}
      </div>
    </div>
  );
}

ListField.defaultProps = {
  value: []
}

// @ts-ignore
export default connectField(ListField, {
  includeInChain: false,
});
