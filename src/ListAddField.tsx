import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { IonButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useField, filterDOMProps, joinName } from 'uniforms/es5';

export type ListAddFieldProps<T> = {
  initialCount?: number;
  parent?: any;
  name: string;
  disabled?: boolean;
  value?: T;
};

function ListAdd<T>(rawProps: ListAddFieldProps<T>) {
  const props = useField<ListAddFieldProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const nameParts = joinName(null, props.name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const limitNotReached =
    !props.disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    // @ts-ignore
    <IonButton
      fill="clear"
      style={{ paddingLeft: '0', paddingRight: '0'}}
      disabled={!limitNotReached || rawProps.disabled}
      onClick={() => {
        if (limitNotReached)
          parent.onChange(parent.value!.concat([cloneDeep(props.value!)]));
      }}
      {...filterDOMProps(props)}
    >
      <IonIcon icon={addOutline} />
    </IonButton>
  );
}

export default ListAdd;
