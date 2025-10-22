<template>
  <ul class="profiles">
    <li v-for="name in profiles" :key="name">
      <label>
        <input v-model="profile" :value="name" type="radio">
        <inline-svg :src="icons[`../assets/profiles/${name}.svg`].default" />
        <span>{{ t(`explore.profiles.${name}`, name) }}</span>
      </label>
    </li>
  </ul>
</template>

<script>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import InlineSvg from 'vue-inline-svg';
import config from '../config.yaml';

const { profiles } = config.filters;

const icons = import.meta.glob('../assets/profiles/*.svg', { eager: true });

export default {
  name: 'TrailFiltersProfile',
  components: { InlineSvg },
  props: { modelValue: { type: Function, required: true } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const profile = ref(undefined);

    watch(profile, value => {
      const filter = trail => !value || trail.profile?.includes(value);
      emit('update:modelValue', filter);
    }, { immediate: true });

    return { t, profiles, profile, icons };
  },
};
</script>

<style lang="scss" scoped>
.profiles {
  display: flex;
  justify-content: center;
  font-size: var(--s);

  li {
    text-align: center;
    margin: var(--s);
  }

  svg,
  img {
    display: block;
    margin: 0 auto var(--xs);
    height: var(--xxxl);
  }

  input {
    display: none;

    &:checked ~ * { color: var(--color-primary); }
  }
}
</style>
