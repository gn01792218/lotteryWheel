<template>
  <section
    class="flex justify-center items-center min-h-screen"
  >
    <section class="lottery-wheel-container">
      <div class="lottery-btn"></div>
      <div
        class="lottery-wheel"
      >
      <!-- #F8CC42  #000000-->
      <div class="lottery-item"
        v-for="(lottery, index) in lotteryList"
        :key="lottery.name"
        
        :style="`--i: ${index};--color:${index%2===0?'#F8CC42':'#F6FADF'}`"
      >
        <span>{{ lottery.name }}</span>
      </div>  
      </div>
    </section>
  </section>
  <!-- <section class="w-full flex justify-center">
    <button class="lottery-btn" @click="lottery" v-show="showLotteryBtn">
      抽獎
    </button>
  </section> -->
  <LotteryModal
    v-show="showLottery"
    :show="showLottery"
    :lottery="lotteryList[winlotteryIndex]"
    @close="showLottery = false"
  />
</template>
<script setup lang="ts">
import LotteryModal from "@/commonComponents/LotteryModal.vue";
import { Lottery } from "@/types/lottery";
import { getLotteryItems, getLotteryWinner } from "@/api";

getLotteryList();

onMounted(() => {
  initCardBoxRainSize();
  addCardBoxResponsive();
});

/**
 * lottery控制
 */
let lotteryList = ref<Lottery[]>([
  {
    id: 1,
    name: "p1",
    img: "https://picsum.photos/id/65/200/200",
    url: "",
  },
  {
    id: 2,
    name: "p2",
    img: "https://picsum.photos/id/65/200/200",
    url: "",
  },
  {
    id: 3,
    name: "p3",
    img: "https://picsum.photos/id/85/200/200",
    url: "",
  },
  {
    id: 4,
    name: "p4",
    img: "https://picsum.photos/id/185/200/200",
    url: "",
  },
  {
    id: 5,
    name: "p5",
    img: "https://picsum.photos/id/67/200/200",
    url: "",
  },
  {
    id: 6,
    name: "p6",
    img: "https://picsum.photos/id/68/200/200",
    url: "",
  },
  {
    id: 7,
    name: "p7",
    img: "https://picsum.photos/id/79/200/200",
    url: "",
  },
  {
    id: 8,
    name: "p8",
    img: "https://picsum.photos/id/80/200/200",
    url: "",
  },
  {
    id: 9,
    name: "p9",
    img: "https://picsum.photos/id/68/200/200",
    url: "",
  },
  {
    id: 10,
    name: "p10",
    img: "https://picsum.photos/id/79/200/200",
    url: "",
  },
  {
    id: 11,
    name: "p11",
    img: "https://picsum.photos/id/68/200/200",
    url: "",
  },
  {
    id: 12,
    name: "p12",
    img: "https://picsum.photos/id/79/200/200",
    url: "",
  },
  {
    id: 13,
    name: "p13",
    img: "https://picsum.photos/id/80/200/200",
    url: "",
  },
  {
    id: 14,
    name: "p14",
    img: "https://picsum.photos/id/68/200/200",
    url: "",
  },
  {
    id: 15,
    name: "p15",
    img: "https://picsum.photos/id/79/200/200",
    url: "",
  },
]);
const winlotteryIndex = ref(0); //抽中的獎項index,根據資料來源index可能不同
const getCardBoxElement = (): HTMLElement => {
  return document.querySelector(".card-box") as HTMLElement;
};
const getCardBoxAnimation = (element: HTMLElement): Animation => {
  return element.getAnimations()[0];
};
const setRandomWinLotteryIndex = ()=>{ //前端自己random用
  winlotteryIndex.value = Math.floor(Math.random() * lotteryList.value.length);
}
const getLotteryAngle = (winLotteryIndex:number) => {
  let deg = (winLotteryIndex+1) * rotateDeg.value;
  if (rotateDeg.value < 360) deg = baseRotateAngle + deg;
  return deg;
};

const lottery = async () => {
  await setwinLotteryIndex()
  // setRandomWinLotteryIndex()
  showLottery.value = false;
  showLotteryBtn.value = false;
  const cardBoxElement = getCardBoxElement();
  const cardBoxAnimation = getCardBoxAnimation(cardBoxElement);
  if (cardBoxAnimation) {
    cardBoxAnimation.cancel();
  }
  cardBoxElement.animate(
    [
      { transform: "perspective(1000px) rotateX(0deg);", easing: "ease-in" },
      { transform: `perspective(1000px) rotateX(${getLotteryAngle(winlotteryIndex.value)}deg)` },
    ],
    {
      duration: 5000,
      fill: "both",
      easing: "ease-out",
    }
  );

  await getCardBoxAnimation(cardBoxElement).finished;
  showLottery.value = true;
  showLotteryBtn.value = true;
};

/**
 * 基本變數調整
 */
const baseRotateAngle = 720;
const rotateDeg = computed(()=>360 / lotteryList.value.length);
const mobileRainWidth = ref(250);
const desktopRainWidth = ref(400);
const rainWidth = ref(mobileRainWidth.value);

/**
 * 畫面顯示控制
 */
const showLottery = ref(false);
const showLotteryBtn = ref(true);

/**
 * RWD控制
 */
const mqlMin768 = window.matchMedia("(min-width :768px)");
const initCardBoxRainSize = () => {
  if (mqlMin768.matches) rainWidth.value = desktopRainWidth.value;
};
const addCardBoxResponsive = () => {
  mqlMin768.addEventListener("change", () => {
    if (mqlMin768.matches && rainWidth.value !== desktopRainWidth.value)
      rainWidth.value = desktopRainWidth.value;
    else rainWidth.value = mobileRainWidth.value;
  });
};

/**
 * API
 */
async function getLotteryList() {
  const res = await getLotteryItems();
  lotteryList.value = res?.data;
}
async function setwinLotteryIndex(){
  return new Promise(async(resolve,reject)=>{
    const res = await getLotteryWinner()
    winlotteryIndex.value =  res?.data[0].winid-1
    resolve("")
  })
}
</script>
