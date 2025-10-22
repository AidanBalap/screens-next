<template>
  <hypothermia-animation class="stack block-image image-thin" />
  <section class="columns">
    <section
      v-entreacte:fade
      class="column"
      :data-tag-pre="t('safety.hypothermia.prevention_tips')">
      <ul class="icon-list">
        <li v-for="(tip, i) in prevention.dos" :key="tip" v-entreacte="animation(i)">
          <i class="ri-check-line icon icon--success" />
          {{ t(`safety.hypothermia.tips.${tip}`) }}
        </li>
        <li
          v-for="(tip, i) in prevention.donts"
          :key="tip"
          v-entreacte="animation(i, prevention.dos.length * 0.15)">
          <i class="ri-close-line icon icon--alert" />
          {{ t(`safety.hypothermia.tips.${tip}`) }}
        </li>
      </ul>
    </section>
    <section
      v-entreacte:fade
      class="column"
      :data-tag-pre="t('safety.hypothermia.in_case_of')">
      <ul class="icon-list">
        <li v-for="(tip, i) in treatment.dos" :key="tip" v-entreacte="animation(i)">
          <i class="ri-check-line icon icon--success" />
          {{ t(`safety.hypothermia.tips.${tip}`) }}
        </li>
        <li
          v-for="(tip, i) in treatment.donts"
          :key="tip"
          v-entreacte="animation(i, treatment.dos.length * 0.15)">
          <i class="ri-close-line icon icon--alert" />
          {{ t(`safety.hypothermia.tips.${tip}`) }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import HypothermiaAnimation from '../components/HypothermiaAnimation.vue';
import { hypothermia } from '../config.yaml';

export default {
  name: 'SafetyHypothermia',
  components: { HypothermiaAnimation },
  setup() {
    const { t } = useI18n();

    const animation = (i, initialDelay = 0) => ({
      enter: {
        animation: 'fade-left',
        delay: `${initialDelay + i * 0.15}s`,
      },
      leave: 'fade-left',
    });

    return { ...hypothermia, t, animation };
  },
};
</script>
