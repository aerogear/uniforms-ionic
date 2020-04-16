import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { removeOutline } from 'ionicons/icons';
import { useField, filterDOMProps, joinName } from 'uniforms/es5';

export type ListDelFieldProps<T> = {
  name: string;
  parent?: any;
  value?: T;
  disabled?: boolean;
  onClick?: () => void;
};

function ListDel<T>(rawProps: ListDelFieldProps<T>) {
  const props = useField<ListDelFieldProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const nameParts = joinName(null, props.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const fieldIndex = +nameParts[nameParts.length - 1];
  const limitNotReached =
    !props.disabled && !(parent.minCount! >= parent.value!.length);

  return (
    // @ts-ignore
    <IonButton
      disabled={!limitNotReached || rawProps.disabled}
      fill="clear"
      style={{ paddingLeft: '0', paddingRight: '0'}}
      onClick={() => {
        if (limitNotReached) {
          const value = parent.value!.slice();
          value.splice(fieldIndex, 1);
          parent.onChange(value);
        }
      }}
      {...filterDOMProps(props)}
    >
      <IonIcon icon={removeOutline} />
    </IonButton>
  );
}

export default ListDel;
