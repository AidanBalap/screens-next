<template>
  <section class="stack block-image image-thick">
    <figure v-entreacte:fade-down class="attribution cover faded shadow-br">
      <img src="/images/jpeg/HaHd7dG2YnA_900_1000.jpeg">
      <figcaption>© photo by Hannah Tims on Unsplash</figcaption>
    </figure>
    <section v-entreacte:fade-up>
      <p>{{ t('safety.general.intro') }}</p>
      <p>{{ t('safety.general.guide') }}</p>
      <router-link class="btn" to="/guides">{{ t('guides.find_guide') }}</router-link>
    </section>
  </section>
  <section v-entreacte:fade :data-tag="t('safety.general.basic_principles')">
    <ul class="grid-list grid-list--2 grid-list--bignum">
      <li v-for="(principle, i) in principles" :key="principle" v-entreacte="animation(i)">
        <h3>{{ t(`safety.general.principles.${principle}`) }}</h3>
        <p v-entreacte="animation(i, 0.5)">
          {{ t(`safety.general.principles.${principle}_desc`) }}
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { principles } from '../config.yaml';

export default {
  name: 'SafetyGeneral',
  setup() {
    const { t } = useI18n();

    const animation = (i, initialDelay = 0) => ({
      enter: {
        animation: 'fade-up',
        delay: `${initialDelay + i * 0.25}s`,
      },
      leave: 'fade-up',
    });

    return { t, principles, animation };
  },
};
</script>
