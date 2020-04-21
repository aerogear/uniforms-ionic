import React from 'react';
import { BoolField } from 'uniforms-ionic';
import { IonCheckbox, IonItem, IonLabel } from '@ionic/react';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';

import createContext from './_createContext';
import mount from './_mount';

test('<BoolField> - renders an input', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(IonCheckbox)).toHaveLength(1);
});

test('<BoolField> - renders a input with correct id (inherited)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(IonCheckbox)).toHaveLength(1);
  expect(wrapper.find(IonCheckbox).prop('id')).toBeTruthy();
});

test('<BoolField> - renders a input with correct id (specified)', () => {
  const element = <BoolField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(IonCheckbox)).toHaveLength(1);
  expect(wrapper.find(IonCheckbox).prop('id')).toBe('y');
});

test('<BoolField> - renders a input with correct name', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(IonCheckbox)).toHaveLength(1);
  expect(wrapper.find(IonCheckbox).prop('name')).toBe('x');
});

test('<BoolField> - renders an input with correct type', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(IonCheckbox)).toHaveLength(1);
});

test('<BoolField> - renders an input with correct disabled state', () => {
  const element = <BoolField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(IonCheckbox)).toHaveLength(1);
  expect(wrapper.find(IonCheckbox).prop('disabled')).toBe(true);
});

test('<BoolField> - renders a input with correct label (specified)', () => {
  const element = <BoolField name="x" label="BoolFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(IonLabel)).toHaveLength(1);
  expect(wrapper.find(IonLabel).text()).toBe('BoolFieldLabel');
});

test('<BoolField> - renders a input with correct value (default)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(IonCheckbox)).toHaveLength(1);
  expect(wrapper.find(IonCheckbox).prop('checked')).toBe(false);
});

test('<BoolField> - renders a input with correct value (model)', () => {
  const element = <BoolField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { model: { x: true } }),
  );

  expect(wrapper.find(IonCheckbox)).toHaveLength(1);
  expect(wrapper.find(IonCheckbox).prop('checked')).toBe(true);
});

test('<BoolField> - renders a input with correct value (specified)', () => {
  const element = <BoolField name="x" value />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(wrapper.find(IonCheckbox)).toHaveLength(1);
  expect(wrapper.find(IonCheckbox).prop('checked')).toBe(true);
});

test('<BoolField> - renders a input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <BoolField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { onChange }),
  );

  const input = wrapper.find(IonCheckbox);
  expect(input).toHaveLength(1);
  // @ts-ignore
  wrapper.find(IonCheckbox).prop('onIonChange')({ detail: { checked: true }});
  expect(onChange).toHaveBeenLastCalledWith('x', true);
});

test('<BoolField> - renders a input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <BoolField name="x" value={true} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Boolean } }, { onChange }),
  );

  const input = wrapper.find(IonCheckbox);
  expect(input).toHaveLength(1);
  // @ts-ignore
  wrapper.find(IonCheckbox).prop('onIonChange')({ detail: { checked: false }});
  expect(onChange).toHaveBeenLastCalledWith('x', false);
});

test('<BoolField> - renders a wrapper with unknown props', () => {
  const element = <BoolField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(element, createContext({ x: { type: Boolean } }));

  expect(
    wrapper
      .find(IonItem)
      .at(0)
      .prop('data-x'),
  ).toBe('x');
  expect(
    wrapper
      .find(IonItem)
      .at(0)
      .prop('data-y'),
  ).toBe('y');
  expect(
    wrapper
      .find(IonItem)
      .at(0)
      .prop('data-z'),
  ).toBe('z');
});
