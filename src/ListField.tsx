import React, { Children, cloneElement, HTMLProps, isValidElement, ReactNode } from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';
import { connectField, filterDOMProps, HTMLFieldProps, joinName } from 'uniforms/es5';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';
import { ListDelField } from '.';

// export type ListFieldProps<T> = {
//   value: T[];
//   children?: ReactNode;
//   addIcon?: any;
//   error?: boolean;
//   info?: boolean;
//   errorMessage?: string;
//   initialCount?: number;
//   itemProps?: {};
//   labelCol?: any;
//   label: string;
//   wrapperCol?: any;
//   name: string;
//   showInlineError?: boolean;
// } & Omit<HTMLProps<HTMLDivElement>, 'children' | 'name'>;
export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLDivElement,
  {
    children?: ReactNode;
    info?: string;
    error?: boolean;
    initialCount?: number;
    itemProps?: object;
    showInlineError?: boolean;
  }
>;

declare module 'uniforms' {
  interface FilterDOMProps {
    wrapperCol: never;
    labelCol: never;
  }
}

filterDOMProps.register('minCount', 'wrapperCol', 'labelCol');

function ListField({
  children = <ListItemField name="$" />,
  error,
  errorMessage,
  info,
  initialCount,
  itemProps,
  label,
  name,
  value,
  showInlineError,
  ...props
}: ListFieldProps) {
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
      {value?.map((item, itemIndex) =>
        Children.map(children, (child, childIndex) =>
          isValidElement(child)
            ? cloneElement(child, {
                key: `${itemIndex}-${childIndex}`,
                name: child.props.name?.replace('$', '' + itemIndex),
                ...itemProps  ,
              })
            : child
        )
      )}
      </div>
    </div>
  );
}

ListField.defaultProps = {
  value: []
}

export default connectField(ListField);
