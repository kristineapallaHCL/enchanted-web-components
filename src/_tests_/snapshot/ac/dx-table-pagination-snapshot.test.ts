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
import '../../../components/ac/dx-table-pagination';

// Helper imports
import { appendEnchantedStylingLink, SNAPSHOT_WINDOW_HEIGHT, SNAPSHOT_WINDOW_WIDTH } from '../utils';

const dxLocalization: Map<string, string> = new Map<string, string>();
dxLocalization.set('input.select.placeholder.select.attribute', 'Select an attribute');
dxLocalization.set('input.select.placeholder.select.content.source', 'Select a content source');
dxLocalization.set('output.table.footer.show.rows', 'Show rows:');
dxLocalization.set('output.table.footer.page', 'Page:');
dxLocalization.set('output.table.footer.current.pages', '{current_page_start}-{current_page_end} von {total_count}');

function renderHtml() {
  return html`
    <div data-testid="dx-table-pagination-layout" style="margin: 20px; width: 700px;">
      <div style="display: flex; flex-direction: column; gap: 5px;">
        <label>Disabled Previous button</label>
        <dx-table-pagination .localization=${dxLocalization} currentPage=${1} totalCount=${64} rowSize=${10}></dx-table-pagination>
      </div>

      <div style="display: flex; flex-direction: column; gap: 5px;">
        <label>Disabled next button</label>
        <dx-table-pagination .localization=${dxLocalization} currentPage=${7} totalCount=${64} rowSize=${10}></dx-table-pagination>
      </div>
    </div>
  `;
}

describe('DxTablePagination - Snapshot testing', () => {
  before(async () => {
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
    if (document.body.firstElementChild) {
      document.body.removeChild(document.body.firstElementChild);
    }
  });

  after(() => {
    if (document.body.firstElementChild) {
      document.body.removeChild(document.body.firstElementChild);
    }
  });

  // TODO - test was failing, has to fix later
  it('DxTablePagination - should capture Table Pagination component with different attributes', async () => {
    const link = appendEnchantedStylingLink();

    render(renderHtml(), document.body);

    const dxTablePagination = await $('>>>div[data-testid="dx-table-pagination-layout"]');
    await browser.checkElement(dxTablePagination, 'dx-table-pagination-snapshot-baseline-authoring');

    document.head.removeChild(link);
  });
});
