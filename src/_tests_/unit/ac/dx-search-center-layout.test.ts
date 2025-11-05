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
import '../../../components/ac/dx-search-center-layout';

// Helper imports
import { initSessionStorage } from '../../utils';
 
describe('DxSearchCenterLayout component testing', () => {
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

  it('DxSearchCenterLayout - should render without crashing', async () => {
    let component = document.createElement('dx-search-center-layout');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    document.body.removeChild(component);
    component.remove();
  });

  it('DxSearchCenterLayout - removes component from document body and validates removal', async () => {
    let component = document.createElement('dx-search-center-layout');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxSearchCenterLayout - should validate null for non-existent attributes', async () => {
    let component = document.createElement('dx-search-center-layout');
    await expect(component.getAttribute('nonExistentAttribute')).toBeNull();
    component.remove();
  });

  it('DxSearchCenterLayout - should render component and validate attributes', async () => {
    render(
      html`
        <dx-search-center-layout>
          <div slot="search-input-container">testing1</div>
          <div slot="search-output-container">testing2</div>
          <div slot="tag-cloud">testing3</div>
        </dx-search-center-layout>
      `,
      document.body
    );
    let component = await $('dx-search-center-layout').getElement();
    await expect(component).toBeDisplayed();
    const slot1 = await $('div[slot="search-input-container"]').getElement();
    await expect(slot1).toHaveText('testing1');

    const slot2 = await $('div[slot="search-output-container"]').getElement();
    await expect(slot2).toHaveText('testing2');

    const slot3 = await $('div[slot="tag-cloud"]').getElement();
    await expect(slot3).toHaveText('testing3');
  });
});
