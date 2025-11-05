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
import '../../../components/ac/dx-switch';

// Helper imports
import { appendEnchantedStylingLink, SNAPSHOT_WINDOW_HEIGHT, SNAPSHOT_WINDOW_WIDTH } from '../utils';

function renderHtml() {
  return html`
    <div
      data-testid="dx-switch-layout"
      style="
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        width: 300px;
        justify-content: center;
      "
    >
      <div>
        <label>Default</label>
        <dx-switch></dx-switch>
      </div>
      <div style="display: flex; justify-content: center;">
        <div>
          <label>Checked</label>
          <dx-switch ?isChecked=${true}></dx-switch>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end;">
        <div>
          <label>Disabled</label>
          <dx-switch ?isDisabled=${true}></dx-switch>
        </div>
      </div>
    </div>
  `;
}

describe('DxSwitch - Snapshot testing', () => {
  before(async () => {
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
  });

  it('DxSwitch - should capture Switch component with attributes - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(renderHtml(), document.body);
    let dxSwitchLayout = await $('>>>div[data-testid="dx-switch-layout"]');
    await browser.checkElement(dxSwitchLayout, 'dx-switch-snapshot-baseline-authoring');

    document.head.removeChild(link);
  });
});
