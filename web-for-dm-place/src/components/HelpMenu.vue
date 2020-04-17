<template>	
	<div class="help-manual-wrap">
		<NavComponent></NavComponent>
		<iframe src="../../static/helpManual/index.htm"></iframe>
	</div>
</template>

<script>
	import NavComponent from './NavComponent';

	export default {
		components: {
			NavComponent,
		},
	};
</script>

<style scoped>
.help-manual-wrap {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
iframe{
	width: 100%;
	height: calc(100vh - 65px);
	border-width: 1px;
	border-color: white;
}
</style>