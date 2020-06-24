<template>
  <v-card class="DataView">
    <div class="DataView-Inner">
      <div class="DataView-Header">
        <div class="DataView-Title">
          <h3 :id="titleId">
            {{ title }}
          </h3>
          <p v-if="category" class="DataView-Category">({{ category }})</p>
          <slot name="kindButton" />
          <slot name="areaButton" />
        </div>
        <slot name="infoPanel" />
        <div class="DataView-SelectSpace">
          <slot name="selectDate" />
        </div>
      </div>
      <v-card-text
        :class="
          $vuetify.breakpoint.xs
            ? 'DataView-CardTextForXS'
            : 'DataView-CardText'
        "
      >
        <slot />
        <div class="DataView-AnnotationStyle">
          <slot name="annotation" />
        </div>
      </v-card-text>
      <v-footer class="DataView-Footer">
        <time :datetime="formattedDate">{{ date }} 更新</time>
        <a
          v-if="url"
          class="OpenDataLink"
          :href="url"
          target="_blank"
          rel="noopener"
        >
          オープンデータへのリンク
          <v-icon class="ExternalLinkIcon" size="15">
            mdi-open-in-new
          </v-icon>
        </a>
      </v-footer>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { convertDatetimeToISO8601Format } from '@/utils/formatDate'

@Component
export default class DataView extends Vue {
  @Prop() private title!: string
  @Prop() private category!: string
  @Prop() private titleId!: string
  @Prop() private date!: string
  @Prop() private url!: string
  @Prop() private info!: any // FIXME expect info as {lText:string, sText:string unit:string}

  formattedDate: string = convertDatetimeToISO8601Format(this.date)
}
</script>

<style lang="scss">
.DataView {
  @include card-container();

  height: 100%;
  &-Header {
    display: flex;
    align-items: flex-start;
    flex-flow: column;
    padding: 0 10px;
    @include largerThan($medium) {
      padding: 0 5px;
    }
    @include largerThan($large) {
      width: 100%;
      flex-flow: row;
      flex-wrap: wrap;
      padding: 0;
    }
  }
  &-DataInfo {
    &-summary {
      color: $gray-2;
      font-family: Hiragino Sans, sans-serif;
      font-style: normal;
      font-size: 30px;
      line-height: 30px;
      white-space: nowrap;
      &-unit {
        font-size: 0.6em;
        width: 100%;
      }
    }
    &-date {
      font-size: 12px;
      line-height: 12px;
      color: $gray-3;
      width: 100%;
      display: inline-block;
    }
  }
  &-Inner {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 22px;
    height: 100%;
  }
  &-Title {
    width: 100%;
    margin-bottom: 10px;
    @include largerThan($large) {
      width: 50%;
    }
    h3 {
      font-size: 1.25rem;
      line-height: 1.5;
      font-weight: normal;
      color: $gray-2;
    }
  }

  &-Category {
    margin-bottom: 0px !important;
  }

  &-SelectSpace {
    width: 100%;
    padding-left: 2px !important;
  }

  &-SelectSpace .v-label {
    font-size: 14px !important;
  }

  &-CardText {
    margin: 16px 0;
  }
  &-CardTextForXS {
    margin: 20px 0;
  }

  &-AnnotationStyle small {
    display: inline-block;
    color: rgba(0, 0, 0, 0.6);
  }

  &-Embed {
    background-color: $gray-5;
  }
  &-Footer {
    background-color: $white !important;
    margin: 2px 4px 12px;
    @include font-size(12);
    color: $gray-3 !important;
    justify-content: space-between;
    flex-direction: row-reverse;
    .OpenDataLink {
      text-decoration: none;
      .ExternalLinkIcon {
        vertical-align: text-bottom;
      }
    }
  }
}
.v-toolbar__content {
  height: auto !important;
}
</style>
