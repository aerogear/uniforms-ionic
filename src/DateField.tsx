import React from 'react';
import { IonDatetime } from '@ionic/react';
import { DatetimeChangeEventDetail } from '@ionic/core';
import { connectField, FieldProps } from 'uniforms/es5';

import wrapField from './wrapField';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = (value?: string) => {
  if(value){
   return new Date(value).toISOString();   
  }
  
  return undefined
}
const dateParse = (timestamp: number, onChange: DateFieldProps['onChange']) => {
  const date = new DateConstructor(timestamp);
  if (date.getFullYear() < 10000) {
    onChange(date);
  } else if (isNaN(timestamp)) {
    onChange(undefined);
  }
};

// export type DateFieldProps = {
//   id: string; 
//   onChange: (value?: Date) => void;
//   value?: string;
//   disabled: boolean;
//   readonly?: boolean;
//   error?: boolean;
//   placeholder?: string;
// } & HTMLIonDatetimeElement;
export type DateFieldProps = FieldProps<
  Date,
  HTMLIonDatetimeElement,
  {
    inputRef: React.RefObject<HTMLInputElement>;
    max?: string;
    min?: string;
    value?: string;
    label?: string;
    onChange: (value?: string) => void;
  }
>;

function DateField(props: DateFieldProps) {

  const onChange = (event: CustomEvent<DatetimeChangeEventDetail>) => props.disabled ||
  dateParse((event.detail.value as any), props.onChange)

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
      value={dateFormat(props.value) ?? ''}
    />,
  );
}

export default connectField(DateField);
