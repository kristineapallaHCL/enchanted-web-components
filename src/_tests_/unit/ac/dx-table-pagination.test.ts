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
import { $, expect } from '@wdio/globals';
import { waitFor } from '@testing-library/dom';

// Component imports
import '../../../components/ac/dx-table-pagination';

// Helper imports
import { initSessionStorage } from '../../utils';
import { DxInputFieldType } from '../../../types/dx-input-select';

const dxLocalization: Map<string, string> = new Map<string, string>();
dxLocalization.set('input.select.placeholder.select.attribute', 'Select an attribute');
dxLocalization.set('input.select.placeholder.select.content.source', 'Select a content source');
dxLocalization.set('output.table.footer.show.rows', 'Show rows:');
dxLocalization.set('output.table.footer.page', 'Page:');
dxLocalization.set('output.table.footer.current.pages', '{current_page_start}-{current_page_end} von {total_count}');

describe('DxTablePagination component testing', () => {
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

  it('DxTablePagination - should render without crashing', async () => {
    let component = document.createElement('dx-table-pagination');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    document.body.removeChild(component);
    component.remove();
  });

  it('DxTablePagination - removes component from document body and validates removal', async () => {
    let component = document.createElement('dx-table-pagination');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxTablePagination - should validate null for non-existent attributes', async () => {
    let component = document.createElement('dx-table-pagination');
    await expect(component.getAttribute('nonExistentAttribute')).toBeNull();
    component.remove();
  });

  it('DxTablePagination - should render component and validate attributes', async () => {
    render(
      html`
        <dx-table-pagination
          .localization=${dxLocalization}
          ?hasPreviousPage=${false}
          ?hasNextPage=${true}
          ?disabled=${false}
          currentPage=${1}
          totalCount=${64}
          rowSize=${10}
        ></dx-table-pagination>
      `,
      document.body
    );
    let component = await $('dx-table-pagination').getElement();
    await expect(component).toBeDisplayed();
    await expect(component).toHaveElementProperty('hasPreviousPage', false); // because current page is 1
    await expect(component).toHaveElementProperty('hasNextPage', true);
    await expect(component).toHaveElementProperty('disabled', false);
    await expect(component).toHaveElementProperty('currentPage', 1);
    await expect(component).toHaveElementProperty('totalCount', 64);
    await expect(component).toHaveElementProperty('rowSize', 10);
  });

  it('DxTablePagination - should be able to change row size', async () => {
    render(
      html`
        <dx-table-pagination
          .localization=${dxLocalization}
          ?hasPreviousPage=${false}
          ?hasNextPage=${true}
          ?disabled=${false}
          currentPage=${1}
          totalCount=${64}
          rowSize=${10}
        ></dx-table-pagination>
      `,
      document.body
    );
    let component = await $('dx-table-pagination').getElement();
    const inputElement = await component.$('>>>dx-input-select').getElement();
    await waitFor(async() => {
      expect(await inputElement.getAttribute('field')).toEqual(DxInputFieldType.PAGINATION_ROWS);
      expect(await inputElement.getAttribute('label')).toEqual(null);

      const labelElement = await inputElement.shadow$('label[data-testid="dx-input-select-label"]').getElement();
      expect(await labelElement.getText()).toEqual(dxLocalization.get('output.table.footer.show.rows'));

      const buttonElement = await inputElement.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
      expect(await buttonElement.getAttribute('buttontext')).toEqual('10');

      await buttonElement.click();
    });

    // get the first option element
    const listElement =  await inputElement.$('>>>dx-list[data-testid="dx-input-select-list"]').getElement();
    const listItemElement = await listElement.$$('>>>dx-list-item').getElements(); // get 1st element
    
    await waitFor(async() => {
      // if we have the option element, click it
      if ((await listItemElement[1].getText()).includes('25')) {
        await listItemElement[1].click();
      }
    });      

    await waitFor(async() => {
      const buttonElement = await inputElement.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
      expect(await buttonElement.getAttribute('buttontext')).toContain('25');
    });
  });

  it('DxTablePagination - should be able to change page', async () => {
    render(
      html`
        <dx-table-pagination
          .localization=${dxLocalization}
          ?hasPreviousPage=${false}
          ?hasNextPage=${true}
          ?disabled=${false}
          currentPage=${1}
          totalCount=${64}
          rowSize=${10}
        ></dx-table-pagination>
      `,
      document.body
    );
    let component = await $('dx-table-pagination').getElement();
    const inputElementArr = await component.$$('>>>dx-input-select').getElements();
    const inputElement = inputElementArr[1];

    await waitFor(async() => {
      expect(await inputElement.getAttribute('field')).toEqual(DxInputFieldType.PAGINATION_PAGE);
      expect(await inputElement.getAttribute('label')).toEqual(null);

      const labelElement = await inputElement.shadow$('label[data-testid="dx-input-select-label"]').getElement();
      expect(await labelElement.getText()).toEqual(dxLocalization.get('output.table.footer.page'));

      const buttonElement = await inputElement.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
      expect(await buttonElement.getAttribute('buttontext')).toEqual('1');

      await buttonElement.click();
    });

    // get the first option element
    const listElement =  await inputElement.$('>>>dx-list[data-testid="dx-input-select-list"]').getElement();
    const listItemElement = await listElement.$$('>>>dx-list-item').getElements(); // get 1st element
    
    await waitFor(async() => {
      // if we have the option element, click it
      if ((await listItemElement[1].getText()).includes('2')) {
        await listItemElement[1].click();
      }
    });      

    await waitFor(async() => {
      const buttonElement = await inputElement.$('>>>dx-button[data-testid="dx-input-select-button"]').getElement();
      expect(await buttonElement.getAttribute('buttontext')).toContain('2');
    });
  });
});
