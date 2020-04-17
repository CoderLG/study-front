<template>
  <div class="real-data-statistics">
    <div class="service-manage-title">数据统计</div>
    <div class="real-data-statistics-main">
			<div class="real-data-echarts-middle">
        <p class="real-data-echarts-title">总量</p>
        <div class="real-data-echarts-table">
					<div class="real-data-statistics-total">
						<div class="real-data-statistics-top">
							<img src="../assets/time.png" alt="">
							<p>实时数据总量</p>
							<img src="../assets/line.png" alt="">
						</div>
						<div class="real-data-statistics-bottom">
							<p>{{ addCommas(totalData) }} <span>条</span></p>
							<div>
								<p>更新时间  {{ timestampToTime(totalTime) }}</p>
							</div>
						</div>
					</div>
					<div class="real-data-statistics-line"></div>
					<div class="real-data-statistics-total">
						<div class="real-data-statistics-top">
							<img src="../assets/time.png" alt="">
							<p>实时接入速度</p>
							<img src="../assets/line.png" alt="">
						</div>
						<div class="real-data-statistics-bottom real-data-statistics-speed-bottom">
							<p>{{ totalSpeed }} <span>条/S</span></p>
							<div>
								<p>更新时间  {{ timestampToTime(speedTime) === 'NaN:NaN:NaN' ? '-- : -- : --' : timestampToTime(speedTime) }}</p>
							</div>
						</div>
					</div>
        </div>
      </div>
			<div class="real-data-echarts-middle">
        <p class="real-data-echarts-title">累计数据量</p>
        <div id="main2" class="real-data-echarts-table" v-loading='totalLoading'></div>
      </div>
			<div class="real-data-echarts-bottom">
        <p class="real-data-echarts-title">实时数据量</p>
        <div id="main1" class="real-data-echarts-table" v-loading='speedLoading'></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { getHistroySpeed, getCurrentSpeed, getCurrentTotalData } from '../api/realTimeTaskApi';

export default {
	data() {
		return {
			timer: null,// 实时请求数据速率
			timer2: null,// 实时请求总量
			option1: {
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					right: 35,
					top: 20,
					data: []
				},
				series : [
					{
						name: '访问来源',
						type: 'pie',
						radius : '55%',
						center: ['50%', '50%'],
						data:[],
						itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
						}
					}
				]
			},
			option2: {
        legend: {
          data:['飞机','测试01', '船']
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // axisLabel: {
          //   formatter: (value) => {
          //     const kb = parseInt(value / 1024, 10);
          //     const mb = (value / 1024 / 1024).toFixed(2);
          //     const gb = (value / 1024 / 1024 / 1024).toFixed(2);
          //     const tb = (value / 1024 / 1024 / 1024 / 1024).toFixed(2);
          //     if (tb > 1) {
          //       return `${tb}T`;
          //     } else if (gb > 1) {
          //       return `${gb}G`;
          //     } else if (mb > 1) {
          //       return `${mb}M`;
          //     }
          //     return `${kb}k`;
          //   }
          // }
        },
        series: [{
          name: '飞机',
          type: 'line',
          data: []
        },{
          name: '测试01',
          type: 'line',
          data: []
        },{
          name: '船',
          type: 'line',
          data: []
        }]
      },
      totalLoading: false,// 数据总量统计的loading
      speedLoading: false,// 数据总量统计的loading
      totalData: 0,// 总的数据量
      totalSpeed: 0,// 总的速率
      totalTime: 0,// 总量时间
      speedTime: 0,// 速率时间
		}
	},
	methods: {
		init() {
			this.initDataTotal();
			this.initSpeed();
		},
		// 初始化数据总量图表
		initDataTotal() {
			this.totalLoading = true;
			getCurrentTotalData().then(res => {
				this.totalData = res.data.total;
				this.totalTime = res.data.time;
				this.option1.legend.data = [];
				this.option1.series[0].data = [];
				res.data.info.forEach(val => {
					let describeTrue = '';
					if (!val.describe) {
						describeTrue = '历史数据';
					} else {
						describeTrue = val.describe;
					}
					this.option1.legend.data.push(`${describeTrue}(${val.sourceId})`);
					this.option1.series[0].data.push({value: val.count, name:`${describeTrue}(${val.sourceId})`});
				});
				var myChart2 = echarts.init(document.getElementById('main2'));
				myChart2.setOption(this.option1);
				this.totalLoading = false;
				// 实时请求数据速率
				clearInterval(this.timer2);
				this.timer2 = null;
				this.timer2 = setInterval(() => {
					getCurrentTotalData().then(res => {
						this.totalData = res.data.total;
						this.totalTime = res.data.time;
						this.option1.legend.data = [];
						this.option1.series[0].data = [];
						res.data.info.forEach(val => {
							let describeTrue = '';
							if (!val.describe) {
								describeTrue = '历史数据';
							} else {
								describeTrue = val.describe;
							}
							this.option1.legend.data.push(`${describeTrue}(${val.sourceId})`);
							this.option1.series[0].data.push({value: val.count, name:`${describeTrue}(${val.sourceId})`});
						});
						myChart2.setOption(this.option1);
					});
				}, 5000);
			});			
		},
		// 初始化数据速率图表
		initSpeed() {
			this.speedLoading = true;
			getHistroySpeed().then(res => {
				let optionArr = [];
				this.option2.series = [];
				this.option2.legend.data = [];
				/* eslint-disable */
				res.data = [];
				/* eslint-enable */
				res.data.forEach(() => {
					optionArr.push([]);
					this.option2.series.push({ name: '', type: 'line', data: []});
				});

				this.speedTime = res.data.length ? res.data[0].info[0].time : '';
				res.data.forEach((val, index) => {
					val.info.forEach(con => {
						optionArr[index].push(this.randomData(con.count, con.time));
					});
					this.option2.series[index].name = val.describe;
					this.option2.series[index].data = optionArr[index];
					this.option2.legend.data.push(val.describe);
				});
				// 初始化历史前60分钟的数据速率
				var myChart1 = echarts.init(document.getElementById('main1'));
				myChart1.setOption(this.option2);
				this.speedLoading = false;
				// 实时请求数据速率
				clearInterval(this.timer);
				this.timer = null;
				let length = optionArr.length;
				this.timer = setInterval(() => {
					let totalSpeedNum = 0;
					let indexVal = 0;					
					getCurrentSpeed().then(res => {
						this.speedTime = res.data.length ? res.data[0].info[0].time : '';
						res.data.forEach((val, num) => {
							let index = this.option2.legend.data.indexOf(val.describe);
							if (index !== -1) {
								optionArr[index].push(this.randomData(val.info[0].count, val.info[0].time));
								this.option2.series[index].data = optionArr[index];
							} else {
								// 待验证（历史数据不存在；实时数据存在）
								indexVal = Number(length + num);
								optionArr.push([]);
								this.option2.series.push({ name: '', type: 'line', data: []});
								optionArr[indexVal].push(this.randomData(val.info[0].count, val.info[0].time));
								this.option2.series[indexVal].data = optionArr[indexVal];
							}
							totalSpeedNum += val.info[0].count;
						});
						this.totalSpeed = totalSpeedNum;
						myChart1.setOption(this.option2);
					});
				}, 5000);
			});
		},
		// 拼装成echarts需要的值
    randomData(res, nowData) {
      return {
        name: nowData.toString(),
        value: [
          this.timestampToTime(nowData),
          res
        ]
      }
    },
    // 时间戳转时间格式
    timestampToTime(timestamp) {
      const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // const Y = date.getFullYear() + '-';
      // const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      // const D = date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes() + ':';
      const s = date.getSeconds();
      // return Y+M+D+h+m+s;
      return h+m+s;
    },
    // 数字三位用逗号隔开
    addCommas(num) {
			let nStr = num;
			nStr += '';
			const x = nStr.split('.');
			let x1 = x[0];
			const rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1,$2');
			}
			return x1;
		},
    // 销毁统计的定时器
    destroyStatisticsTimer() {
			clearInterval(this.timer);
			clearInterval(this.timer2);
    },
	},
}
</script>

