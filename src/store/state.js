import { palyMode } from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: palyMode.sequence,
  currentIndex: -1,
  disc: {}
}

export default state
