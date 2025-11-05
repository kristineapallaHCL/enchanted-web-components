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
import { $, browser } from '@wdio/globals';
import { html, render } from 'lit';

// Component imports
import '../../../components/ac/dx-snackbar';
import '../../../components/ac/dx-svg-icon';
import '../../../components/ac/dx-button';
import '../../../components/ac/dx-icon-button';

// Helper imports
import { BUTTON_PARTS, BUTTON_VARIANT, SNACKBAR_TYPE } from '../../../types/cssClassEnums';
import { appendEnchantedStylingLink, SNAPSHOT_WINDOW_HEIGHT, SNAPSHOT_WINDOW_WIDTH } from '../utils';

// Icon imports
import svgClose from '../../../static/assets/close.svg';

describe('DxSnackbar snapshot testing', () => {
  const simpleMessage = 'This is a simple snackbar message.';
  const htmlMessage = 'This message contains <strong>HTML</strong> tags. <br/> This is an <i>italicize</i> text.';
  const specialCharMessage = 'Special characters: & < > " \' /';
  const multilineMessage = 'This is the first line. <br/> This is the second line. <br/> This is the third line.';

  before(async () => {
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
  });

  it('DxSnackbar (success) - should capture DxSnackbar component with simple message and icon - Authoring ', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${simpleMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_SUCCESS}
          ></dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-success-baseline-with-simple-message-and-icon-authoring');
 
    document.head.removeChild(link);
  });

  it('DxSnackbar (info) - should capture DxSnackbar component with simple message and icon - Authoring ', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${simpleMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_INFO}
          ></dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-info-baseline-with-simple-message-and-icon-authoring');

    document.head.removeChild(link);
  });

  it('DxSnackbar (warning) - should capture DxSnackbar component with simple message and icon - Authoring ', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${simpleMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_WARNING}
          ></dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-warning-baseline-with-simple-message-and-icon-authoring');

    document.head.removeChild(link);
  });

  it('DxSnackbar (error) - should capture DxSnackbar component with simple message and icon - Authoring ', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${simpleMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_ERROR}
          ></dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-error-baseline-with-simple-message-and-icon-authoring');

    document.head.removeChild(link);
  });

  it('DxSnackbar (info) - should capture DxSnackbar component with multiline message - Authoring ', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${multilineMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_INFO}
          ></dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-baseline-with-multiline-message-and-icon-authoring');

    document.head.removeChild(link);
  });

  it('DxSnackbar (info) - should capture DxSnackbar component with html message - Authoring ', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${htmlMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_INFO}
          ></dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-baseline-with-html-message-and-icon-authoring');

    document.head.removeChild(link);
  });

  it('DxSnackbar (info) - should capture DxSnackbar component with special characters message - Authoring ', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${specialCharMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_INFO}
          ></dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-baseline-with-special-chars-message-and-icon-authoring');

    document.head.removeChild(link);
  });

  it('DxSnackbar (info) - should capture DxSnackbar component with button - focused', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${simpleMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_INFO}
          >
            <div slot="snackbar-buttons">
              <dx-button
                buttontext="Button"
                variant=${BUTTON_VARIANT.BUTTON_TEXT_VAR}
                exportparts="${Object.values(BUTTON_PARTS).join(',')}"
                autofocus
                inverseColor
              >
              </dx-button>
            </div>
          </dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-baseline-with-button-focused');

    document.head.removeChild(link);
  });


  it('DxSnackbar (info) - should capture DxSnackbar component with icon-button - focused', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${simpleMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_INFO}
          >
            <div slot="snackbar-buttons">
              <dx-icon-button size="small" ?isDisabled="${true}" .imgurl=${svgClose} inverseColor></dx-icon-button>
            </div>
          </dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    const dxIconButton = await dxSnackbar.$('>>>dx-icon-button');
    await dxIconButton.click();
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-baseline-with-icon-button-focused');

    document.head.removeChild(link);
  });

  it('DxSnackbar (info) - should capture DxSnackbar component with button and icon button - Authoring ', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${simpleMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_INFO}
          >
            <div slot="snackbar-buttons">
              <dx-button
                buttontext="Button"
                variant=${BUTTON_VARIANT.BUTTON_TEXT_VAR}
                exportparts="${Object.values(BUTTON_PARTS).join(',')}"
              >
              </dx-button>
              <dx-icon-button size="small" ?isDisabled="${true}" .imgurl=${svgClose}></dx-icon-button>
            </div>
          </dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-baseline-with-button-and-icon-button-authoring');

    document.head.removeChild(link);
  });

  it('DxSnackbar (progress) - should capture DxSnackbar component with progress indicator - Authoring ', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-snackbar-layout" style="position: relative; width: 400px; height: 1600px;">
          <dx-snackbar
            message=${simpleMessage}
            type=${SNACKBAR_TYPE.SNACKBAR_PROGRESS}
          ></dx-snackbar>
        </div>
      `,
      document.body,
    );

    const dxSnackbar = await $('>>>div[data-testid="dx-snackbar-layout"]');
    await browser.checkElement(dxSnackbar, 'dx-snackbar-snapshot-loading-indicator-baseline-authoring');
 
    document.head.removeChild(link);
  });
});
 