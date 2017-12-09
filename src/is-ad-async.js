// Modified from https://raw.githubusercontent.com/Jense5/is-ad/master/src/index.js

import fs from 'fs';
import path from 'path';

import { AdBlockClient, FilterOptions } from '@webcatalog/ad-block/build/Release/ad-block.node';

import filterSources from './filter-sources';

let client;

const arraysIdentical = (a1, a2) =>
  a1.length === a2.length && a1.every((v, i) => v === a2[i]);


let initializedFilterTypes = null;
const initializeAsync = (filterTypes) => {
  if (Array.isArray(initializedFilterTypes)
    && arraysIdentical(initializedFilterTypes, filterTypes)) return Promise.resolve();

  const supportedFilterTypes = Object.keys(filterSources);

  client = new AdBlockClient();

  const p = filterTypes.map(filterType =>
    new Promise((resolve, reject) => {
      try {
        if (supportedFilterTypes.includes(filterType)) {
          const bufferPath = path.resolve(__dirname, '..', 'dist', `${filterType}.buffer`);

          const buffer = fs.readFileSync(bufferPath);
          client.deserialize(buffer);
          initializedFilterTypes = filterTypes;
        }

        resolve();
      } catch (err) {
        reject(err);
      }
    }),
  );

  return Promise.all(p);
};

const isAdAsync = (filterTypes, request, base) =>
  initializeAsync(filterTypes)
    .then(() => client.matches(request, FilterOptions.noFilterOption, base));

export default isAdAsync;
