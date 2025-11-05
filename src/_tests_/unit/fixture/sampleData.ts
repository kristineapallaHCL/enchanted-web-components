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

const generateHits = (count: number) => {
  const hits = [];
  for (let i = 1; i <= count; i++) {
    hits.push({
      title: `Test Document ${i}`,
      name: `Test Document ${i}`,
      content: `This is test document number ${i}.`,
      author: `Author ${i}`,
      type: i % 2 === 0 ? 'Content' : 'Image',
      tags: [`tag${i}`, 'document'],
      status: i % 3 === 0 ? 'Draft' : 'Published',
      updated: Date.now() - i * 1000,
      contentPath: `/content/test-document-${i}`
    });
  }
  return hits;
};

export const sampleData = {
  hits: {
    total: {
      value: 50,
      relation: 'eq'
    },
    max_score: 0,
    hits: generateHits(50)
  }
};
