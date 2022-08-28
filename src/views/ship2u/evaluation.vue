<template>
  <b-card-code>
    <validation-observer ref="simpleRules">
      <b-form @submit.prevent="validationForm">
        <b-row>
          <b-col cols="12">
            <b-form-group>
              <template v-slot:label>
                {{ $t('Courses') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Courses')"
                rules="required"
              >
                <v-select
                  v-model="evaluation.courses"
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

          <b-col
            v-if="moreInfo"
            cols="6"
          >
            <b-form-group
              :label="$t('Video Times')"
              label-for="videotimes"
            >
              <template v-slot:label>
                {{ $t('Video Times') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Video Times')"
                rules="required"
              >
                <v-select
                  v-model="evaluation.video_times"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="common_options"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="moreInfo"
            cols="6"
          >
            <b-form-group
              :label="$t('Book Times')"
              label-for="booktimes"
            >
              <template v-slot:label>
                {{ $t('Book Times') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Book Times')"
                rules="required"
              >
                <v-select
                  v-model="evaluation.book_times"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="common_options"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="moreInfo"
            cols="6"
          >
            <b-form-group
              :label="$t('Week Report Times')"
              label-for="weekReportTimes"
            >
              <template v-slot:label>
                {{ $t('Week Report Times') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Week Report Times')"
                rules="required"
              >
                <v-select
                  v-model="evaluation.weekreport_times"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="common_options"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="moreInfo"
            cols="6"
          >
            <b-form-group
              :label="$t('Offline Interactive Times')"
              label-for="interactiveTimes"
            >
              <template v-slot:label>
                {{ $t('Offline Interactive Times') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Offline Interactive Times')"
                rules="required"
              >
                <v-select
                  v-model="evaluation.interactive_times"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="common_options"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="moreInfo"
            cols="6"
          >
            <b-form-group
              :label="$t('Talking Times')"
              label-for="talkingTimes"
            >
              <template v-slot:label>
                {{ $t('Talking Times') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Talking Times')"
                rules="required"
              >
                <v-select
                  v-model="evaluation.talking_times"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="common_options"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="moreInfo"
            cols="6"
          >
            <b-form-group
              :label="$t('Absence Times')"
              label-for="absenceTimes"
            >
              <template v-slot:label>
                {{ $t('Absence Times') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Absence Times')"
                rules="required"
              >
                <v-select
                  v-model="evaluation.absence_times"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="common_options"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
            >
              {{ $t('Submit') }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card-code>
</template>

<script>
import store from '@/store'
import BCardCode from '@core/components/b-card-code'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  ValidationProvider, ValidationObserver,
} from 'vee-validate'
import { required } from '@validations'
// import VueSelectMultiple from '@/views/forms/form-element/vue-select/VueSelectMultiple.vue'
import vSelect from 'vue-select'
import {
  BRow,
  BCol,
  BFormGroup,
  BForm,
  BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useToast } from 'vue-toastification/composition'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BForm,
    // BFormText,
    BButton,
    // VueSelectMultiple,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      moreInfo: false,
      required,
      common_options: [
        { title: '0次' },
        { title: '1-5次' },
        { title: '5次以上' },
      ],
      option: [
        { title: '灵修与明白神的旨意【祝健】- 2022年3月春季班', type: 1 },
        { title: '灵修与明白神的旨意【祝健】- 2022年10月秋季班', type: 1 },
      ],
    }
  },
  computed: {
    validation() {
      return this.mobile.length > 8 && this.mobile.length < 16
    },
    evaluation() {
      const pf = {
        courses: [],
        video_times: { title: '0次' },
        book_times: { title: '0次' },
        weekreport_times: { title: '0次' },
        interactive_times: { title: '0次' },
        talking_times: { title: '0次' },
        absence_times: { title: '0次' },
      }
      const { evaluation } = this.$store.state.ship2u

      return { ...pf, ...evaluation }
    },
  },
  mounted() {
    store
      .dispatch('ship2u/evaluation')
      .then(() => {
        // console.log('robin:', response)
        this.showMoreInfo()
      })
      .catch(() => {
        const toast = useToast()
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching evaluation',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  },
  methods: {
    showMoreInfo() {
      this.moreInfo = false
      this.evaluation?.courses.forEach(e => {
        if (e.type === 1) {
          this.moreInfo = true
        }
      })
    },
    reset() {
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('ship2u/updateEvaluation', {
              ...this.evaluation,
            })
            .then(response => {
              console.log(response)
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Operation successful',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })

              setTimeout(() => {
                this.$router.go(-1)
              }, 3000)
            })
            .catch(ex => {
              console.log(ex)
            })
        }
      })
    },
  },
  setup() {

  },
}
</script>
