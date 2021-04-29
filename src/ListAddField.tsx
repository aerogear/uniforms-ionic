import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { IonButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useField, filterDOMProps, joinName } from 'uniforms/es5';
import { IonicReactProps } from '@ionic/react/dist/types/components/IonicReactProps';

export type ListAddFieldProps = {
  initialCount?: number;
  parent?: any;
  name: string;
  disabled?: boolean;
  value?: unknown;
} & IonicReactProps;

function ListAdd({
  disabled = false,
  name,
  value,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <IonButton
      fill="clear"
      style={{ paddingLeft: '0', paddingRight: '0'}}
      disabled={!limitNotReached || disabled}
      onClick={() => {
        !disabled &&
          limitNotReached &&
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
      }}
      {...filterDOMProps(props)}
    >
      <IonIcon icon={addOutline} />
    </IonButton>
  );
}

export default ListAdd;
