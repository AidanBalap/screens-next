<template>
  <section v-if="!isMenu" v-entreacte:fade-down>
    <router-link to="/play" class="btn">{{ t('play.nav') }}</router-link>
  </section>
  <router-view />
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Playground',
  setup() {
    const { t } = useI18n();
    const { currentRoute } = useRouter();
    const isMenu = computed(() => currentRoute.value.name === 'menu');
    return { t, isMenu };
  },
};
</script>
