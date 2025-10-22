<template>
  <div class="stack commitment">
    <ul class="nav-bar">
      <li v-for="(tip, name, i) in tips" :key="name">
        <a
          href="#"
          :class="{ active: page === Math.floor(i / tipsPerPage) }"
          @click.prevent="setPage(Math.floor(i / tipsPerPage))">
          {{ t(`commitment.${name}.title`) }}
        </a>
      </li>
    </ul>
    <section
      v-for="(tip, name, i) in pageTips"
      :key="name"
      :class="['stack', 'block-image', { reverse: i % 2 }]">
      <figure v-entreacte:fade-up class="attribution cover faded">
        <img :src="tip.image.url">
        <figcaption>{{ tip.image.attribution }}</figcaption>
      </figure>
      <section>
        <h2 v-entreacte:fade>{{ t(`commitment.${name}.title`) }}</h2>
        <div v-entreacte:fade-down>
          <p v-for="text in tip.text" :key="text.text || text" :class="text.type">
            {{ t(`commitment.${name}.${text.text || text}`) }}
          </p>
          <ul v-if="tip.list" class="icon-list">
            <li v-for="item in tip.list" :key="item.text">
              <i :class="`ri-${item.icon}-line icon icon--${item.type}`" />
              {{ t(`commitment.${name}.${item.text}`) }}
            </li>
          </ul>
          <div v-if="tip.qr">
            <p class="note">{{ t('global.more_info_qr') }}</p>
            <qr-code :value="tip.qr" render-as="svg" foreground="#2d2c2f" />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import QrCode from 'qrcode.vue';
import config from './config.yaml';

export default {
  name: 'Commitment',
  components: { QrCode },
  setup() {
    const { t } = useI18n();
    const page = ref(0);

    const setPage = newPage => {
      page.value = newPage;
    };

    const pageTips = computed(() => {
      const { tips, tipsPerPage } = config;
      const start = page.value * tipsPerPage;
      const end = start + tipsPerPage;
      return Object.entries(tips)
        .slice(start, end)
        .reduce((acc, [name, tip]) => {
          acc[name] = tip;
          return acc;
        }, {});
    });

    return { t, page, setPage, pageTips, ...config };
  },
};
</script>
