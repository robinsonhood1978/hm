<template>
  <div>
    <section id="knowledge-base-content">

      <!-- content -->
      <b-row class="kb-search-content-info match-height">
        <b-col
          v-for="item in filteredKB"
          :key="item.id"
          md="4"
          sm="6"
          class="kb-search-content"
        >
          <b-card
            class="text-center cursor-pointer"
            :img-src="item.img"
            :img-alt="item.img.slice(5)"
            img-top
            @click="$router.push({ name: 'pages-knowledge-base-category', params: { category: item.category } })"
          >
            <h4>{{ item.title }}</h4>
            <b-card-text class="mt-1">
              {{ item.desc }}
            </b-card-text>
          </b-card>
        </b-col>
        <b-col
          v-show="!filteredKB.length"
          cols="12"
          class="text-center"
        >
          <h4 class="mt-4">
            Search result not found!!
          </h4>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BCardText,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardText,
  },
  data() {
    return {
      knowledgeBaseSearchQuery: '',
      kb: [],

    }
  },
  computed: {
    filteredKB() {
      const knowledgeBaseSearchQueryLower = this.knowledgeBaseSearchQuery.toLowerCase()
      return this.kb.filter(item => item.title.toLowerCase().includes(knowledgeBaseSearchQueryLower) || item.desc.toLowerCase().includes(knowledgeBaseSearchQueryLower))
    },
  },
  created() {
    this.$http.get('/kb/data/knowledge_base').then(res => { this.kb = res.data })
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-knowledge-base.scss';
</style>
