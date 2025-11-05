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
import '../../../components/ac/dx-theme-inspector';

// Helper imports
import { initSessionStorage } from '../../utils';

describe('DxThemeInspector component testing', () => {
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

  it('DxThemeInspector - should render without crashing', async () => {
    let component = document.createElement('dx-theme-inspector');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    document.body.removeChild(component);
    component.remove();
  });

  it('DxThemeInspector - removes component from document body and validates removal', async () => {
    let component = document.createElement('DxThemeInspector');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxThemeInspector - should render theme inspector', async () => {
    render(
      html`
        <dx-theme-inspector />
      `,
      document.body
    );
    const component = await $('dx-theme-inspector');
    const container = await component.$('>>>div[data-testid="dx-theme-inspector-container"]');
    await container.waitForDisplayed({ timeout: 8000 });
    await expect(container).toBeDisplayed();
  });
});
