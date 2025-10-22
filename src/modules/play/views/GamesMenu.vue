<template>
  <section v-if="true" class="stack">
    <ul class="games">
      <li
        v-for="(game, i) in games"
        :key="game"
        v-entreacte="`{ animation: 'fade' , delay: '${i * 0.15}s'}`">
        <figure class="cover">
          <img :src="covers[`../assets/cover.${game}.jpg`].default">
        </figure>
        <h1>{{ t(`play.${game}.name`) }}</h1>
        <em>{{ t(`play.${game}.description`) }}</em>
        <p>
          <router-link :to="{ name: game }" class="btn">
            {{ t('play.start') }}
          </router-link>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { games } from '../config.yaml';

const covers = import.meta.glob('../assets/cover.*.jpg', { eager: true });

export default {
  name: 'GamesMenu',
  setup() {
    const { t } = useI18n();
    return { t, games, covers };
  },
};
</script>

<style lang="scss">
.games {
  margin: auto 0;

  li {
    display: block;
    position: relative;
    margin: 10rem var(--xxxl);
    padding: var(--xxxl) 0;
    color: var(--color-dark);
  }

  figure {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    margin: 0;

    img {
      object-fit: contain !important;
      object-position: center right;
      opacity: 0.85;
    }
  }
}
</style>
