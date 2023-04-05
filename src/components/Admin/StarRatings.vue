<template>
  <div class="center">
    <div class="stars">
      <input type="radio" id="five" name="rate" value="2" />
      <label for="five"></label>
      <input type="radio" id="four" name="rate" value="2" />
      <label for="four"></label>
      <input type="radio" id="three" name="rate" value="2" />
      <label for="three"></label>
      <input type="radio" id="two" name="rate" value="2" />
      <label for="two"></label>
      <input type="radio" id="one" name="rate" value="2" />
      <label for="one"></label>
      <span class="result"></span>
    </div>
  </div>
</template>
<script>
export default {
  
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.center {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.center .stars {
  height: 150px;
  width: 500px;
  text-align: center;
}
.stars input {
  display: none;
}
.stars label {
  float: right;
  font-size: 24px;
  color: lightgrey;
  margin: 0 -6px;
  text-shadow: 1px 1px #bbb;
}
.stars label:before {
  content: "★";
}
.stars input:checked ~ label {
  color: gold;
  text-shadow: 1px 1px #c60;
}
.stars:not(:checked) > label:hover,
.stars:not(:checked) > label:hover ~ label {
  color: gold;
}
.stars input:checked > label:hover,
.stars input:checked > label:hover ~ label {
  color: gold;
  text-shadow: 1px 1px goldenrod;
}
.stars .result:before {
  position: absolute;
  content: "";
  width: 100%;
  left: 50%;
  transform: translateX(-47%);
  bottom: -30px;
  font-size: 30px;
  font-weight: 500;
  color: gold;
  font-family: "Poppins", sans-serif;
  display: none;
}
.stars input:checked ~ .result:before {
  display: block;
}
.stars #five:checked ~ .result:before {
  content: " ";
}
.stars #four:checked ~ .result:before {
  content: " ";
}
.stars #three:checked ~ .result:before {
  content: " ";
}
.stars #two:checked ~ .result:before {
  content: " ";
}
.stars #one:checked ~ .result:before {
  content: " ";
}
</style>
