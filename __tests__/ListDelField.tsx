import React from 'react';
import { ListDelField } from 'uniforms-ionic';
import { IonButton } from '@ionic/react';

import createContext from './_createContext';
import mount from './_mount';
import { merge } from 'lodash';

const onChange = jest.fn();
const context = (schema?: {}) =>
  createContext(
    merge({ x: { type: Array, maxCount: 3 }, 'x.$': String }, schema),
    { onChange, model: { x: ['x', 'y', 'z'] } },
  );

beforeEach(() => {
  onChange.mockClear();
});

test('<ListDelField> - works', () => {
  const element = <ListDelField name="x.1" parent={parent} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(ListDelField)).toHaveLength(1);
});

test('<ListDelField> - prevents onClick when disabled', () => {
  const onChange = jest.fn();

  const element = (
    <ListDelField
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

test('<ListDelField> - prevents onClick when limit reached', () => {
  const onChange = jest.fn();

  const element = (
    <ListDelField
      name="x.1"
      parent={Object.assign({}, parent, { onChange, minCount: 3 })}
    />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: Array }, 'x.$': { type: String } }),
  );

  expect(wrapper.find(IonButton).simulate('click')).toBeTruthy();
  expect(onChange).not.toHaveBeenCalled();
});

test('<ListDelField> - correctly reacts on click', () => {
  const element = <ListDelField name="x.1" />;
 const wrapper = mount(element, context());

 expect(wrapper.find(IonButton).simulate('click')).toBeTruthy();
 expect(onChange).toHaveBeenLastCalledWith('x', ['x', 'z']);
});
