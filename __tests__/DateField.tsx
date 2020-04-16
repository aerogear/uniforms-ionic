import React from 'react';
import { DateField } from 'uniforms-ionic';

import createContext from './_createContext';
import mount from './_mount';
import { IonDatetime, IonLabel, IonItem } from '@ionic/react';
import { act } from 'react-dom/test-utils';

test('<DateField> - renders an input', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
});

test('<DateField> - renders a input with correct id (inherited)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  expect(wrapper.find(IonDatetime).prop('id')).toBeTruthy();
});

test('<DateField> - renders a input with correct id (specified)', () => {
  const element = <DateField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  expect(wrapper.find(IonDatetime).prop('id')).toBe('y');
});

test('<DateField> - renders a input with correct name', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  expect(wrapper.find(IonDatetime).prop('name')).toBe('x');
});

test('<DateField> - renders an input with correct disabled state', () => {
  const element = <DateField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  expect(wrapper.find(IonDatetime).prop('disabled')).toBe(true);
});

test('<DateField> - renders a input with correct label (specified)', () => {
  const element = <DateField name="x" label="DateFieldLabel" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(IonLabel)).toHaveLength(1);
  expect(wrapper.find(IonLabel).text()).toBe('DateFieldLabel');
});

test('<DateField> - renders a input with correct value (default)', () => {
  const element = <DateField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  expect(wrapper.find(IonDatetime).prop('value')).toBe('');
});

test('<DateField> - renders a input with correct value (model)', () => {
  const now = new Date();
  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { model: { x: now } }),
  );

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  expect(wrapper.find(IonDatetime).prop('value')).toEqual(
    now.toISOString(),
  );
});

test('<DateField> - renders a input with correct value (specified)', () => {
  const now = new Date();
  const element = <DateField name="x" value={now} />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  expect(wrapper.find(IonDatetime).prop('value')).toEqual(
    now.toISOString(),
  );
});

test('<DateField> - renders a input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const now = new Date();
  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { onChange }),
  );

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  act(() => wrapper
    .find(IonDatetime)
    // @ts-ignore
    .prop('onIonChange')({ target: { value: now, valueAsNumber: now } })
  );
  expect(onChange).toHaveBeenLastCalledWith('x', now);
});

test('<DateField> - renders a input which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { onChange }),
  );

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  act(() => wrapper
    .find(IonDatetime)
    // @ts-ignore
    .prop('onIonChange')({ target: { value: undefined, valueAsNumber: undefined } })
  );
  expect(onChange).toHaveBeenLastCalledWith('x', undefined);
});

test('<DateField> - renders a input which correctly reacts on change (overflow)', () => {
  const onChange = jest.fn();

  const now = new Date(1e5, 0);
  const element = <DateField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: Date } }, { onChange }),
  );

  expect(wrapper.find(IonDatetime)).toHaveLength(1);
  act(() => wrapper
    .find(IonDatetime)
    // @ts-ignore
    .prop('onIonChange')({ target: { value: now, valueAsNumber: now } })
  );
  expect(onChange).not.toHaveBeenCalled();
});

test('<DateField> - renders a wrapper with unknown props', () => {
  const element = <DateField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(element, createContext({ x: { type: Date } }));

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
