const ERR_OK = 0
const path = require('path')
const axios = require('axios')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack (config) {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  },
  devServer: {
    before (app) {
      app.get('/api/getRecommendData', function (req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musics.fcg'
        const jumpPrefixMap = {
          10002: 'https://y.qq.com/n/yqq/album/',
          10014: 'https://y.qq.com/n/yqq/playlist/',
          10012: 'https://y.qq.com/n/yqq/mv/v/'
        }

        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          response = response.data
          if (response.code === ERR_OK) {
            const slider = []
            const discList = []
            const contentSlider = response.focus.data.shelf.v_niche[0].v_card
            const contentDisc = response.recomPlaylist.data.v_hot
            if (contentSlider && contentDisc) {
              for (let i = 0; i < contentSlider.length; i++) {
                const item = contentSlider[i]
                const sliderItem = {}
                sliderItem.id = `${item.id}_${i}`
                const jumpPrefix = jumpPrefixMap[item.jumptype]
                if (!jumpPrefix) {
                  sliderItem.linkUrl = item.id
                } else {
                  const jumpMid = item.subid || item.id
                  sliderItem.linkUrl = jumpPrefix + jumpMid + '.html'
                }
                sliderItem.picUrl = item.cover
                slider.push(sliderItem)
              }
              for (let i = 0; i < contentDisc.length; i++) {
                const item = contentDisc[i]
                const discItem = {}
                discItem.id = `${item.id}_${i}`
                discItem.title = item.title
                discItem.listen_num = item.listen_num
                discItem.imgUrl = item.cover
                discList.push(discItem)
              }
            }
            res.json({
              code: 0,
              data: {
                slider,
                discList
              }
            })
          } else {
            res.json(response)
          }
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  }
}
