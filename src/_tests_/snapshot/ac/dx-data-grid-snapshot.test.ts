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
import { expect, browser } from '@wdio/globals';
import { render, html } from 'lit';

// Component imports
import '../../../components/ac/dx-data-grid.ts';
import '../../../components/ac/dx-circular-progress.ts';

// Helper imports
import { DxDataGridColDef } from '../../../types/dx-data-grid';
import { appendEnchantedStylingLink, SNAPSHOT_WINDOW_HEIGHT, SNAPSHOT_WINDOW_WIDTH } from '../utils';

const dxLocalization: Map<string, string> = new Map<string, string>();
dxLocalization.set('authoring.datagrid.overflow.list.read', 'Read');
dxLocalization.set('authoring.datagrid.overflow.list.preview', 'Preview');
dxLocalization.set('authoring.datagrid.overflow.list.delete', 'Delete');
dxLocalization.set('authoring.datagrid.column.header.sort.ascending', 'Sort by {column} ascending');
dxLocalization.set('authoring.datagrid.column.header.sort.descending', 'Sort by {column} descending');
dxLocalization.set('output.message.loading.search.results', 'Loading search results...');
dxLocalization.set('datagrid.tooltip.edit', 'Edit');
dxLocalization.set('authoring.datagrid.action.aria.label.edit', 'Edit item');
dxLocalization.set('datagrid.tooltip.more', 'More');
dxLocalization.set('output.message.no.results.found', 'No results were found.');
dxLocalization.set('output.message.no.match.found', "We couldn't find a match for <strong>\"{search_term}\"</strong>. Try checking your spelling or try words with similar meanings.");
dxLocalization.set('output.message.no.engine.found', 'Search engine is currently unavailable.');
dxLocalization.set('output.message.contact.admin', 'Please try again or contact your administrator for assistance.');
dxLocalization.set('output.message.no.content.sources.found', 'No content source is available.');
dxLocalization.set('authoring.data.grid.initial.message', 'Authoring search');
dxLocalization.set('output.message.looking.for.something', 'Looking for something? Type in the search bar or select from the tag cloud to get started.');
dxLocalization.set('authoring.data.grid.message.looking.for.something', 'Looking for something? Type in the search bar above.');
dxLocalization.set('data.grid.invalid.column.definition', 'Invalid column definition.');

const testColDef: DxDataGridColDef[] = [
  { field: '_source.title', headerName: 'Title' },
  { field: '_source.updated', headerName: 'Last Updated' },
  { field: '_source.documentObject.author.name', headerName: 'Author' },
];

describe('DxDataGrid - Snapshot testing', () => {
  before(async () => {
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
    if (document.body.firstElementChild) {
      document.body.removeChild(document.body.firstElementChild);
    }
  });

  afterEach(() => {
    if (document.body.firstElementChild) {
      document.body.removeChild(document.body.firstElementChild);
    }
  });

  it('DxDataGrid - should capture Data Grid component with initial state - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`<div style="width: 700px; height: 600px;">
        <dx-data-grid .localization=${dxLocalization} colDef="${JSON.stringify(testColDef)}"></dx-data-grid>
      </div>`,
      document.body,
    );

    // The `toMatchFullPageSnapshot` method will let fail the whole test for a mismatch. 
    // Therefore the 100% mismatch threshold was added, but the mismatch image will be generated anyway.
    await expect(browser).toMatchFullPageSnapshot('dx-data-grid-with-initial-state-snapshot-baseline-authoring', 100);

    document.head.removeChild(link);
  });

  it('DxDataGrid - should capture Data Grid component with loading state - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div style="width: 700px; height: 500px;">
          <dx-data-grid .localization=${dxLocalization} colDef="${JSON.stringify(testColDef)}" isLoading=${true}></dx-data-grid>
        </div>
      `,
      document.body,
    );

    // The `toMatchFullPageSnapshot` method will let fail the whole test for a mismatch. 
    // Therefore the 100% mismatch threshold was added, but the mismatch image will be generated anyway.
    await expect(browser).toMatchFullPageSnapshot('dx-data-grid-with-loading-snapshot-baseline-authoring', 100);

    document.head.removeChild(link);
  });

  it('DxDataGrid - should capture Data Grid component with has no content source state - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div style="width: 700px; height: 500px;">
          <dx-data-grid .localization=${dxLocalization} colDef="${JSON.stringify(testColDef)}" hasContentSourceAvailable=${true}></dx-data-grid>
        </div>
      `,
      document.body,
    );

    // The `toMatchFullPageSnapshot` method will let fail the whole test for a mismatch. 
    // Therefore the 100% mismatch threshold was added, but the mismatch image will be generated anyway.
    await expect(browser).toMatchFullPageSnapshot('dx-data-grid-with-no-contentsource-snapshot-baseline-authoring', 100);

    document.head.removeChild(link);
  });

  it('DxDataGrid - should capture Data Grid component with invalid column definition - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div style="width: 700px; height: 150px;">
          <dx-data-grid .localization=${dxLocalization} colDef="${JSON.stringify(null)}test" hasContentSourceAvailable=${true}></dx-data-grid>
        </div>
      `,
      document.body,
    );

    // The `toMatchFullPageSnapshot` method will let fail the whole test for a mismatch. 
    // Therefore the 100% mismatch threshold was added, but the mismatch image will be generated anyway.
    await expect(browser).toMatchFullPageSnapshot('dx-data-grid-with-invalid-coldef-snapshot-baseline-authoring', 100);

    document.head.removeChild(link);
  });
});
