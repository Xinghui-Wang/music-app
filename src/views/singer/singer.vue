<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import BuildSinger from 'common/js/singer'
import ListView from 'components/listview'
import { mapMutations } from 'vuex'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  name: 'Singer',
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new BuildSinger({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new BuildSinger({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => { // charCodeAt() 方法可返回指定位置的字符的Unicode编码
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret) // concat() 方法用于连接两个或多个数组
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped rel="stylus/stylesheet">
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
