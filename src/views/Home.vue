<template>
  <button class="absolute top-[100px] left-[20%] w-[100px] h-[100px] bg-yellow-200 block" @click="lottery">抽獎</button>
  <section class="card-box">
    <div class="card-item" v-for="( card,index) in cardList" :key="card.name" 
    :style="`--i: ${index}; transform:rotateX( calc(var(--i)*${rotateDeg}deg) ) translateZ(300px)`"
      >{{ index }}<img :src="card.img" :alt="card.name"
    /></div>
  </section>
</template>
<script setup lang="ts">
interface CardObject {
  name:string,
  img:string,
  content:string
}
const cardList:CardObject[] = [
  {
    name:"p1",
    img:'https://picsum.photos/id/685/200/200',
    content:'再來一次',
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
]
const baseRotateAngle = 720
const rotateDeg = 360/cardList.length
const getCardBoxElement = ():HTMLElement=>{
  return document.querySelector(".card-box") as HTMLElement;
}
const getCardBoxAnimation = (element:HTMLElement): Animation => {
  return element.getAnimations()[0];
}
const getRandomAngle = ()=>{
  const r = Math.floor(Math.random()*cardList.length+1)
  let deg = r*rotateDeg
  if(rotateDeg <360) deg = baseRotateAngle+deg
  return deg
}
const lottery = () => {
  const cardBoxElement = getCardBoxElement()
  const cardBoxAnimation = getCardBoxAnimation(cardBoxElement)
  if(cardBoxAnimation) {
    cardBoxAnimation.cancel()
  }
  
  cardBoxElement.animate([
    {transform:'perspective(1000px) rotateX(0deg);',easing:'ease-in'},
    {transform:`perspective(1000px) rotateX(${getRandomAngle()}deg)`,easing:'ease-out'}
  ],{
    duration:5000,
    fill:'both'
  })
  getCardBoxAnimation(cardBoxElement).pause()
  getCardBoxAnimation(cardBoxElement).play()
};
</script>
