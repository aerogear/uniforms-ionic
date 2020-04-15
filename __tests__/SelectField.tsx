import React from 'react';
import { IonSelect, IonRadio, IonRadioGroup, IonCheckbox } from '@ionic/react';
import { act } from '@testing-library/react';
import { SelectField } from 'uniforms-ionic';

import createContext from './_createContext';
import mount from './_mount';
import { IonLabel, IonItem } from '@ionic/react';

test('<SelectField> - renders a select', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
});

test('<SelectField> - renders a select with correct disabled state', () => {
  const element = <SelectField name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('disabled')).toBe(true);
});

test('<SelectField> - renders a select with correct id (inherited)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('id')).toBeTruthy();
});

test('<SelectField> - renders a select with correct id (specified)', () => {
  const element = <SelectField name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('id')).toBe('y');
});

test('<SelectField> - renders a select with correct name', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('name')).toBe('x');
});

test('<SelectField> - renders a select with correct options', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('children')).toHaveLength(2);
  expect(wrapper.find(IonSelect).prop('children')[0].props.value).toBe('a');
  expect(wrapper.find(IonSelect).prop('children')[0].props.children).toBe('a');
  expect(wrapper.find(IonSelect).prop('children')[1].props.value).toBe('b');
  expect(wrapper.find(IonSelect).prop('children')[1].props.children).toBe('b');
});

test('<SelectField> - renders a select with correct options (transform)', () => {
  const element = <SelectField name="x" transform={x => x.toUpperCase()} />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('children')).toHaveLength(2);
  expect(wrapper.find(IonSelect).prop('children')[0].props.value).toBe('a');
  expect(wrapper.find(IonSelect).prop('children')[0].props.children).toBe('A');
  expect(wrapper.find(IonSelect).prop('children')[1].props.value).toBe('b');
  expect(wrapper.find(IonSelect).prop('children')[1].props.children).toBe('B');
});

test('<SelectField> - renders a select with correct placeholder (implicit)', () => {
  const element = <SelectField name="x" placeholder="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('placeholder')).toBe('y');
  expect(wrapper.find(IonSelect).prop('value')).toBe(undefined);
});

test('<SelectField> - renders a select with correct value (default)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('value')).toBe(undefined);
});

test('<SelectField> - renders a select with correct value (model)', () => {
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' } },
    ),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('value')).toBe('b');
});

test('<SelectField> - renders a select with correct value (specified)', () => {
  const element = <SelectField name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(wrapper.find(IonSelect).prop('value')).toBe('b');
});

test('<SelectField> - renders a select which correctly reacts on change', () => {
  const onChange = jest.fn();
  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  act(() => {
    const changeEvent = wrapper.find(IonSelect).prop('onIonChange')({ target: { value: 'b' } });
    expect(changeEvent).toBeFalsy();
  })

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a select which correctly reacts on change (array)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" value={undefined} />;
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array },
        'x.$': { type: String, allowedValues: ['a', 'b'] },
      },
      { onChange },
    ),
  );
  
  act(() => {
    const changeEvent = wrapper.find(IonSelect).prop('onIonChange')({ target: { value: 'b' } });
    expect(changeEvent).toBeFalsy();
  });

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField> - renders a select which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  act(() => {
    const changeEvent = wrapper.find(IonSelect).prop('onIonChange')({ target: { value: '' }});
    expect(changeEvent).toBeFalsy();
  });

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<SelectField> - renders a select which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <SelectField name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' }, onChange },
    ),
  );

  act(() => {
    const changeEvent = wrapper.find(IonSelect).prop('onIonChange')({ target: { value: 'b' } });
    expect(changeEvent).toBeFalsy();
  });

  expect(wrapper.find(IonSelect)).toHaveLength(1);
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField> - renders a label', () => {
  const element = <SelectField name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonLabel)).toHaveLength(1);
  expect(wrapper.find(IonLabel).text()).toBe('y');
});

