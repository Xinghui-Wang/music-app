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
      app.get('/api/getTopBanner', function (req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musics.fcg'
        const RecommendlinkUrl = 'https://y.qq.com/'

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
            const content = response.focus.data.shelf.v_niche[0].v_card
            if (content) {
              for (let i = 0; i < content.length; i++) {
                const item = content[i]
                const sliderItem = {}
                sliderItem.id = item.id + i
                sliderItem.linkUrl = RecommendlinkUrl
                sliderItem.picUrl = item.cover
                slider.push(sliderItem)
              }
            }
            res.json({
              code: 0,
              data: {
                slider
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
