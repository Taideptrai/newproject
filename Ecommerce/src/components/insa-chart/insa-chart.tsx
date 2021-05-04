import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, {FC, memo} from 'react';
import {Loading} from '../loading';

interface Props {
    loading?: boolean;
    name?: string;
    categories?: string[];
    data?: number[];
}

const InsaChart: FC<Props> = memo(
    ({categories = [], data = [], name = 'Biểu đồ', loading = true}) => {
        const options = {
            title: {text: ''},

            subtitle: {text: ''},
            xAxis: {
                categories,
            },
            yAxis: {title: {text: ''}},
            series: [
                {
                    name,
                    type: 'column',
                    data,
                },
            ],
        };

        return (
            <div style={{position: 'relative'}}>
                {loading && <Loading full />}
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        );
    },
);

export {InsaChart};
