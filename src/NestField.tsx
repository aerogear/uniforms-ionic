import React, { HTMLProps, ReactPropTypes } from 'react';
import { connectField, filterDOMProps } from 'uniforms/es5';
import { IonItem, IonLabel } from '@ionic/react';

import AutoField from './AutoField';

export type NestFieldProps = {
  error?: boolean;
  errorMessage?: string;
  fields?: any[];
  itemProps?: object;
  showInlineError?: boolean;
  disabled?: boolean;
  name: string;
} & HTMLProps<HTMLDivElement>;

function Nest({
  children,
  error,
  errorMessage,
  fields,
  itemProps,
  label,
  name,
  showInlineError,
  disabled,
  ...props
}: NestFieldProps) {
  return (
    // @ts-ignore
    <IonItem
      {...filterDOMProps(props)}
    >
      {label && <IonLabel>{label}</IonLabel>}
      {
        children ||
        fields?.map((field: string) => (
          <AutoField
            key={field}
            name={field}
            disabled={disabled}
            {...itemProps}
          />
        ))
      }
    </IonItem>
  );
  
}

export default connectField(Nest);
