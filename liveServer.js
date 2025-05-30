// you shouldn't have to look at this
// you can do it if you want though.

import liveServer from "live-server";
import QRCode from "qrcode";
import { networkInterfaces } from "os";

liveServer.start({
  port: 80,
  host: "0.0.0.0",
  root: "webclient",
  open: false,
});

// print the local IPs as qr codes
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
    if (net.family === familyV4Value && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}

Object.entries(results).forEach(async ([k, v]) => {
  if (!k.includes("vEthernet")) {
    console.log("http://" + v[0]);
    console.log(`
    ${k}

    ip: ${v[0]}

    http (crtl+click): http://${v[0]}

    ${await QRCode.toString("http://" + v[0], {
      type: "terminal",
      errorCorrectionLevel: "H",
    })}
    `);
  }
});
