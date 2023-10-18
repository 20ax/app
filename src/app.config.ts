import { size } from 'lodash'

export default {
  pages: {
    globalStyle: {
      navigationBarTextStyle: 'black',
      navigationBarBackgroundColor: '#F8F8F8',
      backgroundColor: '#F8F8F8',
    },
    easycom: {
      autoscan: true,
      custom: {
        '^sys$': '@/sys.vue',
        '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      },
    },
    tabBar: {
      color: '#7A7E83',
      selectedColor: '#3cc51f',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '发现',
        },
        {
          pagePath: 'pages/index/index',
          iconPath: 'static/img/create.jpg',
          selectedIconPath: 'static/img/create.jpg',
        },
        {
          pagePath: 'pages/index/index',
          text: '我的',
        },
      ],
    },
  },
  preset: {
    hide: {
      navigationStyle: 'custom',
    },
  },
  uniCloud: true,
}
