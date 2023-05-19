<script setup>
import { reactive, onMounted } from "vue";
const randomPos = () => {
  return Math.floor(Math.random() * (100 - 1));
};
const data = reactive({
  colors: [
    {
      key: 0,
      isOpen: false,
      disabled: false,
      pos: {
        x: randomPos(),
        y: randomPos(),
      },
      colorInfo: {
        hex: "#transparent",
        rgba: { r: 149, g: 176, b: 249, a: 1 },
      },
    },
    {
      key: 1,
      isOpen: false,
      disabled: false,
      pos: {
        x: randomPos(),
        y: randomPos(),
      },
      colorInfo: {
        hex: "#transparent",
        rgba: { r: 114, g: 226, b: 253, a: 1 },
      },
    },
    {
      key: 2,
      isOpen: false,
      disabled: false,
      pos: {
        x: randomPos(),
        y: randomPos(),
      },
      colorInfo: {
        hex: "#transparent",
        rgba: { r: 114, g: 226, b: 253, a: 1 },
      },
    },
  ],
  selectedPicker: null,
  mouseDown: false,
  gradText: "",
  clickTimer: null,
  isDrag: false,
  hasUsed: true,
  showCode: false,
  showCopied: false,
  togMessage: "View Gradient Code",
});

function RGBAToHexA(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return `#${r}${g}${b}`;
}

document.body.onkeydown = function (e) {
  if (e.key == " " || e.code == "Space") {
    generateGradient();
  }
};
document.body.onkeydown = function (e) {
  if (e.key == "+" || e.code == "Plus") {
  }
};

// Add more color objects -- id set to 2 as there are a minimum of 2 colors

let key = 3;
const addColor = () => {
  data.colors.push({
    key: key,
    isOpen: false,
    disabled: false,
    pos: {
      x: randomPos(),
      y: randomPos(),
    },
    colorInfo: {
      hex: "transparent",
      rgba: {
        r: randomRGB(),
        g: randomRGB(),
        b: randomRGB(),
        a: randomOpacity(),
      },
    },
  });
  const node = document.getElementById("picker-0");
  const clone = node.cloneNode(true);
  clone.id = "picker-" + key;
  clone.style.left = data.colors[key].pos.x + "%";
  clone.style.top = data.colors[key].pos.y + "%";
  node.after(clone);
  init();
  key++;
};

const generateGradient = () => {
  for (let i = 0; i < data.colors.length; i++) {
    if (data.colors[i].disabled === false) {
      let test = data.colors[i].colorInfo;
      test.rgba = {
        r: randomRGB(),
        g: randomRGB(),
        b: randomRGB(),
        a: randomOpacity(),
      };
      data.colors[i].colorInfo.hex = RGBAToHexA(
        test.rgba.r,
        test.rgba.g,
        test.rgba.b
      );
    }
  }
};

const randomRGB = () => {
  return Math.floor(Math.random() * (255 - 1));
};

const randomOpacity = () => {
  return Math.round(Math.random() * (1 - 0.9) * 100);
};

const init = () => {
  updateGradient();
  for (var i = 0; i < data.colors.length; i++) {
    document.getElementById("picker-" + i).style.left =
      data.colors[i].pos.x + "%";
    document.getElementById("picker-" + i).style.top =
      data.colors[i].pos.y + "%";
  }
};

const toggle = (i) => {
  if (data.isDrag != true) {
    closeBoxes();
    data.colors[i].isOpen = !data.colors[i].isOpen;
  }
  data.isDrag = false;
};

const updateGradient = () => {
  var gradient = "";
  for (var i = 0; i < data.colors.length; i++) {
    if (i < data.colors.length - 1) {
      var com = ", ";
    } else {
      var com = " ";
    }
    var gradString =
      "radial-gradient(circle at " +
      data.colors[i].pos.x +
      "% " +
      data.colors[i].pos.y +
      "%,rgba(" +
      data.colors[i].colorInfo.rgba.r +
      "," +
      data.colors[i].colorInfo.rgba.g +
      "," +
      data.colors[i].colorInfo.rgba.b +
      "," +
      data.colors[i].colorInfo.rgba.a +
      "), rgba(" +
      data.colors[i].colorInfo.rgba.r +
      "," +
      data.colors[i].colorInfo.rgba.g +
      "," +
      data.colors[i].colorInfo.rgba.b +
      ",0) 50%)" +
      com;
    gradient = gradient + gradString;
  }
  data.gradText = "background: " + gradient + ";";
  document.getElementById("gradient-map").style.background = gradient;
};

const setDrag = (i) => {
  data.mouseDown = true;
  data.selectedPicker = i;
  data.hasUsed = false;

  var self = data;
  data.clickTimer = setTimeout(function () {
    self.isDrag = true;
  }, 100);
};

const removeDrag = (i) => {
  data.mouseDown = false;
  data.selectedPicker = null;
  var self = data;
  clearTimeout(data.clickTimer);
};

const doDrag = (event) => {
  var i = data.selectedPicker;
  if (data.mouseDown == true) {
    var mx = event.clientX;
    var my = event.clientY;
    var w = window.innerWidth;
    var h = window.innerHeight;
    data.colors[i].pos.x = Math.round((mx / w) * 100);
    data.colors[i].pos.y = Math.round((my / h) * 100);
    document.getElementById("picker-" + i).style.left = mx - 15 + "px";
    document.getElementById("picker-" + i).style.top = my - 15 + "px";
  }
  updateGradient();
};

const closeBoxes = () => {
  for (var i = 0; i < data.colors.length; i++) {
    data.colors[i].isOpen = false;
  }
};

onMounted(() => {
  generateGradient();
  init();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
  addColor();
});
</script>

<template>
  <div id="gradient-map">
    <div class="input-holder" id="toClone">
      <div class="close-handler" @click="closeBoxes" @mousemove="doDrag"></div>
      <div
        class="picker"
        v-bind:id="'picker-' + col.key"
        v-for="col in data.colors"
      >
        <button
          class="picker-button"
          @click="toggle(col.key)"
          v-bind:style="{
            backgroundColor: data.colors[col.key].colorInfo.hex,
            opacity: data.colors[col.key].colorInfo.rgba.a,
          }"
          @mousedown="setDrag(col.key)"
          @mouseup="removeDrag(col.key)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#gradient-map,
.input-holder,
.close-handler {
  width: 100%;
  height: 100%;
  float: left;
  position: absolute;
  top: 0;
  left: 0;
}

#gradient-map {
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.display-gradient {
  padding: 25px 25px;
  border-radius: 15px;
  /* background: rgba(0, 0, 0, 0.2); */
  /* z-index:1000; */
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  -webkit-box-shadow: 0px 0px 28px 1px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 0px 0px 28px 1px rgba(0, 0, 0, 0.34);
  box-shadow: 0px 0px 28px 1px rgba(0, 0, 0, 0.34);
}

.display-gradient:hover {
  -webkit-box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.34);
  box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.34);
}

.picker {
  position: absolute;
  padding: 0px;
  top: 50px;
  z-index: 100;
  padding: 2px;
  left: 50px;
}

.picker::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  height: 30px;
  width: 30px;
  background: transparent;
  /* border:2px solid #1a1a1a; */
  border: 2px solid white;
  border-radius: 500px;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -webkit-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.34);
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.34);
}
.picker:hover::after {
  -webkit-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.34);
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.34);
}

button {
  border: 0px;
  width: 26px;
  border-radius: 500px;
  outline: none !important;
  height: 26px;
  cursor: pointer;
  position: relative;
}

#picker-1 {
  left: 25%;
  top: 25%;
}
</style>
