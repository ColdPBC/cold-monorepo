'use strict';

// A fixed, unreachable proxy blocks external HTTP(S)/WebSocket traffic at the
// Chromium network layer, including requests made by service workers. Explicit
// bypasses allow only our local Storybook/mock server. No proxy fallback exists.
module.exports = {
  headless: true,
  proxy: {
    server: 'http://127.0.0.1:9',
    bypass: '<-loopback>,127.0.0.1,localhost',
  },
  args: [
    '--disable-quic',
    '--force-webrtc-ip-handling-policy=disable_non_proxied_udp',
  ],
};