test('<SelectField> - renders a wrapper with unknown props', () => {
  const element = <SelectField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

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

test('<SelectField checkboxes> - renders a set of checkboxes', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct disabled state', () => {
  const element = <SelectField checkboxes name="x" disabled />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
  expect(
    wrapper
      .find(IonRadio)
      .at(0)
      .prop('disabled'),
  ).toBe(true);
  expect(
    wrapper
      .find(IonRadio)
      .at(1)
      .prop('disabled'),
  ).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct id (inherited)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
  expect(
    wrapper
      .find(IonRadio)
      .at(0)
      .prop('id'),
  ).toBeTruthy();
  expect(
    wrapper
      .find(IonRadio)
      .at(1)
      .prop('id'),
  ).toBeTruthy();
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct id (specified)', () => {
  const element = <SelectField checkboxes name="x" id="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
  expect(
    wrapper
      .find(IonRadio)
      .at(0)
      .prop('id'),
  ).toBe('y-a');
  expect(
    wrapper
      .find(IonRadio)
      .at(1)
      .prop('id'),
  ).toBe('y-b');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct name', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
  expect(
    wrapper
      .find(IonRadio)
      .at(0)
      .prop('name'),
  ).toBe('x');
  expect(
    wrapper
      .find(IonRadio)
      .at(1)
      .prop('name'),
  ).toBe('x');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct options', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonLabel)).toHaveLength(2);
  expect(
    wrapper
      .find(IonLabel)
      .at(0)
      .text(),
  ).toBe('a');
  expect(
    wrapper
      .find(IonLabel)
      .at(1)
      .text(),
  ).toBe('b');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct options (transform)', () => {
  const element = (
    <SelectField checkboxes name="x" transform={x => x.toUpperCase()} />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonLabel)).toHaveLength(2);
  expect(
    wrapper
      .find(IonLabel)
      .at(0)
      .text(),
  ).toBe('A');
  expect(
    wrapper
      .find(IonLabel)
      .at(1)
      .text(),
  ).toBe('B');
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (default)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
  expect(
    wrapper
      .find(IonRadio)
      .at(0)
      .prop('checked'),
  ).toBe(false);
  expect(
    wrapper
      .find(IonRadio)
      .at(1)
      .prop('checked'),
  ).toBe(false);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (model)', () => {
  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' } },
    ),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
  expect(
    wrapper
      .find(IonRadio)
      .at(0)
      .prop('checked'),
  ).toBe(false);
  expect(
    wrapper
      .find(IonRadio)
      .at(1)
      .prop('checked'),
  ).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes with correct value (specified)', () => {
  const element = <SelectField checkboxes name="x" value="b" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
  expect(
    wrapper
      .find(IonRadio)
      .at(0)
      .prop('checked'),
  ).toBe(false);
  expect(
    wrapper
      .find(IonRadio)
      .at(1)
      .prop('checked'),
  ).toBe(true);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { onChange },
    ),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
  wrapper
    .find(IonRadio)
    .at(1)
    .prop('onIonChange')({})
  expect(onChange).toHaveBeenLastCalledWith('x', 'b');
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array check)', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array },
        'x.$': { type: String, allowedValues: ['a', 'b'] },
      },
      { onChange },
    ),
  );

  expect(wrapper.find(IonCheckbox)).toHaveLength(2);
  wrapper
    .find(IonCheckbox)
    .at(1)
    .prop('onIonChange')({})
  expect(onChange).toHaveBeenLastCalledWith('x', ['b']);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (array uncheck)', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" value={['b']} />;
  const wrapper = mount(
    element,
    createContext(
      {
        x: { type: Array },
        'x.$': { type: String, allowedValues: ['a', 'b'] },
      },
      { onChange },
    ),
  );

  expect(wrapper.find(IonCheckbox)).toHaveLength(2);
  wrapper
    .find(IonCheckbox)
    .at(1)
    .prop('onIonChange')({});
  expect(onChange).toHaveBeenLastCalledWith('x', []);
});

test('<SelectField checkboxes> - renders a set of checkboxes which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <SelectField checkboxes name="x" />;
  const wrapper = mount(
    element,
    createContext(
      { x: { type: String, allowedValues: ['a', 'b'] } },
      { model: { x: 'b' }, onChange },
    ),
  );

  expect(wrapper.find(IonRadio)).toHaveLength(2);
  wrapper
    .find(IonRadio)
    .at(0)
    .prop('onIonChange')({});
  expect(onChange).toHaveBeenLastCalledWith('x', 'a');
});

test('<SelectField checkboxes> - renders a label', () => {
  const element = <SelectField checkboxes name="x" label="y" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(wrapper.find(IonLabel)).toHaveLength(3);
  expect(
    wrapper
      .find(IonLabel)
      .at(0)
      .text(),
  ).toBe('y');
});

test('<SelectField checkboxes> - renders a wrapper with unknown props', () => {
  const element = (
    <SelectField checkboxes name="x" data-x="x" data-y="y" data-z="z" />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, allowedValues: ['a', 'b'] } }),
  );

  expect(
    wrapper
      .find(IonRadioGroup)
      .at(0)
      .prop('data-x'),
  ).toBe('x');
  expect(
    wrapper
      .find(IonRadioGroup)
      .at(0)
      .prop('data-y'),
  ).toBe('y');
  expect(
    wrapper
      .find(IonRadioGroup)
      .at(0)
      .prop('data-z'),
  ).toBe('z');
});
