<template>
  <div>
    <!-- <Modal 
        v-model="showModal" 
        width="720"
        title="超级投放受众包配置"
    > -->
        <div slot>
            <div class="item">
                <div class="item-name">
                    账户
                </div>
                <div class="item-content">
                    <i-input v-model="audienceAccount"></i-input>
                </div>
            </div>

            <div class="item">
                <div class="item-name">
                    定向包名称
                </div>
                <div class="item-content">
                    <i-input
                        v-model="audienceName"
                        aria-placeholder="至多10字"
                    ></i-input>
                </div>
            </div>
            
            <div class="split-line"></div>

            <div class="item">
                <div class="item-name">
                    定性人群包
                </div>
                <div class="item-content">
                    <i-select multiple v-model="audienceGroup">

                    </i-select>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    排除人群包
                </div>
                <div class="item-content">
                    <i-select multiple v-model="audienceExcludeGroup">
                        
                    </i-select>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    <Icon type="help-circled"></Icon>
                    地域
                </div>
                <div class="item-content no-dropdown">
                    <i-select multiple style="width:500px" v-model="regionList">
                        <Option v-for="item in regionList" :value="item" :key="item">
                            {{ item}}
                        </Option>
                    </i-select>
                    <Button @click.stop.native="regionShow">
                        详细编辑
                    </Button>
                </div>
            </div>

            <MultiCheckBox
                v-if="showRegion"
                :data="tree"
                :showCheckAll="true"
                v-model="audienceRegion">
            </MultiCheckBox>
            <div v-if="showRegion" class="region-button">
                <Button @click.native="regionCancel">取消</Button>
                <Button type="primary" @click.native="regionConfirm">确定</Button>
            </div>
            <div class="item">
                <div class="item-name">
                    年龄
                </div>
                <div class="item-content">
                    <CheckboxGroup v-model="audienceAge">
                        <Checkbox
                            :label="'<18'"
                        ></Checkbox>
                        <Checkbox
                            :label="'18-24'"
                        ></Checkbox>
                        <Checkbox
                            :label="'25-34'"
                        ></Checkbox>
                        <Checkbox
                            :label="'35-44'"
                        ></Checkbox>
                        <Checkbox
                            :label="'>44'"
                        ></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    性别
                </div>
                <div class="item-content">
                    <CheckboxGroup v-model="audienceGender">   
                        <Checkbox
                            :label="'男'"
                        ></Checkbox>
                        <Checkbox
                            :label="'女'"
                        ></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    学历
                </div>
                <div class="item-content">
                    <CheckboxGroup v-model="audienceEdu">   
                        <Checkbox
                            :label="'大学及以上'"
                        ></Checkbox>
                        <Checkbox
                            :label="'大专'"
                        ></Checkbox>
                        <Checkbox
                            :label="'高中及以下'"
                        ></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    人生阶段
                </div>
                <div class="item-content">
                    <Select multiple v-model="audiencePhase">
                        <Option 
                            @click.native.stop="selectPickAll(audiencePhase,lifePhase)"
                            :value="'全选'"
                        >
                            全选
                        </Option>
                        <Option v-for="item in lifePhase" :value="item.value" :key="item.value">
                            {{ item.value }}
                        </Option>
                    </Select>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    长期兴趣
                </div>
                <div class="item-content">
                    <RadioGroup v-model="audienceInterest">
                        <Radio label="不限">
                        </Radio>
                        <Radio label="新兴趣">
                        </Radio>
                        <Radio label="兴趣">
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
            <Tree :data="interest" show-checkbox multiple v-if="showInterest"></Tree>
            <div class="item">
                <div class="item-name">
                    商业意图
                </div>
                <div class="item-content">
                    <RadioGroup v-model="audienceBusiness">
                        <Radio label="不限">
                        </Radio>
                        <Radio label="意图标签">
                        </Radio>
                        <Radio label="意图词">
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    <Icon type="help-circled"></Icon>
                    iOS版本
                </div>
                <div class="item-content">
                    <i-select multiple v-model="audienceIOS">
                        <Option 
                            @click.native.stop="selectPickAll(audienceIOS,iOSVersion)"
                            :value="'全选'"
                        >
                            全选
                        </Option>
                        <Option v-for="item in iOSVersion" :value="item.value" :key="item.value">
                            {{ item.value }}
                        </Option>
                    </i-select>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    <Icon type="help-circled"></Icon>
                    安卓版本
                </div>
                <div class="item-content">
                    <i-select multiple v-model="audienceAndroid" >
                        <Option 
                            @click.native.stop="selectPickAll(audienceAndroid,androidVersion)"
                            :value="'全选'"
                        >
                            全选
                        </Option>
                        <Option v-for="item in androidVersion" :value="item.value" :key="item.value">
                            {{ item.value }}
                        </Option>
                    </i-select>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    <Icon type="help-circled"></Icon>
                    手机品牌
                </div>
                <div class="item-content">
                    <i-select 
                        multiple 
                        v-model="audiencePhone" 
                    >
                        <Option 
                            @click.native.stop="selectPickAll(audiencePhone,phoneBrand)"
                            :value="'全选'"
                        >
                            全选
                        </Option>
                        <Option v-for="item in phoneBrand" :value="item.value" :key="item.value">
                            {{ item.value }}
                        </Option>
                    </i-select>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    <Icon type="help-circled"></Icon>
                    其他平台
                </div>
                <div class="item-content">
                    <CheckboxGroup v-model="audiencePlatform">   
                        <Checkbox
                            :label="'计算机'"
                        ></Checkbox>
                        <Checkbox
                            :label="'其他'"
                        ></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            
            <div class="item">
                <div class="item-name">
                    网络
                </div>
                <div class="item-content">
                    <CheckboxGroup v-model="audienceNetwork">   
                        <Checkbox
                            :label="'wifi'"
                        ></Checkbox>
                        <Checkbox
                            :label="'移动网络'"
                        ></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
        
        </div>
    <!-- </Modal> -->
    

  </div>
