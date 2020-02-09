<template>
  <div>
    <div class="ydx-multicheckbox-first-container">
      <div class="input" v-if="this.showFilter">
        <i-input
          style="width: 200px"
          placeholder="搜索"
          v-model.trim.lazy="searchString"
          @on-change="search"
        >
          <span v-if="searchString.length == 0" slot="append"
            ><Icon type="search"></Icon
          ></span>
          <span v-else slot="append" @click="clearing" style="display:block"
            ><Icon type="close"></Icon
          ></span>
        </i-input>
      </div>
      <Checkbox
        :key="tree.id + 'cb'"
        :label="tree.name"
        :value="tree.checkAll"
        :indeterminate="tree.indeterminate"
        @click.prevent.native.stop="changingCheck(tree)"
        class="ydx-multicheckbox-first-item"
        v-show="!show(tree)"
        v-if="this.showCheckAll"
      >
        {{ tree.name }}
      </Checkbox>
    </div>
    <div class="ydx-multicheckbox-none" v-show="show(tree)">没有更多内容</div>
    <template>
      <CheckboxGroup
        v-if="tree.children != []"
        class="ydx-multicheckbox-second-group"
        v-show="!show(tree)"
      >
        <template v-for="second in tree.children">
          <div
            :key="second.id + 'div'"
            class="ydx-multicheckbox-second-container"
            v-show="!show(second)"
          >
            <Checkbox
              :key="second.id + 'cb'"
              :label="second.name"
              :value="second.checkAll"
              :indeterminate="second.indeterminate"
              @click.prevent.native.stop="changingCheck(second)"
              class="ydx-multicheckbox-second-item"
            >
              {{ second.name }}
            </Checkbox>
          </div>
          <CheckboxGroup
            :key="second.id + 'cg'"
            v-if="second.children != []"
            class="ydx-multicheckbox-third-group"
            v-show="!show(second)"
          >
            <template v-for="third in second.children">
              <Checkbox
                :key="third.id + 'cb'"
                :label="third.name"
                :value="third.checkAll"
                :indeterminate="third.indeterminate"
                @click.prevent.native.stop="changingCheck(third)"
                class="ydx-multicheckbox-third-item"
                v-show="!show(third)"
              >
                {{ third.name }}
              </Checkbox>
              <CheckboxGroup
                :key="third.id + 'cg'"
                v-if="third.children != []"
                class="ydx-multicheckbox-forth-group"
                v-show="!show(third)"
              >
                <template v-for="forth in third.children">
                  <template v-if="forth.children.length != 0">
                    <Poptip
                      word-wrap
                      trigger="hover"
                      placement="bottom"
                      :key="forth.id"
                      class="ydx-multicheckbox-forth-poptip"
                      v-show="!show(forth)"
                    >
                      <Checkbox
                        :key="forth.id + 'cb'"
                        :label="forth.name"
                        :value="forth.checkAll"
                        :indeterminate="forth.indeterminate"
                        @click.prevent.native.stop="changingCheck(forth)"
                        class="ydx-multicheckbox-forth-item"
                        v-show="!show(forth)"
                      >
                        {{ forth.name }}
                      </Checkbox>
                      <CheckboxGroup
                        :key="forth.id + 'cg'"
                        slot="content"
                        class="ydx-multicheckbox-fifth-group"
                        v-show="!show(forth)"
                      >
                        <div
                          :key="fifth.id + 'div'"
                          v-for="fifth in forth.children"
                          class="ydx-multicheckbox-fifth-div"
                          v-show="!show(fifth)"
                        >
                          <Checkbox
                            :key="fifth.id + 'cb'"
                            :label="fifth.name"
                            :value="fifth.checkAll"
                            @click.prevent.native.stop="changingCheck(fifth)"
                            class="ydx-multicheckbox-fifth-item"
                            v-show="!show(fifth)"
                          >
                            {{ fifth.name }}
                          </Checkbox>
                        </div>
                      </CheckboxGroup>
                    </Poptip>
                  </template>
                  <template v-else>
                    <div
                      :key="forth.id"
                      class="ydx-multicheckbox-forth-div"
                      v-show="!show(forth)"
                    >
                      <Checkbox
                        :key="forth.id + 'cb'"
                        :label="forth.name"
                        :value="forth.checkAll"
                        :indeterminate="forth.indeterminate"
                        @click.prevent.native.stop="changingCheck(forth)"
                        class="ydx-multicheckbox-forth-item"
                      >
                        {{ forth.name }}
                      </Checkbox>
                    </div>
                  </template>
                </template>
              </CheckboxGroup>
            </template>
          </CheckboxGroup>
        </template>
      </CheckboxGroup>
    </template>
  </div>
