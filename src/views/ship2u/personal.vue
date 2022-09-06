<template>
  <b-card-code>
    <validation-observer ref="simpleRules">
      <b-form @submit.prevent="validationForm">
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('Courses')"
            >
              <template v-slot:label>
                {{ $t('Courses') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Courses')"
                rules="required"
              >
                <v-select
                  v-model="profile.courses"
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
          <!-- username -->
          <b-col
            v-if="!edit"
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Name')"
              label-for="fh-usename"
            >
              <template v-slot:label>
                {{ $t('Name') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Name')"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="UserIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="fh-usename"
                    v-model="profile.name"
                    :placeholder="$t('Name')"
                  />
                </b-input-group>
                <!-- <b-form-text class="text-danger">
                  {{ $t('Please use your real name, which needs to be filled in the recipient of the warehousing package.') }}
                </b-form-text> -->
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="!edit"
            md="2"
            sm="12"
          >
            <b-form-group
              :label="$t('First Name')"
              label-for="first_name"
            >
              <template v-slot:label>
                {{ $t('First Name') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('First Name')"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="UserIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="first_name"
                    v-model="profile.first_name"
                    :placeholder="$t('First Name')"
                  />
                </b-input-group>
                <!-- <b-form-text class="text-danger">
                  {{ $t('Please use your real name, which needs to be filled in the recipient of the warehousing package.') }}
                </b-form-text> -->
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="!edit"
            md="2"
            sm="12"
          >
            <b-form-group
              :label="$t('Last Name')"
              label-for="last_name"
            >
              <template v-slot:label>
                {{ $t('Last Name') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Last Name')"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="UserIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="last_name"
                    v-model="profile.last_name"
                    :placeholder="$t('Last Name')"
                  />
                </b-input-group>
                <!-- <b-form-text class="text-danger">
                  {{ $t('Please use your real name, which needs to be filled in the recipient of the warehousing package.') }}
                </b-form-text> -->
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Nick')"
              label-for="nick"
            >
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="UserIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="nick"
                  v-model="profile.nick"
                  :placeholder="$t('Nick')"
                />
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col
            v-if="!edit"
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Gender')"
              label-for="gender"
            >
              <template v-slot:label>
                {{ $t('Gender') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Gender')"
                rules="required"
              >
                <v-select
                  v-model="profile.gender"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="gender_option"
                />
                <!-- <b-form-text class="text-danger">
                  {{ $t('Please use your real name, which needs to be filled in the recipient of the warehousing package.') }}
                </b-form-text> -->
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="!edit"
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Birth Month')"
              label-for="example-input"
            >
              <template v-slot:label>
                {{ $t('Birth Month') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Birth Month')"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="example-input"
                    v-model="birthday"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
                    show-decade-nav
                  />
                  <b-input-group-append>
                    <b-form-datepicker
                      v-model="birthday"
                      show-decade-nav
                      button-only
                      button-variant="outline-primary"
                      right
                      size="sm"
                      locale="zh"
                      aria-controls="example-input"
                      @context="onContext"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Education')"
              label-for="vi-education"
            >
              <template v-slot:label>
                {{ $t('Education') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Education')"
                rules="required"
              >
                <v-select
                  v-model="profile.education"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="education_option"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Profession')"
              label-for="vi-profession"
            >
              <template v-slot:label>
                {{ $t('Profession') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Profession')"
                rules="required"
              >
                <v-select
                  v-model="profile.profession"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="profession_option"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Country')"
              label-for="vi-country"
            >
              <template v-slot:label>
                {{ $t('Country') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Country')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="FlagIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-country"
                    v-model="profile.country"
                    :placeholder="$t('Country')"
                  />
                </b-input-group>
                <!-- <b-form-text class="text-danger">
                  {{ $t('Please fill in the commonly used mobile phone number, used to communicate urgent cargo matters.') }}
                </b-form-text> -->
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('City')"
              label-for="vi-city"
            >
              <template v-slot:label>
                {{ $t('City') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('City')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="FlagIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-city"
                    v-model="profile.city"
                    :placeholder="$t('City')"
                  />
                </b-input-group>
                <!-- <b-form-text class="text-danger">
                  {{ $t('Please fill in the commonly used mobile phone number, used to communicate urgent cargo matters.') }}
                </b-form-text> -->
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- <b-col cols="4">
            <b-form-group
              :label="$t('Address')"
              label-for="vi-address"
            >
              <template v-slot:label>
                {{ $t('Address') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Address')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="FlagIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-address"
                    v-model="profile.address"
                    :placeholder="$t('Address')"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col> -->

          <!-- <b-col cols="3">
            <b-form-group
              :label="$t('Email')"
              label-for="fh-email"
            >
              <template v-slot:label>
                {{ $t('Email') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Email')"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="MailIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="fh-email"
                    v-model="profile.email"
                    type="email"
                    :placeholder="$t('Email')"
                    readonly
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col> -->

          <!-- mobile -->
          <!-- <b-col cols="3">
            <b-form-group
              :label="$t('Mobile')"
              label-for="vi-mobile"
            >
              <template v-slot:label>
                {{ $t('Mobile') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Mobile')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SmartphoneIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-mobile"
                    v-model="profile.mobile"
                    type="number"
                    :placeholder="$t('Mobile')"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col> -->

          <!-- <b-col cols="3">
            <b-form-group
              :label="$t('Wechat')"
              label-for="vi-wechat"
            >
              <template v-slot:label>
                {{ $t('Wechat') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Wechat')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SmartphoneIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-wechat"
                    v-model="profile.wechat"
                    :placeholder="$t('Wechat')"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col> -->

          <!-- <b-col cols="3">
            <b-form-group
              :label="$t('Enigma')"
              label-for="vi-enigma"
            >
              <template v-slot:label>
                {{ $t('Enigma') }}
              </template>
              <b-input-group
                class="input-group-merge"
              >
                <b-input-group-prepend is-text>
                  <feather-icon icon="SmartphoneIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="vi-enigma"
                  v-model="profile.enigma"
                  :placeholder="$t('Enigma')"
                />
              </b-input-group>
            </b-form-group>
          </b-col> -->

          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Baptism Date')"
              label-for="baptism"
            >
              <template v-slot:label>
                {{ $t('Baptism Date') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Baptism Date')"
                rules="required"
              >
                <b-input-group class="input-group-merge">
                  <b-form-input
                    id="baptism"
                    v-model="baptism_date"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
                    show-decade-nav
                  />
                  <b-input-group-append>
                    <b-form-datepicker
                      v-model="baptism_date"
                      show-decade-nav
                      button-only
                      button-variant="outline-primary"
                      right
                      size="sm"
                      locale="zh"
                      aria-controls="example-input"
                      @context="onContext"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Church')"
              label-for="vi-church"
            >
              <template v-slot:label>
                {{ $t('Church') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Church')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="HomeIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-church"
                    v-model="profile.church"
                    :placeholder="$t('Church')"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="4"
            sm="12"
          >
            <b-form-group
              :label="$t('Church Time')"
              label-for="vi-churchtime"
            >
              <template v-slot:label>
                {{ $t('Church Time') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Church Time')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="CalendarIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-churchtime"
                    v-model="profile.church_time"
                    :placeholder="$t('Church Time')"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              :label="$t('Church Service Experience')"
              label-for="vi-churchservice"
            >
              <template v-slot:label>
                {{ $t('Church Service Experience') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Church Service Experience')"
                rules="required"
              >
                <b-form-textarea
                  v-model="church_experience"
                  :placeholder="$t('Church Service Experience Demo')"
                  rows="3"
                  class="char-textarea"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="3"
            sm="12"
          >
            <b-form-group
              :label="$t('Holly Bible Times')"
              label-for="vi-hollybible"
            >
              <template v-slot:label>
                {{ $t('Holly Bible Times') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Holly Bible Times')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <div class="demo-inline-spacing">
                    <b-form-radio
                      v-model="Selected_HollyBible"
                      plain
                      name="holly_bible"
                      value="是"
                    >
                      是
                    </b-form-radio>
                    <b-form-radio
                      v-model="Selected_HollyBible"
                      plain
                      name="holly_bible"
                      value="否"
                    >
                      否
                    </b-form-radio>
                  </div>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="3"
            sm="12"
          >
            <b-form-group
              :label="$t('Pastor Agree')"
              label-for="vi-pastor_agree"
            >
              <template v-slot:label>
                {{ $t('Pastor Agree') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Pastor Agree')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <div class="demo-inline-spacing">
                    <b-form-radio
                      v-model="Selected_PastorAgree"
                      plain
                      name="pastor_agree"
                      value="是"
                    >
                      是
                    </b-form-radio>
                    <b-form-radio
                      v-model="Selected_PastorAgree"
                      plain
                      name="pastor_agree"
                      value="否"
                    >
                      否
                    </b-form-radio>
                  </div>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="3"
            sm="12"
          >
            <b-form-group
              :label="$t('Recommender')"
              label-for="vi-recommender"
            >
              <template v-slot:label>
                {{ $t('Recommender') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Recommender')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="UserIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-recommender"
                    v-model="profile.recommender"
                    :placeholder="$t('Recommender')"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            md="3"
            sm="12"
          >
            <b-form-group
              :label="$t('Recommender Contact')"
              label-for="vi-recommender_contact"
            >
              <template v-slot:label>
                {{ $t('Recommender Contact') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('Recommender Contact')"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="MailIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-recommender_contact"
                    v-model="profile.recommender_contact"
                    :placeholder="$t('Recommender Contact')"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="moreInfo"
            md="3"
            sm="12"
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
                  v-model="profile.video_times"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="videotimes_option"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="moreInfo"
            md="3"
            sm="12"
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
                  v-model="profile.book_times"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="booktimes_option"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            v-if="moreInfo"
            md="3"
            sm="12"
          >
            <b-form-group
              :label="$t('Spiritual Gift')"
              label-for="vi-gift"
            >
              <b-input-group
                class="input-group-merge"
              >
                <b-input-group-prepend is-text>
                  <feather-icon icon="GiftIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="vi-recommender"
                  v-model="profile.gifts"
                  :placeholder="$t('Spiritual Gift')"
                />
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col
            v-if="moreInfo"
            md="3"
            sm="12"
          >
            <b-form-group
              :label="$t('How to know the course')"
              label-for="knowchannel"
            >
              <template v-slot:label>
                {{ $t('How to know the course') }} <span class="text-danger">*</span>
              </template>
              <validation-provider
                #default="{ errors }"
                :name="$t('How to know the course')"
                rules="required"
              >
                <v-select
                  v-model="profile.know_channel"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="channel_option"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
          >
            <b-alert
              variant="primary"
              show
            >
              <div class="alert-body">
                <p>
                  <!-- <strong>{{ $t('Reminder') }} </strong>
                  <span>{{ $t('Remark') }}</span> -->
                  <!-- <a
                    class="alert-link"
                    href="https://kingdom123.org/cpfschool/sites/default/files/files/%E6%8E%A8%E8%8D%90%E4%BA%BA%E8%A1%A8_%E5%8D%8E%E7%89%A7%E5%AD%A6%E6%A0%A1_2022_rev.docx"
                    target="blank"
                  > -->
                  <a
                    class="alert-link"
                    href="http://0.0.0.0:7000/public/2022_rev.docx"
                    target="blank"
                  >{{ $t('Download Recommendation Letter Template') }}</a>
                  <!-- <button @click="downloadWithVueResource">
                    Download file with Vue Resource
                  </button>
                  <button @click="downloadWithAxios">
                    Download file with Axios
                  </button> -->
                </p>
              </div>
            </b-alert>
          </b-col>

          <b-col
            v-if="uploadedfile"
            cols="12"
          >
            <b-alert
              variant="success"
              show
            >
              <div class="alert-body">
                <p>
                  <a
                    variant="success"
                    :href="uploadedfile"
                    target="blank"
                  >{{ $t('Uploaded Recommendation Letter') }}</a>
                </p>
              </div>
            </b-alert>
          </b-col>

          <b-col cols="12">
            <b-form-group
              :label="$t('Upload Recommender Letter')"
              label-for="vi-churchservice"
            >
              <b-form-file
                v-model="file"
                :placeholder="$t('Choose a file or drop it here...')"
              />

              <!-- <b-card-text class="my-1">
                Selected file: <strong>{{ file ? file.name : '' }}</strong>
              </b-card-text> -->
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('Personal Testimony')"
              label-for="vi-personal-testimony"
            >
              <b-form-textarea
                v-model="personal_testimony"
                :placeholder="$t('Personal Testimony Reminder')"
                rows="8"
                class="char-textarea"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              :label="$t('Ideas and Needs')"
              label-for="vi-churchservice"
            >
              <b-form-textarea
                v-model="ideas_needs"
                :placeholder="$t('Ideas and Needs')"
                rows="3"
                class="char-textarea"
              />
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
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="Save"
            >
              {{ $t('Save') }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card-code>
</template>

<script>
import axios from 'axios'
import BCardCode from '@core/components/b-card-code'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
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
  BFormInput,
  BForm,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BFormDatepicker,
  BFormTextarea,
  BFormRadio,
  BAlert,
  BFormFile,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BCardCode,
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormInput,
    BForm,
    // BFormText,
    BButton,
    // VueSelectMultiple,
    vSelect,
    BFormDatepicker,
    BFormTextarea,
    BFormRadio,
    BAlert,
    BFormFile,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      uploadedfile: '',
      file: null,
      moreInfo: false,
      url: 'http://localhost:8080/public/10.png',
      Selected_HollyBible: '是',
      Selected_PastorAgree: '是',
      mobile: '',
      birthday: '',
      church_experience: ' ',
      church_experience_maxchar: 300,
      personal_testimony: ' ',
      personal_testimony_maxchar: 1000,
      ideas_needs: ' ',
      ideas_needs_maxchar: 300,
      baptism_date: '',
      formatted: '',
      selected_month: '',
      required,
      education_option: [
        { title: '小学' },
        { title: '初中' },
        { title: '高中' },
        { title: '本科' },
        { title: '专科' },
        { title: '研究生' },
        { title: '博士' },
      ],
      profession_option: [
        { title: '建筑与工程' },
        { title: '商业与金融' },
        { title: 'IT与计算机' },
        { title: '艺术与设计' },
        { title: '医疗与卫生' },
        { title: '教育与教学' },
        { title: '科学与研究' },
        { title: '行政与司法' },
        { title: '媒体与传播' },
        { title: '食品与营养' },
        { title: '农林及其它' },
      ],
      channel_option: [
        { title: '牧者同工朋友推荐' },
        { title: '招生广告' },
        { title: '油管宣传视频' },
        { title: '新课海报' },
        { title: '微信分享' },
        { title: '电邮群发' },
        { title: '其它' },
      ],
      videotimes_option: [
        { title: '0次' },
        { title: '1-5次' },
        { title: '5次以上' },
      ],
      booktimes_option: [
        { title: '0次' },
        { title: '1-5次' },
        { title: '5次以上' },
      ],
      gender_option: [
        { title: '男' },
        { title: '女' },
      ],
      option: [
        { title: '灵修与明白神的旨意【祝健】- 2022年3月春季班', type: 1 },
        { title: '灵修与明白神的旨意【祝健】- 2022年10月秋季班', type: 1 },
        // { title: '丰盛的救恩--重生的意义【周小安】', type: 0 },
        // { title: '建造使命教会【王天声】', type: 0 },
        // { title: '“神的宏伟计划”青年领袖班【陈卧绿、田永明】', type: 0 },
      ],
    }
  },
  computed: {
    edit() {
      if (this.$store.state.ship2u.userProfile.profile?.name && this.$store.state.ship2u.userProfile.profile?.first_name
      && this.$store.state.ship2u.userProfile.profile?.last_name && this.$store.state.ship2u.userProfile.profile?.gender
      && this.$store.state.ship2u.userProfile.profile?.birthday) {
        return true
      }
      return false
    },
    validation() {
      return this.mobile.length > 8 && this.mobile.length < 16
    },
    profile() {
      const pf = {
        courses: [],
        gender: { title: '男' },
        education: { title: '本科' },
        profession: { title: '建筑与工程' },
        video_times: { title: '0次' },
        book_times: { title: '0次' },
        know_channel: { title: '牧者同工朋友推荐' },
      }
      const { profile } = this.$store.state.ship2u.userProfile

      return { ...pf, ...profile }
    },
  },
  mounted() {
    this.church_experience = this.profile.church_experience
    this.personal_testimony = this.profile.personal_testimony
    this.ideas_needs = this.profile.ideas_needs
    this.birthday = this.profile.birthday
    this.baptism_date = this.profile.baptism_date
    if (this.profile?.recommendation_letter) { this.uploadedfile = `${this.$store.state.ship2u.apiHost}/public/${this.profile.recommendation_letter}` }
    this.showMoreInfo()
  },
  methods: {
    showMoreInfo() {
      this.moreInfo = false
      this.profile.courses.forEach(e => {
        if (e.type === 1) {
          this.moreInfo = true
        }
      })
    },
    forceFileDownload(response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.png') // or any other extension
      document.body.appendChild(link)
      link.click()
    },

    downloadWithVueResource() {
      this.$http({
        method: 'get',
        url: this.url,
        responseType: 'arraybuffer',
      })
        .then(response => {
          this.forceFileDownload(response)
        })
        .catch(() => console.log('error occured'))
    },

    downloadWithAxios() {
      axios({
        method: 'get',
        url: this.url,
        responseType: 'arraybuffer',
      })
        .then(response => {
          this.forceFileDownload(response)
        })
        .catch(() => console.log('error occured'))
    },

    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      this.selected_month = ctx.selectedYMD
    },
    async Save() {
      let recommendationLetter = this.profile.recommendation_letter
      if (this.file) {
        const formData = new FormData()
        formData.append('file', this.file)
        const resp = await this.$store.dispatch('ship2u/uploadFile', formData)
        recommendationLetter = resp.file.name
      }
      this.$store
        .dispatch('ship2u/updateProfile', {
          ...this.profile,
          church_experience: this.church_experience,
          personal_testimony: this.personal_testimony,
          ideas_needs: this.ideas_needs,
          birthday: this.birthday,
          baptism_date: this.baptism_date,
          recommendation_letter: recommendationLetter,
        })
        .then(() => {
          this.$bvModal.msgBoxOk(this.$i18n.t('Save successful'), {
            title: this.$i18n.t('Confirmation'),
            okTitle: this.$i18n.t('OK'),
            okVariant: 'success',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
          })
            .then(() => {
              // this.$router.push({ name: 'home' })
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(ex => {
          console.log(ex)
        })
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(async success => {
        if (success) {
          // console.log('robin', {
          //   ...this.profile, church_experience: this.church_experience, personal_testimony: this.personal_testimony, ideas_needs: this.ideas_needs,
          // })
          let recommendationLetter = this.profile.recommendation_letter
          if (this.file) {
            const formData = new FormData()
            formData.append('file', this.file)
            const resp = await this.$store.dispatch('ship2u/uploadFile', formData)
            recommendationLetter = resp.file.name
          }

          this.$store
            .dispatch('ship2u/updateProfile', {
              ...this.profile,
              church_experience: this.church_experience,
              personal_testimony: this.personal_testimony,
              ideas_needs: this.ideas_needs,
              birthday: this.birthday,
              baptism_date: this.baptism_date,
              recommendation_letter: recommendationLetter,
            })
            .then(() => {
              this.$bvModal.msgBoxOk(this.$i18n.t('Operation successful'), {
                title: this.$i18n.t('Confirmation'),
                okTitle: this.$i18n.t('OK'),
                okVariant: 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
              })
                .then(() => {
                  this.$router.push({ name: 'home' })
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(ex => {
              console.log(ex)
            })
        } else {
          this.$bvModal.msgBoxOk(this.$i18n.t('Check Fail'), {
            title: this.$i18n.t('Confirmation'),
            okTitle: this.$i18n.t('OK'),
            okVariant: 'alert',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
          })
        }
      })
    },
  },
  setup() {

  },
}
</script>
