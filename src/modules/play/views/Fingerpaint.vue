<template>
  <section v-entreacte:fade :data-tag="t('play.fingerpaint.drawings')">
    <div
      v-dragscroll
      v-entreacte:fade-down
      class="drawing-picker scroller"
      :data-empty="t('play.fingerpaint.no_drawings')">
      <label v-for="drawing in drawings" :key="drawing.name">
        <input v-model="selectedDrawing" :value="drawing" type="radio">
        <img :src="drawing.image[0].url">
      </label>
    </div>
  </section>
  <section class="stack">
    <div v-entreacte:fade class="drawer stack">
      <canvas ref="canvas" v-on="drawer.handlers" />
      <template v-if="selectedDrawing">
        <img :src="selectedDrawing.image[0].url">
        <p class="attribution">{{ selectedDrawing.attribution }}</p>
      </template>
    </div>
  </section>
  <section v-entreacte:fade-up class="toolbox">
    <color-picker v-model="brush.color">
      <img src="../assets/paint-brush.svg">
    </color-picker>
    <div class="brush-pointer">
      <input
        v-model="brush.width"
        min="5"
        max="75"
        :style="`--color:${brush.color}; --size:${brush.width}px`"
        type="range">
      <span :style="`--color:${brush.color}; --size:${brush.width}px`" />
    </div>
  </section>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import ColorPicker from '/@/components/ColorPicker.vue';
import repository from '../repository';

export default {
  name: 'Fingerpaint',
  components: { ColorPicker },
  setup() {
    const { t } = useI18n();

    const canvas = ref(null);
    const drawings = ref([]);
    const selectedDrawing = ref(undefined);
    const brush = reactive({ color: undefined, width: 20 });
    const drawer = reactive({
      isDrawing: false,
      ctx: null,
      canvas: null,
      handlers: {
        touchstart: event => {
          if (!drawer.canvas) drawer.canvas = event.target.getBoundingClientRect();
          drawer.isDrawing = true;
          drawer.ctx.beginPath();
        },
        touchmove: event => {
          if (!drawer.isDrawing) return;
          event.preventDefault();
          const { touches: [{ clientX, clientY }] } = event;
          drawer.ctx.strokeStyle = brush.color;
          drawer.ctx.lineWidth = brush.width;
          drawer.ctx.lineCap = 'round';
          drawer.ctx.lineJoin = 'round';
          drawer.ctx.lineTo(clientX - drawer.canvas.x, clientY - drawer.canvas.y);
          drawer.ctx.stroke();
        },
        touchend: () => {
          drawer.isDrawing = false;
          drawer.ctx.closePath();
        },
      },
      clear: () => {
        const { width, height } = drawer.ctx.canvas;
        drawer.ctx.clearRect(0, 0, width, height);
      },
    });

    watch(selectedDrawing, () => drawer.clear());

    onMounted(async () => {
      drawings.value = await repository.getDrawings();
      [selectedDrawing.value] = drawings.value;

      const { clientHeight, clientWidth } = canvas.value.parentNode;
      canvas.value.height = clientHeight;
      canvas.value.width = clientWidth;
      drawer.ctx = canvas.value.getContext('2d');
    });

    return { t, canvas, drawer, brush, drawings, selectedDrawing };
  },
};
</script>

<style lang="scss">
.drawing-picker {
  height: 9rem;
  text-align: center;

  label {
    margin: 0 2rem;
    flex: 0 0 7rem;
  }

  input { display: none; }
  img { height: 95%; }
}

.toolbox {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
}

.drawer {
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: translate(-50%, -50%);
  }

  .attribution {
    text-align: center;
    font-size: var(--xs);
  }
}

.brush-pointer {
  display: flex;
  align-items: center;
  margin: 0 3rem;

  input[type=range] {
    --color: #000;

    appearance: none;
    background: #0002;
    width: 20rem;
    height: 0;
    border: 1px solid #0001;
    margin: 0 1rem;

    &::-webkit-slider-thumb,
    &::-moz-range-thumb {
      border: 2px solid #0003;
      height: var(--size-touch);
      width: var(--size-touch);
      background:
        #fff
        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="gray" d="M15.243 4.515l-6.738 6.737-.707 2.121-1.04 1.041 2.828 2.829 1.04-1.041 2.122-.707 6.737-6.738-4.242-4.242zm6.364 3.535a1 1 0 0 1 0 1.414l-7.779 7.779-2.12.707-1.415 1.414a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414l1.414-1.414.707-2.121 7.779-7.779a1 1 0 0 1 1.414 0l5.657 5.657zm-6.364-.707l1.414 1.414-4.95 4.95-1.414-1.414 4.95-4.95zM4.283 16.89l2.828 2.829-1.414 1.414-4.243-1.414 2.828-2.829z"/></svg>')
        no-repeat
        center center;
      border-radius: 50%;
    }
  }

  span {
    position: relative;
    margin-left: 0;
    // margin-left: calc(var(--size) / 2);

    &::before {
      content: '';
      position: absolute;
      display: block;
      height: var(--size);
      width: var(--size);
      border-radius: 50%;
      background: var(--color);
      border: 1px solid #0002;
      transform: translate(0, -50%);
    }
  }
}
</style>
