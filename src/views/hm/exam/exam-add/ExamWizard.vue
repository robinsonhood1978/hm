<template>
  <div>
    <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      finish-button-text="提交答案"
      back-button-text="上一步"
      next-button-text="下一步"
      class="steps-transparent mb-3"
      @on-complete="formSubmitted"
    >
      <!-- account detail tab -->
      <tab-content
        title="概念认知题(七题)"
        icon="feather icon-file-text"
        :before-change="validationStep1"
      >
        <b-row
          v-for="(ex, index) in step1"
          :key="ex.question"
        >
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ index+1 }}. {{ ex.question }}
            </h5>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <div class="demo-vertical-spacing">
                <b-form-radio
                  v-for="answer in ex.answers"
                  :key="answer.title"
                  v-model="ex.answer"
                  :name="'step1-'+index+'-radio'"
                  :value="answer.value"
                >
                  {{ answer.title }}
                </b-form-radio>

              </div>
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0" />
          </b-col>
        </b-row>
      </tab-content>

      <tab-content
        title="操练实践题(七题)"
        icon="feather icon-file-text"
        :before-change="validationStep2"
      >
        <b-row
          v-for="(ex, index) in step2"
          :key="ex.question"
        >
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ index+1 }}. {{ ex.question }}
            </h5>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <div class="demo-vertical-spacing">
                <b-form-radio
                  v-for="answer in ex.answers"
                  :key="answer.title"
                  v-model="ex.answer"
                  :name="'step2-'+index+'-radio'"
                  :value="answer.value"
                >
                  {{ answer.title }}
                </b-form-radio>

              </div>
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0" />
          </b-col>
        </b-row>
      </tab-content>

      <tab-content
        title="属灵收获题(七题)"
        icon="feather icon-file-text"
      >
        <b-row
          v-for="(ex, index) in step3"
          :key="ex.question"
        >
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              {{ index+1 }}. {{ ex.question }}
            </h5>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <div class="demo-vertical-spacing">
                <b-form-radio
                  v-for="answer in ex.answers"
                  :key="answer.title"
                  v-model="ex.answer"
                  :name="'step3'+index+'-radio'"
                  :value="answer.value"
                >
                  {{ answer.title }}
                </b-form-radio>

              </div>
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0" />
          </b-col>
        </b-row>
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormRadio,
} from 'bootstrap-vue'

