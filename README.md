# XMR Stak Monitor

![image](https://imgur.com/ZSRAjsQ.jpg)

## About

This app was created by me, RayLehnhoff. If you want to support future development of this dashboard, buy me a beer, or otherwise throw XMR my way, my wallet address is: `42XXeiS1eYLj9EKYqcDE6FHivg7wead8x9MVkZmggMGHDpmJ9yoZqMD5XbdPaNRmBq4tSXsuwfn7gLgwB781YbqHCKbNPCt`

## Project Description

This monitor serves as a dashboard for users that miner on several devices.

This monitor uses nodejs, express, and angular2.

## Get Started

We assume that you have a running version of nodejs on your computer. If you don't have it, you will need to [download it](http://nodejs.org) from the nodejs website.

1. Download the Project
1. Modify the minersconfig.ts file in [server/minersconfig.ts](https://github.com/Raylehnhoff/XMR-Stak-Monitor/blob/master/server/minersconfig.ts) to match your setup:

  The minersconfig file should look somewhat like this:

````typescript
  export const miners = {
      "miners":[
          {"name":"Miner", "url":"http://192.168.86.72:10080", "username":"", "password":""},
          {"name":"Server", "url":"http://192.168.86.4:60080", "username":"admin", "password":"admin"},
          {"name":"Desktop", "url":"http://localhost:10080", "username":"", "password":""}
      ]
  }
````

  The app will append the `/api.json` URL, so do not include it.

  These URLs can be either remote or local -- it doesn't matter.

1. Open a terminal/command shell, change the directory to the XMR-STAK-Monitor folder and run:
  `npm install`
  `npm run start`

1. Browse to [http://localhost:4200](http://localhost:4200) -- the dashboard should now load.

## Changing things

If you want to change the port the server runs on, you will need to modify the file in [server/config.ts](https://github.com/Raylehnhoff/XMR-Stak-Monitor/blob/master/server/config.ts) -- by default, it runs on port 4300, with the angular (client app/dashboard) running on port 4200. To change the angular app's port, modify [protractor.conf.js](https://github.com/Raylehnhoff/XMR-Stak-Monitor/blob/master/protractor.conf.js#L15) and change it to whatever you want.

