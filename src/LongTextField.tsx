import React, { Ref } from 'react';
import { IonTextarea } from '@ionic/react';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

export type LongTextFieldProps = {
  onChange: (value: string) => void;
  inputRef?: Ref<HTMLIonTextareaElement>;
  value?: string;
  prefix?: string;
  placeholder?: string;
} & HTMLIonTextareaElement;

const LongText = (props: LongTextFieldProps) => (
  wrapField(
    props,
    <IonTextarea
      id={props.id}
      disabled={props.disabled}
      name={props.name}
      aria-label={props.name}
      // @ts-ignore
      onIonChange={(event) => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      value={props.value ?? ''}
    />
  )
);

export default connectField<LongTextFieldProps>(LongText);