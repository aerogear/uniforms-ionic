import React, { HTMLProps } from 'react';
import { connectField, joinName, injectName, filterDOMProps } from 'uniforms/es5';
import { IonItem, IonLabel } from '@ionic/react';

import AutoField from './AutoField';

export type NestFieldProps = {
  error?: boolean;
  errorMessage?: string;
  fields?: any[];
  itemProps?: object;
  showInlineError?: boolean;
  name: string;
} & HTMLProps<HTMLDivElement>;

function Nest(props: NestFieldProps) {
  return (
    // @ts-ignore
    <IonItem
      {...filterDOMProps(props)}
    >
      {props.label && <IonLabel>{props.label}</IonLabel>}
      {props.children
        ? injectName(props.name, props.children)
        : props.fields?.map(key => (
            <AutoField key={key} name={joinName(props.name, key)} {...props.itemProps} />
          ))}
    </IonItem>
  );
  
}

export default connectField(Nest, {
  includeInChain: false,
});
