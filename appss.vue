<template>
    <div>
        <Checkbox
            :indeterminate="tree.indeterminate"
            :key="tree.id"
            :label="tree.region"
            :value="tree.checkAll"
            @click.prevent.native="tree.changingCheck(tree)"
        >  {{tree.region}}
            <CheckboxGroup
                v-if="tree.children!=[]"
                v-model="tree.checkedGroup"
            >
                <template  v-for="country in tree.children">
                    <Checkbox
                        :indeterminate="country.indeterminate"
                        :key="country.id"
                        :label="country.region"
                        :value="country.checkAll"
                        @click.prevent.native="country.changingCheck(country)"
                    >{{country.region}}
                        <CheckboxGroup
                            v-if="country.children!=[]"
                             v-model="country.checkedGroup"
                        >
                            <template  v-for="areas in country.children">
                                <Checkbox
                                    :key="areas.id"
                                    :label="areas.region"
                                    :value="areas.checkAll"
                                    :indeterminate="areas.indeterminate"
                                    @click.prevent.native="areas.changingCheck(areas)"
                                >{{areas.region}}
                                    <CheckboxGroup
                                        v-if="areas.children!=[]"
                                        v-model="areas.checkedGroup"
                                    >
                                        <template  v-for="province in areas.children">
                                            <Checkbox
                                                :key="province.id"
                                                :label="province.region"
                                                :value="province.checkAll"
                                                :indeterminate="province.indeterminate"
                                                @click.prevent.native="province.changingCheck(province)"
                                            >{{province.region}}
                                                <CheckboxGroup
                                                    v-if="province.children!=[]"
                                                    v-model="province.checkedGroup"
                                                >
                                                    <template  v-for="city in province.children">
                                                        <Checkbox
                                                            :key="city.id"
                                                            :label="city.region"
                                                            :value="city.checkAll"
                                                            :indeterminate="city.indeterminate"
                                                            @click.prevent.native="city.changingCheck(city)"
                                                        >
                                                        </Checkbox>
                                                    </template>
                                                </CheckboxGroup>
                                            </Checkbox>
                                        </template>
                                    </CheckboxGroup>
                                </Checkbox>
                            </template>
                        </CheckboxGroup>
                    </Checkbox>
                </template>
            </CheckboxGroup>
        </Checkbox>
    </div>
</template>
<script>
    import tree from '../regionAndCode2'
    export default {
        data () {
            return {
                tree,
            }
        },

        methods: {

// isCheck(node){
//     if(node.indeterminate){
//       node.checkAll=false
//     }else{
//       node.checkAll=!node.checkAll
//     }
//     return node.checkAll
//   },
//   childrenIndeterminate(node){
//     if(node.children.length==0){
//         return false
//     }else{
//       let re = false
//       for(let i =0;i< node.children.length;i++){
//           re = re || node.children[i].indeterminate
//       }
//       return re
//     }
//   },
//   setGroup(node,type,region){
//     if(type=="fill"){
//         if(node.children.length){
//             node.children.forEach((item)=>{
//                 this.setGroup(node,"add",item.region)
//             })
//         }
//     }else if(type=="delete"){
//         if(node.checkedGroup.includes(region)){
//             node.checkedGroup.splice(node.checkedGroup.indexOf(region),1)
//         }
//     }else if(type=="add"){
//         if(!node.checkedGroup.includes(region)){
//             node.checkedGroup.push(region)
//         }
//     }else if(type=="clear"){
//         node.checkedGroup=[]
//     }
//   },
//   getCheckDown(node){
//     if(node.checkAll){
//       this.setGroup(node,"fill")
//     }else{
//       this.setGroup(node,"clear")
//     }
//     if(this.children.length!=0){
//       node.children.forEach((item)=>{
//         item.checkAll = node.checkAll
//         this.getCheckDown(item)
//       })
//     }
// },
// getIndeterDown(node){
//   if(node.children.length>0){
//     node.children.forEach((item)=>{
//         item.indeterminate=false
//         this.getIndeterDown(item)
//     })
//   }
// },
// getIndeterUp(node){
//   node.indeterminate = (
//     (node.checkedGroup.length > 0 ) && 
//     (node.checkedGroup.length < node.children.length)
//   ) ||
//   (this.childrenIndeterminate(node) )
//   if(node.parent!=null){
//     this.getIndeterUp(node.parent)
//   }
// },
// getCheckUp(node){
//   if(node.parent!=null){
//     if(node.checkAll){
//       this.setGroup(node.parent,"add",node.region)
//     }else{
//       this.setGroup(node.parent,"delete",node.region);
//     }
//     if(node.parent.checkedGroup.length == node.parent.children.length){
//       node.parent.checkAll = true
//       this.getCheckUp(node.parent)
//     }else{
//       node.parent.checkAll = false
//       this.getCheckUp(node.parent)
//     }
    
//   }
// },
//   changingCheck(node){
//     if(node.parent==null){
//       this.isCheck(node)
//       this.getCheckDown(node)
//       this.getIndeterDown(node)
//       this.getIndeterUp(node)
//     }else{
//       this.isCheck(node)
//       this.getCheckDown(node)
//       this.getCheckUp(node)
//       this.getIndeterDown(node)
//       this.getIndeterUp(node)
//     }
//   }

            }
        }

</script>
