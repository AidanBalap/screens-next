<template>
  <figure v-entreacte:fade-down class="ungutter">
    <img src="../assets/trekking_gear.png">
  </figure>
  <section>
    <h1 v-entreacte:fade-up>{{ t('safety.equipment.equip_yourself') }}</h1>
    <p v-entreacte:fade-up="'0.25s'">
      {{ t('safety.equipment.proper_equipment') }}
    </p>
  </section>
  <section class="columns">
    <section
      v-entreacte:fade
      class="column column--2"
      :data-tag-pre="t('safety.equipment.essentials')">
      <ul class="icon-list list-cols-2">
        <li v-for="(item, i) in equipment.essential" :key="item" v-entreacte="animation(i)">
          <inline-svg :src="icons[`../assets/equipment/${item}.svg`].default" class="icon" />
          {{ t(`safety.equipment.items.${item}`) }}
        </li>
      </ul>
    </section>
    <section
      v-entreacte:fade
      class="column"
      :data-tag-pre="t('safety.equipment.recommended')">
      <ul class="icon-list">
        <li v-for="(item, i) in equipment.recommended" :key="item" v-entreacte="animation(i)">
          <inline-svg :src="icons[`../assets/equipment/${item}.svg`].default" class="icon" />
          {{ t(`safety.equipment.items.${item}`) }}
        </li>
      </ul>
    </section>
  </section>
  <section v-entreacte:fade-down class="note">
    {{ t('safety.equipment.disclaimer') }}
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n';
import InlineSvg from 'vue-inline-svg';
import { equipment } from '../config.yaml';

const icons = import.meta.glob('../assets/equipment/*.svg', { eager: true });

export default {
  name: 'SafetyEquipment',
  components: { InlineSvg },
  setup() {
    const { t } = useI18n();

    const animation = i => ({
      enter: {
        animation: 'fade-left',
        delay: `${0.5 + i * 0.15}s`,
      },
      leave: 'fade-left',
    });

    return { t, equipment, icons, animation };
  },
};
</script>
