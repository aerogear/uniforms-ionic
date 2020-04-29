import React, { Ref, useState } from 'react';
import { IonDatetime } from '@ionic/react';
import { connectField } from 'uniforms/es5';

import wrapField from './wrapField';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = value => value && value.toISOString();
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
  readonly?: boolean;
  error?: boolean;
  placeholder?: string;
} & HTMLIonDatetimeElement;

function DateField(props: DateFieldProps) {

  const [date, setDate] = useState<string>((dateFormat(props.value) ?? ''));
  const onChange = (event) => {
    setDate(event.detail.value);
    props.disabled || dateParse(event.detail.value, props.onChange)
  }

  return wrapField(
    props,
    <IonDatetime
      disabled={props.disabled}
      id={props.id}
      max={dateFormat(props.max)}
      min={dateFormat(props.min)}
      name={props.name}
      onIonChange={onChange}
      placeholder={props.placeholder}
      readonly={props.readonly}
      // ref={props.inputRef}
      value={date}
    />,
  );
}

export default connectField(DateField);
