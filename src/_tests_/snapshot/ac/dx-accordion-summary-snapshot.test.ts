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
import "../../../components/ac/dx-accordion-summary";

// Helper imports
import {
  appendEnchantedStylingLink,
  SNAPSHOT_WINDOW_HEIGHT,
  SNAPSHOT_WINDOW_WIDTH,
} from "../utils";
import { renderComponent } from "../../utils";

const dxLocalization: Map<string, string> = new Map<string, string>();

dxLocalization.set("accordion.summary.label.text", "Summary Label Text");
dxLocalization.set("accordion.summary.secondary.text", "Summary Secondary Text");

describe("DxAccordion-Summary - Snapshot testing", () => {
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
  it("DxAccordion-summary - should render with label and secondary text enabled", async () => {
    renderComponent(
      html`
        <div
          data-testid="dx-accordion-summary"
          style="display: flex; flex-direction: column; gap: 10px; padding: 10px; width: 400px;"
        >
          <div style="flex: 1;">
            <label style="margin-bottom: 5px;">label and secondary text</label>
            <dx-accordion-summary
              .localization=${dxLocalization}
              label="snapshot label"
              secondaryText="snapshot secondary text"
            ></dx-accordion-summary>
          </div>
        </div>
      `
    );
    let label = await $('>>>div[data-testid="dx-accordion-summary"]');
    await browser.checkElement(
      label,
      "dx-accordion-summary-snapshot-baseline-label-and-secondaryText"
    );
  });
  it("DxAccordion-summary - should render with Localization", async () => {
    renderComponent(
      html`
        <div
          data-testid="dx-accordion-summary"
          style="display: flex; flex-direction: column; gap: 10px; padding: 10px; width: 400px;"
        >
          <div style="flex: 1;">
            <label style="margin-bottom: 5px;">label and secondary text</label>
            <dx-accordion-summary
              .localization=${dxLocalization}
            ></dx-accordion-summary>
          </div>
        </div>
      `
    );
    let label = await $('>>>div[data-testid="dx-accordion-summary"]');
    await browser.checkElement(
      label,
      "dx-accordion-summary-snapshot-baseline-Localization"
    );
  });
});
