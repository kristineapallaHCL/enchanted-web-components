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

import { KeyboardInputKeys } from "../utils/keyboardEventKeys";
import { browser } from '@wdio/globals';
import { SHORT_PAUSE } from "./constants";

export const initDataGridLocalizedStrings: () => Map<string, string> = () => {
  // Initialize localized string resources
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
  return dxLocalization;
};

export const pressKeyAndWait = async (keys: string[] | KeyboardInputKeys[] | string, waitTime: number = SHORT_PAUSE) => {
  await browser.keys(keys);
  await browser.pause(waitTime);
};