export default {
  components: {
    FormWizard,
    BFormRadio,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  props: {
    courses: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      pressed: false,
      step1: [
        {
          question: '灵修和明白神的旨意是二个不同的属灵操练，它们之间最大的区别是什么?',
          answer: '',
          answers: [
            { title: '操练人的灵和操练神的灵', value: 'A' },
            { title: '认识人里面的感动和神外在的带领', value: 'B' },
            { title: '三个基本功的区别', value: 'C' },
          ],
        },
        {
          question: '什么是圣灵的风动?它的意思是',
          answer: '',
          answers: [
            { title: '南风啊，吹来吧!', value: 'A' },
            { title: '老师教导学生在旷野的个人经历', value: 'B' },
            { title: '耶稣解释圣灵运行和工作的特点', value: 'C' },
          ],
        },
        {
          question: '“事无巨细，随处多方，点点滴滴”，这句话是希望鼓励弟兄姊妹什么?',
          answer: '',
          answers: [
            { title: '不论时间地点环境，留意操练', value: 'A' },
            { title: '不要怕鸡毛蒜皮的麻烦', value: 'B' },
            { title: '注意这一种三点一线的方法', value: 'C' },
          ],
        },
        {
          question: '为什么说灵修明白神旨意的操练是一把金钥匙?',
          answer: '',
          answers: [
            { title: '因为人生的门很多，但神不一定给我们钥匙', value: 'A' },
            { title: '因为人生其实门不多，但路却是很多', value: 'B' },
            { title: '因为可以打开神要带领我们进去的门', value: 'C' },
          ],
        },
        {
          question: '什么是圣灵的感动?以下的哪一个圣经概念可以解释圣灵的感动?',
          answer: '',
          answers: [
            { title: '“照明心中的眼睛”(以弗所书 1:18)', value: 'A' },
            { title: '“想起主说的话”(约翰福音 14:26)', value: 'B' },
            { title: '以上全对', value: 'C' },
          ],
        },
        {
          question: '灵修七步的操练是希望给我们一种什么操练?',
          answer: '',
          answers: [
            { title: '操练并预备好，可以报名参加中级班', value: 'A' },
            { title: '有纪律、有规范、和有素养的灵觉操练', value: 'B' },
            { title: '操练怎样从一步切入，然后七步到位', value: 'C' },
          ],
        },
        {
          question: '为什么说我们操练的七步灵修是站在巨人的肩膀上?',
          answer: '',
          answers: [
            { title: '初代教父是巨人，但他们的方法今天不能解决我们的困境', value: 'A' },
            { title: '清教徒是巨人，但他们都是只走修道院路线的', value: 'B' },
            { title: '前人灵修的集大成是巨人宝库，我们不但要学习做对的人，还要做对的事', value: 'C' },
          ],
        },
      ],
      step2: [
        {
          question: '为什么说一个基督徒一天当中最好经历五次神的同在?',
          answer: '',
          answers: [
            { title: '因为不亲手做工，就不可以吃饭', value: 'A' },
            { title: '因为一天经历五次，才会在一生中像穆勒弟兄一样经历五万次', value: 'B' },
            { title: '因为累积起来就会有神同在的经验增长和信心的成长', value: 'C' },
          ],
        },
        {
          question: '灵修操练没有感觉是因为什么?',
          answer: '',
          answers: [
            { title: '可能因为太忙，心里长了老茧', value: 'A' },
            { title: '可能因为这种方法有问题', value: 'B' },
            { title: '不知道什么原因，但可能需要更多的耐心和个性化的辅导', value: 'C' },
          ],
        },
        {
          question: '灵修操练出勤表的目的是什么?',
          answer: '',
          answers: [
            { title: '主要是为了学员们真实记录自己的属灵恩赐', value: 'A' },
            { title: '主要是为了完成老师布置的作业', value: 'B' },
            { title: '主要是为了操练有规律的灵修习惯', value: 'C' },
          ],
        },
        {
          question: '参加本课程最大的益处是',
          answer: '',
          answers: [
            { title: '多上了十二节课，比较实惠', value: 'A' },
            { title: '认识了一些同学，他们都是很优秀的人', value: 'B' },
            { title: '藉示范、举例、和辅导，学习与老师双向互动', value: 'C' },
          ],
        },
        {
          question: '老师在课上的实操举例，多半是为了什么目的?',
          answer: '',
          answers: [
            { title: '老师有启示，希望我们为了神国追求高大上的事', value: 'A' },
            { title: '老师有爱心，希望边剥洋葱式教学，边让我们享受洋葱的刺激', value: 'B' },
            { title: '老师有经验，希望举一反三地让我们知道如何运用', value: 'C' },
          ],
        },
        {
          question: '延伸增加的十二课是为了达到以下的什么目的?',
          answer: '',
          answers: [
            { title: '了解如何打开国度连接各个领域的门', value: 'A' },
            { title: '分享和展望神可能在我们的网课和校友中作“比这更大的事”', value: 'B' },
            { title: '以上全对', value: 'C' },
          ],
        },
        {
          question: '本课程结束之后，最不容易继续学习的原因是什么?',
          answer: '',
          answers: [
            { title: '习惯上自己还是喜欢“填鸭式”的听道，结束后就没有道听了', value: 'A' },
            { title: '如果没有小组，就不能继续学了', value: 'B' },
            { title: '没有细水长流地培养出每天操练的习惯', value: 'C' },
          ],
        },
      ],
      step3: [
        {
          question: '概括地说，本课程期待学员们的收获是',
          answer: '',
          answers: [
            { title: '知道，做到，得到', value: 'A' },
            { title: '知道，行道，得道', value: 'B' },
            { title: '上述二个答案每一个都对', value: 'C' },
          ],
        },
        {
          question: '评估一下，自己学习的收获与课程教学的目标是不是一致?',
          answer: '',
          answers: [
            { title: '是一致的，因为课程强调的和自己收获的都是操练', value: 'A' },
            { title: '不太一致，因为后面的延伸十二课岔到别的课题去了', value: 'B' },
            { title: '很难说，因为本课程是教大家射击打兔子的活动靶子', value: 'C' },
          ],
        },
        {
          question: '根据你的观察和师生在课上的互动，你觉得我们的同学有收获吗?',
          answer: '',
          answers: [
            { title: '有收获，因为他们的灵觉似乎都操练得敏锐了', value: 'A' },
            { title: '看不出来，因为他们好像都有点自说自话', value: 'B' },
            { title: '还要等等看，因为就像参加培灵会，回去之后都还给老师了', value: 'C' },
          ],
        },
        {
          question: '如果你想评估自己的灵修，至少你可以采用以下的方法',
          answer: '',
          answers: [
            { title: '三点的那一条线', value: 'A' },
            { title: '三线的那九个点', value: 'B' },
            { title: '灵修的三个基本功', value: 'C' },
          ],
        },
        {
          question: '据你观察，本课程学习的属灵收获可能是以下的哪一种?',
          answer: '',
          answers: [
            { title: '信心增强了，信仰坚固了', value: 'A' },
            { title: '有可能看见神开的门和路', value: 'B' },
            { title: '以上都对', value: 'C' },
          ],
        },
        {
          question: '教学相长，老师在教学的过程中好像也有收获',
          answer: '',
          answers: [
            { title: '例如，很多学员都交了作业', value: 'A' },
            { title: '例如，很多学员都坚持到了第二十四次课', value: 'B' },
            { title: '例如，看见很多学员都清楚和明白了圣灵在他们身上的工作', value: 'C' },
          ],
        },
        {
          question: '老师不确定是否应该开设中级班，这是因为',
          answer: '',
          answers: [
            { title: '暂时没有人表达出报名中级班的愿望', value: 'A' },
            { title: '目前还没有人表现出达标，可以参加中级班学习', value: 'B' },
            { title: '老师一直在观察云柱，等候圣灵的风动', value: 'C' },
          ],
        },
      ],
    }
  },
  methods: {
    async validationStep1() {
      let boo = false
      const finished = this.step1.find(item => item.answer === '')
      if (finished) {
        this.$bvModal.msgBoxOk(this.$i18n.t('Not Finished'), {
          title: this.$i18n.t('Confirmation'),
          okTitle: this.$i18n.t('OK'),
          okVariant: 'alert',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
        })
      } else {
        boo = true
      }
      // console.log(this.currentStep)
      return boo
    },
    async validationStep2() {
      let boo = false
      const finished = this.step2.find(item => item.answer === '')
      if (finished) {
        this.$bvModal.msgBoxOk(this.$i18n.t('Not Finished'), {
          title: this.$i18n.t('Confirmation'),
          okTitle: this.$i18n.t('OK'),
          okVariant: 'alert',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
        })
      } else {
        boo = true
      }
      // console.log(this.currentStep)
      return boo
    },
    async validationStep3() {
      let boo = false
      const finished = this.step3.find(item => item.answer === '')
      if (finished) {
        this.$bvModal.msgBoxOk(this.$i18n.t('Not Finished'), {
          title: this.$i18n.t('Confirmation'),
          okTitle: this.$i18n.t('OK'),
          okVariant: 'alert',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
        })
      } else {
        boo = true
      }
      // console.log(this.currentStep)
      return boo
    },
    formSubmitted() {
      const answer = []
      if (this.validationStep3()) {
        this.pressed = true
        this.step1.forEach(a => answer.push(a.answer))
        this.step2.forEach(a => answer.push(a.answer))
        this.step3.forEach(a => answer.push(a.answer))
        // console.log(answer)
      }
      // console.log('courses', this.courses)
      this.$store.dispatch('ship2u/newExam', { courses: this.courses, answer })
        .then(res => {
          console.log('newExam', res)
          if (res) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: this.$i18n.t('Form Submitted'),
                icon: 'EditIcon',
                variant: 'success',
              },
            })

            setTimeout(() => {
              this.$router.push({
                name: 'home',
              })
              this.pressed = false
            }, 3000)
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: this.$i18n.t('Warning'),
                icon: 'BellIcon',
                text: this.$i18n.t('Fail.'),
                variant: 'warning',
              },
            }, { position: 'top-center' })
          }
        })
    },
  },
}
</script>
