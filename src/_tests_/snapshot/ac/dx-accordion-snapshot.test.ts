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
import { html } from "lit";
import { $, browser } from "@wdio/globals";

// Component import
import "../../../components/ac/dx-accordion";
import "../../../components/ac/dx-accordion-summary";

// Helper imports
import {
  appendEnchantedStylingLink,
  SNAPSHOT_WINDOW_HEIGHT,
  SNAPSHOT_WINDOW_WIDTH,
} from "../utils";
import { renderComponent } from "../../utils";

const dxLocalization: Map<string, string> = new Map<string, string>();

dxLocalization.set("accordion.header.text", "Accordion Header");
dxLocalization.set("accordion.secondary.text", "Accordion Secondary Text");

describe("DxAccordion - Snapshot testing", () => {
  before(async () => {
    await browser.setWindowSize(SNAPSHOT_WINDOW_WIDTH, SNAPSHOT_WINDOW_HEIGHT);
  });
  let link: HTMLLinkElement;
  beforeEach(() => {
    link = appendEnchantedStylingLink();
  });
  afterEach(() => {
    document.head.removeChild(link);
  });
  it("DxAccordion- - should render with all properties", async () => {
    renderComponent(
      html`
        <div
          data-testid="dx-accordion"
          style="display: flex; flex-direction: column; gap: 10px; padding: 10px; width: 400px;"
        >
          <div style="flex: 1;">
            <label style="margin-bottom: 5px;">All properties</label>
            <dx-accordion
              .localization=${dxLocalization}
              showCheckbox
              showSecondaryText
              type="outlined"
              label="My custom accordion"
              secondaryText="This is a custom accordion component"
              open
            >
              <dx-accordion-summary
                slot="accordion-items"
                label="security settings"
                secondaryText="Security settings description"
              ></dx-accordion-summary
            ></dx-accordion>
          </div>
        </div>
      `
    );
    let label = await $('>>>div[data-testid="dx-accordion"]');
    await browser.checkElement(
      label,
      "dx-accordion-snapshot-baseline-all-properties"
    );
  });
  it("DxAccordion- - should render when property Disabled", async () => {
    renderComponent(
      html`
        <div
          data-testid="dx-accordion"
          style="display: flex; flex-direction: column; gap: 10px; padding: 10px; width: 400px;"
        >
          <div style="flex: 1;">
            <label style="margin-bottom: 5px;">Disabled</label>
            <dx-accordion
              .localization=${dxLocalization}
              showCheckbox
              showSecondaryText
              type="outlined"
              label="My custom accordion"
              secondaryText="This is a custom accordion component"
              disabled
            ></dx-accordion>
          </div>
        </div>
      `
    );
    let label = await $('>>>div[data-testid="dx-accordion"]');
    await browser.checkElement(
      label,
      "dx-accordion-snapshot-baseline-Disabled-property"
    );
  });
  it("DxAccordion- - should render when type = no outlined", async () => {
    renderComponent(
      html`
        <div
          data-testid="dx-accordion"
          style="display: flex; flex-direction: column; gap: 10px; padding: 10px; width: 400px;"
        >
          <div style="flex: 1;">
            <label style="margin-bottom: 5px;">No Outline</label>
            <dx-accordion
              .localization=${dxLocalization}
              showCheckbox
              showSecondaryText
              type="no-outline"
              label="My custom accordion"
              secondaryText="This is a custom accordion component"
            ></dx-accordion>
          </div>
        </div>
      `
    );
    let label = await $('>>>div[data-testid="dx-accordion"]');
    await browser.checkElement(
      label,
      "dx-accordion-snapshot-baseline-no-outline-property"
    );
  });
  it("DxAccordion- - should render for localization", async () => {
    renderComponent(
      html`
        <div
          data-testid="dx-accordion"
          style="display: flex; flex-direction: column; gap: 10px; padding: 10px; width: 400px;"
        >
          <div style="flex: 1;">
            <label style="margin-bottom: 5px;">Localization</label>
            <dx-accordion
              .localization=${dxLocalization}
              showCheckbox
              showSecondaryText
            ></dx-accordion>
          </div>
        </div>
      `
    );
    let label = await $('>>>div[data-testid="dx-accordion"]');
    await browser.checkElement(
      label,
      "dx-accordion-snapshot-baseline-localization"
    );
  });
});
