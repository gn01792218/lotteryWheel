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
const getCardBoxElement = ():HTMLElement=>{
  return document.querySelector(".card-box") as HTMLElement;
}
const getCardBoxAnimation = (element:HTMLElement): Animation => {
  return element.getAnimations()[0];
}

const lotteryInit = () => {
  const cardBoxAnimation = getCardBoxAnimation(getCardBoxElement());
  cardBoxAnimation.pause();
};

const lottery = () => {
  const cardBoxAnimation = getCardBoxAnimation(getCardBoxElement());
  cardBoxAnimation.play()
  setTimeout(()=>{
    cardBoxAnimation.pause()
  },4990)
};
onMounted(() => {
  lotteryInit();
});
</script>
