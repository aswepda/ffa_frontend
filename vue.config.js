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
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },
}
