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

const Nest = ({
  children,
  error,
  errorMessage,
  fields,
  itemProps,
  label,
  name,
  showInlineError,
  ...props
}: NestFieldProps) => {

  return (
    // @ts-ignore
    <IonItem
      {...filterDOMProps(props)}
    >
      {label && <IonLabel>{label}</IonLabel>}
      {children
        ? injectName(name, children)
        : fields?.map(key => (
            <AutoField key={key} name={joinName(name, key)} {...itemProps} />
          ))}
    </IonItem>
  );
  
}

export default connectField(Nest, {
  includeInChain: false,
});
