import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Order } from '@types';
import moment from 'moment';

type Props = {
  orders: Order[];
};

const HistoryChart: React.FC<Props> = ({ orders }) => {
  const chartOption = useMemo(() => {
    const data = new Array(7).fill(0);
    const startWeek = moment().startOf('week');
    const endWeek = moment().endOf('week');
    orders.forEach((order) => {
      if (moment(order.createdAt).isBetween(startWeek, endWeek)) {
        data[moment(order.createdAt).day()] += 1;
      }
    });

    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    };
  }, [orders]);

  return (
    <div>
      <h2 className="font-bold text-lg text-gray-700">
        Orders per day this week
      </h2>
      <ReactEcharts option={chartOption} />
    </div>
  );
};

export default HistoryChart;
