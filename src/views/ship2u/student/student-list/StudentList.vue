<template>

  <!-- Table Container Card -->
  <b-card
    no-body
  >

    <div class="m-2">

      <!-- Table Top -->
      <b-row>

        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>{{ $t('Entries') }}</label>
          <v-select
            v-model="perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="perPageOptions"
            :clearable="false"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
        </b-col>

        <!-- Search -->
        <b-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              :placeholder="$t('Search...')"
            />
          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="fetchStudents"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      :empty-text="$t('No matching records found')"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >

      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
      <template #head(parcelStatus)>
        <feather-icon
          icon="TrendingUpIcon"
          class="mx-auto"
        />
      </template>

      <!-- Column: Id -->
      <template #cell(email)="data">
        <b-link
          :to="{ name: 'sdudent-detail', params: { email: data.item.email }}"
          class="font-weight-bold"
        >
          {{ data.value }}
        </b-link>
      </template>

      <!-- Column: Title -->
      <template #cell(name)="data">
        <b-media vertical-align="center">
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.name }}
          </span>
        </b-media>
      </template>

      <!-- Column: Type -->
      <template #cell(first_name)="data">
        <template>
          {{ data.value }}
        </template>
      </template>

      <!-- Column: Receive Time -->
      <template #cell(createdAt)="data">
        <span class="text-nowrap">
          {{ $DateFormat(data.item.createdAt) }}
        </span>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">

        <div class="text-nowrap">

          <feather-icon
            :id="`parcel-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1"
            @click="$router.push({ name: 'sdudent-detail', params: { email: data.item.email }})"
          />
          <b-tooltip
            title="Preview Parcel"
            :target="`parcel-row-${data.item.id}-preview-icon`"
          />

          <!-- Dropdown -->
          <b-dropdown
            variant="link"
            toggle-class="p-0"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'hm-interview-add', params: { email: data.item.email } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">面试评分</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>

    </b-table>
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">{{ $t('Showing') }} {{ dataMeta.from }} {{ $t('to') }} {{ dataMeta.to }} {{ $t('of') }} {{ dataMeta.of }} {{ $t('entries') }}</span>
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
            v-model="currentPage"
            :total-rows="totalStudents"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>

        </b-col>

      </b-row>
    </div>
  </b-card>

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BTable, BMedia, BLink,
  BDropdown, BDropdownItem, BPagination, BTooltip, BSpinner,
} from 'bootstrap-vue'
// import router from '@/router'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { computed } from '@vue/composition-api'
import i18n from '@/libs/i18n'
import studentList from './studentList'

export default {
  components: {
    BSpinner,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BMedia,
    BLink,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,

    vSelect,
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.$router.go(0)
    },
  },
  mounted() {
    // console.log(111)
    // this.refInvoiceListTable.refresh()
  },
  setup() {
    const statusOptions = [
      { label: 'Air freight warehouse', value: 'F' },
      { label: 'Shipping warehouse', value: 'S' },
    ]

    function setSelected() {
      console.log(this.statusFilter)
    }

    function getLabel(val) {
      // console.log(val)
      return this.$t(val.label)
    }

    function trans(val) {
      return i18n.t(val)
    }
    // Table Handlers
    const tableColumns = computed(() => [
      { key: 'email', label: trans('email'), sortable: true },
      // { key: 'parcelStatus', sortable: true },
      { key: 'name', label: trans('name'), sortable: true },
      { key: 'first_name', label: trans('First Name'), sortable: true },
      { key: 'last_name', label: trans('Last Name'), sortable: true },
      { key: 'nick', label: trans('Nick'), sortable: true },
      // { key: 'balance', sortable: true },
      { key: 'actions', label: trans('actions') },
    ])

    const {
      // queryParams,
      fetchStudents,
      perPage,
      currentPage,
      totalStudents,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    } = studentList()

    // console.log(queryParams.value)

    // console.log(window.location.pathname)
    // console.log(router.currentRoute.name.split('_')[0])
    return {
      fetchStudents,
      tableColumns,
      perPage,
      currentPage,
      totalStudents,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,

      statusFilter,

      refetchData,

      statusOptions,
      setSelected,
      getLabel,
      avatarText,
      resolveInvoiceStatusVariantAndIcon,
      resolveClientAvatarVariant,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.parcel-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
