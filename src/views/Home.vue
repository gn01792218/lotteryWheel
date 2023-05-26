<template>
  <section
    class="flex justify-center items-center min-h-screen"
  >
    <section class="lottery-wheel-container">
      <div class="lottery-btn" @click="lottery"></div>
      <div
        v-if="lotteryList.length"
        class="lottery-wheel"
      >
       <!-- 
        transform 用來控制扇形起始的度數
        應+上一個人的度數
        -->
        <!-- 
          100/45 => 20/9
          67.5d = 50% ; d = 50/67.5%
          0度的時候做標是(0,100%)
          22.5 (0,50%)
          30 (0,13.5%)
          45度的時候做標是(0,0)
          67.5 (50%,0)
          90度的座標是(100%,0)
         -->
      <div class="lottery-item"
        v-for="(lottery, index) in lotteryList"
        :key="lottery.name"
        :style="`--winLotteryIndex: ${index};
        --color:${index%2===0?'#F8CC42':'#F6FADF'};
        transform: rotate( calc(${360/lotteryList.length}deg * var(--winLotteryIndex)));
        clip-path: polygon(0 0, 0 ${360/lotteryList.length}%, 100% 100%, ${360/lotteryList.length}% 0);`"
      >
        <span>{{ lottery.name }}</span>
      </div>  
      </div>
      <p class="text-white">目前沒有和獎項</p>
    </section>
  </section>
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

setLotteryList();

onMounted(() => {
  initCardBoxRainSize();
  addCardBoxResponsive();
});

/**
 * lottery控制
 */
// 所有獎項的度數+起來必須要是360度
// 每個的deg最大只能接受90度
// 最少必須有4個獎項?

//如何判斷轉到哪個獎項?
//例如第一獎的範圍即為
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
  // {
  //   id: 9,
  //   name: "p9",
  //   img: "https://picsum.photos/id/68/200/200",
  //   url: "",
  // },
  // {
  //   id: 10,
  //   name: "p10",
  //   img: "https://picsum.photos/id/79/200/200",
  //   url: "",
  // },
  // {
  //   id: 11,
  //   name: "p11",
  //   img: "https://picsum.photos/id/68/200/200",
  //   url: "",
  // },
  // {
  //   id: 12,
  //   name: "p12",
  //   img: "https://picsum.photos/id/79/200/200",
  //   url: "",
  // },
  // {
  //   id: 13,
  //   name: "p13",
  //   img: "https://picsum.photos/id/80/200/200",
  //   url: "",
  // },
  // {
  //   id: 14,
  //   name: "p14",
  //   img: "https://picsum.photos/id/68/200/200",
  //   url: "",
  // },
  // {
  //   id: 15,
  //   name: "p15",
  //   img: "https://picsum.photos/id/79/200/200",
  //   url: "",
  // },
]);
const winlotteryIndex = ref(0) //抽中的獎項index,根據資料來源index可能不同
const lastRotateAngle = ref(0)
const setRandomWinLotteryIndex = ()=>{ //前端自己random用
  winlotteryIndex.value = Math.floor(Math.random() * lotteryList.value.length);
}
const setLotteryAngle = (winLotteryIndex:number) => {
  console.log('轉到',winLotteryIndex,'所以要轉到第',winLotteryIndex,'個index的角度')
  let deg = (rotateDeg.value*winLotteryIndex + baseRotateAngle)
  lastRotateAngle.value+=deg
};

const lottery = async () => {
  await setwinLotteryIndex()
  const wheel = document.querySelector('.lottery-wheel') as HTMLElement
  setLotteryAngle(winlotteryIndex.value)
  wheel.style.transform = `rotate(${lastRotateAngle.value}deg)`
  setTimeout(()=>{
    showLottery.value = true;
  },3000)
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
async function setLotteryList() {
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
