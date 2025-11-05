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
import { $, expect } from '@wdio/globals';

// Component imports
import '../../../components/ac/dx-list';

// Helper imports
import { initSessionStorage } from '../../utils';

describe('DxList component testing', () => {
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

  it('DxList - should render without crashing', async () => {
    let component = document.createElement('dx-list');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    document.body.removeChild(component);
    component.remove();
  });

  it('DxList - removes component from document body and validates removal', async () => {
    let component = document.createElement('dx-list');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxList - should validate null for non-existent attributes', async () => {
    let component = document.createElement('dx-list');
    await expect(component.getAttribute('nonExistentAttribute')).toBeNull();
    component.remove();
  });

  it('DxList - should render component and validate attributes', async () => {
    render(
      html`
        <dx-list>
          <slot name="test">testing</slot>
        </dx-list>
      `,
      document.body
    );
    let component = await $('dx-list').getElement();
    await expect(component).toBeDisplayed();
    const slot = await $('slot[name="test"]').getElement();
    await expect(slot).toHaveText('testing');
  });
});
