import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { filterDOMProps } from 'uniforms/es5';

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

function wrapField(props: WrapperProps, children) {
  return (
    <IonItem {...filterDOMProps(props)}>
      <IonLabel>{props.required ? `${props.label}*` : props.label}</IonLabel>
      {children}
    </IonItem>
  );
}

export default wrapField;
