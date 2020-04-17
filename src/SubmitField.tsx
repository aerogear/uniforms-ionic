import React from 'react';
import { IonButton } from '@ionic/react';
import { useForm, filterDOMProps } from 'uniforms/es5';

export type SubmitFieldProps = {
  inputRef: undefined;
  name: string;
  disabled: boolean;
} & HTMLButtonElement;

function SubmitField(props: SubmitFieldProps) {
  const { error, state } = useForm();
  return (
    // @ts-ignore
    <div {...filterDOMProps(props)}>
      <IonButton
        disabled={
          props.disabled === undefined ? !!(error || state.disabled) : props.disabled
        }
        type="submit"
        ref={props.inputRef}
        color="primary"
      >
        {props.value}
      </IonButton>
    </div>
  )
} 

SubmitField.defaultProps = { value: 'Submit' };

export default SubmitField;
