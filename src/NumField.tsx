import React, { Ref } from 'react';
import { IonInput } from '@ionic/react';
import { connectField } from 'uniforms/es5';

import wrapField from './wrapField';

export type NumFieldProps = {
  id: string;
  decimal?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value?: number) => void;
  disabled: boolean;
  value?: number;
  error?: boolean;
  placeholder?: string;
} & HTMLIonInputElement;

const Num = (props: NumFieldProps) => {

  const onChange = (event) => {
    const parse = props.decimal ? parseFloat : parseInt;
    const v = parse(event.target.value);
    // @ts-ignore
    props.onChange(isNaN(v) ? undefined : v);
  }

  return wrapField(
    props,
    <IonInput
      name={props.name}
      disabled={props.disabled}
      id={props.id}
      max={props.max}
      min={props.min}
      onIonChange={onChange}
      placeholder={props.placeholder}
      // ref={props.inputRef}
      step={props.decimal ? '0.01' : '1'}
      type="number"
      value={props.value ?? ''}
    />
  );
}

export default connectField(Num);
