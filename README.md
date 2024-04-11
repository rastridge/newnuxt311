# NUXT 3 Version of Buffalo Rugby Club Website

## Originally based on

https://github.com/sfxcode/nuxt3-primevue-starter

# Overview

- Website created with Vue / Nuxt 3 using vscode editor
- Stored in repository at Github
- Build and Deployed at Netlify
- App server accesses data from mysql database 'buffalorugby' at Dreamhost ISP
- App uploads and stores images at 'media.buffalorugby.org' at Dreamhost

# Project setup and usage

All supporting accounts log in credentials found at buffalorugby.org /admin supporting accounts using username 'rastridge' password ?

## On development machine

Install node:

```
nvm use stable (v21.5.0)
```

Install dependencies:

```
yarn install
```

Run development server:

```
yarn dev
```

## Use VSCode github feature to commit/push to repository

- github repository "rastridge/newnuxt311"

## Change to the repository triggers Netlify build

Netlify site "buffalorugby"

- site sourced from github repository "rastridge/newnuxt311"
- All ENV variables must be registered

- Set up Netlify custom external domain for site 'buffalorugby.org' via Dreamhost while maintaining ssh and email functions and 'media.buffalorugby.org' on domain buffalorugby.org at Dreamhost

```
https://superchlorine.com/2021/01/how-to-set-up-netify-custom-domain-via-dreamhost/
```

# Supporting APIs

A number of outside services are used to implement apps

## Sending Emails

ElasticEmail
setup and Usage

```
https://app.elasticemail.com/login
```

## Sending Text Messages

- Twilio - text messaging

```
https://www.twilio.com/login
```

## API to support image uploads and requests

- Dreamhost - media.buffalorugby.org

```
https://panel.dreamhost.com/
```

Setup

DANGER - all images are stored in 'public' - DO NOT OVERWRITE

- Upload js server '~/Code/brc.org.nuxt3/nuxt3-brc-media-api' to dreamhost

```
rsync -av --delete --exclude "ecosystem.config.js" --exclude "app.js" --exclude "/public" --exclude "logs" --exclude "/node_modules" --exclude ".git" --exclude ".gitignore" ~/Code/brc.org.nuxt3/nuxt3-brc-media-api/ rastridge@buffalorugby.org:/home/rastridge/media.buffalorugby.org/
```

- enable Proxy server on media.buffalorugby.org

```
alias shell='ssh rastridge@vps30249.dreamhostps.com'
```

Maintain server with pm2

- Start server

```
pm2 ecosystem.config.js
```

- cronjob to restart servers using 'pm2 resurrect'
