<template>
  <section v-entreacte:fade class="stack" :data-tag="t('navigation.menu')">
    <div class="nav-grid">
      <router-link
        v-for="module in modules"
        :key="module.name"
        :class="`nav-${module.name}`"
        :to="module.path">
        <h1
          v-entreacte:[module.transitions.title]
          :class="module.title">
          {{ t(`navigation.${module.name}`) }}
        </h1>
        <figure
          v-entreacte:[module.transitions.image]
          class="attribution cover">
          <img :src="module.image.url">
          <figcaption v-if="module.image.attribution">
            {{ module.image.attribution }}
          </figcaption>
        </figure>
      </router-link>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import config from '/@/config.yaml';

export default {
  name: 'Home',
  setup() {
    const { t } = useI18n();
    return { t, ...config };
  },
};
</script>
