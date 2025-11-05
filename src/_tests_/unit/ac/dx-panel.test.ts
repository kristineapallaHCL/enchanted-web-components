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
import { expect, $ } from '@wdio/globals';

// Component imports
import '../../../components/ac/dx-panel';

// Helper imports
import { initSessionStorage } from '../../utils';

describe('DxPanel component testing', () => {
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

  it('DxPanel - should render without crashing', async () => {
    let component = document.createElement('dx-panel');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    document.body.removeChild(component);
    component.remove();
  });

  it('DxPanel - removes component from document body and validates removal', async () => {
    let component = document.createElement('dx-panel');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxPanel - should render component with title and content', async () => {
    let panelContent = html`
      <div data-testid="content-slot-wrapper">
        <h2>Sample content</h2>
        <p>This is a sample text.</p>
      </div>
    `;
    render(
      html`
        <dx-panel
          class="drawer1"
          position="right"
          title="Sample Content"
          open
        >
          <div slot="content">
            ${panelContent}
          </div>
        </dx-panel>
      `,
      document.body
    );
    let component = await $('dx-panel').getElement();
    await expect(component).toBeDisplayed();
    expect(component).toHaveText('Sample Content');
    const contentWrapper = await $('[data-testid="content-slot-wrapper"]');
    await expect(contentWrapper).toBeDisplayed();
  });

  it('DxPanel - should hide the panel when close button is clicked', async () => {
    render(
      html`
        <dx-panel
          class="drawer1"
          position="right"
          title="Sample Content"
          open
        >
        </dx-panel>
      `,
      document.body
    );

    let component = await $('dx-panel').getElement();
    await expect(component).toBeDisplayed();
    let panelContainer = await component.shadow$('[part="panel-container"]').getElement();

    // Click on the close button
    let closeButton = await component.shadow$('[part="panel-close-button"]').getElement();
    await closeButton.isExisting();
    await closeButton.click();

    const ariaHiddenValue = await panelContainer.getAttribute('aria-hidden');
    expect(ariaHiddenValue).toBe('true');
  });

  it('DxPanel - should hide panel if open attribute is not present', async () => {
    render(
      html`
        <dx-panel />
      `,
      document.body
    );
    let component = await $('dx-panel').getElement();
    let panelContainer = await component.shadow$('[part="panel-container"]').getElement();
    const ariaHiddenValue = await panelContainer.getAttribute('aria-hidden');
    expect(ariaHiddenValue).toBe('true');
  });

  it('DxPanel - should focus on the panel when opened', async () => {
    render(
      html`
        <dx-panel open ?focusPanel=${true} />
      `,
      document.body
    );
    let component = await $('dx-panel').getElement();
    let panelContainer = await component.shadow$('[part="panel-container"]').getElement();
    const ariaHiddenValue = await panelContainer.getAttribute('tabindex');
    expect(ariaHiddenValue).toBe('0');
  });
});
