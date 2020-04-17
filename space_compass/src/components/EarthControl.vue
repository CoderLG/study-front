<template>
<div class='earthPanel' @click="bodyClick">
	<div v-if="splitScreen==1||splitScreen==2||splitScreen==3"
        class='earthPanel' id='earthPanel'>
		<el-row style="height:100%">
			<el-col v-for="(item,key) in allBaseEarth" v-bind:class="{ multiEarth:splitScreen!=1,'active': item.active}"
					:key="key" :span="24/splitScreen" style="height:100%;" @click.native='clickBaseEarth(item.uid)'>
				<BaseEarth :ref="item.uid" />
			</el-col>
		</el-row>
	</div>

	<div v-else-if="splitScreen==4||splitScreen==6" class='earthPanel' id='earthPanel'>
		<el-row style="height:50%">
            <template v-for="(item,key) in allBaseEarth">
                <el-col v-if="key < ((splitScreen/2))" :key="item" :span="24/(splitScreen/2)"
                        v-bind:class="{ multiEarth:!item.active,'active': item.active  }"
                        style="height:100%" @click.native='clickBaseEarth(item.uid)'>				
                    <BaseEarth :ref="item.uid"/>			
                </el-col>
            </template>
			
		</el-row>
		<el-row style="height:50%">
            <template  v-for="(item,key) in allBaseEarth" >
                <el-col v-if=" ((splitScreen/2) <=key )" :key="item" :span="24/(splitScreen/2)"
                        v-bind:class="{multiEarth:!item.active,'active': item.active  }"
                        style="height:100%" @click.native='clickBaseEarth(item.uid)'>			
                    <BaseEarth :ref="item.uid"/>				
                </el-col>
            </template>
			
		</el-row>
	</div>

	<div v-else-if="splitScreen==9" class='earthPanel' id='earthPanel'>
		<el-row style="height:33.33%">
            <template  v-for="(item,key) in allBaseEarth" >
                <el-col v-if="key<3" :key="item" :span="8" 
                        v-bind:class="{ multiEarth:!item.active,'active': item.active  }"
                        style="height:100%" @click.native='clickBaseEarth(item.uid)'>				
                    <BaseEarth :ref="item.uid"/>				
                </el-col>
            </template>
			
		</el-row>
		<el-row style="height:33.33%">
            <template  v-for="(item,key) in allBaseEarth" >
                <el-col :key="item" :span="8" v-if="2<key&&key<6" 
                        v-bind:class="{ multiEarth:!item.active,'active': item.active  }"
                        style="height:100%"  @click.native='clickBaseEarth(item.uid)'>
                    <BaseEarth :ref="item.uid"/>			
                </el-col>
            </template>
		</el-row>
		<el-row style="height:33.33%">
            <template  v-for="(item,key) in allBaseEarth" >
                <el-col v-if="5<key&&key<9" :key="item" :span="8"
                        v-bind:class="{ multiEarth:!item.active,'active': item.active  }"
                        style="height:100%"  @click.native='clickBaseEarth(item.uid)'>			
                    <BaseEarth :ref="item.uid"/>			
                </el-col>
            </template>
		</el-row>
	</div>
</div>
</template>

<script>
import BaseEarth from "./Earth";
import { createGuid } from "../assets/utils";

export default {
    name: "EarthControl",
    components: {
        BaseEarth
    },
    data() {
        return {
            boardVisible: false,
            splitScreen: 1,
            allBaseEarth: [{ active: true, uid: createGuid() }],
            selectKey: 0,
            defEarth: null
        };
    },
    created() {
        this.$bus.on("SplitEarth", num => {
            this.allBaseEarth = []; 
            this.$store.dispatch("setEarthNum", num);
            this.$nextTick(()=>{
                this.splitScreen = num;
                for (let i = 0; i < num ; i++) {
                    this.allBaseEarth.push({
                        active: false,
                        uid: createGuid()
                    });
                }
                let names = this.$refs;
                let str = this.allBaseEarth[0].uid;
                let currentId = null;
                for (let obj in names) {
                    if (str==obj) {
                        currentId = names[obj]
                        this.$store.dispatch("setCurrentEarth", currentId[0]);
                    }
                }
            })
        });
    },
    updated() {
        if (this.splitScreen==1&&this.allBaseEarth[0])  this.clickBaseEarth(this.allBaseEarth[0].uid) 
    },
    mounted() {
        //一个球的测试代码
        let defEarth = this.allBaseEarth[0];
        defEarth.active = true;
        this.defEarth = defEarth;
        this.$store.dispatch("setCurrentEarth", this.$refs[this.defEarth.uid][0]);
    },
    methods: {
        //选中需要进行操作的球
        clickBaseEarth(uid) {
        this.allBaseEarth.map(item => {
            item.active = item.uid == uid;
        });
        this.$store.dispatch("setCurrentEarth", this.$refs[uid][0]);
        },
        bodyClick() {
            //this.$bus.emit("toogleMenu");
        }
    }
};
</script>

<style scoped>
.earthPanel {
  width: 100%;
  height: 100%;
}

.multiEarth {
  border: 1px solid #bebebe;
}
.active {
  border: 3px solid #00fffe;
}
.el-col-24.active {
  border: none;
}
</style>
