<template>
	<ul class="icenter-lab-ul">
		<li v-for='(li, index) in list' :key='index'>
      <router-link :to='li.route'>
        {{ index }} : {{ li.name }}
      </router-link>
    </li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{ name: '服务一张图', route: '/searchService' },
					{ name: '数据流导出', route: '/dataStreamExport' },
					{ name: '各类基础地图', route: '/baseMapGallery' }
				]
			}
		}
	}
</script>

<style lang='scss' scoped>
	.icenter-lab-ul {
		padding: 100px;
		li {		
			a {
				font-size: 20px;
			}
		}
	}
</style>