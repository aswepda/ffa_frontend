module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: "Food & Fitness Agent",
    manifestOptions: {
      short_name: "FFA"
    },
    themeColor: '#3B462D',
    msTileColor: '#000000',
    iconPaths: {
      msTileImage: 'img/icons/android-chrome-192x192.png'
    }
  },
}

const { gitDescribeSync } = require('git-describe');
process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash