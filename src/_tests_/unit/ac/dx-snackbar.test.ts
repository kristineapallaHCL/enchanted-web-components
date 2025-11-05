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
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// Component imports
import '../../../components/ac/dx-snackbar';

// Helper imports
import { BUTTON_PARTS, BUTTON_VARIANT, SNACKBAR_TYPE } from '../../../types/cssClassEnums';
import { initSessionStorage } from '../../utils';

describe('DxSnackbar component testing', () => {
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

  it('DxSnackbar - should render without crashing', async () => {
    let component = document.createElement('dx-snackbar');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    document.body.removeChild(component);
    component.remove();
  });

  it('DxSnackbar - removes component from document body and validates removal', async () => {
    let component = document.createElement('dx-snackbar');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxSnackbar - should render component with icon and message', async () => {
    let snackbarMessage = "Sample snackbar message";
    render(
      html`
        <dx-snackbar
          message=${snackbarMessage}
          open={true}
          type=${SNACKBAR_TYPE.SNACKBAR_INFO}
        ></dx-snackbar>
      `,
      document.body
    );
    let component = await $('dx-snackbar').getElement();
    await expect(component).toBeDisplayed();
    let messageElement = await component.$('>>>span[data-testid="dx-snackbar-message"]').getElement();
    await expect(messageElement).toBeExisting();
    let svgIcon = await component.shadow$('dx-svg-icon').getElement();
    await expect(svgIcon).toBeExisting();
  });

  it('DxSnackbar - should render with buttons in the slot', async () => {
    let snackbarMessage = "Sample snackbar message";
    render(
      html`
        <dx-snackbar
          message=${snackbarMessage}
          open={true}
          type=${SNACKBAR_TYPE.SNACKBAR_INFO}
        >
          <div slot="snackbar-buttons">
            <dx-button
              buttontext="Button"
              variant=${BUTTON_VARIANT.BUTTON_TEXT_VAR}
              disabled="false"
              exportparts="${Object.values(BUTTON_PARTS).join(',')}"
            >
            </dx-button>
          </div>
        </dx-snackbar>
      `,
      document.body
    );

    let buttonElement = await $('dx-button').getElement();
    await expect(buttonElement).toBeExisting();
  });

  it('DxSnackbar - should render with complex HTML message', async () => {
    const message = 'This is a <strong>bold</strong> message.<br>With a line break.';
    const expectedHTML = unsafeHTML(message);
    render(
      html`
        <dx-snackbar
          message=${message}
          open={true}
          type=${SNACKBAR_TYPE.SNACKBAR_INFO}
        >
        </dx-snackbar>
      `,
      document.body
    );

    const snackbar = await $('dx-snackbar');
    const messageSpan = await snackbar.shadow$('[data-testid="dx-snackbar-message"]');
    expect(messageSpan.getHTML()).toHaveText(expectedHTML);
  });

  it('DxSnackbar - should handle special characters correctly', async () => {
    const message = 'Special characters: & < > " \' /';
    const expectedText = 'Special characters: & < > " \' /';
    render(
      html`
        <dx-snackbar
          message=${message}
          open={true}
          type=${SNACKBAR_TYPE.SNACKBAR_INFO}
        >
        </dx-snackbar>
      `,
      document.body
    );

    const snackbar = await $('dx-snackbar');
    const messageSpan = await snackbar.shadow$('[data-testid="dx-snackbar-message"]');
    expect(await messageSpan.getText()).toEqual(expectedText);
  });

  it('DxSnackbar - should not be visible is open is false', async () => {
    render(
      html`
        <dx-snackbar
          message=""
          open={false}
          type=${SNACKBAR_TYPE.SNACKBAR_INFO}
        >
        </dx-snackbar>
      `,
      document.body
    );

    const snackbar = await $('dx-snackbar');
    expect(snackbar).not.toBeDisplayed();
  });
});
 