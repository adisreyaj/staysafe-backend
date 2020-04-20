<h1 align="center">Welcome to Stay Safe 👋</h1>
<p align="center">
  <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE">
    <img alt="License: Apache License 2.0" src="https://img.shields.io/badge/license-Apache License 2.0-yellow.svg" target="_blank" />
  </a>

  <a href="https://github.com/frinyvonnick/gitmoji-changelog">
    <img src="https://img.shields.io/badge/changelog-gitmoji-brightgreen.svg" alt="gitmoji-changelog">
  </a>
  <a href="https://twitter.com/AdiSreyaj">
    <img alt="Twitter: Adithya Sreyaj" src="https://img.shields.io/twitter/follow/AdiSreyaj.svg?style=social" target="_blank" />
  </a>
</p>

> Stay Safe is an application to track and learn about Pandemic disease and how to fight them.

## 🚀 Usage

Make sure you have the pre-requisites installed on your system. You can start by cloning/downloading the repo to your local system.

1. Install the dependencies of the applications

```
npm install
```

2. Copy the `.env.example` to another file and name it as `.env`

```
cp .env.example .env
```

3. Start the application using the command

```
npm run start:dev
```

<br>

## 🔥 Services Used

1. **Firebase** - for push notifications
1. **Twilio** - for SMS messages
1. **SendGrid** - for Emails notifications
1. **NewsAPI** - for getting related news
1. **RapidAPI** - for statistic data

<br>

## 🛠 Environment Variables

```
#Application Configuration
PORT=
CACHE_EXPIRY_SECONDS=
ENCRYPT_KEY=

#API Configurations
X_RAPIDAPI_HOST=
X_RAPIDAPI_KEY=
WORLD_STATS_URL=
WORLD_TOTAL_NUMBERS=
INDIA_STATS_URL=

#News API Configuration
NEWSAPI_KEY=
NEWSAPI_URL=

#DB Configurations
MONGODB_URI=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=

#Twilio Configurations
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

TWILIO_VERIFICATION_APP_SID=

SENDGRID_API_KEY=
FROM_EMAIL=

# Firebase DB URL
FIREBASE_DB_URI=
```

<br>

<hr>

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check [issues page](https://github.com/adisreyaj/staysafe-backend/issues) if you want to contribute.

## Author

👤 **Adithya Sreyaj**

- Twitter: [@AdiSreyaj](https://twitter.com/AdiSreyaj)
- Github: [@adisreyaj](https://github.com/adisreyaj)

## 👍🏼 Show your support

Please ⭐️ this repository if this project helped you!

## 📝 License

Copyright © 2020 [Adithya Sreyaj](https://github.com/adisreyaj).<br />

This project is [Apache License 2.0](https://github.com/adisreyaj/staysafe-backend/blob/master/LICENSE.md) licensed.
