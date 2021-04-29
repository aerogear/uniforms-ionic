import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { filterDOMProps } from 'uniforms/es5';

declare module 'uniforms' {
  interface FilterDOMProps {
    decimal: never;
    minCount: never;
    autoValue: never;
    isDisabled: never;
    checkboxes: never;
    exclusiveMaximum: never;
    exclusiveMinimum: never;
  }
}

filterDOMProps.register('decimal', 'minCount', 'autoValue');

type WrapperProps = {
  id: string;
  error?: boolean;
  label?: string;
  errorMessage?: string;
  help?: string;
  showInlineError?: boolean;
  required?: boolean;
};

function wrapField(props: WrapperProps, children: React.ReactNode) {
  return (
    <IonItem {...filterDOMProps(props)}>
      <IonLabel>{props.required ? `${props.label}*` : props.label}</IonLabel>
      {children}
    </IonItem>
  );
}

export default wrapField;
