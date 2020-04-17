<template>

	<Menu :theme="theme2" accordion class="el-menu-vertical-demo" :active-name="defaultActive" :open-names="defaultOpeneds"
		@on-select='select'>
    <Submenu v-for='(item, index) in leftLists' :name="item.index" :key='index'>
      <template slot="title">
        <span ref='spanStyle' @click='event($event, item.index)'>{{ item.name }}</span>
      </template>
      <div v-if='item.items'>
				<MenuItem v-for='(li, liindex) in item.items' :key='liindex' :name="li.index">
					<div @click='tabMain(li.index)' class="el-menu-item-div">
						<i class="el-icon-news"></i>
						<span>{{ li.name }}</span>
					</div>
				</MenuItem>
      </div>
    </Submenu>
  </Menu>
</template>

<script>
export default {
  props: ['leftLists', 'defaultActive', 'defaultOpeneds'],
  data() {
		return {
			theme2: 'light',
		}
  },
  mounted() {
    this.$refs.spanStyle[0].style.color = '#ffffff';
    this.$refs.spanStyle[0].style.background = '#24A5F8';
  },
  methods: {
    tabMain(index) {
			if (index && Array.isArray(index)) {
				this.$emit('tabMain', index[0]);
			} else {
				this.$emit('tabMain', index);
			}
    },
    select(index) {
      this.$emit('getCurrentIndex', index);
    },
    event(event, index) {
			this.tabMain(index);
			const ev = event;
      this.$refs.spanStyle.forEach((res) => {
				/* eslint-disable */
				res.style.background = '#f3f4f8';
        res.style.color = '#303133';
				/* eslint-enable */
      });
      ev.target.style.background = '#24A5F8';
      ev.target.style.color = '#ffffff';
    },
  },
};
</script>

<style lang="scss">
.el-menu-vertical-demo {
	line-height: 50px;
	width: 100% !important;
	background: #f3f4f8;
	user-select: none;
	.el-menu-item-div {
		padding-left: 20px;
		i {
			font-size: 18px;
			padding-right: 10px;
			vertical-align: middle;
		}
	}
	.ivu-menu-item, .ivu-menu-submenu-title {
		padding: 0px;
		text-align: left;
	}
	.ivu-menu-submenu {
		border-bottom: 1px solid #dbdbdb;
	}
	.ivu-menu-submenu-title {
		span {
			width: 100%;
			height: 100%;
			display: block;
			text-align: left;
			padding-left: 50px;
		}
		i {
			position: absolute;
			top: 50%;
			right: 15px;
			display: none;
		}
	}
	.ivu-menu-item-active {
		.ivu-menu-submenu-title {
			i {
				display: block;
			}
		}
	}
	.ivu-menu-item-active:not(.ivu-menu-submenu) {
		background: #CAE5F8 !important;
	}
	.ivu-menu-item-active:not(.ivu-menu-submenu):after {
		display: none !important;
	}
	.el-menu-item-group__title {
		padding: 0px;
	}
	.el-menu-item.is-active {
		background-color: #CAE5F8 !important;
		color: #303133;
	}
	.el-submenu__title {
		padding: 0px !important;
	}

	.el-submenu {
		border-bottom: 1px solid #dbdbdb;
	}
	.el-submenu__title i {
		color: #999999;
		font-size: 16px;
		display: none;
	}
	.is-active {
		.el-submenu__title i {
			color: #303133;
			display: block;
		}
	}
	.el-submenu__title span {
    width: 100%;
    height: 100%;
    display: block;
    text-align: left;
    padding-left: 50px;
	}
	.el-menu-item, .el-submenu__title {
		height: 52px;
		line-height: 50px;
	}
	.el-submenu .el-menu-item {
		padding-left: 60px !important;
		text-align: left;
	}
	.ivu-menu-opened > div {
		background: rgb(36, 165, 248);
	}
}
.el-menu {
	border-right-width: 0px;
}
.ivu-menu-vertical.ivu-menu-light:after {
	display: none !important;
}
</style>
