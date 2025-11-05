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
import { $, expect, browser } from '@wdio/globals';
import { fn } from '@wdio/browser-runner';
import { waitFor } from '@testing-library/dom';

// Component imports
import '../../../components/ac/dx-menu';
import '../../../components/ac/dx-button';
import '../../../components/ac/dx-menu-item';
import '../../../components/ac/dx-list';
import '../../../components/ac/dx-list-item';

// Helper imports
import { initSessionStorage } from '../../utils';

describe('DxMenu component testing', () => {
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

  it('DxMenu - should render without crashing', async () => {
    let component = document.createElement('dx-menu');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    document.body.removeChild(component);
    component.remove();
  });

  it('DxMenu - removes component from document body and validates removal', async () => {
    let component = document.createElement('dx-menu');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxMenu - should validate null for non-existent attributes', async () => {
    let component = document.createElement('dx-menu');
    await expect(component.getAttribute('nonExistentAttribute')).toBeNull();
    component.remove();
  });

  it('DxMenu - should render component and validate attributes', async () => {
    const menuMockFunction = fn();

    render(
      html`
        <dx-menu onchange="${menuMockFunction()}">
          <div slot="target-anchor">
            <dx-button buttonText="Open Menu"></dx-button>
          </div>
          <div slot="menu-items">
            <dx-menu-item text="One"></dx-menu-item>
            <dx-menu-item text="Two"></dx-menu-item>
            <dx-menu-item text="ThreeThreeThreeThreeThreeThreeThreeThree"></dx-menu-item>
          </div>
        </dx-menu>
      `,
      document.body
    );
    let component = await $('dx-menu').getElement();
    await expect(component).toBeDisplayed();

    let listElement = await component.$('>>>dx-list').getElement();
    await expect(listElement).not.toBeDisplayed();

    await waitFor(async() => {
      const buttonElement = await component.$('>>>dx-button').getElement();
      await expect(buttonElement).toBeDisplayed();
      expect(await buttonElement.isClickable()).toEqual(true);
      await buttonElement.click();
      expect(await buttonElement.getAttribute('buttontext')).toEqual('Open Menu');
      await browser.pause(500);
    });

    listElement = await component.$('>>>dx-list').getElement();
    await expect(listElement).toBeDisplayed();

    await waitFor(async() => {
      const menuItems = await component.$$('>>>dx-menu-item').getElements();
      expect(menuItems.length).toEqual(3);      
      await expect(menuItems[0]).toBeClickable();
      await menuItems[0].click();
      await browser.pause(500);
      expect(menuMockFunction).toHaveBeenCalledTimes(1);
    });
  });
});
