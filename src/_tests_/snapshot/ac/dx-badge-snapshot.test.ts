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
import '../../../components/ac/dx-badge';

// Helper imports
import { HEADER_PARTS } from '../../../types/cssClassEnums';
import { appendEnchantedStylingLink, SNAPSHOT_WINDOW_HEIGHT, SNAPSHOT_WINDOW_WIDTH } from '../utils';

function renderHtml() {
  return html`
    <div data-testid="dx-badge-layout" style="display: flex; flex-direction: column; gap: 10px; padding: 10px; width: 100px; height: 70px;">
      <label style="font-size: 14px;">Default</label>
      <div>
        <dx-badge badge="20" />
      </div>

      <label style="font-size: 14px;">Dot</label>
      <div>
        <dx-badge part=${HEADER_PARTS.BADGE_DOT} />
      </div>
    </div>
  `;
}

describe('DxBadge - Snapshot testing', () => {

  before(async () => {
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
  });

  it('DxBadge - should capture Badge component with attributes - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(renderHtml(), document.body);
    let dxBadge = await $('>>>div[data-testid="dx-badge-layout"]');
    document.getElementsByTagName('dx-badge')[0].setAttribute('style', 'position: relative; left: 20px;');
    document.getElementsByTagName('dx-badge')[1].setAttribute('style', 'position: relative; left: 20px;');

    await browser.checkElement(dxBadge, 'dx-badge-snapshot-baseline-authoring');

    document.head.removeChild(link);
  });
});
