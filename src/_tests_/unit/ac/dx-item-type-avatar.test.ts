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

// Component imports
import '../../../components/ac/dx-item-type-avatar';

// Helper imports
import { ICON_ITEM_TYPE } from '../../../types/dx-svg-icon';
import { AVATAR_COLOR } from '../../../types/cssClassEnums';
import { initSessionStorage } from '../../utils';

describe('DxAuthoringItemTypeAvatar component testing', () => {
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

  it('DxAuthoringItemTypeAvatar - should render without crashing', async () => {
    let component = document.createElement('dx-item-type-avatar');
    document.body.appendChild(component);
    await expect(document.body.contains(component)).toBeTruthy();
    document.body.removeChild(component);
    component.remove();
  });

  it('DxAuthoringItemTypeAvatar - removes component from document body and validates removal', async () => {
    let component = document.createElement('DxAuthoringItemTypeAvatar');
    document.body.appendChild(component);
    document.body.removeChild(component);
    await expect(document.body.contains(component)).toBeFalsy();
    component.remove();
  });

  it('DxAuthoringItemTypeAvatar - should render imageUrl directly to dx-avatar if imageUrl is provided', async () => {
    const testImageUrl = 'https://example.com/custom-image.png';

    render(
      html`
         <dx-authoring-item-type-avatar itemType=${ICON_ITEM_TYPE.CONTENT_ITEM} imageUrl=${testImageUrl} />
      `,
      document.body
    );
    let component = await $('dx-authoring-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('imageUrl', testImageUrl);
  });

  it('DxAuthoringItemTypeAvatar - should not render imageUrl directly to dx-avatar if imageUrl is empty', async () => {
    const testImageUrl = '';

    render(
      html`
        <dx-authoring-item-type-avatar itemType=${ICON_ITEM_TYPE.CONTENT_ITEM} imageUrl=${testImageUrl} />
      `,
      document.body
    );
    let component = await $('dx-authoring-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.CONTENT_ITEM);
    expect(component).toHaveAttribute('imageUrl', ICON_ITEM_TYPE.CONTENT_ITEM);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemTyp VIDEO', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.VIDEO} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.VIDEO);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType CONTENT', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.CONTENT_ITEM} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.CONTENT_ITEM);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType CATALOG', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.CATALOG} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.CATALOG);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType BLOG', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.BLOG} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.BLOG);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType CHARACTER WHOLE NUMBER', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.CHARACTER_WHOLE_NUMBER} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.CHARACTER_WHOLE_NUMBER);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemTyp SITE AREA', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.PARENT_CHILD} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.PARENT_CHILD);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType RICH TEXT', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.PAGE_ELEMENTS_RICH_TEXT} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.PAGE_ELEMENTS_RICH_TEXT);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType IMAGE', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.IMAGE} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.IMAGE);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType PAGE_SCROLL', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.PAGE_SCROLL} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.PAGE_SCROLL);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType PORTFOLIO', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.PORTFOLIO} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.PORTFOLIO);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType PPT', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.PPT} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.PPT);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType PPTX', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.PPTX} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.PPTX);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType DIAGRAM', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.DIAGRAM} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.DIAGRAM);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType HTML', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.HTML} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.HTML);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType DECISION TREE', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.DECISION_TREE} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.DECISION_TREE);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType INVENTORY_MANAGEMENT', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.INVENTORY_MANAGEMENT} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.INVENTORY_MANAGEMENT);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType LIST DROPDOWN', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.LIST_DROPDOWN} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.LIST_DROPDOWN);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType TAG GROUP', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.TAG_GROUP} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.TAG_GROUP);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType SCRIPT', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.SCRIPT} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.SCRIPT);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType SHORT TEXT', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.PAGE_ELEMENTS_SHORT_TEXT} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.PAGE_ELEMENTS_SHORT_TEXT);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType COLLABORATE', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.COLLABORATE} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.COLLABORATE);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType DECISION TREE', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.DECISION_TREE} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.DECISION_TREE);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType TEXT LINK', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.TEXT_LINK} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.TEXT_LINK);
  });
  it('DxAuthoringItemTypeAvatar - should render property itemType TIF', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.TIF} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.TIF);
  });
  it('DxAuthoringItemTypeAvatar - should render property itemType COPY FILE', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.COPY_FILE} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.COPY_FILE);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType ELEMENTS TEXT', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.PAGE_ELEMENTS_TEXT} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.PAGE_ELEMENTS_TEXT);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType NOTEBOOK REFERENCE', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.NOTEBOOK_REFERENCE} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.NOTEBOOK_REFERENCE);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType MAIL ALL', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.MAIL_ALL} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.MAIL_ALL);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType USER PROFILE ALT', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.USER_PROFILE_ALT} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.USER_PROFILE_ALT);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType LICENSE GLOBAL', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.LICENSE_GLOBAL} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.LICENSE_GLOBAL);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType USER PROFILE', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.USER_PROFILE} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.USER_PROFILE);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType DATA ANALYTICS', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.DATA_ANALYTICS} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.DATA_ANALYTICS);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType REMINDER', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.REMINDER} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.REMINDER);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType LICENSE DRAFT', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.LICENSE_DRAFT} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.LICENSE_DRAFT);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType EVENT WARNING', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.EVENT_WARNING} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.EVENT_WARNING);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType LAYERS EXTERNAL', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.LAYERS_EXTERNAL} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.LAYERS_EXTERNAL);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType SUBFLOW', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.SUBFLOW} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.SUBFLOW);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType XLS', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.XLS} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.XLS);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType XLSX', async () => {
    render(
      html`
         <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.XLSX} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();

    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.XLSX);
  });

  it('DxAuthoringItemTypeAvatar - should render property itemType CONTENT_ITEM with the correct color', async () => {
    render(
      html`
        <dx-item-type-avatar itemType=${ICON_ITEM_TYPE.CONTENT_ITEM} />
      `,
      document.body
    );
    let component = await $('dx-item-type-avatar').getElement();
    await expect(component).toBeDisplayed();
    expect(component).toHaveAttribute('itemType', ICON_ITEM_TYPE.CONTENT_ITEM);

    let avatarElement = await component.$('>>>dx-avatar[data-testid="dx-item-type-avatar"]').getElement();
    expect(avatarElement).toHaveAttribute('color', AVATAR_COLOR.AVATAR_BLUE);
    let divElement = await avatarElement.$('>>>div[data-testid="dx-avatar-div"]').getElement();
    let iconElement = await divElement.$('>>>span[data-testid="dx-avatar-icon-template"]').getElement();
    await expect(iconElement).toBeExisting();
  });

});
