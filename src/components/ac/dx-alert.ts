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
import { localized } from '@lit/localize';

// Component imports
import { DxAcBaseElement } from './dx-ac-base-element';
import './dx-svg-icon';

// Helper imports
import { ALERT, ALERT_SEVERITY, ALERT_VARIANTS } from '../../types/cssClassEnums';

// Icon imports
import { svgIconWarning } from '../../static/assets/svg-icon-warning';
import { svgIconSuccess } from '../../static/assets/svg-icon-success';
import { svgIconError } from '../../static/assets/svg-icon-error';
import { svgIconInfo } from '../../static/assets/svg-icon-info';

/**
 * Alert component.
 */
@customElement('dx-alert')
@localized()
export class DxAlert extends DxAcBaseElement {

  @property({ type: String })
  message = '';

  @property({ type: Number })
  width = 240;

  @property({ type: String })
  variant = 'contained';

  @property({ type: String })
  severity = 'info';

  private getAlertPart(): string {
    switch (this.severity) {
      case ALERT_SEVERITY.ALERT_INFO:
        if (this.variant === ALERT_VARIANTS.ALERT_CONTAINED) {
          return ALERT.ALERT_CONTAINED_INFO;
        } else {
          return ALERT.ALERT_OUTLINED_INFO;
        }
      case ALERT_SEVERITY.ALERT_ERROR:
        if (this.variant === ALERT_VARIANTS.ALERT_CONTAINED) {
          return ALERT.ALERT_CONTAINED_ERROR;
        } else {
          return ALERT.ALERT_OUTLINED_ERROR;
        }
      case ALERT_SEVERITY.ALERT_WARNING:
        if (this.variant === ALERT_VARIANTS.ALERT_CONTAINED) {
          return ALERT.ALERT_CONTAINED_WARNING;
        } else {
          return ALERT.ALERT_OUTLINED_WARNING;
        }
      case ALERT_SEVERITY.ALERT_SUCCESS:
        if (this.variant === ALERT_VARIANTS.ALERT_CONTAINED) {
          return ALERT.ALERT_CONTAINED_SUCCESS;
        } else {
          return ALERT.ALERT_OUTLINED_SUCCESS;
        }
      default:
        return '';
    }
  }
  
  // eslint-why need to allow any kind of type for data property
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getAlertIcon(): any {
    switch (this.severity) {
      case ALERT_SEVERITY.ALERT_INFO:
        return svgIconInfo;
      case ALERT_SEVERITY.ALERT_ERROR:
        return svgIconError;
      case ALERT_SEVERITY.ALERT_WARNING:
        return svgIconWarning;
      case ALERT_SEVERITY.ALERT_SUCCESS:
        return svgIconSuccess;
      default:
        return '';
    }
  }

  private getAlertSVG(): string {
    switch (this.severity) {
      case ALERT_SEVERITY.ALERT_INFO:
        return ALERT.ALERT_SVG_INFO;
      case ALERT_SEVERITY.ALERT_ERROR:
        return ALERT.ALERT_SVG_ERROR;
      case ALERT_SEVERITY.ALERT_WARNING:
        return ALERT.ALERT_SVG_WARNING;
      case ALERT_SEVERITY.ALERT_SUCCESS:
        return ALERT.ALERT_SVG_SUCCESS;
      default:
        return '';
    }
  }

  render() {
    return html`
      <div part="${ALERT.ALERT_DIV_ROOT} ${this.getAlertPart()}" style="width:${this.width}px">
          <dx-svg-icon .icon=${this.getAlertIcon()} ?useCurrentColor=${false} part="${this.getAlertSVG()}"></dx-svg-icon>
          <span>${this.message}</span>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dx-alert': DxAlert
  }
}
