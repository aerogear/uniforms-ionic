import React from 'react';
import { IonButton } from '@ionic/react';
import { SubmitField } from 'uniforms-ionic';

import createContext from './_createContext';
import mount from './_mount';

test('<SubmitField> - renders', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext());

  expect(wrapper).toHaveLength(1);
});

test('<SubmitField> - renders disabled if error', () => {
  const element = <SubmitField />;
  const wrapper = mount(element, createContext(undefined, { error: {} }));

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find(IonButton).prop('disabled')).toBe(true);
});

test('<SubmitField> - renders enabled if error and enabled', () => {
  const element = <SubmitField disabled={false} />;
  const wrapper = mount(element, createContext(undefined, { error: {} }));

  expect(wrapper).toHaveLength(1);
  expect(wrapper.find(IonButton).prop('disabled')).toBe(false);
});
