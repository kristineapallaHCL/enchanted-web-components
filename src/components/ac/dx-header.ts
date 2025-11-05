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
import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';

// Component imports
import { DxAcBaseElement } from './dx-ac-base-element';
import './dx-input-textfield';
import './dx-button';
import './dx-badge';

// Helper imports
import { BUTTON_PARTS, HEADER_VARIANT, HEADER_PARTS } from '../../types/cssClassEnums';

// Icon imports
import svgIconBack from '../../static/assets/chevron--left.svg';
import svgFilter from '../../static/assets/filter.svg';
import svgSearchUrl from '../../static/assets/search.svg';

@customElement('dx-header')
@localized()
export class DxHeader extends DxAcBaseElement {

  @property({ type: String }) color = 'rgba(0, 0, 0, .32)'; // equivalent to $BLACK32P in ac.scss
  @property({ type: String }) headerTitle = '';
  @property({ type: Boolean }) showBackIcon = false;

  @property({ type: Boolean }) isSideNavOpen = false;
  @property({ type: Boolean }) disabled = false;
  @property()
  variant: HEADER_VARIANT | undefined = undefined;

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  renderTitle(variant?: HEADER_VARIANT) {
    switch (variant) {
      case HEADER_VARIANT.HEADER_AUTHORING:
        return  html`${this.getMessage('header.authoring.search')}`;
      case HEADER_VARIANT.HEADER_AUTHORING_MODAL_CLOSE:
        return  html`${this.getMessage('header.authoring.search')}`;
      case HEADER_VARIANT.HEADER_ENDUSER:
        return  html`${this.getMessage('header.enduser.search.center.title')}`;
      default:
        return  html`${this.headerTitle}`;
    }
  }

  renderEndSection(variant?: HEADER_VARIANT) {
    switch (variant) {
      case HEADER_VARIANT.HEADER_AUTHORING:
        return html`
          <dx-input-textfield label=""
            exportparts=${HEADER_PARTS.INPUT} 
            placeholder="${this.getMessage('header.enduser.search.placeholder')}"
          >
          </dx-input-textfield>
          <div part=${HEADER_PARTS.HEADER_SPACING_END}>
            <dx-button 
              buttontext=''
              ?outlined="${false}"
              data-testid="dx-filter-button"
              imgurl="${svgFilter}"
            >
            </dx-button>
            <dx-badge part=${HEADER_PARTS.BADGE_DOT}/>
          </div>`;
      case HEADER_VARIANT.HEADER_AUTHORING_MODAL_CLOSE:
        return html`
          <div part=${HEADER_PARTS.HEADER_SPACING_END}>
            <dx-button
              ?disabled="${this.disabled || nothing}"
              imgurl="${svgSearchUrl}"
              buttontext="${this.getMessage('header.enduser.search')}"
              exportparts="${Object.values(BUTTON_PARTS).join(',')}"
              ?outlined="${true}"
            >
            </dx-button>
          </div>`;
      case HEADER_VARIANT.HEADER_ENDUSER:
        return html`
          <div part=${HEADER_PARTS.HEADER_SPACING_END}></div>`;
      default:
        return null;
    }
  }
  render() {
    return html`
      <div part=${HEADER_PARTS.HEADER}>
        <div part=${HEADER_PARTS.SUB_HEADER_START}>
          <div part=${this.isSideNavOpen ? HEADER_PARTS.HEADER_SPACING_START_HAMBURGER : HEADER_PARTS.HEADER_SPACING_START} } >
            ${this.showBackIcon
              ? html`
              <dx-button 
              buttontext=''
              ?outlined="${false}"
              data-testid="dx-back-button"
              imgurl="${svgIconBack}"
            >
            </dx-button>`
              : nothing
            }
          </div>
          <div part=${HEADER_PARTS.H6}>
            ${this.renderTitle(this.variant)}
          </div>
        </div>
        <div part=${HEADER_PARTS.SUB_HEADER_END}>
          ${this.renderEndSection(this.variant)}
        </div>
      </div>
      <hr part=${HEADER_PARTS.HR_PART}>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'dx-header': DxHeader
  }
}
