import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { removeOutline } from 'ionicons/icons';
import { useField, filterDOMProps, joinName } from 'uniforms/es5';
import { IonicReactProps } from '@ionic/react/dist/types/components/IonicReactProps';

export type ListDelFieldProps = {
  name: string;
  parent?: any;
  value?: unknown;
  disabled?: boolean;
} & IonicReactProps;

function ListDel({ name, disabled, ...props }: ListDelFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const limitNotReached =
    !disabled && !(parent.minCount! >= parent.value!.length);

  return (
    <IonButton
      disabled={!limitNotReached || disabled}
      fill="clear"
      style={{ paddingLeft: '0', paddingRight: '0'}}
      onClick={() => {
        const value = parent.value!.slice();
        value.splice(nameIndex, 1);
        !disabled && limitNotReached && parent.onChange(value);
      }}
      {...filterDOMProps(props)}
    >
      <IonIcon icon={removeOutline} />
    </IonButton>
  );
}

export default ListDel;