<style lang="scss" scoped>
.real-data-statistics {
	.real-data-statistics-main {
		border-top: 1px solid #ebeef5;
		.real-data-echarts-title {
			color: #626a77;
			font-size: 17px;
			line-height: 50px;
			padding-left: 20px;
			font-weight: 700;
			border-bottom: 1px solid #ebeef5;
		}
		.real-data-echarts-middle {
			width: calc((100vw - 350px) / 2);
			box-shadow: 0 0 10px #c7c0c0;
			margin: 20px;
			float: left;
			border-radius: 5px;
			.real-data-echarts-table {
			width: calc((100vw - 350px) / 2);
			height: 300px;
			.real-data-statistics-line {
					width:1px;
					height:190px;
					float: left;
					margin-top: 85px;
					background:rgba(36,141,248,1);
					opacity:0.27;
				}
				.real-data-statistics-total {
					width: calc(49% - 1px);
					float: left;
					height: 100%;
					.real-data-statistics-top {
						width: 150px;
						margin: 0 auto;
						margin-top: 20px;
						line-height: 33px;
						> p {
							font-size: 18px;
							display: inline-block;
							margin-left: 5px;
							font-weight: bold;
							color: rgba(76,82,91,1);
						}
						> img:last-child {
							margin-left: 33px;
						}
					}
					.real-data-statistics-bottom {
						text-align: center;						
						> p {
							margin-top: 55px;
							font-size: 30px;
							color: rgba(76,82,91,1);
							span {
								font-weight:400;
								color:rgba(76,82,91,1);
								font-size: 15px;
							}
						}
						> div {
							background: url(/static/images/dataTotal.png) no-repeat;
							background-size: 90% 100%;
							background-position: center;
							margin-top: 51px;
							height: 73px;
							> p {
								padding-top: 40px;
							}
						}
					}
					.real-data-statistics-speed-bottom {
						> div {
							background: url(/static/images/speed.png) no-repeat;
							background-size: 95% 100%;
							background-position: center;
							margin-top: 51px;
							height: 73px;
						}
					}
				}
			}
		}
		.real-data-echarts-bottom {
			@extend .real-data-echarts-middle;
			width: calc((100vw - 310px));	  	
			background: none;
			.real-data-echarts-table {
				width: calc((100vw - 310px));
				height: 385px;
			}
		}
	}
}
</style>