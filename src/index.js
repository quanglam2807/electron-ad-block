// Inspired from https://github.com/Jense5/electron-ad-blocker
import isAdAsync from './is-ad-async';

const defaultOptions = {
  filterTypes: ['ads', 'privacy', 'annoyance', 'social'],
  logger: console,
  onRequest: undefined,
  verbose: true,
};

export const blockAds = (session, userOptions = {}) => {
  const options = Object.assign({}, defaultOptions, userOptions);
  session.webRequest.onBeforeRequest(['*://*./*'], (details, callback) => {
    isAdAsync(options.filterTypes, details.url)
      .then((shouldBeBlocked) => {
        if (shouldBeBlocked && options.verbose) { options.logger.log(`ADBLOCK blocked: ${details.url}`); }
        if (options.onRequest) {
          options.onRequest(details, callback, shouldBeBlocked);
        } else if (shouldBeBlocked) {
          callback({ cancel: true });
        } else {
          callback({ cancel: false });
        }
      });
  });
};

export default {
  blockAds,
};
