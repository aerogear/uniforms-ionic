import React from 'react';
import { IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import { connectField, filterDOMProps } from 'uniforms';

export type BoolFieldProps = {
  appearance?: 'checkbox' | 'switch';
  label?: string;
  legend?: string;
  onChange?: (value: any) => void;
  transform?: (label?: string) => string;
  disabled: boolean;
} & HTMLIonCheckboxElement;

const Bool = ({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  value,
  ...props
}) => {

  return (<IonItem {...filterDOMProps(props)}>
      <IonLabel>{label}</IonLabel>
      <IonCheckbox
        checked={!!value}
        disabled={disabled}
        id={id}
        name={name}
        // @ts-ignore
        onIonChange={(event) => onChange(event?.target.value)}
        ref={inputRef}
      />
    </IonItem>
  )
};

export default connectField(Bool);
