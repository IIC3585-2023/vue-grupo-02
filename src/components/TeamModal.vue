<template>
  <dialog ref="modal" @keydown.esc="close" class="team-modal">
    <div class="modal-header">
        <h5 class="modal-title">Select to add</h5>
        <div class="btn-close" aria-label="Close" @click="close"></div>
      </div>
    <div class="team-container">
      <TeamCard v-for="(pokemon, index) in team" :key="index" :pokemon="pokemon" :index="index" @select="select"/>
    </div>
  </dialog>
</template>
<script>

import { mapState } from 'vuex'
import TeamCard from '@/components/TeamCard.vue'
    
export default {
  name: 'TeamModal',
  components: {
    TeamCard,
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['team'])
  },
  methods: {
    close() {
      this.$emit('close')
    },
    select(index) {
      this.$emit('select', index)
      this.close()
    }
  },
  watch: {
    show: function (val) {
      if (val) {
        this.$refs.modal.showModal()
      } else {
        this.$refs.modal.close()
      }
    }
  },
}
</script>
  
<style scoped>
.team-modal {
  border: none !important;
  border-radius: 20px;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-right: auto;
  margin-left: auto;
}

.team-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-close {
  cursor: pointer;
}

</style>