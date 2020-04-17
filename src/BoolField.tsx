import React from 'react';
import { IonCheckbox } from '@ionic/react';
import { connectField } from 'uniforms/es5';

import wrapField from './wrapField';

export type BoolFieldProps = {
  label?: string;
  onChange?: (value: any) => void;
  transform?: (label?: string) => string;
  disabled: boolean;
} & HTMLIonCheckboxElement;

function Bool(props: BoolFieldProps) {
  return wrapField(
    props,
    <IonCheckbox
      checked={!!props.value}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      // @ts-ignore
      onIonChange={(event) => props.onChange(event?.target.value)}
    />
  );
};

export default connectField(Bool);
