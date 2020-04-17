<template>
 
<el-dialog title="多窗口设置" :visible.sync="show" width="600" >
        <div  class="multiWin">
            <el-row  :gutter="12">
                <el-col v-for="(item,index) in splitCfg" :key="index" :span="8"  >
                        <el-card shadow="hover" @click.native="SetGlobeCount(item)"  v-bind:class="{ borderColor: item.actived }" >
                            <ul >
                                <li v-for="(num,key) in item.num" :key="key" >{{num}}</li>
                            </ul>
                        </el-card>
                </el-col>
            </el-row> 
             
        </div>
 
 
        <span slot="footer" class="dialog-footer">
           
            <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" @click="SplitSrc">确 定</el-button>
        </span>
</el-dialog>

</template>

<script>
  

export default {
  data() {
    return {
      show: false,
      splitCfg:[
          {
              name:"单视窗",
              num:1,
              actived:true

          },{
              name:"双视窗",
              num:2,
              actived:false
          },{
              name:"三视窗",
              num:3,
              actived:false
          },{
              name:"四视窗",
              num:4,
              actived:false
          },{
              name:"六视窗",
              num:6,
              actived:false
          },{
              name:"九视窗",
              num:9,
              actived:false
          }
      ],
      splitNum:1
     
    };
  },
  components: {
    
  },
  
  methods: {
      SetGlobeCount(item){
          this.splitNum = item.num;
          this.splitCfg.map(item=>item.actived=false);
          item.actived = true;
      },
      SplitSrc(){   
        let tips="确定要切换屏幕吗？切换后,之前的动作将无法保存"
        this.$confirm(tips, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$bus.emit("SplitEarth",this.splitNum);  
                this.show = false;
                this.$bus.emit("splitScreen",true);
                console.log('000000000000000000000000000000000000')
            }).catch(() => {
                this.show = false;
            })
        //this.$bus.emit("splitScreen",true);
    }
       
   
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    this.$bus.on("toggleMultiGlobe", item => {
        this.show = !this.show;
      }); 
  }
};
</script>



<style scoped lang="scss">
 
.settingdlg{
    z-index: 99999999;
}
.multiWin{
    .el-col{
        ul{
            height: 180px;
            li{
                float: left;
                line-height: 180px;
                text-align: center;
                border: 1px solid #fff;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                width: 100%;
            }
        }
        &:nth-child(2){
            ul{
                li{
                   width: 50%;
                }
            }
        }
        &:nth-child(3){
            ul{
                li{
                   width: 33.33%;
                }
            }
        }
        &:nth-child(4){
            ul{
                li{
                    height: 90px;
                    line-height: 90px;
                    width: 50%;
                }
               
            }
        }
        &:nth-child(5){
            ul{
                li{
                    height: 90px;
                    line-height: 90px;
                    width: 33.33%;
                }
            }
        }
        &:nth-child(6){
            ul{
                li{
                    height: 60px;
                    line-height: 60px;
                    width: 33.33%;
                }
            }
        }
    }
    .el-card{
        cursor: pointer;
        font-size: 16px;
        color: #dadada;
        background: transparent;
        border: 1px solid #888888;
        .el-card__body{
            padding: 10px;
        }
        
       
    }
    .borderColor{
        border-color: #0974dc;
    }
    .el-row {
        margin-top: 20px;
    }
    .el-col{
        margin-top: 15px;
    }
} 
 
</style>
