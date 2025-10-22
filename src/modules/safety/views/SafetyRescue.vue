<template>
  <section class="stack block-image">
    <figure v-entreacte:fade-up class="attribution cover faded shadow-br">
      <img src="https://images.pexels.com/photos/263356/pexels-photo-263356.jpeg">
      <figcaption>© photo by pixabay on Pexels</figcaption>
    </figure>
    <section>
      <h2 v-entreacte:fade>{{ t('safety.rescue.emergency_phone') }}</h2>
      <div v-entreacte:fade-down class="box box--alert">
        <h1 class="emergency-phone">112</h1>
        <p>{{ t('safety.rescue.european_phone') }}</p>
        <p class="note">{{ t('safety.rescue.disclaimer') }}</p>
      </div>
    </section>
  </section>
  <section>
    <p v-entreacte:fade>{{ t('safety.rescue.phone_directives') }}</p>
    <ul class="grid-list grid-list--bignum">
      <li v-for="(question, i) in phoneQuestions" :key="question" v-entreacte="animation(i)">
        <h4>{{ t(`safety.rescue.phone_questions.${question}`) }}</h4>
        <p>{{ t(`safety.rescue.phone_questions.${question}_desc`) }}</p>
      </li>
    </ul>
  </section>
  <section v-entreacte:fade :data-tag="t('safety.rescue.distress_signals')">
    <div class="columns">
      <article class="column">
        <p v-entreacte:fade-up>
          {{ t('safety.rescue.distress.helicopter_message') }}
        </p>
        <div v-entreacte:fade-down class="columns">
          <figure class="column silhouette">
            <img src="../assets/silhouettes/hands_up.svg">
            <figcaption>{{ t('safety.rescue.distress.helicopter_yes') }}</figcaption>
          </figure>
          <figure class="column silhouette">
            <img src="../assets/silhouettes/hand_up.svg">
            <figcaption>{{ t('safety.rescue.distress.helicopter_no') }}</figcaption>
          </figure>
        </div>
      </article>
      <article class="column stack">
        <p v-entreacte:fade-up>
          {{ t('safety.rescue.distress.morse_sos') }}
        </p>
        <p v-entreacte:fade-down class="center sos">
          <span data-morse-beep="S">S</span>
          <span data-morse-beep="O">O</span>
          <span data-morse-beep="S">S</span>
        </p>
      </article>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'SafetyRescue',
  setup() {
    const { t } = useI18n();

    const phoneQuestions = ['what', 'when', 'where', 'who'];

    const animation = (i, initialDelay = 0) => ({
      enter: {
        animation: 'fade-up',
        delay: `${initialDelay + i * 0.25}s`,
      },
      leave: 'fade-up',
    });

    return { t, phoneQuestions, animation };
  },
};
</script>

<style lang="scss" scoped>
.emergency-phone {
  text-align: center;
  font-size: 7rem;
}

.silhouette {
  text-align: center;
  color: inherit;

  img {
    height: 15rem;
    margin: auto;
  }
}

.sos {
  font-size: 8em;
  text-align: center;
  font-weight: bold;
  font-family: 'Futura', 'Arial', sans-serif;
}

[data-morse-beep] {
  position: relative;
  display: inline-block;

  &::before {
    position: absolute;
    content: attr(data-morse-beep);
    display: block;
    opacity: 0.5;
  }

  &:nth-child(1)::before { animation: morse-beep-s1 15s linear 2s infinite; }
  &:nth-child(2)::before { animation: morse-beep-o 15s linear 2s infinite; }
  &:nth-child(3)::before { animation: morse-beep-s2 15s linear 2s infinite; }
}

@mixin morse-beep-s($start) {
  0% { transform: scale(1); }
  #{$start}% { transform: scale(1); }
  #{$start + 1.25}% { transform: scale(1.5); }
  #{$start + 2.5}% { transform: scale(1); }
  #{$start + 3.75}% { transform: scale(1.5); }
  #{$start + 5}% { transform: scale(1); }
  #{$start + 6.25}% { transform: scale(1.5); }
  #{$start + 7.5}% { transform: scale(1); }
}

@keyframes morse-beep-s1 { @include morse-beep-s(1.25); }

@keyframes morse-beep-s2 { @include morse-beep-s(31.25); }

@keyframes morse-beep-o {
  0% { transform: scale(1); }
  12.5% { transform: scale(1); }
  13.75% { transform: scale(1.5); }
  16.25% { transform: scale(1.5); }
  17.5% { transform: scale(1); }
  18.75% { transform: scale(1.5); }
  21.25% { transform: scale(1.5); }
  22.5% { transform: scale(1); }
  23.75% { transform: scale(1.5); }
  26.25% { transform: scale(1.5); }
  27.5% { transform: scale(1); }
}
</style>
