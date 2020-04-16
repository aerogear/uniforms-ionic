import React, { Ref } from 'react';
import { IonInput } from '@ionic/react';
import { connectField, filterDOMProps } from 'uniforms/es5';

import wrapField from './wrapField';

export type TextFieldProps = {
  id: string;
  decimal?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value?: string) => void;
  value?: string;
  placeholder?: string;
  disabled: boolean;
  error?: boolean;
} & HTMLIonInputElement;

const Text = (props: TextFieldProps) =>
  wrapField(
    props,
    <IonInput
      id={props.id}
      name={props.name}
      disabled={props.disabled}
      // @ts-ignore
      onIonChange={(event) => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      // ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
    />,
  );

export default connectField(Text);
