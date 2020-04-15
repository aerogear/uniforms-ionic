import React, { Children, ReactNode } from 'react';
import { joinName } from 'uniforms';
import { IonItem } from '@ionic/react';

import AutoField from './AutoField';

export type ListItemFieldProps = {
  children?: ReactNode;
  name: string;
  labelCol?: string;
  label?: any;
  wrapperCol?: any;
};

export default function ListItemField(props: ListItemFieldProps) {
  return (
    <IonItem style={{ marginBottom: '1rem'}}>
      {props.children ? (
        Children.map(props.children as JSX.Element, child =>
          React.cloneElement(child, {
            name: joinName(props.name, child.props.name),
            label: null,
          }),
        )
      ) : (
        <AutoField {...props} />
      )}
    </IonItem>
  );
}