</template>
<script>
import Vue from 'vue'
import MultiCheckBox from './components/MultiCheckBox'
Vue.component('MultiCheckBox',MultiCheckBox)
import tree from './data/region.json'
export default {
    data(){
        let lifePhase = [
            {value:'未婚'}, 
            {value:'已婚'}, 
            {value:'孕期'}, 
            {value:'家有儿女'},
        ]
        let iOSVersion = [
            {value:'12.x'}, 
            {value:'11.x'}, 
            {value:'10.x'}, 
            {value:'9.x'}, 
            {value:'8.x'}, 
        ]
        let androidVersion = [
            {value:'9.x'}, 
            {value:'8.x'},
            {value:'7.x'}, 
            {value:'6.x'}, 
            {value:'5.x'}, 
            {value:'4.x'}, 
        ]
        let phoneBrand = [
            {value:"华为"},
            {value:"vivo"},
            {value:"OPPO"},
            {value:"苹果"},
            {value:"三星"},
            {value:"荣耀"},
            {value:"小米"},
            {value:"一加"},
            {value:"魅族"},
            {value:"realme"},
            {value:"努比亚"},
            {value:"红米"},
            {value:"联想"},
            {value:"诺基亚"},
            {value:"索尼移动"},
            {value:"Moto"},
            {value:"中兴"},
            {value:"黑鲨"},
            {value:"ROG"},
            {value:"锤子科技"},
            {value:"谷歌"},
            {value:"海信"},
            {value:"LG"},
            {value:"酷派"},
            {value:"金立"},
            {value:"360"},
            {value:"黑莓"},
            {value:"小辣椒"},
            {value:"美图"},
            {value:"飞利浦"},
            {value:"微软"},
            {value:"朵唯"},
            {value:"天语"},
            {value:"TCL"},
            {value:"HTC"},
            {value:"VERTU"},
            {value:"中国移动"},
            {value:"8848"},
            {value:"夏普"},
            {value:"AGM"},
            {value:"华硕"},
            {value:"长虹"},
            {value:"柔宇"},
            {value:"纽曼"},
            {value:"多亲"},
            {value:"雷蛇"},
            {value:"国美手机"},
            {value:"ivvi"},
            {value:"欧奇"},
            {value:"传音"},
            {value:"SUGAR"},
            {value:"海尔"},
            {value:"格力"},
            {value:"遨游"},
            {value:"MANN"},
            {value:"征服"},
            {value:"百合"}
        ]
        let interest = [
                    {
                        title: 'parent 1',
                        expand: true,
                        selected: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        disabled: true
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        checked: true
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
        return {
            tree,
            regionList:[],
            showModal:true,
            showRegion:false,
            lifePhase,
            iOSVersion,
            androidVersion,
            phoneBrand,
            interest,
            showInterest:tree,


            audienceAccount:"",
            audienceName:"",
            audienceGroup:[],
            audienceExcludeGroup:[],
            audienceRegion:[],
            audienceAge:[],
            audienceGender:[],
            audienceEdu:[],
            audiencePhase:[],
            audienceInterest:"",
            audienceBusiness:"",
            audienceIOS:[],
            audienceAndroid:[],
            audiencePhone:[],
            audiencePlatform:[],
            audienceNetwork:[],
        }
    },
    components: {
        MultiCheckBox:MultiCheckBox,
    },
    watch:{
        audienceRegion:{
            deep:true,
            immediate:true,
            handler:function(value){
                this.regionList = []
                for(let item of value){
                    this.regionList.push(item.name)
                }
            }
        },
        regionList:{
            handler:function(newValue){
                window.console.log('rl change')
                for(let i = 0;i<this.audienceRegion.length;i++){
                    if(!newValue.includes(this.audienceRegion[i].name)){
                        this.audienceRegion.splice(i,1)
                    }
                }
            }
        }
    },
    methods:{
        regionShow(){
            this.showRegion = !this.showRegion;
        },
        regionCancel(){
            this.showRegion = false;
        },
        regionConfirm(){
            this.showRegion = false;
        },
        selectPickAll(selectList,optionList){
            for(let i=0;i<selectList.length;i++){
                if(selectList[i] == '全选'){
                    selectList.splice(i,1)
                    break
                }
            }
            if(selectList.length<optionList.length){
                for(let {value} of optionList){
                    if(!selectList.includes(value)){
                        selectList.push(value)
                    }
                }
            }else{
                while(selectList!=0){
                    selectList.pop();
                }
            }
        },
      
    }
}
</script>

<style>
    .ivu-modal .ivu-select-dropdown{
        position: fixed !important;
    }
    .item{
        display: flex;
        margin: 5px 0;
        min-height: 40px;
        line-height: 40px;
    }
    .item-name{
        width:18%;
        text-align: right;
        padding-right: 2%;
    }
    .item-content{
        width:80%;
    }
    .split-line{
        width:100%;
        height:0px;
        border-bottom: 1px dashed #ccc ;
    }
    .region-button{
        text-align: right;
    }
    .no-dropdown .ivu-select-dropdown{
        display: none
    }
    .no-dropdown .ivu-icon-ios-close-empty:before, 
    .no-dropdown .ivu-icon-arrow-down-b:before{
        display: none
    }
    .no-dropdown .ivu-select-selection{
        max-height:400px;
        overflow-y: scroll;
    }
    
</style>
