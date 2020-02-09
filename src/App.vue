
<template>
  <div>
    <MultiCheckBox
        :data="tree"
        v-model="list">
     </MultiCheckBox>
    <div>
        {{list}}
    </div>
    <Button @click.stop.native="changeTree">变换数据</Button>
  </div>
</template>
<script>
import Vue from 'vue'
import MultiCheckBox from './components/MultiCheckBox'
Vue.component('MultiCheckBox',MultiCheckBox)
import tree from './components/region.json'
import treeType from './components/type.json'
export default {
    data(){
        return {
            tree,
            list:[],
            show:true,
            i:true
        }
    },
    components: {
        MultiCheckBox:MultiCheckBox,
    },
    methods:{
        setData(list){
            this.list = list
        },
        changeTree(){
            this.i=!this.i
            this.tree = this.i?tree:treeType;
        }
    }
}
</script>

<style>

</style>
