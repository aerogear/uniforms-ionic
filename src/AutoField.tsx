import invariant from 'invariant';
import { ComponentType, createElement } from 'react';
import { useField } from 'uniforms';

import BoolField from './BoolField';
import DateField from './DateField';
import ListField from './ListField';
import NestField from './NestField';
import NumField from './NumField';
import RadioField from './RadioField';
import SelectField from './SelectField';
import TextField from './TextField';

export type AutoFieldProps = {
  component?: ComponentType<any>;
  name: string;
} & Record<string, unknown>;

export default function AutoField(originalProps: AutoFieldProps) {
  const props = useField(originalProps.name, originalProps)[0];
  const { allowedValues, checkboxes, fieldType } = props;
  let { component } = props;

  if (component === undefined) {
    if (allowedValues) {
      if (checkboxes && fieldType !== Array) {
        component = RadioField;
      } else {
        component = SelectField;
      }
    } else {
      switch (fieldType) {
        case Array:
          component = ListField;
          break;
        case Boolean:
          component = BoolField;
          break;
        case Date:
          component = DateField;
          break;
        case Number:
          component = NumField;
          break;
        case Object:
          component = NestField;
          break;
        case String:
          component = TextField;
          break;
      }

      invariant(component, 'Unsupported field type: %s', fieldType);
    }
  }

  // TODO: The flow along with the invariant above ensures its existence.
  return createElement(component!, originalProps);
}
