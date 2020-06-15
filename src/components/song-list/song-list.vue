<template>
  <div class="song-list">
    <ul>
      <li class="item" @click="selectItem(song, index)" v-for="(song, index) in songs" :key="song.id">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => { return [] }
    }
  },
  methods: {
    getDesc (song) {
      return `${song.singer}·${song.album}`
    },
    selectItem (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display flex
      // align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。
      align-items center
      box-sizing border-box
      height 64px
      font-size $font-size-medium
      .content
        flex 1
        line-height 20px
        overflow hidden
        .name
          no-wrap()
          color $color-text
        .desc
          no-wrap()
          margin-top 4px
          color $color-text-d
</style>
