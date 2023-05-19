<script setup>
import { reactive, ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import Footer from "../Footer.vue";

const element = document.querySelector("body");
let clientWidth = element.clientWidth;

window.addEventListener(
  "resize",
  (event) => {
    clientWidth = screen.width;
  },
  true
);

//Prevent Scroll on space
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

// Generate gradient on space
document.body.onkeyup = function (e) {
  if (e.key == " " || e.code == "Space") {
    generateGradient();
  }
};

// objects for colors -- Default values
let colors = reactive([
  { id: 0, hex: "#f12711", deg: 45, disabled: false, showModal: false },
  { id: 1, hex: "#f5af19", deg: 45, disabled: false, showModal: false },
]);

const changeColors = (index) => {
  const pickedColor = ref(document.getElementById(`ColorPicker${index}`).value);
  colors[index].hex = pickedColor.value;
  let gradient = "linear-gradient(" + colors[index].deg + "deg ";
  colors.forEach(function (e) {
    gradient += "," + e.hex;
  });
  gradient += ")";
  generatedGradient.value = gradient;
  console.log(pickedColor.value, colors[1]);
};

// Add more color objects -- id set to 2 as there are a minimum of 2 colors
let id = 2;
const addColor = () => {
  if (colors.length < 5) {
    colors.push({
      id: id,
      hex: randomHex(),
      deg: randomDeg(),
      disabled: false,
      showModal: false,
    });
    id++;
    generateGradient();
  }
};

// Removes a color from last to first
const removeColor = (index) => {
  if (colors[index].disabled == false) {
    if (colors.length > 2) {
      colors.splice(index, 1);
    }
  }
};

// Generates a random hex
// Only optimal for linear gratients and not with opacity
const randomHex = () => {
  return "#" + Math.random().toString(16).slice(2, 8);
};

// generates a random angle
const randomDeg = () => {
  return Math.floor(Math.random() * (360 - 1)).toString();
};

// For each color - Generate a Hex & an angle
// unless it is locked
const generateGradient = () => {
  for (let i = 0; i < colors.length; i++) {
    if (colors[i].disabled === false) {
      colors[i].hex = randomHex();
      colors[i].deg = randomDeg();
    }
  }
  gradient();
};

// Locks a specifik color
// TODO: COULD BE USED FOR REMOVING COLOR
const lockColor = (index) => {
  colors[index].disabled === true
    ? (colors[index].disabled = false)
    : (colors[index].disabled = true);
};

// Shows the colorPicker Modal
const showColorPicker = (index) => {
  colors[index].showModal === true
    ? (colors[index].showModal = false)
    : (colors[index].showModal = true);
};

// Save gradient to a variable
const generatedGradient = ref(null);

// Save gradient as a string for inline Styling
const gradient = () => {
  let angle = randomDeg();
  let gradient = "linear-gradient(" + angle + "deg ";
  colors.forEach(function (e) {
    gradient += "," + e.hex;
  });
  gradient += ")";
  generatedGradient.value = gradient;
};

const copyCss = (e) => {
  navigator.clipboard.writeText(generatedGradient.value);
  const copyBtn = document.getElementById("CopyCSS");
  copyBtn.innerText = "Copied!";
  setTimeout(function () {
    copyBtn.innerText = "Copy CSS";
  }, 800);
};

onMounted(() => {
  generateGradient();
});
</script>

<template>
  <div class="header space-y-8 flex">
    <h1 class="text-2xl xl:text-5xl">Free to use in private & for profit!</h1>
    <div
      class="remove-grad-types bg-mobile-nav-color max-w-3xl min-w-xs w-11/12 flex justify-evenly items-center min-h-[80px] rounded-xl p-5"
    >
      <form class="max-w-3xl flex flex-wrap justify-evenly gap-[5px]">
        <label class="gradient-type-list" checked for="Normal">Linear</label>
        <input class="hidden" type="radio" name="gradient-type" id="Normal" />

        <label class="gradient-type-list" for="Radial">Radial</label>
        <input class="hidden" type="radio" name="gradient-type" id="Radial" />

        <label class="gradient-type-list" for="Shapes">Shapes</label>
        <input class="hidden" type="radio" name="gradient-type" id="Shapes" />

        <label class="gradient-type-list" for="Topography">Topography</label>
        <input
          class="hidden"
          type="radio"
          name="gradient-type"
          id="Topography"
        />

        <label class="gradient-type-list" for="Mesh">Mesh</label>
        <input class="hidden" type="radio" name="gradient-type" id="Mesh" />

        <label class="gradient-type-list" for="Blobs">Blobs</label>
        <input class="hidden" type="radio" name="gradient-type" id="Blobs" />
      </form>
    </div>
    <div
      id="generator gradient-map"
      class="generator-card flex-col items-center rounded-lg md:rounded-[30px] md:order-1 margin-top"
      :style="{ background: generatedGradient }"
    >
      <div
        class="remove-extra-cards sbg-white w-[100%] aspect-video absolute md:rounded-[30px] shadow-2xl"
        :style="{ background: generatedGradient }"
      ></div>
      <div
        id="generator gradient-map"
        class="remove-extra-cards generator-cards left-card right-[300px] flex-col items-center rounded-lg md:rounded-[30px] md:order-1 margin-top translate-z-4"
        :style="{ background: generatedGradient }"
      ></div>
      <div
        id="generator gradient-map"
        class="remove-extra-cards generator-cards right-card left-[300px] flex-col items-center rounded-lg md:rounded-[30px] md:order-1 margin-top"
        :style="{ background: generatedGradient }"
      ></div>
      <p class="relative bottom-[-80%] md:bottom-[-50%] animate-pulse">
        Press "space" to generate
      </p>
      <div
        class="relative rounded-lg md:rounded-[30px] bottom-[-100%] md:bottom-[-50%] bg-mobile-nav-color max-w-2xl flex-column items-center max-w-3xl w-[90%] md:w-[80%] min-w-xs max-h-[200px] min-h-[200px] py-6 px-10"
      >
        <div class="flex justify-between justify-center">
          <div class="flex w-[50%]">
            <li
              class="list-none"
              v-for="(color, index) in colors"
              :key="color.id"
              :class="{ shake: color.last }"
            >
              <div
                class="flex justify-center items-center w-8 h-8 overflow-hidden"
              >
                <input
                  type="color"
                  class="appearance-none t w-[30px] aspect-square outline-none border-none cursor-pointer hidden relative"
                  :style="{ opacity: '0' }"
                  :name="`ColorPicker${index}`"
                  :id="`ColorPicker${index}`"
                  :value="colors[index].hex"
                  @change="changeColors(index)"
                />
                <label
                  class="cursor-pointer w-5 h-5 rounded-full outline-2 outline-white hover:outline-red outline"
                  :for="`ColorPicker${index}`"
                  :style="{ 'background-color': colors[index].hex }"
                >
                </label>
              </div>
              <button
                @click="lockColor(index)"
                :class="{ locked: color.disabled }"
              >
                <Icon
                  v-if="!color.disabled"
                  width="15"
                  icon="bx:lock-open-alt"
                />
                <Icon v-else width="15" icon="bx:bxs-lock-alt" />
              </button>
              <button
                @click="removeColor(index)"
                id="remove"
                v-if="colors.length > 2"
              >
                <Icon width="15" icon="material-symbols:delete-outline" />
              </button>
            </li>
            <div
              v-if="colors.length < 5"
              @click="addColor"
              class="w-5 h-5 rounded-full flex items-center justify-center bg-grey-accent-color cursor-pointer outline-white hover:outline outline-2 hover:outline-red-500 relative top-[5px]"
              id="add"
            >
              <Icon width="15" icon="ic:round-plus" />
            </div>
          </div>
          <div class="flex flex-wrap max-w-[55%] justify-end gap-3">
            <div v-if="clientWidth > 1024" class="flex gap-3">
              <button class="btn-grey">Download</button>
              <button id="CopyCSS" class="btn-blue" @click="copyCss(e)">
                Copy CSS
              </button>
            </div>
            <div
              class="bg-grey-accent-color flex items-center justify-center rounded-[5px] w-[50px] aspect-square"
            >
              <svg
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-v-da05d02a=""
              >
                <path
                  d="M21 16.1111C21 16.6121 20.7893 17.0925 20.4142 17.4468C20.0391 17.801 19.5304 18 19 18H3C2.46957 18 1.96086 17.801 1.58579 17.4468C1.21071 17.0925 1 16.6121 1 16.1111V2.88889C1 2.38792 1.21071 1.90748 1.58579 1.55324C1.96086 1.19901 2.46957 1 3 1H8L10 3.83333H19C19.5304 3.83333 20.0391 4.03234 20.4142 4.38658C20.7893 4.74081 21 5.22126 21 5.72222V16.1111Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  data-v-da05d02a=""
                ></path>
                <path
                  d="M11 9V13"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  data-v-da05d02a=""
                ></path>
                <path
                  d="M9 11L13 11"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  data-v-da05d02a=""
                ></path>
              </svg>
            </div>
            <div
              class="bg-grey-accent-color flex items-center justify-center rounded-[5px] w-[50px]"
            >
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-v-ccdb7361=""
              >
                <path
                  d="M17.612 2.41452C17.1722 1.96607 16.65 1.61034 16.0752 1.36763C15.5005 1.12492 14.8844 1 14.2623 1C13.6401 1 13.0241 1.12492 12.4493 1.36763C11.8746 1.61034 11.3524 1.96607 10.9126 2.41452L9.99977 3.34476L9.08699 2.41452C8.19858 1.50912 6.99364 1.00047 5.73725 1.00047C4.48085 1.00047 3.27591 1.50912 2.38751 2.41452C1.4991 3.31991 1 4.5479 1 5.82833C1 7.10875 1.4991 8.33674 2.38751 9.24214L3.30029 10.1724L9.99977 17L16.6992 10.1724L17.612 9.24214C18.0521 8.79391 18.4011 8.26171 18.6393 7.67596C18.8774 7.0902 19 6.46237 19 5.82833C19 5.19428 18.8774 4.56645 18.6393 3.9807C18.4011 3.39494 18.0521 2.86275 17.612 2.41452Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  data-v-ccdb7361=""
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <button
          class="relative top-[40%] md:top-[5%] h-[40px] rounded-[10px] w-[100%]"
          :disabled="clientWidth < 1024"
          :style="{
            background: clientWidth > 1024 ? generatedGradient : 'grey',
          }"
        >
          {{
            clientWidth > 1024
              ? "The Grainient editor is actively being developed"
              : "Save & edit it on a laptop"
          }}
        </button>
      </div>
    </div>
    <Footer class="order-5 footer" />
  </div>
