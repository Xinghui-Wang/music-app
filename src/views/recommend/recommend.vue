<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div class="wrapper">
          <div class="slider-wrapper" v-if="recommends.length">
            <slider>
              <div v-for="item in recommends" :key="item.id" class="slider-item">
                <a :href="item.linkUrl">
                  <img class="needsclick" @load="loadImage" :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
          <div class="loading-container-one" v-show="!recommends.length">
            <loading></loading>
          </div>
        </div>

        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" @click="selectItem(item)" v-for="item of discList" :key="item.dissid">
              <div class="icon">
                <img v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.dissname"></h2>
                <p class="desc" v-html="item.creator.name"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container-two" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Slider from 'components/slider'
import Scroll from 'components/scroll'
import Loading from 'components/loading/loading'

export default {
  name: 'Recommend',
  data () {
    return {
      recommends: [],
      discList: [],
      checkloaded: false
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created () {
    this._getRecommend()
    this._getDiscList()
    console.log(this.discList)
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    loadImage () {
      if (!this.checkloaded) {
        this.$refs.scroll.refresh()
        this.checkloaded = true
      }
    },
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style lang="stylus" scoped rel="stylus/stylesheet">
  @import '~common/stylus/variable'
  .recommend
    position fixed
    width 100%
    top 88px
    bottom 0
    .recommend-content
      height 100%
      overflow hidden
      .wrapper
        position relative
        width 100%
        overflow hidden
        height 0
        padding-bottom 40%
        vertical-align middle
        .slider-wrapper
          position relative
          width 100%
          overflow hidden
        .loading-container-one
          position: absolute
          width: 100%
          top: 50%
          transform: translateY(-50%)
      .recommend-list
        position relative
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
            flex 0 0 60px
            width 60px
            padding-right 20px
            img
              width 60px
              height 60px
          .text
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            overflow hidden
            font-size $font-size-medium
            .name
              margin-bottom 10px
              color $color-text
            .desc
              color $color-text-d

    .loading-container-two
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
