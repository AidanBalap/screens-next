<template>
  <section class="block-video">
    <h1 v-entreacte:fade-up>{{ t('safety.thunderstorm.thunderstorm') }}</h1>
    <video-embed v-entreacte:fade-down :src="video" class="shadow-bl" />
    <p v-entreacte:fade-up>{{ t('safety.thunderstorm.description') }}</p>
  </section>

  <section class="stack columns">
    <div v-entreacte:fade-right class="column column--2 stack">
      <p class="center">{{ t('safety.thunderstorm.know_distance') }}</p>
    </div>
    <div v-entreacte:fade-left class="column stacks">
      <p class="text-xxxl formula">d<small>(km)</small> = s / 3</p>
    </div>
  </section>

  <section>
    <h2 v-entreacte:fade-up>
      {{ t('safety.thunderstorm.avoid_lightning') }}
    </h2>
    <p v-entreacte:fade-up="'0.25s'">
      {{ t('safety.thunderstorm.prevention') }}
    </p>
  </section>
  <section class="columns">
    <section
      v-entreacte:fade
      class="column"
      :data-tag-pre="t('safety.thunderstorm.in_case_of')">
      <ul class="icon-list">
        <li v-for="(tip, i) in dos" :key="tip" v-entreacte="animation(i)">
          <i class="ri-check-line icon icon--success" />
          {{ t(`safety.thunderstorm.safety_tips.${tip}`) }}
        </li>
        <li
          v-for="(tip, i) in donts"
          :key="tip"
          v-entreacte="animation(i, dos.length * 0.15)">
          <i class="ri-close-line icon icon--alert" />
          {{ t(`safety.thunderstorm.safety_tips.${tip}`) }}
        </li>
      </ul>
    </section>
    <section
      v-entreacte:fade
      class="column"
      :data-tag-pre="t('safety.thunderstorm.safety_position')">
      <image-markers v-entreacte:fade-up :markers="markers" class="center">
        <img src="../assets/silhouettes/crouching.svg" width="350">
        <template #marker="{ marker }">
          <span :data-tooltip="t(`safety.thunderstorm.safety_tips.${marker.id}`)">
            <i class="marker ri-add-line" />
          </span>
        </template>
      </image-markers>
    </section>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import VideoEmbed from '/@/components/VideoEmbed.vue';
import ImageMarkers from '/@/components/ImageMarkers.vue';
import { thunderstorm } from '../config.yaml';

export default {
  name: 'SafetyThunderstorm',
  components: { VideoEmbed, ImageMarkers },
  setup() {
    const { t } = useI18n();
    const { video, dos, donts, markers } = thunderstorm;
    const animation = (i, initialDelay = 0) => ({
      enter: {
        animation: 'fade-left',
        delay: `${initialDelay + i * 0.15}s`,
      },
      leave: 'fade-left',
    });
    return { t, video, dos, donts, markers, animation };
  },
};
</script>
