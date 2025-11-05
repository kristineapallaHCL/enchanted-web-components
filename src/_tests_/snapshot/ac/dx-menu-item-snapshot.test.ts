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
import '../../../components/ac/dx-menu-item';

// Helper imports
import { appendEnchantedStylingLink, SNAPSHOT_WINDOW_HEIGHT, SNAPSHOT_WINDOW_WIDTH } from '../utils';

function renderHtml() {
  return html`
    <div data-testid="dx-menu-item-layout" style="padding: 5px; width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 5px;">
        <div>
          <dx-menu-item text="One"></dx-menu-item>
          <dx-menu-item text="Two"></dx-menu-item>
          <dx-menu-item text="Three"></dx-menu-item>
        </div>
      </div>
    </div>
  `;
}

describe('DxMenuItem - Snapshot testing', () => {
  before(async () => {
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
  });

  it('DxMenuItem - should capture Menu Item component with attributes - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(renderHtml(), document.body);

    let dxMenuItem = await $('>>>div[data-testid="dx-menu-item-layout"]');
    await browser.checkElement(dxMenuItem, 'dx-menu-item-snapshot-baseline-authoring');

    document.head.removeChild(link);
  });
});
