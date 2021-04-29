import React from 'react';
import { ListAddField } from 'uniforms-ionic';
import { IonButton } from '@ionic/react';

import createContext from './_createContext';
import mount from './_mount';
import { merge } from 'lodash';

const onChange = jest.fn();
const context = (schema?: {}) =>
  createContext(
    merge({ x: { type: Array, maxCount: 3 }, 'x.$': String }, schema),
    { onChange, model: { x: [] } },
  );

beforeEach(() => {
  onChange.mockClear();
});

test('<ListAddField> - works', () => {
  const element = <ListAddField name="x.$" parent={parent} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(ListAddField)).toHaveLength(1);
});

test('<ListAddField> - prevents onClick when disabled', () => {
  const onChange = jest.fn();

  const element = (
    <ListAddField
      name="x.1"
      disabled
      parent={Object.assign({}, parent, { onChange })}
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(IonButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListAddField> - prevents onClick when limit reached', () => {
  const onChange = jest.fn();

  const element = (
    <ListAddField
      name="x.1"
      parent={Object.assign({}, parent, { onChange, maxCount: 0 })}
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(IonButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListAddField> - correctly reacts on click', () => {
  const element = <ListAddField name="x.1" value="y" />;
  const wrapper = mount(element, context());

  expect(wrapper.find(IonButton).simulate('click')).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', ['y']);
});
