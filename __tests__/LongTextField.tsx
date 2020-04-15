import React from 'react';
import { LongTextField } from 'uniforms-ionic';

import createContext from './_createContext';
import mount from './_mount';
import { IonTextarea, IonLabel, IonInput, IonItem } from '@ionic/react';

test('<LongTextField> - renders a textarea', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
});

test('<LongTextField> - renders a textarea with correct disabled state', () => {
  const element = <LongTextField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  expect(wrapper.find(IonTextarea).prop('disabled')).toBe(true);
});

test('<LongTextField> - renders a textarea with correct id (inherited)', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  expect(wrapper.find(IonTextarea).prop('id')).toBeTruthy();
});

test('<LongTextField> - renders a textarea with correct id (specified)', () => {
  const element = <LongTextField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  expect(wrapper.find(IonTextarea).prop('id')).toBe('y');
});

test('<LongTextField> - renders a textarea with correct name', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  expect(wrapper.find(IonTextarea).prop('name')).toBe('x');
});

test('<LongTextField> - renders a textarea with correct placeholder', () => {
  const element = <LongTextField name="x" placeholder="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  expect(wrapper.find(IonTextarea).prop('placeholder')).toBe('y');
});

test('<LongTextField> - renders a textarea with correct value (default)', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  expect(wrapper.find(IonTextarea).prop('value')).toBe('');
});

test('<LongTextField> - renders a textarea with correct value (model)', () => {
  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' } }),
  );

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  expect(wrapper.find(IonTextarea).prop('value')).toBe('y');
});

test('<LongTextField> - renders a textarea with correct value (specified)', () => {
  const element = <LongTextField name="x" value="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  expect(wrapper.find(IonTextarea).prop('value')).toBe('y');
});

test('<LongTextField> - renders a textarea which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  // @ts-ignore
  wrapper.find(IonTextarea).prop('onIonChange')({ target: { value: 'y' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<LongTextField> - renders a textarea which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  // @ts-ignore
  wrapper.find(IonTextarea).prop('onIonChange')({ target: { value: '' } });
  expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<LongTextField> - renders a textarea which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <LongTextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' }, onChange }),
  );

  expect(wrapper.find(IonTextarea)).toHaveLength(1);
  // @ts-ignore
  wrapper.find(IonTextarea).prop('onIonChange')({ target: { value: 'y' } });
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<LongTextField> - renders a label', () => {
  const element = <LongTextField name="x" label="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find(IonLabel)).toHaveLength(1);
  expect(wrapper.find(IonLabel).text()).toBe('y');
});

test('<LongTextField> - renders a wrapper with unknown props', () => {
  const element = <LongTextField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

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
