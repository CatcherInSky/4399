<template>
<div>
    地域：
    <RadioGroup v-model="area">
        <Radio label="unlimited">无限制</Radio>
        <Radio label="area" @click.prevent.native.stop="modalShow = true">选择省市</Radio>
    </RadioGroup>
    <Modal title="选择地域" v-model="modalShow" :mask-closable="false" width="750" @on-ok="getdata(tree)" @on-cancel="returnUnlimited">
        <div class="allRegion">
            <Checkbox
                :indeterminate="tree.indeterminate"
                :key="tree.id+'cb'"
                :label="tree.region"
                :value="tree.checkAll"
                @click.prevent.native.stop="tree.changingCheck()">
                {{tree.region}}
            </Checkbox>
        </div>
        <CheckboxGroup
            v-if="tree.children!=[]"
            :model.sync="tree.checkedGroup"
            class="countryRegions">
                <template  v-for="country in tree.children">
                    <Checkbox
                        :indeterminate="country.indeterminate"
                        :key="country.id+'cb'"
                        :label="country.region"
                        :value="country.checkAll"
                        @click.prevent.native.stop="country.changingCheck()"
                        class="countryRegion">
                        {{country.region}}
                    </Checkbox>
                    <CheckboxGroup
                        :key="country.id+'cg'"
                        v-if="country.children!=[]"
                        :model.sync="country.checkedGroup"
                        class="areasRegions">
                            <template  v-for="areas in country.children">
                                <Checkbox
                                    :key="areas.id+'cb'"
                                    :label="areas.region"
                                    :value="areas.checkAll"
                                    :indeterminate="areas.indeterminate"
                                    @click.prevent.native.stop="areas.changingCheck()"
                                    class="areasRegion">
                                    {{areas.region}}
                                </Checkbox>
                                <CheckboxGroup
                                    :key="areas.id+'cg'"
                                    v-if="areas.children!=[]"
                                    :model.sync="areas.checkedGroup"
                                    class="provinceRegions">
                                        <template  v-for="province in areas.children">
                                            <template v-if="province.children.length!=0">
                                                <Poptip 
                                                    word-wrap
                                                    :key="province.id" 
                                                    trigger="hover" 
                                                    class="provinceRegionPoptip">
                                                    <Checkbox
                                                        :key="province.id+'cb'"
                                                        :label="province.region"
                                                        :value="province.checkAll"
                                                        :indeterminate="province.indeterminate"
                                                        
                                                        @click.prevent.native.stop="province.changingCheck()"
                                                        class="provinceRegion">
                                                        {{province.region}}
                                                    </Checkbox>
                                                    <CheckboxGroup
                                                        :key="province.id+'cg'"
                                                        :model.sync="province.checkedGroup"
                                                        class="cityRegions"
                                                        slot="content">
                                                        <template  v-for="city in province.children">
                                                            <Checkbox
                                                                :key="city.id+'cb'"
                                                                :label="city.region"
                                                                :value="city.checkAll"
                                                                class="cityRegion"
                                                                @click.prevent.native.stop="city.changingCheck()">
                                                            </Checkbox>
                                                        </template>
                                                    </CheckboxGroup>
                                                </Poptip>
                                            </template>
                                            <template v-else>
                                                <div :key="province.id" class="provinceRegionNo">
                                                    <Checkbox
                                                        :key="province.id+'cb'"
                                                        :label="province.region"
                                                        :value="province.checkAll"
                                                        :indeterminate="province.indeterminate"
                                                        class="provinceRegion"
                                                        @click.prevent.native.stop="province.changingCheck()">
                                                        {{province.region}}
                                                    </Checkbox>
                                                </div>
                                             </template>
                                        </template>
                                    </CheckboxGroup>
                            </template>
                    </CheckboxGroup>
            </template>
        </CheckboxGroup>
    </Modal>
</div>
</template>
<script>
    import tree from './regionAndCode'
    export default {
        data () {
            return {
                tree,
                modalShow:false,
                area:'unlimited',
                data:[],
            }
        },
        methods: {
            getdata(tree){
                tree.getData(tree)
                this.data = tree.data;
                this.$emit('getCheckedRegion',this.data)
                this.area='area'
            },
            returnUnlimited(){
                this.area='unlimited'
            }
        }
    }
</script>
<style>
    .allRegion{
        display: none;
    }
    .countryRegion{
        background:#f8f8f8;
        height: 32px;
        display: block;
        line-height: 30px;
        padding: 0 15px;
    }
    .areasRegions{
        display: flex;
        flex-wrap: wrap;
    }
    .areasRegion{
        display:block;
        min-width:20%;
        height: 32px;
        line-height: 30px;
        padding: 0 15px;   
    }
    .provinceRegions{
        width:70%;
        display: flex;
        flex-wrap:wrap;
    }
    .provinceRegion{
        margin-right:0;
        height: 32px;
        line-height: 30px;
        padding: 0 15px;
        border:1px solid white;
        width:100px;
    }
    .provinceRegion:hover{
        border:1px solid grey;
    }
    .provinceRegionPoptip{
        width:20%;
    }
    .provinceRegionNo{
        width:20%;
    }
    .provinceRegionPoptip .cityRegion{
        min-width:31%;
    }
    .provinceRegionPoptip .provinceRegion{
        display:block;
    }
    .cityRegions{
        width:400px;
    }
</style>