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
import { customElement, property } from 'lit/decorators.js';
import { html, nothing, TemplateResult } from 'lit';

// Component imports
import { DxAcBaseElement } from './dx-ac-base-element';
import './dx-badge';
import './dx-icon-button';

// Helper imports
import { ICON_BUTTON_SIZES, TOGGLE_BUTTON_PARTS } from '../../types/cssClassEnums';
// import { ICON_BUTTON_EXPORT_PARTS } from '../exportParts';

@customElement('dx-toggle-button')
export class DxToggleButton extends DxAcBaseElement {
  @property({ type: Boolean })
  singleButton = false;

  @property({ type: Boolean })
  toggleOn = false;

  @property({ type: Boolean })
  showBadge = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  outlined = false;

  @property({ type: String })
  selectedValue = '';

  @property({ attribute: false })
  iconUrls: string[] = [];

  @property({ attribute: false })
  values: string[] = [];

  @property({ type: String })
  singleButtonTitle = '';

  @property({ type: String })
  singleButtonAria = '';

  @property()
  icon: TemplateResult | undefined;

  private handleClick(event: Event) {
    event.stopPropagation();
    const target = event.currentTarget as HTMLButtonElement;
    if (target.value !== this.selectedValue) {
      const buttonClickEvent = new CustomEvent('click', { 
        detail: { value: target.value },
      });
      this.dispatchEvent(buttonClickEvent); 
    }
  }
 
  private partAttributeDecider(part: string): string {
    let returnPart = part;

    switch (part) {
      case TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON_DIV: {
        if (this.outlined) {
          returnPart = TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON_DIV_OUTLINED;
        }
        return returnPart;
      }
      case TOGGLE_BUTTON_PARTS.FIRST_BUTTON: {
        if (this.selectedValue === this.values[0]) {
          returnPart = TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON_SELECTED;
        } else {
          returnPart = TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON;
        }
        return returnPart;
      }
      case TOGGLE_BUTTON_PARTS.SECOND_BUTTON: {
        if (this.selectedValue === this.values[1]) {
          returnPart = TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON_SELECTED;
        } else {
          returnPart = TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON;
        }
        return returnPart;
      }
      case TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON_ICON: {
        return returnPart;
      }
      default:
        return returnPart;
    }
  }

  private getButtonAttribute(): string {
    if (this.toggleOn) {
      return TOGGLE_BUTTON_PARTS.TOGGLE_ON_SINGLE_BUTTON;
    }
    return TOGGLE_BUTTON_PARTS.TOGGLE_OFF_SINGLE_BUTTON;
  }

  render() {
    return html`
      <div data-testid="dx-toggle-button-div" part=${this.partAttributeDecider(TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON_DIV)}>
      ${this.singleButton === true ? html`
        ${this.showBadge === true
        ? html`<dx-badge data-testid="dx-badge" part='${TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON_BADGE}'></dx-badge>`
        : ''}
        <dx-icon-button
          title=${this.singleButtonTitle}
          aria-label=${this.singleButtonAria}
          role='button'
          tabindex='0'
          withPadding
          part="${TOGGLE_BUTTON_PARTS.TOGGLE_SINGLE_BUTTON} ${this.getButtonAttribute()}"
          ?disabled=${this.disabled || nothing}
          size=${ICON_BUTTON_SIZES.MEDIUM}
          .icon=${html `${this.icon}`}
          data-testid="dx-toggle-single-button"
        >
        </dx-icon-button>
        `
        : html`
          <button
            data-testid="dx-toggle-button-first"
            part=${this.partAttributeDecider(TOGGLE_BUTTON_PARTS.FIRST_BUTTON)}
            @click=${this.handleClick}
            disabled=${this.disabled || nothing}
            value=${this.values[0]}
          >
            <img
              src="${this.iconUrls[0]}"
              alt="${this.iconUrls[0]}"
              part=${this.partAttributeDecider(TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON_ICON)}
              data-testid="dx-toggle-button-img"
            />
          </button>
          <button
            data-testid="dx-toggle-button-second"
            part=${this.partAttributeDecider(TOGGLE_BUTTON_PARTS.SECOND_BUTTON)}
            @click=${this.handleClick}
            disabled=${this.disabled || nothing}
            value=${this.values[1]}
          >
            <img
              src="${this.iconUrls[1]}"
              alt="${this.iconUrls[1]}"
              part=${this.partAttributeDecider(TOGGLE_BUTTON_PARTS.TOGGLE_BUTTON_ICON)}
              data-testid="dx-toggle-button-img"
            />
          </button>
        `}
      </div>
    `;
  }
}
 
declare global {
  interface HTMLElementTagNameMap {
    'dx-toggle-button': DxToggleButton;
  }
}
 