import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function studentList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  const perPage = ref(10)
  const totalStudents = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [2, 5, 10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const statusFilter = ref(null)

  const queryParams = computed(() => {
    console.log('code', router.currentRoute.params.code)
    const type = router.currentRoute.name.split('_')[0]
    const courseCode = router.currentRoute.params.code
    let studentState

    switch (type) {
      case 'waiting':
        studentState = 'W'
        break
      case 'success':
        studentState = 'S'
        break
      case 'fail':
        studentState = 'F'
        break
      default:
        studentState = 'W'
    }
    const obj = {
      studentState,
      courseCode,
    }
    console.log('obj', obj)
    return obj
  })

  const dataMeta = computed(() => {
    const localItemsCount = refInvoiceListTable.value ? refInvoiceListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalStudents.value,
    }
  })

  const refetchData = () => {
    refInvoiceListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, statusFilter, queryParams], () => {
    refetchData()
  })
  // ?state=P&filed=1&unsent=1&count=10
  const fetchStudents = (ctx, callback) => {
    // console.log(queryParams.value)
    store
      .dispatch('ship2u/fetchStudents', {
        ...queryParams.value,
        forceRefresh: false,
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        status: statusFilter.value,
      })
      .then(response => {
        console.log('robin adding:', response)
        const { students, total } = response
        callback(students)
        totalStudents.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching parcels' list",
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveInvoiceStatusVariantAndIcon = status => {
    if (status === 'Partial Payment') return { variant: 'warning', icon: 'PieChartIcon' }
    if (status === 'Paid') return { variant: 'success', icon: 'CheckCircleIcon' }
    if (status === 'Downloaded') return { variant: 'info', icon: 'ArrowDownCircleIcon' }
    if (status === 'Draft') return { variant: 'primary', icon: 'SaveIcon' }
    if (status === 'Sent') return { variant: 'secondary', icon: 'SendIcon' }
    if (status === 'Past Due') return { variant: 'danger', icon: 'InfoIcon' }
    return { variant: 'secondary', icon: 'XIcon' }
  }

  const resolveClientAvatarVariant = status => {
    if (status === 'Partial Payment') return 'primary'
    if (status === 'Paid') return 'danger'
    if (status === 'Downloaded') return 'secondary'
    if (status === 'Draft') return 'warning'
    if (status === 'Sent') return 'info'
    if (status === 'Past Due') return 'success'
    return 'primary'
  }

  return {
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

    resolveInvoiceStatusVariantAndIcon,
    resolveClientAvatarVariant,

    refetchData,
  }
}
