import React from 'react';
import { IonCheckbox } from '@ionic/react';
import { connectField, FieldProps } from 'uniforms/es5';

import wrapField from './wrapField';

export type BoolFieldProps = FieldProps<
  boolean,
  HTMLIonCheckboxElement,
  {
    label?: string;
    transform?: (label?: string) => string;
    inputRef: React.RefObject<HTMLIonCheckboxElement> &
      React.RefObject<HTMLInputElement>;
  }
>;

function Bool(props: BoolFieldProps) {
  return wrapField(
    props,
    <IonCheckbox
      checked={!!props.value}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onIonChange={(event) => props.onChange(event?.detail.checked)}
    />
  );
};

export default connectField(Bool);
