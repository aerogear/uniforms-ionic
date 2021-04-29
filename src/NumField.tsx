import React, { Ref } from 'react';
import { IonInput } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { connectField } from 'uniforms/es5';

import wrapField from './wrapField';

export type NumFieldProps = {
  id: string;
  decimal?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value?: number) => void;
  disabled: boolean;
  readonly?: boolean;
  value?: number;
  error?: boolean;
  placeholder?: string;
} & HTMLIonInputElement;

function Num(props: NumFieldProps) {

  const onChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const parse = props.decimal ? parseFloat : parseInt;
    const v = parse((event.target as any).value);
    props.onChange(isNaN(v) ? undefined : v);
  }

  return wrapField(
    props,
    <IonInput
      name={props.name}
      disabled={props.disabled}
      readonly={props.readonly}
      id={props.id}
      max={props.max}
      min={props.min}
      onIonChange={onChange}
      placeholder={props.placeholder}
      step={props.decimal ? '0.01' : '1'}
      type="number"
      value={props.value ?? ''}
    />
  );
}

export default connectField(Num);
