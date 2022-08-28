<template>
  <div>
    <section id="knowledge-base-content">

      <!-- content -->
      <b-row class="kb-search-content-info match-height">
        <b-col
          md="4"
          sm="6"
          class="kb-search-content"
        >
          <brief-profile />
        </b-col>
        <!-- <b-col
          md="4"
          sm="6"
          class="kb-search-content"
        >
          <brief-parcel />
        </b-col>
        <b-col
          md="4"
          sm="6"
          class="kb-search-content"
        >
          <brief-order />
        </b-col> -->
      </b-row>
    </section>
  </div>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import i18n from '@/libs/i18n'
import BriefProfile from './BriefProfile.vue'
// import BriefParcel from './BriefParcel.vue'
// import BriefOrder from './BriefOrder.vue'

function trans(val) {
  return i18n.t(val)
}

export default {
  components: {
    BRow,
    BCol,
    BriefProfile,
    // BriefParcel,
    // BriefOrder,
  },
  directives: {
    Ripple,
  },
  data() {
    return {

    }
  },
  computed: {
    profile() {
      return {
        name: this.$store.state.ship2u.userProfile.customer.first_name,
        email: this.$store.state.ship2u.userProfile.customer.email,
        tel: this.$store.state.ship2u.userProfile.customer.tel,
      }
    },
    osfwa() {
      if (this.$store.state.ship2u.userProfile.customer && this.$store.state.ship2u.userProfile.customer.sea_freight_warehouse_cn) {
        let ori = this.$store.state.ship2u.userProfile.customer.sea_freight_warehouse_cn
        ori = ori.replaceAll('，', ',').replaceAll('：', ':').replace('收件人', 'Consignee').replace('手机', 'Mobile')
          .replace('地址', 'Address')
          .replace('邮编', 'Postcode')
        ori = ori.replace('Consignee', trans('Consignee')).replace('Mobile', trans('Mobile')).replace('Address', trans('Address')).replace('Postcode', trans('Postcode'))
        return ori
      }
      return null
    },
    oafwa() {
      if (this.$store.state.ship2u.userProfile.customer && this.$store.state.ship2u.userProfile.customer.flight_freight_warehouse_cn) {
        let ori = this.$store.state.ship2u.userProfile.customer.flight_freight_warehouse_cn
        ori = ori.replaceAll('，', ',').replaceAll('：', ':').replace('收件人', 'Consignee').replace('手机', 'Mobile')
          .replace('地址', 'Address')
          .replace('邮编', 'Postcode')
        ori = ori.replace('Consignee', trans('Consignee')).replace('Mobile', trans('Mobile')).replace('Address', trans('Address')).replace('Postcode', trans('Postcode'))
        return ori
      }
      return null
    },
    sfwa() {
      if (this.$store.state.ship2u.userProfile.customer && this.$store.state.ship2u.userProfile.customer.sea_freight_warehouse_cn) {
        let ori = this.$store.state.ship2u.userProfile.customer.sea_freight_warehouse_cn
        ori = ori.replaceAll('，', ',').replaceAll('：', ':').replace('收件人', 'Consignee').replace('手机', 'Mobile')
          .replace('地址', 'Address')
          .replace('邮编', 'Postcode')
        return ori.split(',')
      }
      return []
    },
    afwa() {
      if (this.$store.state.ship2u.userProfile.customer && this.$store.state.ship2u.userProfile.customer.flight_freight_warehouse_cn) {
        let ori = this.$store.state.ship2u.userProfile.customer.flight_freight_warehouse_cn
        ori = ori.replaceAll('，', ',').replaceAll('：', ':').replace('收件人', 'Consignee').replace('手机', 'Mobile')
          .replace('地址', 'Address')
          .replace('邮编', 'Postcode')
        return ori.split(',')
      }
      return []
    },
  },
  created() {
  },
  methods: {
    onCopy() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Text copied',
          icon: 'BellIcon',
        },
      })
    },
    onError() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Failed to copy texts!',
          icon: 'BellIcon',
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-knowledge-base.scss';
</style>
