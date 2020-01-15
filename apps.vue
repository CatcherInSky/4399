<template>
  <div>
      <Checkbox
        :indeterminate="areaIndeterminate[1]"
        :value="areaCheckAll[1]"
        @click.prevent.native="handleCheckAll(1)"
      >
        中国
      </Checkbox>
      <CheckboxGroup
        v-model="checkProvinceGroup"
        @on-change="checkAllGroupChange"
      >
        <template v-for="(area,index) in areas" >
            <Checkbox 
                border
                v-if="areaCode[index]%1000==0 && areaCode[index]<100000"
                v-bind:key="areaCode[index]" 
                :label='areaName[index]'
                :indeterminate="areaIndeterminate[index]"
                :value="areaCheckAll[index]"
                @click.prevent.native="handleCheckAll(index)"
            >
            </Checkbox>
        </template>
      </CheckboxGroup>
  </div>
</template>

<script>
import areas from "./regionAndCode.js"
export default {
  name: 'app',
  data: ()=>{
    let areaName = area.map((item)=>{
      return item[0]
    });
    let areaCode = area.map((item)=>{
      return item[1]
    });
    let areaIndeterminate = new Array(area.length).fill(false);
    let areaCheckAll = new Array(area.length).fill(false);
    return {
      destination:[],
      areaName:areaName,
      areaCode:areaCode,
      areaIndeterminate:areaIndeterminate,
      areaCheckAll:areaCheckAll,
      indeterminate: false,
      checkAll: false,
      checkProvinceGroup:[],
    }
  },
  methods: {
    handleCheckAll (index) {
      if (this.areaIndeterminate[index]) {
          this.areaCheckAll[index] = false;
      } else {
          this.areaCheckAll[index] = !this.areaCheckAll[index];
      }
      this.areaIndeterminate[index] = false;
      if (this.areaCheckAll[index]) {
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