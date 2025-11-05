/* ======================================================================== *
 * Copyright 2025 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
// External imports
import { $, expect } from '@wdio/globals';
import { html, render } from 'lit';

// Component imports
import '../../../components/ac/dx-switch';

// Helper imports
import { initSessionStorage } from '../../utils';

describe('DxSwitch component testing', () => {
  before(async () => {
    await initSessionStorage();
    if (document.body.firstElementChild) {
      document.body.removeChild(document.body.firstElementChild);
    }
  });

  afterEach(() => {
    if (document.body.firstElementChild) {
      document.body.removeChild(document.body.firstElementChild);
    }
  });

  it('DxSwitch - should render without crashing', async () => {
    let component = document.createElement('dx-switch');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    component.remove();
  });

  it('DxSwitch - removes component from document body and validates removal', async () => {
    let component = document.createElement('dx-switch');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxSwitch - validate default value of attributes', async () => {
    let component = document.createElement('dx-switch');
    document.body.appendChild(component);
    await expect(component).toHaveElementProperty('isChecked', false);
    await expect(component).toHaveElementProperty('isDisabled', false);
    component.remove();
  });

  it('DxSwitch - should render dx-switch with label and input child element', async () => {
    render(
      html`
        <dx-switch id="dx-switch"/>
      `,
      document.body
    );
    let component = await $('dx-switch').getElement();
    await expect(component).toBeDisplayed();
    await expect(component).toHaveElementProperty('id', 'dx-switch');
    let labelElement = await component.$('>>>label[data-testid="dx-switch-label"]').getElement();
    await expect(labelElement).toHaveAttribute('tabindex', '0');
    let inputElement = await component.$('>>>input[data-testid="dx-switch-input"]').getElement();
    await expect(inputElement).toHaveElementProperty('type', 'checkbox');
  });

  it('DxSwitch - should render dx-switch with checked state and validate css', async () => {
    render(
      html`
        <dx-switch ?isChecked=${true}></dx-switch>
      `,
      document.body
    );
    let component = await $('dx-switch').getElement();
    await expect(component).toBeDisplayed();
    await expect(component).toHaveElementProperty('isChecked', true);
    await expect(component).toHaveElementProperty('isDisabled', false);
    let labelElement = await component.$('>>>label[data-testid="dx-switch-label"]').getElement();
    await expect(labelElement).toHaveAttribute('tabindex', '0');
    await expect(labelElement).toHaveAttribute('part', 'switch-label');
    let inputElement = await component.$('>>>input[data-testid="dx-switch-input"]').getElement();
    await expect(inputElement).toHaveAttribute('tabindex', '-1');
    await expect(inputElement).toHaveAttribute('part', 'switch-input');
    await expect(inputElement).toHaveAttribute('type', 'checkbox');
    const inputColor = await inputElement.getCSSProperty('color');
    await expect(inputColor.value).toBe('rgba(0,0,0,1)');
    let spanElement = await component.$('>>>span[data-testid="dx-switch-span"]').getElement();
    await expect(spanElement).toHaveAttribute('part', 'switch-slider-checked');
  });

  it('DxSwitch - should render dx-switch with disabled state and validate css', async () => {
    render(
      html`
        <dx-switch ?isDisabled=${true}></dx-switch>
      `,
      document.body
    );
    let component = await $('dx-switch').getElement();
    await expect(component).toBeDisplayed();
    await expect(component).toHaveElementProperty('isChecked', false);
    await expect(component).toHaveElementProperty('isDisabled', true);
    let labelElement = await component.$('>>>label[data-testid="dx-switch-label"]').getElement();
    await expect(labelElement).toHaveAttribute('tabindex', '-1');
    await expect(labelElement).toHaveAttribute('part', 'switch-label-disabled');
    let inputElement = await component.$('>>>input[data-testid="dx-switch-input"]').getElement();
    await expect(inputElement).toHaveAttribute('tabindex', '-1');
    await expect(inputElement).toHaveAttribute('part', 'switch-input');
    await expect(inputElement).toHaveAttribute('type', 'checkbox');
    const inputColor = await inputElement.getCSSProperty('color');
    await expect(inputColor.value).toBe('rgba(84,84,84,1)');
    let spanElement = await component.$('>>>span[data-testid="dx-switch-span"]').getElement();
    await expect(spanElement).toHaveAttribute('part', 'switch-slider-disabled');
  });

  it('DxSwitch - should be able to check and uncheck switch component', async () => {
    render(
      html`
        <dx-switch ?isChecked=${false}></dx-switch>
      `,
      document.body
    );
    let component = await $('dx-switch').getElement();
    await expect(component).toBeDisplayed();
    await expect(component).toHaveElementProperty('isChecked', false);
    await expect(component).toHaveElementProperty('isDisabled', false);
    let labelElement = await component.$('>>>label[data-testid="dx-switch-label"]').getElement();
    let inputElement = await component.$('>>>input[data-testid="dx-switch-input"]').getElement();
    await expect(inputElement).toHaveElementProperty('checked', false); // By default switch is not checked
    labelElement.click();
    await expect(inputElement).toHaveElementProperty('checked', true); // After clicking switch must be checked
    labelElement.click();
    await expect(inputElement).toHaveElementProperty('checked', false); // After clicking once again switch must be unchecked
  });
  it('DxSwitch - should render switch with checked and disabled state and validate part attribute', async () => {
    render(
      html`
        <dx-switch ?isChecked=${true} ?isDisabled=${true}></dx-switch>
      `,
      document.body
    );
    let component = await $('dx-switch').getElement();
    await expect(component).toBeDisplayed();
    await expect(component).toHaveElementProperty('isChecked', true);
    await expect(component).toHaveElementProperty('isDisabled', true);
  
    let spanElement = await component.$('>>>span[data-testid="dx-switch-span"]').getElement();
    await expect(spanElement).toHaveAttribute('part', 'switch-slider-checked-disabled');
  });
  it('DxSwitch - should return the same part value for an unknown part in partAttributeDecider', async () => {
    let component = document.createElement('dx-switch');
    document.body.appendChild(component);
  
    // Type assertion: Convert `component` to an object type with `partAttributeDecider`
    const unknownPart = 'UNKNOWN_PART';
    const result = (component as unknown as { partAttributeDecider: (part: string) => string }).partAttributeDecider(unknownPart);
    
    await expect(result).toBe(unknownPart);
    component.remove();
  });  
  
  
  
});
