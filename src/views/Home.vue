<template>
  <div class="relative z-[-1] flex justify-center items-center min-h-screen">
    <section class="card-box">
      <div class="card-item" v-for="( card,index) in cardList" :key="card.name" 
      :style="`--i: ${index}; transform:rotateX( calc(var(--i)*${rotateDeg}deg) ) translateZ(${rainWidth}px)`"
        >
        <img :src="card.img" :alt="card.name"/>
      </div>
    </section>
  </div>
  <div class="w-full flex justify-center">
    <button class="lottery-btn" @click="lottery" v-show="showLotteryBtn">抽獎</button>
  </div>
  <LotteryModal v-show="showLottery" :show="showLottery" :lottery="cardList[lotteryItemIndex]" @close="showLottery = false"/>
</template>
<script setup lang="ts">
import LotteryModal from '@/commonComponents/LotteryModal.vue';
import { Lottery } from '@/types/lottery'
const cardList:Lottery[] = [
{
    name:"p1",
    img:'https://picsum.photos/id/65/200/200',
    content:'通通有獎',
  },
  {
    name:"p2",
    img:'https://picsum.photos/id/65/200/200',
    content:'通通有獎',
  },
  {
    name:"p3",
    img:'https://picsum.photos/id/85/200/200',
    content:'紅茶一杯',
  },
  {
    name:"p4",
    img:'https://picsum.photos/id/185/200/200',
    content:'奶茶一杯',
  },
  {
    name:"p5",
    img:'https://picsum.photos/id/67/200/200',
    content:'烏龍茶一杯',
  },
  {
    name:"p6",
    img:'https://picsum.photos/id/68/200/200',
    content:'普爾茶一杯',
  },
  {
    name:"p7",
    img:'https://picsum.photos/id/79/200/200',
    content:'奶蓋茶一杯',
  },
  {
    name:"p8",
    img:'https://picsum.photos/id/80/200/200',
    content:'金佶檸檬茶一杯',
  },
  {
    name:"p9",
    img:'https://picsum.photos/id/68/200/200',
    content:'普爾茶一杯',
  },
  {
    name:"p10",
    img:'https://picsum.photos/id/79/200/200',
    content:'奶蓋茶一杯',
  },
  {
    name:"p11",
    img:'https://picsum.photos/id/68/200/200',
    content:'普爾茶一杯',
  },
  {
    name:"p12",
    img:'https://picsum.photos/id/79/200/200',
    content:'奶蓋茶一杯',
  },
  {
    name:"p13",
    img:'https://picsum.photos/id/80/200/200',
    content:'金佶檸檬茶一杯',
  },
  {
    name:"p14",
    img:'https://picsum.photos/id/68/200/200',
    content:'普爾茶一杯',
  },
  {
    name:"p15",
    img:'https://picsum.photos/id/79/200/200',
    content:'奶蓋茶一杯',
  },
]
const baseRotateAngle = 720
const rotateDeg = 360/cardList.length
const mobileRainWidth = ref(250)
const desktopRainWidth = ref(400)
const rainWidth = ref(mobileRainWidth.value)

const lotteryItemIndex = ref(0)
const showLottery = ref(false)
const showLotteryBtn = ref(true)

const mqlMin768 = window.matchMedia("(min-width :768px)")
const initCardBoxRainSize = ()=>{
  if(mqlMin768.matches) rainWidth.value = desktopRainWidth.value
}
const addCardBoxResponsive = ()=>{
  mqlMin768.addEventListener('change',()=>{
    if(mqlMin768.matches && rainWidth.value !== desktopRainWidth.value) rainWidth.value = desktopRainWidth.value
    else rainWidth.value = mobileRainWidth.value
  })
}

const getCardBoxElement = ():HTMLElement=>{
  return document.querySelector(".card-box") as HTMLElement;
}
const getCardBoxAnimation = (element:HTMLElement): Animation => {
  return element.getAnimations()[0];
}

const getRandomAngle = ()=>{
  lotteryItemIndex.value = Math.floor(Math.random()*cardList.length)
  let deg = (lotteryItemIndex.value+1)*rotateDeg
  if(rotateDeg <360) deg = baseRotateAngle+deg
  return deg
}

const lottery = async() => {
  showLottery.value = false
  showLotteryBtn.value = false  
  const cardBoxElement = getCardBoxElement()
  const cardBoxAnimation = getCardBoxAnimation(cardBoxElement)
  if(cardBoxAnimation) {
    cardBoxAnimation.cancel()
  }
  cardBoxElement.animate([
    {transform:'perspective(1000px) rotateX(0deg);',easing:'ease-in'},
    {transform:`perspective(1000px) rotateX(${getRandomAngle()}deg)`}
  ],{
    duration:5000,
    fill:'both',
    easing:'ease-out'
  })

  await getCardBoxAnimation(cardBoxElement).finished
  showLottery.value = true
  showLotteryBtn.value = true
}

onMounted(()=>{
  initCardBoxRainSize()
  addCardBoxResponsive()
})
</script>
