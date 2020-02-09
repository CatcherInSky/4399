<template>
  <div>
    地域：
    <RadioGroup v-model="area">
      <Radio label="unlimited"></Radio>
      <Radio label="area"></Radio>
    </RadioGroup>
    <Button @click="modalShow = true" v-if="area == 'area'"></Button>
    <Modal title="选择地域" v-model="modalShow" :mask-closable="false">
      <Checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @click.prevent.native="handleCheckAll"
      >
        中国
      </Checkbox>
      <CheckboxGroup
        v-model="checkProvinceGroup"
        @on-change="checkAllGroupChange"
      >
      <template v-for="regions in region" >
    
        <Checkbox 
        border
        v-if="regions[1]%1000==0 && regions[1]<100000"
        v-bind:key="regions[1]" :label='regions[0]'>
        </Checkbox>
        <
      </template>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
import region from "./regionAndCode.js"
export default {
  name: 'app',
  data: ()=>{
    let regionName = region.map((item)=>{
      return item[0]
    });
    let regionCode = region.map((item)=>{
      return item[1]
    });
    return {
      area:'unlimited',
      destination:[],
      modalShow:false,
      region:region,
      regionName:regionName,
      regionCode:regionCode,
      indeterminate: false,
      checkAll: false,
      checkProvinceGroup:[],
    }
  },
  computed:{
  },
  components: {
  },
  methods: {
    handleCheckAll () {
      if (this.indeterminate) {
          this.checkAll = false;
      } else {
          this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if (this.checkAll) {
          this.checkProvinceGroup = this.regionName.filter((item,index)=>{
            return index < 100000 && this.regionCode[index]%1000==0 
          });
      } else {
          this.checkProvinceGroup = [];
      }
    },
    checkAllGroupChange (data) {
      if (data.length === 34) {
          this.indeterminate = false;
          this.checkAll = true;
      } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
      } else {
          this.indeterminate = false;
          this.checkAll = false;
      }
    },
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>