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

export const SNAPSHOT_WINDOW_HEIGHT = 1200;
export const SNAPSHOT_WINDOW_WIDTH = 1600;

export const appendEnchantedStylingLink = (): HTMLLinkElement => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/enchanted.css'; // Append the link element to the document's head
  document.head.appendChild(link);
  return link;
};
