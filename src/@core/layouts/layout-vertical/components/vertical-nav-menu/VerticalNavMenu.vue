<template>
  <div
    class="main-menu menu-fixed menu-accordion menu-shadow"
    :class="[
      { 'expanded': !isVerticalMenuCollapsed || (isVerticalMenuCollapsed && isMouseHovered) },
      skin === 'semi-dark' ? 'menu-dark' : 'menu-light'
    ]"
    @mouseenter="updateMouseHovered(true)"
    @mouseleave="updateMouseHovered(false)"
  >
    <!-- main menu header-->
    <div class="navbar-header expanded">
      <slot
        name="header"
        :toggleVerticalMenuActive="toggleVerticalMenuActive"
        :toggleCollapsed="toggleCollapsed"
        :collapseTogglerIcon="collapseTogglerIcon"
      >
        <ul class="nav navbar-nav flex-row">

          <!-- Logo & Text -->
          <li class="nav-item mr-auto">
            <b-link
              class="navbar-brand"
              to="/"
            >
              <span class="brand-logo">
                <b-img
                  :src="appLogoImage"
                  alt="logo"
                />
              </span>
              <h2 class="brand-text">
                {{ /*appName*/ }}
              </h2>
            </b-link>
          </li>

          <!-- Toggler Button -->
          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <feather-icon
                icon="XIcon"
                size="20"
                class="d-block d-xl-none"
                @click="toggleVerticalMenuActive"
              />
              <feather-icon
                :icon="collapseTogglerIconFeather"
                size="20"
                class="d-none d-xl-block collapse-toggle-icon"
                @click="toggleCollapsed"
              />
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <div
      :class="{'d-block': shallShadowBottom}"
      class="shadow-bottom"
    />

    <!-- main menu content-->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="main-menu-content scroll-area"
      tagname="ul"
      @ps-scroll-y="evt => { shallShadowBottom = evt.srcElement.scrollTop > 0 }"
    >
      <vertical-nav-menu-items
        :items="navMenuItems"
        class="navigation navigation-main"
      />
    </vue-perfect-scrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
// import navMenuItems from '@/navigation/vertical'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { BLink, BImg } from 'bootstrap-vue'
import { provide, computed, ref } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'
// import { $themeConfig } from '@themeConfig'
import store from '@/store'
import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue'
import useVerticalNavMenu from './useVerticalNavMenu'

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true,
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      appName: 'CPF School',
      // eslint-disable-next-line global-require
      appLogoImage: require('@/assets/images/logo/logo.png'),
    }
  },
  created() {
    this.getLogo()
  },
  methods: {
    getLogo() {
      if (store.state.ship2u.company) {
        this.appLogoImage = store.state.ship2u.apiHost + store.state.ship2u.company.logo
        this.appName = store.state.ship2u.company.title
      }
    },
  },
  setup(props) {
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered,
    } = useVerticalNavMenu(props)

    const { skin } = useAppConfig()

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false)

    provide('isMouseHovered', isMouseHovered)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    const collapseTogglerIconFeather = computed(() => (collapseTogglerIcon.value === 'unpinned' ? 'CircleIcon' : 'DiscIcon'))

    // App Name
    // const { appName, appLogoImage } = $themeConfig.app

    const navMenuItems = computed(() => {
      const arr = [
        {
          title: 'Dashboards',
          icon: 'HomeIcon',
          action: 'read',
          resource: 'Client',
          children: [
            {
              title: 'Home',
              route: 'home',
              action: 'read',
              resource: 'Client',
            },
            // {
            //   title: 'Cost Calculation',
            //   route: 'cost',
            //   action: 'read',
            //   resource: 'Client',
            // },
          ],
        },
        {
          title: 'Account',
          icon: 'UserIcon',
          tagVariant: 'light-warning',
          action: 'read',
          resource: 'Client',
          children: [
            {
              title: 'Password',
              route: 'ship2u-modify-pwd',
              action: 'read',
              resource: 'Client',
            },
            // {
            //   title: 'Shipping Address',
            //   route: 'ship2u-shipping-address-list',
            //   action: 'read',
            //   resource: 'Client',
            // },
            // {
            //   title: 'Sender Address',
            //   route: 'ship2u-sender-address-list',
            //   action: 'read',
            //   resource: 'Client',
            // },
          ],
        },
        {
          title: 'Course',
          icon: 'CalendarIcon',
          tagVariant: 'light-warning',
          action: 'read',
          resource: 'Client',
          children: [
            {
              title: 'Personal',
              route: 'ship2u-personal',
              action: 'read',
              resource: 'Client',
            },
            {
              title: 'Self Evaluation',
              route: 'ship2u-evaluation',
              action: 'read',
              resource: 'Client',
            },
            {
              title: 'Exam',
              route: 'hm-exam-add',
              action: 'read',
              resource: 'Client',
            },
          ],
        },
        {
          title: 'Courses Management',
          icon: 'ArchiveIcon',
          action: 'read',
          resource: 'Teacher',
          children: [
            {
              title: '2022-10',
              action: 'read',
              resource: 'Teacher',
              children: [
                {
                  title: 'Waiting List',
                  route: { name: 'waiting_student', params: { code: 'zhujian202210' } },
                  action: 'read',
                  resource: 'Teacher',
                },
                {
                  title: 'Success List',
                  route: { name: 'success_student', params: { code: 'zhujian202210' } },
                  action: 'read',
                  resource: 'Teacher',
                },
                {
                  title: 'Fail List',
                  route: { name: 'fail_student', params: { code: 'zhujian202210' } },
                  action: 'read',
                  resource: 'Teacher',
                },
              ],
            },
            // {
            //   title: 'Processing',
            //   route: 'processing_parcels',
            //   tag: store.getters['ship2u/parcels']({ parcelState: 'P', unsent: 0 }),
            //   action: 'read',
            //   resource: 'Teacher',
            // },
            // {
            //   title: 'Outbound',
            //   route: 'out_parcels',
            //   tag: store.getters['ship2u/parcels']({ parcelState: 'T', unsent: 0 }),
            //   action: 'read',
            //   resource: 'Teacher',
            // },
          ],
        },
        // {
        //   title: 'Freight Orders',
        //   icon: 'CheckSquareIcon',
        //   action: 'read',
        //   resource: 'Client',
        //   children: [
        //     {
        //       title: 'Create',
        //       route: 'ship2u-order-add',
        //       action: 'read',
        //       resource: 'Client',
        //     },
        //     {
        //       title: 'Waiting',
        //       route: 'draft_order',
        //       tag: store.getters['ship2u/orders']({ orderState: 'D' }),
        //       action: 'read',
        //       resource: 'Client',
        //     },
        //     {
        //       title: 'Processing',
        //       route: 'processing_order',
        //       tag: store.getters['ship2u/orders']({ orderState: 'P' }),
        //       action: 'read',
        //       resource: 'Client',
        //     },
        //     {
        //       title: 'In Transit',
        //       route: 'transit_order',
        //       tag: store.getters['ship2u/orders']({ orderState: 'T' }),
        //       action: 'read',
        //       resource: 'Client',
        //     },
        //     {
        //       title: 'History',
        //       route: 'history_order',
        //       tag: store.getters['ship2u/orders']({ orderState: 'H' }),
        //       action: 'read',
        //       resource: 'Client',
        //     },
        //     {
        //       title: 'All',
        //       route: 'all_order',
        //       action: 'read',
        //       resource: 'Client',
        //     },
        //   ],
        // },
      ]
      return arr
    })

    return {
      navMenuItems,
      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      collapseTogglerIconFeather,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,
    }
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/vertical-menu.scss";
</style>
