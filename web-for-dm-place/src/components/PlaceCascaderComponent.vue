<template>
  <div style="margin-left: -108px;">
    <el-select filterable size="small" class="option" v-model="data.country"
               placeholder="国家" @visible-change='isChange = false' @change="changeCountry">
      <el-option
        v-for="item in country"
        :key="item.name"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
    <el-select filterable size="small" :disabled="data.country !=='中国'"
               class="option" v-model="data.province"
               placeholder="省直辖市" @change="change">
      <el-option
        v-for="item in province"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
    <el-select filterable size="small" :disabled="!data.province || data.province==='省直辖市'" class="option" v-model="data.city"
               placeholder="地级市州" @change="change">
      <el-option
        v-for="item in city"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
    <el-select filterable size="small" :disabled="!data.city || data.city==='地级市州'" class="option" v-model="data.county"
               placeholder="区县旗" @change="change">
      <el-option
        v-for="(item, index) in county"
        :key="index"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
    <i class="el-icon-error clear" @click="reset"></i>
  </div>
</template>

<script>
import { getGeometryByCode, getTree, getCountries, getGeometryByCountryName} from '../api/placeApi';

export default {
  name: 'place-cascader-componment',
  props: {
    size: {
      type: String,
    },
    isAddFence:{
      type:Boolean,
    }
  },
  watch:{
    isAddFence(){
      this.data.country = '国家';
      this.data.province = '省直辖市';
      this.data.city = '地级市州';
      this.data.county = '区县旗';
    }
  },
  data() {
    return {
      data: {
        country:'',
        province: '',
        city: '',
        county: '',
      },
      country: [],
      province: [],
      city: [],
      county: [],
      areaData: [],
      isChange: false,
      tempCounty:'',
    };
  },
  async created() {
    this.country = await getCountries();
    this.mapCountry(this.country);
    this.province = await getTree();
    this.buildData(this.province);
  },
  methods: {
    reset() {
      this.data = {
        country:'',
        province: '',
        city: '',
        county: '',
      };
      this.$emit('change', null);
    },
    async changeCountry(name) {
      this.data.province = '';
      this.data.city = '';
      this.data.county = '';
      let geo = name ? await getGeometryByCountryName(name) : null;
      if (!this.isChange) {
        this.$emit('change', geo);
      }
    },
    async change(values) {
      this.isChange = false;
      this.$emit('change', values ? await getGeometryByCode(values) : null);
      this.isChange = true;
      if (values % 10000 === 0) {
        this.city = this.areaData[values];
        this.data.city = '';
        this.data.county = '';
        this.county = [];
      } else if (values % 100 === 0) {
        if(values.toString().length ===  8 ){
          this.county = this.tempCounty
        }else{
          this.county = this.areaData[values];
          this.data.county = '';
          this.tempCounty = this.county
        }
      } else {
        this.county = this.areaData[values];
        if (this.county instanceof Array){
          if(this.county.length === 0){
          this.data.county = '';
          }else{
            this.tempCounty = this.county
          }
        }else{
          this.county = this.tempCounty
        }
      }
    },
    //将中国拼接到最前方
    mapCountry(country) {
      for(let i = 0; i < country.length; i += 1){
        const item = country[i];
        if(item.name === '中国'){
          const china = country.splice(i , 1);
          country.unshift(china[0]);
          break;
        }

      }

    },
    buildData(data) {
      data.forEach((item) => {
        if (item.children) {
          this.$set(this.areaData, item.code, item.children);
          this.buildData(item.children);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.option {
  width: 105px !important;
  margin-left: 5px;
  .el-input__inner{
    height: 32px !important;
  }
}
.clear {
  cursor: pointer;
  color: #cccccc;
}
</style>
