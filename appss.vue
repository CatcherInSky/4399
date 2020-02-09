<template>
    <div>
        <div class="allRegion">
        <Checkbox
            :indeterminate="tree.indeterminate"
            :key="tree.id"
            :label="tree.region"
            :value="tree.checkAll"
            
            @click.prevent.native.stop="tree.changingCheck()"
            >
            {{tree.region}}
        </Checkbox>
        </div>
        <CheckboxGroup
            v-if="tree.children!=[]"
            v-model="tree.checkedGroup"
            style="countryRegions">
                <template  v-for="country in tree.children">
                    <Checkbox
                        :indeterminate="country.indeterminate"
                        :key="country.id"
                        :label="country.region"
                        :value="country.checkAll"
                        v-model="country.checkedGroup"
                        @click.prevent.native.stop="country.changingCheck()"
                        style="countryRegion">
                        {{country.region}}
                    </Checkbox>
                    <CheckboxGroup
                        :key="country.id"
                        v-if="country.children!=[]"
                        v-model="country.checkedGroup"
                        style="areasRegions">
                            <template  v-for="areas in country.children">
                                <Checkbox
                                    :key="areas.id"
                                    :label="areas.region"
                                    :value="areas.checkAll"
                                    :indeterminate="areas.indeterminate"
                                    v-model="areas.checkedGroup"
                                    @click.prevent.native.stop="areas.changingCheck()"
                                    style="areasRegion"
                                >{{areas.region}}</Checkbox>
                                <CheckboxGroup
                                    :key="areas.id"
                                    v-if="areas.children!=[]"
                                    v-model="areas.checkedGroup"
                                    style="provinceRegions">
                                        <template  v-for="province in areas.children">
                                            <template v-if="province.children.length!=0">
                                                <Poptip 
                                                    :key="province.id" 
                                                    trigger="hover" 
                                                    style="provinceRegionPoptip"
                                                    >
                                                    <Checkbox
                                                        :key="province.id"
                                                        :label="province.region"
                                                        :value="province.checkAll"
                                                        :indeterminate="province.indeterminate"
                                                        v-model="province.checkedGroup"
                                                        @click.prevent.native.stop="province.changingCheck()"
                                                        border
                                                        style="provinceRegion">
                                                        {{province.region}}
                                                    </Checkbox>
                                                    <CheckboxGroup
                                                        :key="province.id"
                                                        v-model="province.checkedGroup"
                                                        style="cityRegions"
                                                        slot="content">
                                                        <template  v-for="city in province.children">
                                                            <Checkbox
                                                                :key="city.id"
                                                                :label="city.region"
                                                                :value="city.checkAll"
                                                                v-model="city.checkAll"
                                                                style="cityRegion"
                                                                @click.prevent.native.stop="city.changingCheck()"
                                                            >
                                                            </Checkbox>
                                                        </template>
                                                    </CheckboxGroup>
                                                </Poptip>
                                            </template>
                                            <template v-else>
                                                <Checkbox
                                                    :key="province.id"
                                                    :label="province.region"
                                                    :value="province.checkAll"
                                                    :indeterminate="province.indeterminate"
                                                    style="provinceRegion"
                                                    border
                                                    v-model="province.checkedGroup"
                                                    @click.prevent.native.stop="province.changingCheck()"
                                                >{{province.region}}
                                                </Checkbox>
                                             </template>
                                        </template>
                                    </CheckboxGroup>
                                
                            </template>
                    </CheckboxGroup>
            </template>
        </CheckboxGroup>
    </div>
</template>
<script>
    import tree from './regionAndCode2'
    export default {
        data () {
            return {
                tree,
            }
        },
        methods: {

            }
        }
</script>
<style scoped>
    .allRegion >>> .ivu-checkbox-wrapper{
        background: grey;
        font-size:20px;
    }
    
    .countryRegion{
        background:grey;
        display: flex;
    }
    .areasRegions{
        width:500px;
        display: flex;
    }
    .areasRegion{
        width:30%；
    }
    .provinceRegions{
        width:70%;
    }
</style>