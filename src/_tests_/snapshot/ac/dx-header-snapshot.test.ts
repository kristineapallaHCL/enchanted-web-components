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
import '../../../components/ac/dx-header';
import '../../../components/ac/dx-input-textfield';
import '../../../components/ac/dx-button';

// Helper imports
import { appendEnchantedStylingLink, SNAPSHOT_WINDOW_HEIGHT, SNAPSHOT_WINDOW_WIDTH } from '../utils';

const dxLocalization: Map<string, string> = new Map<string, string>();
dxLocalization.set('header.authoring.search', 'Authoring search');
dxLocalization.set('header.enduser.search.center.title', 'Search Center');
dxLocalization.set('header.enduser.search.placeholder', 'Enter keyword...');
dxLocalization.set('header.enduser.search', 'Search');

describe('DxHeader - Snapshot testing', () => {
  before(async () => {
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
  });

  it('DxHeader - should capture Header component with different attributes - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-header-layout" style="padding: 5px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label>Default without attributes</label>
            <div slot="dx-header">
              <dx-header .localization=${dxLocalization} />
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label>with Title</label>
            <div slot="dx-header">
              <dx-header .localization=${dxLocalization} title="Dx Header" />
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label>with Title and isSideNavOpen</label>
            <div slot="dx-header">
              <dx-header .localization=${dxLocalization} title="Dx Header" isSideNavOpen="true" />
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label>with variant header-authoring</label>
            <div slot="dx-header">
              <dx-header .localization=${dxLocalization} variant="header-authoring" />
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label>with variant header-authoring and isSideNavOpen</label>
            <div slot="dx-header">
              <dx-header .localization=${dxLocalization} variant="header-authoring" isSideNavOpen="true" />
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label>with variant header-authoring, isSideNavOpen and showBackIcon</label>
            <div slot="dx-header">
              <dx-header .localization=${dxLocalization} variant="header-authoring" isSideNavOpen="true" showBackIcon="true" />
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label>with variant header-authoring, isSideNavOpen, showBackIcon and disabled</label>
            <div slot="dx-header">
              <dx-header .localization=${dxLocalization} disabled variant="header-authoring" isSideNavOpen="true" showBackIcon="true" />
            </div>
          </div>
        </div>
      `,
      document.body,
    );

    let dxHeaderLayout = await $('>>>div[data-testid="dx-header-layout"]');

    await browser.checkElement(dxHeaderLayout, 'dx-header-snapshot-baseline-authoring');

    document.head.removeChild(link);
  });
});
