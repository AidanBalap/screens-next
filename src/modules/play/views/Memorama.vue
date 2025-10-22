<template>
  <ul v-entreacte:fade-down class="nav-bar">
    <li v-for="(_, name) in LEVELS" :key="name">
      <label>
        <input v-model="level" type="radio" :value="name">
        <span>{{ t(`play.memorama.levels.${name}`) }}</span>
      </label>
    </li>
  </ul>
  <section class="stack">
    <transition-group
      v-if="suits.length"
      v-entreacte:fade-up
      tag="ul"
      name="deal-cards"
      class="stack board"
      mode="out-in"
      appear>
      <li v-for="card in gameplay.deck" :key="card.id">
        <div
          v-if="!card.empty"
          :class="cardStatus(card)"
          @click="flipCard(card)">
          <div class="card__front">
            <img :src="card.drawing[0].url" class="card__image">
            <h6>{{ card[`name_${locale}`] }}</h6>
          </div>
          <div class="card__back">
            <svg-inline src="/images/vectors/logo.svg" />
          </div>
        </div>
      </li>
    </transition-group>
    <p v-else class="loading">{{ t('play.memorama.loading') }}</p>
  </section>
  <div v-if="gameplay.isFinished" class="score">
    <strong>🎉  BOOM!</strong>
    <p>{{ t('play.memorama.score', gameplay) }}</p>
    <p>
      <button class="btn" @click="reset">{{ t('play.again') }}</button>
      <router-link to="/play" class="btn btn--plain">{{ t('play.exit') }}</router-link>
    </p>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import SvgInline from 'vue-inline-svg';
import repository from '../repository';

const findNextSquare = num => {
  const next = Math.floor(Math.sqrt(num)) + 1;
  return next * next;
};

export default {
  name: 'Memorama',
  components: { SvgInline },
  setup() {
    const { t, locale } = useI18n();

    const LEVELS = { easy: 3, medium: 5, hard: 7 };

    const suits = ref([]);
    const level = ref('easy');
    const gameplay = reactive({ deck: [] });

    const wait = ms => {
      gameplay.isWaiting = true;
      return new Promise(resolve => {
        setTimeout(() => {
          gameplay.isWaiting = false;
          resolve();
        }, ms);
      });
    };

    const cardStatus = card => ['card', { flipped: card.isFlipped || card.isFound }];
    const setCardStatus = (card, { flip = card.isFlipped, found = card.isFound }) => {
      card.isFound = found;
      card.isFlipped = flip;
    };

    // Flip a card and check if the pair is found. Update status when required
    const flipCard = async card => {
      if (gameplay.isWaiting || card.isFlipped || card.isFound) return;
      setCardStatus(card, { flip: true });
      gameplay.flipped.push(card);
      if (gameplay.flipped.length === 2) {
        gameplay.movements += 1;
        const [first, second] = gameplay.flipped;
        if (first.suit === second.suit) {
          setCardStatus(first, { found: true });
          setCardStatus(second, { found: true });
          gameplay.found += 1;
        } else await wait(2000);
        setCardStatus(first, { flip: false });
        setCardStatus(second, { flip: false });
        gameplay.flipped = [];
      }
    };

    // Take random pairs and shouffle them
    const dealCards = () => {
      const pairs = LEVELS[level.value];
      const slots = findNextSquare(2 * pairs);
      gameplay.deck = suits.value
        // Shuffle suits
        .sort(() => 0.5 - Math.random())
        // Take pairs
        .slice(0, pairs)
        // 2 cards per suit
        .flatMap(suit => [
          { ...suit, id: `${suit.suit}-1` },
          { ...suit, id: `${suit.suit}-2` },
        ])
        // Fill empty slots
        .concat([...Array(slots - 2 * pairs).keys()].map(id => ({ id, empty: true })))
        // Shuffle with better randomizer
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
    };

    // Clear all round variables and deal cards
    const reset = async () => {
      gameplay.isFinished = false;
      gameplay.deck.forEach(card => setCardStatus(card, { flip: false, found: false }));
      await wait(1000);
      gameplay.isWaiting = false;
      gameplay.time = Date.now();
      gameplay.movements = 0;
      gameplay.flipped = [];
      gameplay.found = 0;
      dealCards();
    };

    // If all pairs are found, reset the cards and start the game again
    watch(() => gameplay.found, async () => {
      if (gameplay.found !== LEVELS[level.value]) return;
      gameplay.time = Math.round((Date.now() - gameplay.time) / 1000);
      await wait(1000);
      gameplay.isFinished = true;
    });

    // Deal cards again whenever the number of pairs change
    watch(level, reset);

    onMounted(async () => {
      suits.value = await repository.getCards();
      reset();
    });

    return { t, locale, LEVELS, level, suits, gameplay, cardStatus, reset, flipCard };
  },
};
</script>

<style lang="scss">
.board {
  display: grid !important;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  place-items: center;
  text-align: center;
  padding: 10rem 2rem;

  .card {
    height: 13rem;
    width: 9rem;
    transform: rotateY(180deg);
    transform-style: preserve-3d;
    transform-origin: center center;
    transition: transform 1s ease;
    text-align: center;

    &.flipped { transform: rotateY(0); }

    &__front,
    &__back {
      backface-visibility: hidden;
      box-sizing: border-box;
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: 1em !important;
      overflow: hidden !important;
    }

    &__front {
      border: 1px solid #0002;
      background: #fff;
      padding: 1rem;
    }

    &__back {
      display: grid;
      place-items: center;
      color: #fff;
      padding: 2rem;
      background: linear-gradient(315deg, #24262c 35%, #3b3d44 100%);
      transform: rotateY(180deg);
    }

    &__image {
      height: 75%;
      width: 100%;
      object-fit: contain;
    }

    h6 {
      margin-top: 1rem;
      text-transform: uppercase;
      font-size: 0.8em;
    }
  }
}

.deal-cards {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.6);
    position: absolute;
  }

  &-move { transition: all 1s ease; }
}

.score {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52vw;
  background: #fff;
  border: 1px solid #0002;
  padding: var(--xxxl);
  border-radius: var(--border-radius);
  transform: translate(-50%, -50%);
  font-size: var(--xl);
  box-shadow: 0 0 1em 0 #0002;

  strong {
    font-size: var(--xxxl);
  }
}
</style>
