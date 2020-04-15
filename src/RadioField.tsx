import React from 'react';
import { IonRadio, IonListHeader, IonLabel, IonItem, IonRadioGroup } from '@ionic/react';
import { connectField, filterDOMProps } from 'uniforms';

export type RadioFieldProps = {
  transform?: (string?: string) => string;
  allowedValues: string[];
  onChange: (string) => void;
  value?: string;
  disabled: boolean;
  label?: string;
  checked: boolean;
} & HTMLIonRadioElement;

const Radio = (props: RadioFieldProps) => {
  filterDOMProps.register('checkboxes', 'decimal', 'translate');
  // @ts-ignore
  return <IonRadioGroup {...filterDOMProps(props)} >
    {props.label && 
      <IonListHeader>
        <IonLabel>{props.label}</IonLabel>
      </IonListHeader>
    }
    {props.allowedValues.map(item => (
      <IonItem key={item}>
        <IonLabel>{props.transform ? props.transform(item) : item}</IonLabel>
        <IonRadio
          // @ts-ignore
          checked={item === props.value}
          disabled={props.disabled}
          id={`${props.id}`}
          name={props.name}
          // label={props.transform ? props.transform(item) : item}
          aria-label={props.name}
          onChange={() => props.onChange(item)}
        />
      </IonItem>
    ))}
  </IonRadioGroup>
}

export default connectField(Radio);
