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
import '../../../components/ac/dx-menu';
import '../../../components/ac/dx-menu';
import '../../../components/ac/dx-menu-item';

// Helper imports
import { appendEnchantedStylingLink, SNAPSHOT_WINDOW_HEIGHT, SNAPSHOT_WINDOW_WIDTH } from '../utils';

function renderHtml() {
  return html`
    <div data-testid="dx-menu-layout" style="padding: 5px; width: 400px; height: 260px;">
      <div style="display: flex; flex-direction: column; gap: 5px;">
        <label>Default (Close)</label>
        <dx-menu>
          <div slot="target-anchor">
            <dx-button buttonText="Open Menu"></dx-button>
          </div>
          <div slot="menu-items">
            <dx-menu-item text="One"></dx-menu-item>
            <dx-menu-item text="Two"></dx-menu-item>
            <dx-menu-item text="Three"></dx-menu-item>
          </div>
        </dx-menu>
      </div>

      <div style="display: flex; flex-direction: column; gap: 5px;">
        <div style="margin-top: 20px;">
          <label style="margin: 10px 0;">Menu Open</label>
          <dx-menu open="true">
            <div slot="target-anchor">
              <dx-button buttonText="Open Menu"></dx-button>
            </div>
            <div slot="menu-items">
              <dx-menu-item text="One"></dx-menu-item>
              <dx-menu-item text="Two"></dx-menu-item>
              <dx-menu-item text="Three"></dx-menu-item>
            </div>
          </dx-menu>
        </div>
      </div>
    </div>
  `;
}

describe('DxMenu - Snapshot testing', () => {
  before(async () => {
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
  });

  it('DxMenu - should capture Menu component with attributes - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(renderHtml(), document.body);

    let dxMenuLayout = await $('>>>div[data-testid="dx-menu-layout"]');
    await browser.checkElement(dxMenuLayout, 'dx-menu-snapshot-baseline-authoring');

    document.head.removeChild(link);
  });
});
