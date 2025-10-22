<template>
  <section class="hypothermia-animation">
    <inline-svg
      v-entreacte:fade-left
      :src="silhouette"
      :style="gradient" />
    <section class="stack">
      <h1 v-entreacte:fade-right class="temperature">
        {{ temperature.toFixed(1) }} <small>&deg;C</small>
      </h1>
      <ul v-entreacte:fade-right class="symptoms">
        <li v-for="symptom in symptoms" :key="symptom" :class="symptom">
          {{ t(`safety.hypothermia.symptoms.${symptom}`) }}
        </li>
      </ul>
      <p v-entreacte:fade-up>{{ t('safety.hypothermia.definition') }}</p>
    </section>
  </section>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import InlineSvg from 'vue-inline-svg';
import { hypothermia } from '../config.yaml';
import silhouette from '../assets/silhouettes/body.svg';

const constrain = (num, min, max) => Math.min(Math.max(num, min), max);

export default {
  name: 'HypothermiaAnimation',
  components: { InlineSvg },
  setup() {
    const { t } = useI18n();
    const temperature = ref(hypothermia.animation.max);
    let isDown = true;

    const gradient = computed(() => {
      const { max, colors } = hypothermia.animation;
      const a = max - Math.ceil(temperature.value);
      const cold = colors[constrain(a * 2, 0, colors.length - 1)];
      const warm = colors[constrain(a, 0, colors.length - 1)];
      return { '--in-color': warm, '--out-color': cold };
    });

    const symptoms = computed(() => Object.keys(hypothermia.symptoms).filter(symptom => {
      const [min, max] = hypothermia.symptoms[symptom];
      return temperature.value >= min && temperature.value <= max;
    }));

    watch(temperature, current => {
      const { min, max, timeouts: { increase, decrease, wait } } = hypothermia.animation;
      isDown = current > min ? current < max ? isDown : true : false;
      const step = isDown ? -0.1 : 0.1;
      const timeout = current > min && current < max ? isDown ? decrease : increase : wait;
      const next = Math.round((current + step) * 10) / 10;
      setTimeout(() => { temperature.value = next; }, timeout);
    }, { immediate: true });

    return { t, silhouette, temperature, gradient, symptoms };
  },
};
</script>

<style lang="scss" scoped>
.hypothermia-animation {

  section { margin-top: 0; }

  .symptoms {
    margin-bottom: auto;
    font-size: 1.5em;

    li { margin: 1.2em 2em; }
  }

  .temperature {
    font-size: 6rem;
    text-align: center;
    margin: 0.75em 0;
  }
}
</style>
