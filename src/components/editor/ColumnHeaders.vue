<template lang="html">
<div class="column is-12-mobile
                   is-one-third-tablet
                   is-one-quarter-desktop"
     style="padding-right: 20px;">
  <div class="field is-hidden-mobile" style="padding-bottom: 5px;">
    <br class="title">
  </div>
  <!--These 2 headers are hidden on mobile,
  and are replaced by another 2 in the editor-->
  <div class="field is-hidden-mobile" style="padding-bottom: 5px;">
    <h1 class="title">Chords</h1>
  </div>
  <div class="field is-hidden-mobile" style="padding-bottom: 5px;">
    <h1 class="title">Melody</h1>
  </div>
  <div class="columns is-mobile is-gapless field" style="margin-bottom: 13px;">
    <div class="column">
      <h1 class="title">Rule</h1>
    </div>
    <app-rule-dropdown class="column"
                       :value="projectDefaultRule"
                       @input="updateProjectDefaultRule($event)">
    </app-rule-dropdown>
  </div>
  <div class="field"  style="margin-bottom: 13px;">
    <h1 class="title">Instruments</h1>
  </div>
  <transition-group name="list" tag="div">
    <app-instrument-header v-for="(id, index) in instrumentOrder"
                           :key="id"
                           :instrument="instruments[id]"
                           class="list-item"/>
    <a class="button is-primary is-outlined is-medium list-item"
       style="width: 100%;"
       @click="addInstrument"
       key="button">New Instrument</a>
    <hr class="list-item" key="hr">
  </transition-group>

</div>
</template>

<script>
import RuleDropdown from './RuleDropdown'
import InstrumentHeader from './InstrumentHeader'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentProjectId',
      'projectDefaultRule',
      'instruments',
      'instrumentOrder'
    ])
  },
  methods: {
    updateProjectDefaultRule (rule) {
      let projectId = this.currentProjectId
      this.$store.commit('updateProjectDefaultRule', [projectId, rule])
    },
    addInstrument () {
      let projectId = this.currentProjectId
      this.$store.commit('addInstrument', projectId)
    }
  },
  components: {
    'app-rule-dropdown': RuleDropdown,
    'app-instrument-header': InstrumentHeader
  }
}
</script>

<style lang="css" scoped>
.column-list {
}
.list-item {
  transition: all 0.2s;
}
.list-enter, .list-leave-to{
  opacity: 0;
}
.list-leave-to {

  overflow: hidden;
}
.list-leave-active {
  display: none;
}
</style>
