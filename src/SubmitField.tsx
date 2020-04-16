import React from 'react';
import { IonButton } from '@ionic/react';
import { useForm, filterDOMProps } from 'uniforms/es5';

export type SubmitFieldProps = {
  inputRef: undefined;
  name: string;
  disabled: boolean;
} & HTMLButtonElement;

function SubmitField({
  disabled,
  inputRef,
  value,
  ...props
}: SubmitFieldProps) {
  const { error, state } = useForm();

  return (
    // @ts-ignore
    <div {...filterDOMProps(props)}>
      <IonButton
        disabled={
          disabled === undefined ? !!(error || state.disabled) : disabled
        }
        type="submit"
        ref={inputRef}
        color="primary"
      >
        {value}
      </IonButton>
    </div>
  )
} 

SubmitField.defaultProps = { value: 'Submit' };

export default SubmitField;
