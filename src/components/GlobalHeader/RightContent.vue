<template>
  <div :class="wrpCls">
    <notice-icon :class="prefixCls" />
    <select-lang :class="prefixCls" />
    <a-tooltip :title="$t('app.setting.tooltip')">
      <span :class="prefixCls" @click="handleSettingClick">
        <a-icon type="setting" style="font-size: 16px;" />
      </span>
    </a-tooltip>
  </div>
</template>

<script>
import SelectLang from '@/components/SelectLang'
import NoticeIcon from '@/components/NoticeIcon'

export default {
  name: 'RightContent',
  components: {
    SelectLang,
    NoticeIcon
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  methods: {
    handleSettingClick () {
      this.$root.$emit('show-setting-drawer')
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  }
}
</script>

<style lang="less">
@import '~ant-design-vue/es/style/themes/default.less';

.ant-pro-global-header-index-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .ant-pro-global-header-index-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: @layout-header-height;
    padding: 0 12px;
    color: rgba(0, 0, 0, 0.65);
    transition: all 0.3s;
    cursor: pointer;
    vertical-align: top;

    &:hover {
      color: @primary-color;
      background: rgba(0, 0, 0, 0.04);
    }
  }
}

@media (max-width: 768px) {
  .ant-pro-global-header-index-right {
    .ant-pro-global-header-index-action {
      padding: 0 8px;
    }
  }
}

body.dark,
body.realdark,
.ant-layout.dark,
.ant-layout.realdark,
.ant-pro-layout.dark,
.ant-pro-layout.realdark {
  .ant-pro-global-header-index-right {
    color: rgba(255, 255, 255, 0.85) !important;

    * {
      color: rgba(255, 255, 255, 0.85) !important;
    }

    .ant-pro-global-header-index-action {
      color: rgba(255, 255, 255, 0.85) !important;

      &:hover {
        color: #1890ff !important;
        background: rgba(255, 255, 255, 0.08) !important;
      }
    }
  }
}
</style>
