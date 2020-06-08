<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper" v-if="recommends.length">
        <slider>
          <div v-for="item in recommends" :key="item.id" class="slider-item">
            <a :href="item.linkUrl">
              <img class="needsclick" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'components/slider/slider'

export default {
  name: 'Recommend',
  data () {
    return {
      recommends: []
    }
  },
  components: {
    Slider
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylus/stylesheet">
  @import '~common/stylus/variable'
  .recommend
    width 100%
    .recommend-content
      height 100%
      overflow hidden
      .slider-wrapper
        overflow hidden
        height 0
        width 100%
        padding-bottom 40%
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
</style>
