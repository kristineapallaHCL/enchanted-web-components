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
import { $, browser, expect } from '@wdio/globals';
import { html, render } from 'lit';

// Component imports
import '../../../components/ac/dx-input-select';
import '../../../components/ac/dx-button';
import '../../../components/ac/dx-list';
import '../../../components/ac/dx-list-item';

// Helper imports
import { SEARCH_COMMON_FIELDS } from '../../constants';
import { appendEnchantedStylingLink, SNAPSHOT_WINDOW_HEIGHT, SNAPSHOT_WINDOW_WIDTH } from '../utils';
import { DxInputFieldType } from '../../../types/dx-input-select';
import { initSessionStorage } from '../../utils';

const dxLocalization: Map<string, string> = new Map<string, string>();
dxLocalization.set('input.select.placeholder.select.attribute', 'Select an attribute');
dxLocalization.set('input.select.placeholder.select.content.source', 'Select a content source');
dxLocalization.set('output.table.footer.show.rows', 'Show rows:');
dxLocalization.set('output.table.footer.page', 'Page:');

function renderHtml() {
  return html`
    <div data-testid="dx-input-select-layout" style="padding: 5px;">
      <div style="display: flex; flex-direction: column; gap: 5px;">
        <label>With label</label>
        <dx-input-select .localization=${dxLocalization} label="Test Label"></dx-input-select>
      </div>

      <div style="display: flex; flex-direction: column; gap: 5px;">
        <label>With Options and Selected</label>
        <dx-input-select .localization=${dxLocalization} label="Test Label" .options=${['Option 1', 'Option 2', 'Option 3']} selectedValue="Option 1"></dx-input-select>
      </div>
    </div>
  `;
}

describe('DxInputSelect - Snapshot testing', () => {
  before(async () => {
    await initSessionStorage();
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
  });

  it('DxInputSelect - should capture Input Select component with attributes - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(renderHtml(), document.body);
    let DxTextInputfield = await $('>>>div[data-testid="dx-input-select-layout"]');
    await browser.checkElement(DxTextInputfield, 'dx-input-select-snapshot-baseline-authoring');

    document.head.removeChild(link);
  });

  it('DxInputSelect - should capture Input Select component with Open Dropdown - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-input-select-layout" style="display: flex; flex-direction: column; gap: 10px; padding: 10px; height: 250px;">
          <dx-input-select .localization=${dxLocalization} field=${DxInputFieldType.DOCUMENT_OBJECT_TYPE} .options=${SEARCH_COMMON_FIELDS} label="Select input">
          </dx-input-select>
        </div>
      `,
      document.body,
    );
    let component = await $('dx-input-select').getElement();
    await expect(component).toBeDisplayed();
    let buttonElement = await component.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
    await buttonElement.click();

    let listElement = await component.$('>>>dx-list[data-testid="dx-input-select-list"]').getElement();

    await expect(listElement).toBeDisplayed();

    let DxTextInputSelect = await $('>>>div[data-testid="dx-input-select-layout"]');
    await browser.checkElement(DxTextInputSelect, 'dx-input-select-snapshot-baseline-with-dropdown-opened-authoring');

    document.head.removeChild(link);
  });

  it('DxInputSelect - should capture Input Select component with Open Dropdown and Selected and remove label - Authoring', async () => {
    const link = appendEnchantedStylingLink();

    render(
      html`
        <div data-testid="dx-input-select-layout" style="display: flex; flex-direction: column; gap: 10px; padding: 10px; height: 250px;">
          <dx-input-select
            .localization=${dxLocalization}
            field=${DxInputFieldType.DOCUMENT_OBJECT_TYPE}
            .options=${SEARCH_COMMON_FIELDS}
            label="Select input"
            selectedValue="description"
            showRemoveLabel
          ></dx-input-select>
        </div>
      `,
      document.body,
    );
    let component = await $('dx-input-select').getElement();
    await expect(component).toBeDisplayed();
    let buttonElement = await component.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
    await buttonElement.click();

    let listElement = await component.$('>>>dx-list[data-testid="dx-input-select-list"]').getElement();

    await expect(listElement).toBeDisplayed();

    let DxTextInputSelect = await $('>>>div[data-testid="dx-input-select-layout"]');
    await browser.checkElement(DxTextInputSelect, 'dx-input-select-snapshot-baseline-with-dropdown-opened-with-selected-authoring'),

    document.head.removeChild(link);
  });
});
