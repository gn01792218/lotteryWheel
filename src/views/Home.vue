<template>
  <button class="absolute top-[100px] w-[100px] h-[100px] bg-yellow-200 block" @click="lottery">抽獎</button>
  <section class="card-box">
    <span style="--i: 1"
      ><img src="https://picsum.photos/id/685/200/200" alt=""
    /></span>
    <span style="--i: 2"
      ><img src="https://picsum.photos/id/687/200/200" alt=""
    /></span>
    <span style="--i: 3"
      ><img src="https://picsum.photos/id/67/200/200" alt=""
    /></span>
    <span style="--i: 4"
      ><img src="https://picsum.photos/id/87/200/200" alt=""
    /></span>
    <span style="--i: 5"
      ><img src="https://picsum.photos/id/667/200/200" alt=""
    /></span>
    <span style="--i: 6"
      ><img src="https://picsum.photos/id/95/200/200" alt=""
    /></span>
    <span style="--i: 7"
      ><img src="https://picsum.photos/id/25/200/200" alt=""
    /></span>
    <span style="--i: 8"
      ><img src="https://picsum.photos/id/35/200/200" alt=""
    /></span>
  </section>
</template>
<script setup lang="ts">
const getCardBoxAnimation = (): Animation => {
  const cardBox = document.querySelector(".card-box") as HTMLElement;
  const cardBoxAnimation = cardBox.getAnimations()[0];
  return cardBoxAnimation;
};
const lotteryInit = () => {
  const cardBoxAnimation = getCardBoxAnimation();
  cardBoxAnimation.pause();
};

const lottery = () => {
  const cardBoxAnimation = getCardBoxAnimation();
  cardBoxAnimation.play();
  console.log(getCardBoxAnimation());
};
onMounted(() => {
  lotteryInit();
});
</script>