</template>
<script>
  export default{
    props: {
      data: {
        type: Object
      },
      showCheckAll: {
        type: Boolean,
        default: true
      },
      showFilter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        searchString: "",
        searching: false,
        reg: /.*/,
        tree:null,
        checked: [],
      };
    },
    model: {
      prop: "checked",
      event: "getCheckedNode"
    },
    watch: {
      //监控选中状态变化
      checked(newData) {
        this.$emit("getCheckedNode", newData);
      },
      data:{
        immediate:true,
        deep:true,
        handler:function(){
          this.tree = this.data
        },
      },
      tree:{
        deep:true,
        immediate:true,
        handler:function(newTree,oldTree){
          let tree = Object.assign({}, newTree)
          if(oldTree == null){
            this.initNode({
              node:tree,
              parent:null
            })
          }else{
            let list = [...this.checked];
            this.checked = [];
            this.rebuildNode({
              node:tree,
              parent:null
            },list)
            this.rebuildState(tree)
          }
          newTree = Object.assign({},tree)
        }
      }
    },
    methods: {
      /**
       * 从上至下的遍历，将上级节点保存下来作为下级节点的parent
       * 
       * @param {Object} 传入对象,包括子节点和父节点
       * - node {Object} 子节点
       * - parent {Object} 父节点,无为null
       */
      initNode({
        node,parent
      }){
        node.parent = parent ? parent:null;
        node.match = false;
        node.checkAll = false;
        node.indeterminate = false;
        node.checkedGroup = [];
        let {children} = node
        if(children){
          for(let child of children){
            this.initNode({
              node:child,
              parent:node
            })
          }
        }
      },
      /**
       * 更新props中的data时重建状态树，以id标识节点，以checked列表标识状态
       * checked中有该节点则checkAll属性为true
       * match属性暂与initNode保持一致
       * indeterminate后续由下而上调整
       * checkedGroup也是由下而上调整
       * 
       * @param {Object} 传入对象,包括子节点和父节点
       * - node {Object} 子节点
       * - parent {Object} 父节点,无为null
       */
      rebuildNode({
        node,parent
      },list){
        node.parent = parent ? parent:null
        node.match = false;
        node.indeterminate = false;
        node.checkedGroup = [];
        node.checkAll = false;
        for(let i = 0;i<list.length;i++){
          if(node.id == list[i].id){
            node.checkAll = true;
            this.checked = this.checked.concat(list.splice(i,1))
            break
          }
        }
        let {children} = node
        if(children){
          for(let child of children){
            this.rebuildNode({
              node:child,
              parent:node
            },list)
          }
        }
      },
      /**
       * 
       */
      rebuildState(node){
        if(node.checkAll){
          this.$set(node,'checkAll',true)
          this.getCheckDown(node);
          if (node.parent != null) {
            this.getCheckUp(node);
          }
          this.getIndeterDown(node);
          this.getIndeterUp(node);
        }else{
          if (node.children.length != 0) {
            node.children.forEach(item => {
              this.rebuildState(item)
            });
          }
        }
      },
      /**
       * 在搜索模式下是否显示
       * 
       * @param {Object} node 待检查节点
       * 
       * @returns {boolean} 是否显示
       */
      show(node) {
        return !node.match && this.searching;
      },
      /**
       * 清空搜索框时复原状态
       */
      clearing() {
        this.searchString = "";
        this.searching = false;
      },
      /**
       * 递归搜索，查看各节点name是否与搜索关键词匹配
       * 
       * @param {Object} node 待检查节点
       * 
       * @returns {boolean} 是否匹配
       */
      matching(node) {
        if (!node.match) {
          node.match = this.reg.test(node.name);
        }
        if (node.children.length != 0 && !node.match) {
          for (let i = 0; i < node.children.length; i++) {
            node.match = this.matching(node.children[i]) || node.match;
          }
          return node.match;
        } else if (node.children.length != 0) {
          for (let i = 0; i < node.children.length; i++) {
            node.children[i].match = true;
            this.matching(node.children[i]);
          }
          return node.match;
        } else {
          return node.match;
        }
      },
      /**
       * 递归复原节点的match属性为false
       * 
       * @param {Object} node 节点
       * 
       * @returns {boolean} 是否匹配
       */
      notMatch(node) {
        node.match = false;
        if (node.children.length != 0) {
          node.children.forEach(item => {
            this.notMatch(item);
          });
        }
      },
      /**
       * 搜索框输入改变时触发搜索或复原
       */
      search() {
        if (this.searchString == "") {
          this.searching = false;
          this.reg = /.*/;
          this.notMatch(this.tree);
        } else {
          this.searching = true;
          this.reg = new RegExp(this.searchString);
          this.notMatch(this.tree);
          this.matching(this.tree);
        }
      },
      /** 
       * 被选中时将节点{id,name}添加到checked数组中，被取消则从数组中去掉
       * 
       * @param {Object} node 节点
       * @param {boolean} bool 真假
       */
      changeCheckAll(node, bool) {
        this.$set(node,'checkAll',bool)
        this.$forceUpdate();
        if (!bool) {
          for (let i = 0; i < this.checked.length; i++) {
            if (this.checked[i].name == node.name) {
              this.checked.splice(i, 1);
            }
          }
        } else {
          let x = false;
          for (let i = 0; i < this.checked.length; i++) {
            if (this.checked[i].name == node.name) {
              x = true;
            }
          }
          if (!x) {
            this.checked.push({ name: node.name, id: node.id });
          }
        }
      },
      /**
       * 状态管理，checkAll为true indeterminate为false ✔
       * checkAll为false indeterminate为true ——
       * checkAll为false indeterminate为false 口
       * 不存在同真
       * 
       * @param {Object} node 节点
       */
      isCheck(node) {
        if (node.indeterminate) {
          this.changeCheckAll(node, false);
        } else {
          this.changeCheckAll(node, !node.checkAll);
        }
        return node.checkAll;
      },
      /**
       * 递归查询下级indeterminate状态
       * 
       * @param {Object} node 节点
       */
      childrenIndeterminate(node) {
        if (node.children.length == 0) {
          return false;
        } else {
          let re = false;
          for (let i = 0; i < node.children.length; i++) {
            re = re || node.children[i].indeterminate;
          }
          return re;
        }
      },
      /**
       * 四种管理checkedGroup的方法
       * fill 选中父节点所有下级节点
       * clear 取消选中父节点所有下级节点
       * add 添加子节点的name
       * delete 取消子节点的name
       * 
       * @param {Object} node 父节点
       * @param {string} type 方法
       * @param {string} name 子节点名称
       */
      setGroup(node, type, name) {
        if (type == "fill") {
          if (node.children.length != 0) {
            node.children.forEach(item => {
              this.setGroup(node, "add", item.name);
            });
          }
        } else if (type == "delete") {
          if (node.checkedGroup.includes(name)) {
            node.checkedGroup.splice(node.checkedGroup.indexOf(name), 1);
          }
        } else if (type == "add") {
          if (!node.checkedGroup.includes(name)) {
            node.checkedGroup.push(name);
          }
        } else if (type == "clear") {
          node.checkedGroup = [];
        }
      },
      /**
       * 向下传递checkAll状态
       * 
       * @param {Object} node 节点
       */
      getCheckDown(node) {
        if (node.checkAll) {
          this.setGroup(node, "fill");
        } else {
          this.setGroup(node, "clear");
        }
        if (node.children.length != 0) {
          node.children.forEach(item => {
            this.changeCheckAll(item, node.checkAll);
            this.getCheckDown(item);
          });
        }
      },
      /**
       * 向下传递indeterminate状态
       * 
       * @param {Object} node 节点
       */
      getIndeterDown(node) {
        if (node.children.length > 0) {
          node.children.forEach(item => {
            this.$set(item,'indeterminate',false)
            this.getIndeterDown(item);
          });
        }
      },
      /**
       * 向上传递indeterminate状态
       * 
       * @param {Object} node 节点
       */
      getIndeterUp(node) {
        let bool = 
          (node.checkedGroup.length > 0 &&
            node.checkedGroup.length < node.children.length) ||
          this.childrenIndeterminate(node);
          //node.indeterminate = bool
          this.$set(node,'indeterminate',bool)
        if (node.parent != null) {
          this.getIndeterUp(node.parent);
        }
      },
      /**
       * 向上传递checkAll状态,根据checkgroup改变checkAll 
       * 
       * @param {Object} node 节点
       */
      getCheckUp(node) {
        if (node.parent != null) {
          if (node.checkAll) {
            this.setGroup(node.parent, "add", node.name);
          } else {
            this.setGroup(node.parent, "delete", node.name);
          }
          if (node.parent.checkedGroup.length == node.parent.children.length) {
            this.changeCheckAll(node.parent, true);
            this.getCheckUp(node.parent);
          } else {
            this.changeCheckAll(node.parent, false);
            this.getCheckUp(node.parent);
          }
        }
      },
      /**
       * 核心，状态被改变时通过这个函数分发事件来管理状态
       * 
       * @param {Object} node 节点
       */
      changingCheck(node) {
        this.isCheck(node);
        this.getCheckDown(node);
        if (node.parent != null) {
          this.getCheckUp(node);
        }
        this.getIndeterDown(node);
        this.getIndeterUp(node);
      }
    }
}
</script>
<style>
/* 搜索框 */
.input {
  display: inline;
  margin: 0 15px;
}
.ydx-multicheckbox-none {
  height: 32px;
  margin-left: 20%;
  padding: 0 25px;
  line-height: 30px;
}
.input .ivu-input-group-append,
.ivu-input-group-prepend {
  background-color: #fff;
  cursor: pointer;
  border-radius: 0;
  border-left: none;
}
/* 各级选项 */
.ydx-multicheckbox-first-container {
  display: flex;
  background: #f8f8f8;
}
.ydx-multicheckbox-first-item {
  height: 32px;
  padding: 0 15px;
  line-height: 30px;
}
.ydx-multicheckbox-second-item {
  display: block;
  height: 32px;
  padding: 0 15px;
  line-height: 30px;
}
.ydx-multicheckbox-second-container {
  background: #f8f8f8;
}
.ydx-multicheckbox-third-group {
  display: flex;
  flex-wrap: wrap;
}
.ydx-multicheckbox-third-item {
  display: block;
  min-width: 20%;
  height: 32px;
  padding: 0 15px;
  line-height: 30px;
}
.ydx-multicheckbox-forth-group {
  display: flex;
  flex-wrap: wrap;
  width: 75%;
}
.ydx-multicheckbox-forth-item {
  height: 32px;
  min-width: 100px;
  padding: 0 15px;
  margin-right: 0;
  line-height: 30px;
  border: 1px solid fff;
}
.ydx-multicheckbox-forth-item:hover {
  border: 1px solid #333;
}
/* 气泡弹窗 */
.ydx-multicheckbox-forth-poptip {
  margin-right: 10%;
}
.ydx-multicheckbox-forth-div {
  margin-right: 10%;
}
.ydx-multicheckbox-fifth-div {
  min-width: 31%;
}
.ydx-multicheckbox-forth-poptip .ydx-multicheckbox-forth-item {
  display: block;
}
.ydx-multicheckbox-fifth-group {
  display: flex;
  flex-wrap: wrap;
  max-width: 450px;
}
.ivu-poptip-body-content {
  overflow: visible;
}
</style>