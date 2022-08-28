<template>
  <b-card
    :img-src="require('@/assets/images/banner/banner-7.jpg')"
    img-alt="Profile Cover Photo"
    img-top
    class="card-profile"
  >
    <div class="profile-image-wrapper">
      <div class="profile-image p-0">
        <b-avatar
          size="114"
          variant="light"
          :src="require('@/assets/images/banner/banner-27.jpg')"
        />
      </div>
    </div>
    <h3>{{ $t('Account') }}</h3>
    <!-- <h6 class="text-muted">
      {{ $t('Manage personal information') }}
    </h6> -->
    <b-badge
      class="profile-badge"
      variant="light-primary"
      :to="{ name: 'ship2u-personal'}"
    >
      {{ $t('Manage personal information') }}
    </b-badge>
  </b-card>
</template>

<script>
import { BCard, BAvatar, BBadge } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BBadge,
    BAvatar,
  },
}
</script>
