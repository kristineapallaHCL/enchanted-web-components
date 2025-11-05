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
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Component imports
import { DxAcBaseElement } from './dx-ac-base-element';

// Helper imports
import { SEARCH_CENTER_LAYOUT_PARTS } from '../../types/cssClassEnums';

/**
* Search template.
*/
@customElement('dx-search-center-layout')
export class DxSearchCenterLayout extends DxAcBaseElement {

  @property({ type: Boolean }) isTagsAvailable = false;

  @property()
  private isFeatureTagCloudEnabled: boolean = false; // isFeatureEnabled(EnumFeatures.TAG_CLOUD)

  render() {
    return html`
      <div part="header-container">
        <div part="header"><slot name="dx-header"></slot></div>
      </div>
      <div part="pagination-container">
        <div part="pagination"><slot name="dx-pagination"></slot></div>
      </div>
      <div part="main">
        <div part="search-input-container"><slot name="search-input-container"></slot></div>  
        <hr part="hr-part">
        <div part="search-result-container">
          <div part=${this.isFeatureTagCloudEnabled && this.isTagsAvailable
              ? SEARCH_CENTER_LAYOUT_PARTS.SEARCH_OUTPUT_CONTAINER
              : SEARCH_CENTER_LAYOUT_PARTS.SEARCH_OUTPUT_CONTAINER_NO_TAGS}>
            <slot name="search-output-container"></slot>
          </div>
          <div part=${this.isFeatureTagCloudEnabled && this.isTagsAvailable
              ? SEARCH_CENTER_LAYOUT_PARTS.TAG_CLOUD_CONTAINER
              : SEARCH_CENTER_LAYOUT_PARTS.TAG_CLOUD_CONTAINER_HIDDEN}>
            <slot name="tag-cloud"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dx-search-center-layout': DxSearchCenterLayout
  }
}
 