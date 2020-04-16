<template>
  <data-view class="SvgCard" :title="title" :title-id="titleId" :date="date" :url="url">
    <template v-slot:button>
      <p class="Graph-Desc">
        （注）入院等には、自宅待機中の方などを含む<br />
      </p>
    </template>
    <slot />
  </data-view>
</template>

<style lang="scss" scoped>
.SvgCard {
  ::v-deep svg {
    width: 100%;
  }
  .Graph-Desc {
    margin-top: 10px;
    margin-bottom: 0;
    font-size: 12px;
    color: $gray-3;
  }
}
</style>

<script>
import DataView from '@/components/DataView.vue'

export default {
  components: { DataView },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
