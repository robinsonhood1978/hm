<template>
  <b-card-code>
    <section>
      <validation-observer ref="simpleRules">
        <b-form @submit.prevent="validationForm">
          <b-row>
            <b-col cols="12">
              <b-form-group>
                <template v-slot:label>
                  {{ $t('Choose Exam Course') }} <span class="text-danger">*</span>
                </template>
                <validation-provider
                  #default="{ errors }"
                  :name="$t('Courses')"
                  rules="required"
                >
                  <v-select
                    v-model="courses"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    multiple
                    label="title"
                    :options="option"
                    @input="() => showMoreInfo()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Col: Left (Parcel Container) -->
            <b-col
              v-if="moreInfo && !examed"
              cols="12"
              xl="9"
              md="8"
            >
              <form-wizard-icon :courses="courses" />
            </b-col>

            <b-col
              v-if="moreInfo && examed"
              cols="12"
              xl="9"
              md="8"
            >
              <b-col
                cols="12"
                class="mb-2"
              >
                <h5 class="mb-0">
                  {{ $t('Finished Exam') }}{{ $store.state.ship2u.evaluation.score }}{{ $t('Score') }}
                </h5>
              </b-col>
              <b-col
                cols="12"
                class="mb-2"
              >
                <h5 class="text-muted">
                  考题分析
                </h5>
              </b-col>
              <form-wizard-view :courses="courses" />
            </b-col>

            <!-- Right Col: Card -->
            <b-col
              v-if="moreInfo && !examed"
              cols="12"
              md="4"
              xl="3"
              class="parcel-actions"
            >

              <!-- Action Buttons -->
              <b-card>

                <!-- Button: DOwnload -->
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  variant="outline-primary"
                  class="mb-75"
                  block
                  @click="Back"
                >
                  {{ $t('Cancel') }}
                </b-button>

                <b-button
                  v-b-toggle.sidebar-parcel-add-payment
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="success"
                  class="mb-75"
                  type="reset"
                  block
                  @click="$router.go()"
                >
                  {{ $t('Reset') }}
                </b-button>

              </b-card>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </section>
  </b-card-code>
</template>

<script>
import { heightTransition } from '@core/mixins/ui/transition'
import BCardCode from '@core/components/b-card-code'
import Ripple from 'vue-ripple-directive'
import {
  ValidationProvider, ValidationObserver,
} from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import {
  BRow, BCol, BCard, BButton, VBToggle, BFormGroup, BForm,
} from 'bootstrap-vue'
// import FormWizardIcon from './OrderWizard.vue'
import FormWizardIcon from './ExamWizard.vue'
import FormWizardView from './ExamViewWizard.vue'

export default {
  components: {
    BCardCode,
    BFormGroup,
    BForm,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BCard,
    BButton,
    FormWizardIcon,
    FormWizardView,
    vSelect,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  mixins: [heightTransition],
  data() {
    return {
      moreInfo: false,
      required,
      courses: [],
      option: [
        { title: '灵修与明白神的旨意【祝健】- 2022年3月春季班', type: 1 },
        { title: '灵修与明白神的旨意【祝健】- 2022年10月秋季班', type: 1 },
      ],
    }
  },
  computed: {
    examed() {
      return (this.$store.state.ship2u.evaluation?.score > 0)
    },
  },
  // Reset Tr Height if data changes
  watch: {
  },
  mounted() {
    this.$store
      .dispatch('ship2u/evaluation')
      .then(() => {
        // console.log('robin:', response)
        this.showMoreInfo()
      })
    this.$store.dispatch('ship2u/course', { title: '灵修与明白神的旨意【祝健】- 2022年3月春季班' })
      .then(() => {
      })
  },
  created() {
  },
  destroyed() {
  },
  methods: {
    showMoreInfo() {
      this.moreInfo = false
      this.courses.forEach(e => {
        if (e.type === 1) {
          this.moreInfo = true
        }
      })
    },
  },
  setup() {
    function Back() {
      this.$router.go(-1)
    }

    return {
      Back,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
