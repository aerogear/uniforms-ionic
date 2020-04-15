import React, { Ref } from 'react';
import { IonInput } from '@ionic/react';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = value => value && value.toISOString().slice(0, -8);
const dateParse = (timestamp, onChange) => {
  const date = new DateConstructor(timestamp);
  if (date.getFullYear() < 10000) {
    onChange(date);
  } else if (isNaN(timestamp)) {
    onChange(undefined);
  }
};

export type DateFieldProps = {
  id: string;
  // inputRef?: Ref<HTMLInputElement>;
  onChange: (value?: string) => void;
  value?: string;
  disabled: boolean;
  error?: boolean;
  placeholder?: string;
} & HTMLIonInputElement;

function Date(props: DateFieldProps) {

  const onChange = (event) => {
    props.disabled || dateParse(event.target.valueAsNumber, props.onChange)
  }

  return wrapField(
    props,
    <IonInput
      disabled={props.disabled}
      id={props.id}
      max={dateFormat(props.max)}
      min={dateFormat(props.min)}
      name={props.name}
      onIonChange={onChange}
      placeholder={props.placeholder}
      // ref={props.inputRef}
      type="date"
      value={dateFormat(props.value) ?? ''}
    />,
  );
}

export default connectField(Date);
