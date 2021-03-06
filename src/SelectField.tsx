import React, { useState } from 'react';
import {
  IonCheckbox,
  IonRadio,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonListHeader,
  IonLabel,
  IonItem,
} from '@ionic/react';
import { connectField, filterDOMProps } from 'uniforms/es5';

import wrapField from './wrapField';

function xor<T>(item: T, array: T[]) {
  const index = array.indexOf(item);
  if (index === -1) {
    return array.concat([item]);
  }
  return array.slice(0, index).concat(array.slice(index + 1));
};

type CheckboxesProps = {
  fieldType?: typeof Array | any;
  onChange: (value?: string | string[]) => void;
  transform?: (value?: string) => string;
  allowedValues: string[];
  id: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  required: boolean;
} & (HTMLIonRadioElement | HTMLIonCheckboxElement);

filterDOMProps.register('autoValue');

function RenderCheckboxes(props: CheckboxesProps) {
  const Group = props.fieldType === Array ? IonCheckbox : IonRadio;
  
  return (
    // @ts-ignore
    <IonRadioGroup {...filterDOMProps(props)}>
      {props.label && 
        <IonListHeader>
          <IonLabel>
            {props.required ? `${props.label}*`: props.label}
          </IonLabel>
        </IonListHeader>
      }
      {props.allowedValues!.map((item: any, index: number) => {
        return (
          <IonItem key={index}>
            <IonLabel>{props.transform ? props.transform(item) : item}</IonLabel>
            <Group
              id={`${props.id}-${item}`}
              disabled={props.disabled}
              name={props.name}
              aria-label={props.name}
              value={props.value}
              placeholder={props.placeholder}
              checked={
                // @ts-ignore
                // eslint-disable-next-line
                props.fieldType === Array ? props.value!.includes(item) : props.value === item
              }
              onIonChange={() => {
                props.onChange(props.fieldType === Array ? xor(item, props.value) : item)
              }}
            />
          </IonItem>
        );
      })}
    </IonRadioGroup>
  );
}

type SelectInputProps = {
  required?: boolean;
  id: string;
  fieldType?: typeof Array | any;
  onChange: (value?: string | string[]) => void;
  placeholder: string;
  allowedValues?: string[];
  disabled?: boolean;
  error?: boolean;
  transform?: (value?: string) => string;
} & HTMLSelectElement;

function RenderSelect(props: SelectInputProps) {

  const selectedOptions = props.allowedValues!.map(value => (
    <IonSelectOption key={value} value={value}>
      {props.transform ? props.transform(value) : value}
    </IonSelectOption>
  ));

  return (
    wrapField(
      props,
      <IonSelect
        disabled={props.disabled}
        id={props.id}
        multiple={(props.fieldType === Array)}
        name={props.name}
        placeholder={props.placeholder}
        onIonChange={(event) => props.onChange(event.detail.value)}
        value={props.value}
      >
        { selectedOptions }
      </IonSelect>
    )
  );
}

export type SelectFieldProps = { checkboxes?: boolean } & (
  | CheckboxesProps
  | SelectInputProps
);

function SelectField({ checkboxes, ...props }: SelectFieldProps) {
  return checkboxes 
    ? RenderCheckboxes(props as CheckboxesProps)
    : RenderSelect(props as SelectInputProps);
}

// @ts-ignore
export default connectField(SelectField);
