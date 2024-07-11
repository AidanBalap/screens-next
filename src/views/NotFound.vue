<template>
  <div class="center">
    <figure v-animate:fade-up class="attribution cover">
      <h1>404</h1>
      <img src="/images/jpeg/KkCig7EbfoA_1100_800.jpeg">
      <figcaption>© photo by Andrew Neel on Unsplash</figcaption>
    </figure>
    <section v-animate:fade-down>
      <h1>{{ t('404.got_lost') }}</h1>
      <p>{{ t('404.not_here') }}</p>
    </section>
    <section v-animate:fade-up>
      <p>
        <button class="btn" @click="back">{{ t('404.go_back') }}</button>
        <router-link to="/" class="btn btn--plain">{{ t('404.go_menu') }}</router-link>
      </p>
    </section>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default {
  name: 'NotFound',
  setup() {
    const { t } = useI18n();
    const { back } = useRouter();
    return { t, back };
  },
};
</script>

<style lang="scss" scoped>
figure {
  h1 {
    line-height: 0;
    font-size: 17em;
    color: rgba(#000, 0.05);
    text-align: center;
    padding: 0 2rem 25rem;
  }

  img {
    filter: saturate(0.4);
    mask-image: linear-gradient(to bottom, transparent 0%, #000 75%);
  }
}
</style>
