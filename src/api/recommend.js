// import jsonp from 'common/js/jsonp'
import { commonParams } from './config'
import axios from 'axios'
import { Object } from 'core-js'

export function getRecommend () {
  // const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const url = '/api/getTopBanner'

  // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    inCharset: 'utf8',
    format: 'json',
    '-': 'recom' + (Math.random() + '').replace('0.', ''),
    sign: 'zzakjds280zoarxz6rff15c4441255ee9ef959d8dacccc3f88',
    data: {
      'comm': {
        'ct': 24
      },
      'category': {
        'method': 'get_hot_category',
        'param': {
          'qq': ''
        },
        'module': 'music.web_category_svr'
      },
      'recomPlaylist': {
        'method': 'get_hot_recommend',
        'param': {
          'async': 1,
          'cmd': 2
        },
        'module': 'playlist.HotRecommendServer'
      },
      'playlist': {
        'method': 'get_playlist_by_category',
        'param': {
          'id': 8,
          'curPage': 1,
          'size': 40,
          'order': 5,
          'titleid': 8
        },
        'module': 'playlist.PlayListPlazaServer'
      },
      'new_song': {
        'module': 'newsong.NewSongServer',
        'method': 'get_new_song_info',
        'param': {
          'type': 5
        }
      },
      'new_album': {
        'module': 'newalbum.NewAlbumServer',
        'method': 'get_new_album_info',
        'param': {
          'area': 1,
          'sin': 0,
          'num': 20
        }
      },
      'new_album_tag': {
        'module': 'newalbum.NewAlbumServer',
        'method': 'get_new_album_area',
        'param': {}
      },
      'toplist': {
        'module': 'musicToplist.ToplistInfoServer',
        'method': 'GetAll',
        'param': {}
      },
      'focus': {
        'module': 'music.musicHall.MusicHallPlatform',
        'method': 'GetFocus',
        'param': {}
      }
    }
  })

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return res.data
  })
}
