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
import '../../../components/ac/dx-list-item';

// Helper imports
import { initSessionStorage } from '../../utils';

describe('DxListItem component testing', () => {
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

  it('DxListItem - should render without crashing', async () => {
    let component = document.createElement('dx-list-item');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    component.remove();
  });

  it('DxListItem - removes component from document body and validates removal', async () => {
    let component = document.createElement('dx-list-item');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxListItem - validate default value of attributes', async () => {
    let component = document.createElement('dx-list-item');
    document.body.appendChild(component);
    await expect(component).toHaveElementProperty('key', '');
    component.remove();
  });

  it('DxListItem - should validate null for non-existent attributes', async () => {
    let component = document.createElement('dx-list-item');
    await expect(component.getAttribute('nonExistentAttribute')).toBeNull();
    component.remove();
  });

  it('DxListItem - should component render with different attributes', async () => {
    render(
      html`<dx-list-item key="test_key" isSelected/>`,
      document.body
    );
    const component = await $('dx-list-item').getElement();
    await expect(component).toBeDisplayed();
    let listElement = await component.$('>>>li[data-testid="dx-list-item-list"]').getElement();
    await expect(listElement).toHaveAttribute('key', 'test_key');
  });
});
