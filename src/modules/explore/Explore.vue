<template>
  <trail-filters v-model="filter" v-entreacte:fade />
  <section v-entreacte:fade :data-tag-pre="t('explore.trails')">
    <div
      v-dragscroll
      v-entreacte:fade-up
      class="trails scroller"
      :data-empty="t('explore.no_trails')">
      <trail-card
        v-for="trail in filteredTrails"
        :key="trail.id"
        v-grow
        :trail="trail"
        :active="activeTrail"
        @click="toggleTrail(trail)" />
    </div>
  </section>
  <section class="stack">
    <div id="explore" v-entreacte:fade class="map">
      <trail-sheet v-if="activeTrail" :trail="activeTrail" />
    </div>
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useMap, useGeoJSON, useAnimations } from '/@/components/map';
import TrailCard from './components/TrailCard.vue';
import TrailSheet from './components/TrailSheet.vue';
import TrailFilters from './components/TrailFilters.vue';
import repository from './repository';
import Grow from '/@/utils/directive.grow';
import config from './config.yaml';

export default {
  name: 'Explore',
  directives: { Grow },
  components: { TrailCard, TrailSheet, TrailFilters },
  setup() {
    const { t, locale } = useI18n();

    const geojson = reactive({});
    const trails = ref([]);
    const filter = ref(undefined);
    const activeTrail = ref(undefined);

    const filteredTrails = computed(() => trails.value.filter(filter.value || Boolean));

    const toggleTrail = async trail => {
      geojson.layers.removeLayer('trail');
      if (activeTrail.value && trail.id === activeTrail.value.id) {
        activeTrail.value = undefined;
        return;
      }
      const track = await (await fetch(trail.track[0].url)).json();
      geojson.layers.addLayer(track, {
        name: 'trail',
        className: 'route',
        onLoad: geojson.animations.tracePath,
      });
      activeTrail.value = { ...trail, track };
    };

    onMounted(async () => {
      const map = useMap('explore', config.map);

      geojson.layers = useGeoJSON(map);
      geojson.animations = useAnimations(map);

      trails.value = await repository.getTrails();
    });

    return { t, locale, filteredTrails, activeTrail, toggleTrail, filter };
  },
};
</script>

<style lang="scss" scoped>
.trails { min-height: 13rem; }

.stats {
  box-sizing: border-box;
  padding: var(--s);
  font-size: var(--l);
  display: flex;
  justify-content: space-around;

  em {
    display: block;
    font-size: var(--s);
  }
}
</style>