</template>

<style scoped>
.footer {
  position: relative;
  top: 100px;
}
.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
}

.generator-card {
  display: flex;
  position: relative;
  z-index: 0;
  justify-content: center;
  max-width: 650px;
  min-width: 300px;
  width: 90%;
  aspect-ratio: 7/4;
}
.generator-cards {
  position: absolute;
  z-index: -10;
  display: flex;
  justify-content: center;
  max-width: 450px;
  min-width: 150px;
  width: 90%;
  aspect-ratio: 7/4;
}
.left-card {
  clip-path: polygon(0% 0%, 50% 3%, 50% 97%, 0 100%);
}
.right-card {
  clip-path: polygon(0 3%, 100% 0, 100% 100%, 0 97%);
}

#picker {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  background-color: transparent !important;
  width: 100px !important;
  height: 100px !important;
  border: none !important;
  cursor: pointer !important;
}
#picker::-webkit-color-swatch {
  border-radius: 50% !important;
  border: 7px solid #000000 !important;
}
#picker::-moz-color-swatch {
  border-radius: 50% !important;
  border: 7px solid #000000 !important;
}

@media screen and (max-width: 767px) {
  .remove-grad-types {
    display: none;
  }

  .test {
    position: relative;
    top: 250px;
  }
}

@media screen and (max-width: 1050px) {
  .remove-extra-cards {
    display: none;
  }
}
</style>
