import {Component, OnInit} from '@angular/core';
import {CommonUtils} from '../../common/CommonUtils';
import {ProductEchartsService} from "./productEcharts.service";
import {formatDate} from "@angular/common";

@Component({
    selector: 'view-stat-product-echarts',
    templateUrl: './productEcharts.component.html',
    styleUrls: ['./productEcharts.component.less']
})

export class ProductEchartsComponent implements OnInit {
    // 遮罩
    isSpinning = false;

    echarts_1 = {option: {}};
    echartsInstance_1 = null;

    constructor(private productEchartsService: ProductEchartsService) {
        let me = this;
        this.echarts_1.option = {
            timeline: {
                data: [0, 1, 2, 3, 4],
                type: 'number',
                label: {
                    formatter: function (s) {
                        return me.getYear(s);
                    }
                },
                autoPlay: true,
                playInterval: 5000,
                controlPosition: 'right'
            },
            options: [{
                title : {'text':`${me.getYear(0)}年进销月度数据`},
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                legend: {
                    data: ['销售总额', '进货总额', '化肥销售额', '农药销售额', '化肥进货额', '农药进货额']
                },
                xAxis: [{
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }],
                yAxis: [{
                    type: 'value',
                    name: '金额（元）',
                    axisLabel: {
                        formatter: '{value} ￥'
                    }
                }],
                series: [{
                    name: '销售总额',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'insideTop'}}},
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: '进货总额',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'insideTop'}}},
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: '化肥销售额',
                    type: 'line',
                    yAxisIndex: 0,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: '农药销售额',
                    type: 'line',
                    yAxisIndex: 0,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: '化肥进货额',
                    type: 'line',
                    yAxisIndex: 0,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: '农药进货额',
                    type: 'line',
                    yAxisIndex: 0,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }]
            }]
        };
    }

    ngOnInit(): void {
    }

    /**
     * 图表初始化
     * @param e
     */
    chart_1Init(e): void {
        this.echartsInstance_1 = e;
        this.loadProductMonthData(0);
    }

    /**
     * 时间轴改变
     * @param e
     */
    chart_1TimelineChanged(e): void {
        let currentOption = this.echarts_1.option['options'][e.currentIndex];
        if (currentOption == null) {
            this.loadProductMonthData(e.currentIndex);
        }
    }

    /**
     * 加载按月图表数据
     * @param year
     */
    loadProductMonthData(index: number): void {
        let me = this;
        this.productEchartsService.getProductMonthData(me.getYear(index)).subscribe(res => {
            if ("0000" == res['resultCode']) {
                if (!me.echarts_1.option['options'][index]) {
                    me.echarts_1.option['options'][index] = {};
                }
                if (!me.echarts_1.option['options'][index]['series']) {
                    me.echarts_1.option['options'][index]['series'] =
                        new Array({data: []}, {data: []}, {data: []}, {data: []}, {data: []}, {data: []});
                }
                me.echarts_1.option['options'][index]['title'] = {'text':`${me.getYear(index)}年进销月度数据`},
                me.echarts_1.option['options'][index]['series'][0]['data'] = res['result']['sumSellData'];
                me.echarts_1.option['options'][index]['series'][1]['data'] = res['result']['sumStockData'];
                me.echarts_1.option['options'][index]['series'][2]['data'] = res['result']['manureSellData'];
                me.echarts_1.option['options'][index]['series'][3]['data'] = res['result']['pesticideSellData'];
                me.echarts_1.option['options'][index]['series'][4]['data'] = res['result']['manureStockData'];
                me.echarts_1.option['options'][index]['series'][5]['data'] = res['result']['pesticideStockData'];

                this.echartsInstance_1.setOption(this.echarts_1.option);
            }
        });
    }

    /**
     * 根据下标获取年份，方便年份时间轴倒序
     * @param index
     */
    getYear(index: number) {
        let currentYear: any = formatDate(new Date(), 'yyyy', 'zh-Hans');
        return currentYear - index;
    }
}
