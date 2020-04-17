<template>
	<div>
		<nav-component></nav-component>
		<div class="layers-list-wrap">
			<el-menu
			default-active="0"
			unique-opened
			class="el-menu-vertical-demo"
			background-color="#f5f5f5"
			text-color="#0c0c0c"
			active-text-color="#00bae6">
			<el-submenu v-for='(li, index) in navList' :index='""+index+""' :key='index'>
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>{{ li.name }}</span>
				</template>
				<el-menu-item-group>
				<el-menu-item v-for='(item, num) in li.list'
					:index="index+'-'+num"
					:key="index+'-'+num"
					@click='tabLayerItem(li.name, item)'>{{ item.name }}</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			</el-menu>
		</div>
	</div>
</template>

<script>
import NavComponent from '../NavComponent';
import TianDiTu from './lib/TianDiTu';
import BaiDu from './lib/BaiDu';
import GaoDe from './lib/GaoDe';
import GuGe from './lib/GuGe';
import XiAn from './lib/XiAn';

export default {
  name: 'layersList',
  components: {
    NavComponent,
  },
  data() {
		return {
			navList: [
				{ name: '天地图', list: [{ name: '矢量底图', style: 'vec_w' }, { name: '矢量注记', style: 'cva_w' }, { name: '影像底图', style: 'img_w' }, { name: '影像注记', style: 'cia_w' }, { name: '地形晕渲', style: 'ter_w' }, { name: '地形注记', style: 'cta_w' }, { name: '全球境界', style: 'ibo_w' }, { name: '矢量英文注记', style: 'eva_w' }, { name: '影像英文注记', style: 'eia_w' }] },
				{ name: '百度地图', list: [{ name: '默认地图样式', style: 'normal' }, { name: '清新蓝风格', style: 'light' }, { name: '黑夜风格', style: 'dark' }, { name: '精简风格', style: 'googlelite' }, { name: '自然绿风格', style: 'grassgreen' }, { name: '午夜蓝风格', style: 'midnight' }, { name: '浪漫粉风格', style: 'pink' }, { name: '清新蓝绿风格', style: 'bluish' }, { name: '高端灰风格', style: 'grayscale' }, { name: '亮蓝', style: 'visualization' }] },
				{ name: '高德地图', list: [{ name: '影像', style: '6' }, { name: '矢量', style: '7' }] },
				{ name: '谷歌地图', list: [{ name: '影像', style: 's' }, { name: '矢量', style: 'm' }] },
				{ name: '西安', list: [{ name: '黑色主题', style: 's' }] },
			],
			mapSet: [],
			TianDiTu: null,// 天地图对象
			BaiDu: null,// 百度对象
		};
  },
  mounted() {
		this.TianDiTu = new TianDiTu();
		this.mapSet.push(this.TianDiTu);
		this.BaiDu = new BaiDu();
		this.mapSet.push(this.BaiDu);
		this.GaoDe = new GaoDe();
		this.mapSet.push(this.GaoDe);
		this.GuGe = new GuGe();
		this.mapSet.push(this.GuGe);
		this.XiAn = new XiAn();
		this.mapSet.push(this.XiAn);
  },
  methods: {
		tabLayerItem(name, item) {
			this.clear();
			switch (name) {
				case '天地图':
					this.TianDiTu.addLayer(item.style);
				break;
				case '百度地图':
					this.BaiDu.addLayer(item.style);
				break;
				case '高德地图':
					this.GaoDe.addLayer(item.style);
				break;
				case '谷歌地图':
					this.GuGe.addLayer(item.style);
				break;
				case '西安':
					this.XiAn.addLayer();
				break;
			}
		},
		clear() {
			this.mapSet.forEach((obj) => {
				obj.clear();
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.layers-list-wrap {
	width: 350px;
  height: calc(100vh);
  background: #f5f5f5;
  position: absolute;
  overflow-y: scroll;
}
</style>
<style lang="scss">
.layers-list-wrap {
	.el-submenu__title {
		text-align: left;
		border-bottom: 1px solid #d8d8d8;
	}
	.el-submenu .el-menu-item {
		border-bottom: 1px dashed #e1dce4;
	}
	.el-submenu.is-active .el-submenu__title {
		border-bottom-color: #d8d8d8;
	}
}
</style>