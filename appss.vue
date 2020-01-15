<template>
<div>
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <Checkbox
            :index = 0
            :indeterminate="indeterminate[0]"
            :value="checkAll[0]"
            @click.prevent.native="handleCheckAll(0)"
        >
            全选
        </Checkbox>
    </div>
    <CheckboxGroup v-model="checkAllGroup[0]" @on-change="checkAllGroupChange">
        <Checkbox :index = 1 label="香蕉"></Checkbox>

        <CheckboxGroup 
            v-model="checkAllGroup[1]" 
            @on-change="checkAllGroupChange"
            :indeterminate="indeterminate[1]"
            :value="checkAll[1]"
            @click.prevent.native="handleCheckAll(1)"
        >
            <Checkbox :index = 4 label="葡萄"></Checkbox>
            <Checkbox :index = 3 label="西瓜"></Checkbox>
        </CheckboxGroup>

        <Checkbox :index = 2 label="苹果"></Checkbox>
    </CheckboxGroup>
</div>
</template>
<script>
    export default {
        data () {
            let fruit = ["全部","香蕉","苹果","西瓜","葡萄"]
            let indeterminate =[false,false,false,false,false]
            let checkAll =[false,false,false,false,false]
            let checkAllGroup =[[],[],[],[],[]]
            return {
                indeterminate,
                checkAll,
                checkAllGroup,
                fruit
            }
        },
        methods: {
            handleCheckAll (i) {
                if (this.indeterminate[i]) {
                    this.checkAll[i] = false;
                } else {
                    this.checkAll[i] = !this.checkAll;
                }
                this.indeterminate[i] = false;

                if (this.checkAll[i]) {
                    if(i==0){
                        this.checkAllGroup[i] = ["香蕉","苹果"];
                    }else if(i==1){
                        this.checkAllGroupp[i] = ["西瓜","葡萄"];
                    }
                   
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 2) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    }
</script>
