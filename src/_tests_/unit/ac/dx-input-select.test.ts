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
import { html, render } from 'lit';
import { expect, browser, $ } from '@wdio/globals';
import { Key } from 'webdriverio';

// Component imports
import '../../../components/ac/dx-input-select';
import '../../../components/ac/dx-button';
import '../../../components/ac/dx-list';
import '../../../components/ac/dx-list-item';

// Helper imports
import { DEFAULT_DOCUMENT_OBJECT_TYPE, SEARCH_COMMON_FIELDS } from '../../constants';
import { initSessionStorage } from '../../utils';
import { DxInputFieldType } from '../../../types/dx-input-select';

const dxLocalization: Map<string, string> = new Map<string, string>();
dxLocalization.set('input.select.placeholder.select.attribute', 'Select an attribute');
dxLocalization.set('input.select.placeholder.select.content.source', 'Select a content source');
dxLocalization.set('output.table.footer.show.rows', 'Show rows:');
dxLocalization.set('output.table.footer.page', 'Page:');

describe('DxInputSelect component testing', () => {
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

  it('DxInputSelect - should render without crashing', async () => {
    let component = document.createElement('dx-input-select');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    document.body.removeChild(component);
    component.remove();
  });

  it('DxInputSelect - removes component from document body and validates removal', async () => {
    let component = document.createElement('dx-input-select');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxInputSelect - validate default value of attributes', async () => {
    let component = document.createElement('dx-input-select');
    document.body.appendChild(component);
    await expect(component).toHaveElementProperty('toggleDropDown', false);
    await expect(component).toHaveElementProperty('label', '');
    await expect(component).toHaveElementProperty('disabled', false);
    await expect(component).not.toHaveAttribute('selectedValue');
    await expect(component).not.toHaveAttribute('options');
    await expect(component).not.toHaveAttribute('field');
    await expect(component).not.toHaveAttribute('currentFocusedItem');
    await expect(component).not.toHaveAttribute('listItems');
    component.remove();
  });

  it('DxInputSelect - should validate null for non-existent attributes', async () => {
    let component = document.createElement('dx-input-select');
    await expect(component.getAttribute('nonExistentAttribute')).toBeNull();
    component.remove();
  });

  it('DxInputSelect - should render with label and options', async () => {
    render(
      html`
        <dx-input-select 
          .localization=${dxLocalization}
          label="Test Label" 
          .options=${['Option 1', 'Option 2', 'Option 3']} 
          selectedValue="Option 1"
        ></dx-input-select>
      `,
      document.body
    );

    const component = await $('dx-input-select').getElement();
    const labelElement = await component.shadow$('label[data-testid="dx-input-select-label"]').getElement();
    const buttonElement = await component.shadow$('dx-button').getElement();

    await expect(labelElement).toHaveText('Test Label');
    await expect(buttonElement).toHaveAttribute('buttontext', 'Option 1');
  });

  it('DxInputSelect - should render component and validate label and initial dropdown value', async () => {
    render(
      html`
        <dx-input-select
          .localization=${dxLocalization}
          field=${DxInputFieldType.DOCUMENT_OBJECT_TYPE}
          .options=${SEARCH_COMMON_FIELDS}
          label="Select input"
          selectedValue=${DEFAULT_DOCUMENT_OBJECT_TYPE}
        ></dx-input-select>
      `,
      document.body
    );
    let component = await $('dx-input-select').getElement();
    await expect(component).toBeDisplayed();
    let labelElement = await component.$('>>>label[data-testid="dx-input-select-label"]').getElement();
    await expect(labelElement).toHaveText('Select input');
    let buttonElement = await component.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
    await expect(buttonElement).toHaveAttribute('buttontext', DEFAULT_DOCUMENT_OBJECT_TYPE);
  });

  it('DxInputSelect - should render component and validate placeholder over the selected value if alwaysShowPlaceholder', async () => {
    render(
      html`
        <dx-input-select
          .localization=${dxLocalization}
          field=${DxInputFieldType.DOCUMENT_OBJECT_TYPE}
          .options=${SEARCH_COMMON_FIELDS}
          label="Select input"
          selectedValue=${DEFAULT_DOCUMENT_OBJECT_TYPE}
          placeholder="Select an option"
          alwaysShowPlaceholder
        ></dx-input-select>
      `,
      document.body
    );
    let component = await $('dx-input-select').getElement();
    await expect(component).toBeDisplayed();
    let labelElement = await component.$('>>>label[data-testid="dx-input-select-label"]').getElement();
    await expect(labelElement).toHaveText('Select input');
    let buttonElement = await component.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
    await expect(buttonElement).toHaveAttribute('buttontext', 'Select an option');
    await buttonElement.click();
    let listElement = await component.$('>>>dx-list[data-testid="dx-input-select-list"]').getElement();
    await expect(listElement).toBeTruthy();
    const listItem = await component.$('>>>dx-list-item[data-testid="dx-input-select-listitem"]').getElement();
    const listItemText = await listItem.getText();
    if (listItemText === 'title') {
      await listItem.click();
    }
    //  After selection, button text should be updated to the selected value if alwaysShowPlaceholder is true
    await expect(buttonElement).toHaveAttribute('buttontext', 'Select an option');
  });

  it('DxInputSelect - should render component and validate placeholder not showing always over the selected value if alwaysShowPlaceholder is false', async () => {
    render(
      html`
        <dx-input-select
          .localization=${dxLocalization}
          field=${DxInputFieldType.DOCUMENT_OBJECT_TYPE}
          .options=${SEARCH_COMMON_FIELDS}
          label="Select input"
          placeholder="Select an option"
        ></dx-input-select>
      `,
      document.body
    );
    let component = await $('dx-input-select').getElement();
    await expect(component).toBeDisplayed();
    let labelElement = await component.$('>>>label[data-testid="dx-input-select-label"]').getElement();
    await expect(labelElement).toHaveText('Select input');
    let buttonElement = await component.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
    await expect(buttonElement).toHaveAttribute('buttontext', 'Select an option');
    await buttonElement.click();
    let listElement = await component.$('>>>dx-list[data-testid="dx-input-select-list"]').getElement();
    await expect(listElement).toBeTruthy();
    const listItem = await component.$('>>>dx-list-item[data-testid="dx-input-select-listitem"]').getElement();
    const listItemText = await listItem.getText();
    if (listItemText === 'title') {
      await listItem.click();
    }
    // After selection, button text should not be updated to the selected value as alwaysShowPlaceholder is true
    await expect(buttonElement).toHaveAttribute('buttontext', listItemText);
  });

  it('DxInputSelect - should test that buttontext attribute of button is having dropdown selection as per user selection', async () => {
    render(
      html`
        <dx-input-select
          .localization=${dxLocalization}
          field=${DxInputFieldType.DOCUMENT_OBJECT_TYPE}
          .options=${SEARCH_COMMON_FIELDS}
          label="Select input"
        ></dx-input-select>
      `,
      document.body
    );
    let component = await $('dx-input-select').getElement();
    await expect(component).toBeDisplayed();
    let buttonElement = await component.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
    await buttonElement.click();
    let listElement = await component.$('>>>dx-list[data-testid="dx-input-select-list"]').getElement();
    await expect(listElement).toBeTruthy();
    const listItem = await component.$('>>>dx-list-item[data-testid="dx-input-select-listitem"]').getElement();
    const listItemText = await listItem.getText();
    if (listItemText === 'title') {
      await listItem.click();
    }
    expect(buttonElement).toHaveAttribute('buttontext', listItemText);

  });

  it('should navigate dropdown using ArrowDown and ArrowUp keys', async () => {
    render(
      html`
        <dx-input-select
          .localization=${dxLocalization}
          field=${DxInputFieldType.DOCUMENT_OBJECT_TYPE}
          selectedvalue=${DEFAULT_DOCUMENT_OBJECT_TYPE}
          .options=${SEARCH_COMMON_FIELDS}
          label="Select input"
        ></dx-input-select>
      `,
      document.body
    );

    const component = await $('dx-input-select').getElement();
    const buttonElement = await component.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
    await buttonElement.click();
    await browser.pause(500);
    const btnText = await buttonElement.getText();
    expect(btnText).toBe(DEFAULT_DOCUMENT_OBJECT_TYPE);

    const listElement = await component.$('>>>dx-list[data-testid="dx-input-select-list"]').getElement();
    await expect(listElement).toBeTruthy();

    const listItems = await component.$$('>>>dx-list-item[data-testid="dx-input-select-listitem"]').getElements();
    await expect((await listItems).length).toBeGreaterThan(0);
    await browser.keys([Key.ArrowDown, Key.ArrowUp, Key.Enter]);
    const btnTextAfterSelection = await buttonElement.getText();
    expect(btnTextAfterSelection).toBe('title');
  });
});
