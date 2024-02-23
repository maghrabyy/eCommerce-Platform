import { ordersData } from '../../../data/ordersData';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faAngleDown, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { Chart } from "react-google-charts";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export const SalesReport = ()=>{
    const monthNum = {
        0:'Jan',
        1:'Feb',
        2:'Mar',
        3:'Apr',
        4:'May',
        5:'June',
        6:'July',
        7:'Aug',
        8:'Sept',
        9:'Oct',
        10:'Nov',
        11:'Dec'
    }

    const overallSales = ordersData.length;
    const arrivedOrders = ordersData.filter(order=>order.orderStatus.currentStatus().status === 'Arrived').length
    const overallRev = ordersData.map(order=>order.revenue()).reduce((a,b)=>a+b,0);
    const [monthlySelectedDate, setMonthlySelectedDate] = useState(Date());
    const [annualSelectedDate, setAnnualSelectedDate] = useState(Date());
    return <div className="sales-reports">
        <div className="overall-summary bg-slate-300 rounded-lg px-4 py-2 shadow-md mb-2 text-slate-800 text-xl font-semibold flex flex-col gap-2">
            <h1 className="title self-center font-bold text-2xl">Overall Summary</h1>
            <h1 className="total-sales">Total Sales: <span className='font-bold'>{overallSales}</span></h1>
            <h1 className="total-sales">Arrived Orders: <span className='font-bold'>{arrivedOrders}</span></h1>
            <h1 className="total-rev">Total Revenue <span className='font-bold bg-green-700 shadow-md rounded-md py-1 px-2 text-white'>{overallRev}EGP</span></h1>
        </div>
        <div className="monthly-report">
            <div className="monthly-reports-title font-bold text-4xl text-slate-800 bg-slate-300 rounded-lg py-2 shadow-md mb-2 flex sm:flex-row flex-col gap-4 justify-center items-center">
               <span>Monthly Report</span>
               <DatePicker
                className='bg-blue-700 hover:bg-blue-500 text-white rounded-lg text-center shadow-md cursor-pointer px-4'
                format="y-MM"
                maxDetail='year'
                clearIcon = {null}
                calendarIcon = {null}
                value={monthlySelectedDate}
                onChange={setMonthlySelectedDate}
                />
            </div>
            <ReportsContainer year={new Date(monthlySelectedDate).getFullYear()} month={monthNum[new Date(monthlySelectedDate).getMonth()]} />
        </div>
        
        <div className="annual-report">
            <div className="monthly-reports-title font-bold text-4xl text-slate-800 bg-slate-300 rounded-lg py-2 shadow-md mb-2 flex sm:flex-row flex-col gap-4 justify-center items-center">
               <span>Annual Report</span>
               <DatePicker 
                className='bg-blue-700 hover:bg-blue-500 text-white rounded-lg text-center shadow-md cursor-pointer'
                format="y"
                maxDetail='decade'
                clearIcon = {null}
                calendarIcon = {null}
                value={annualSelectedDate}
                onChange={setAnnualSelectedDate}
                />
            </div>
            <ReportsContainer year={new Date(annualSelectedDate).getFullYear()}/>
        </div>
    </div>
}

const ReportsContainer = ({month,year})=>{
    const [expandReports,setExpandReports] = useState(true);
    const [totalRev,setTotalRev] = useState(0);
    const [totalSales,setTotalSales] = useState(0);
    const totalRevHandler = value =>{
        setTotalRev(value.totalRev);
        setTotalSales(value.totalSales)
    }
    return <div className="reports">
        <div onClick={()=>setExpandReports(!expandReports)} className="reports-title text-center font-bold md:text-4xl text-lg text-slate-800 bg-slate-300 rounded-lg py-2 shadow-md mb-2 flex justify-between px-4 cursor-pointer select-none hover:bg-slate-200">
            {month ? <span>Monthly: {month} - {year} Reports</span> :
                    <span>Annual: {year} Reports</span>
             }
            <span className='me-2'><FontAwesomeIcon icon={expandReports? faAngleDown: faAngleRight} /></span>
        </div>
        {expandReports && <div className="reports-container">
            <div className="report flex md:flex-row flex-col gap-2 py-2">
                <div className="flex flex-col  basis-1/2">
                    <ReportChart chartType={month? 'Line' : 'Bar'} year={year} month={month && month} revenue 
                        totalValueCallbk={totalRevHandler}/>
                    {!month && <div className="total-value">
                        Total Revenue {totalRev??0}EGP
                    </div>}
                </div>
                <div className="flex flex-col basis-1/2">
                    <ReportChart chartType={'Bar'} year={year} month={month && month} sales
                        totalValueCallbk={totalRevHandler}/>
                        {!month && <div className="total-value">
                            Total Sales {totalSales??0}
                        </div>}
                </div>
            </div>
            <div className="pie-report flex md:flex-row flex-col gap-2 py-2">
                <div className="flex flex-col  basis-1/2">
                    <ReportChart chartType={'PieChart'} year={year} month={month && month} revenue
                        totalValueCallbk={totalRevHandler}/>
                    {!month && <div className="total-value">
                        Total Revenue {totalRev??0}EGP
                    </div>}
                </div>
                <div className="flex flex-col basis-1/2">
                    <ReportChart chartType={'PieChart'} year={year} month={month && month} sales
                        totalValueCallbk={totalRevHandler}/>
                     {!month && <div className="total-value">
                       Total Sales {totalSales??0}
                    </div>}
                </div>
            </div>
        </div>}
    </div>
}

const ReportChart = ({sales,revenue,year,month,chartType,totalValueCallbk})=>{
    const monthlyOrders = (year)=>{
        const resultedOrders = []
        const salesOrders = ordersData.filter(order=>order.revenue() > 0);
        const annualOrders = salesOrders.filter(order=>order.orderStatus.currentStatus().date.getFullYear() === year);
        const month = {
            0:'Jan',
            1:'Feb',
            2:'Mar',
            3:'Apr',
            4:'May',
            5:'June',
            6:'July',
            7:'Aug',
            8:'Sept',
            9:'Oct',
            10:'Nov',
            11:'Dec'
        }
        for (let i = 0; i < 12 ; i++) {  
            const ordersPerMonth = annualOrders.filter(order=>order.orderStatus.currentStatus().date.getMonth() === i)
            resultedOrders.push({month:month[i],orders:[...ordersPerMonth]})
        }
        return resultedOrders;
    }
    const ordersPerYear = (year)=>monthlyOrders(year).filter(ordersPerMonth=>ordersPerMonth.orders.length > 0)
    
    const annualDataset = (year) =>{
        return ordersPerYear(year).map(monthlyOrders=>(
        {
            sales:monthlyOrders.orders.length,
            revenue:monthlyOrders.orders.reduce((n, o) => n + o.revenue(), 0), 
            month:monthlyOrders.month 
        })
        );
    } 
    (!month && totalValueCallbk(annualDataset(year).reduce((accumulator, dataSet) => {
        accumulator.totalSales = (accumulator.totalSales || 0) + dataSet.sales;
        accumulator.totalRev = (accumulator.totalRev || 0) + dataSet.revenue;
        return accumulator;
      }, {})));
    const monthlyDataset = (month,year) =>{
        const monthIndex = ordersPerYear(year).map(annualOrders=>annualOrders.month).indexOf(month);
        if(monthIndex > -1){
            const ordersPerMonth = ordersPerYear(year)[0].orders;       
            const salesRevFilter = ordersPerMonth.map(order=>{
                const manyOrdersPerDay =  ordersPerMonth.filter(monthlyOrder=>monthlyOrder.orderStatus.currentStatus().date.getDate() === order.orderStatus.currentStatus().date.getDate())
                return {
                    day:order.orderStatus.currentStatus().date.getDate(),
                    sales:manyOrdersPerDay.length,
                    revenue:manyOrdersPerDay.length > 1 ? manyOrdersPerDay.reduce((n, o) => n + o.revenue(), 0) : order.revenue()
                }}
            );
            const undupOrders = salesRevFilter.filter((order,index,self)=>  index === self.findIndex((t) => (t.day === order.day && t.sales === order.sales)));
            return undupOrders.reverse();
        }else{
            return [];
        }
    } 

    const chartOption ={
        chartType:chartType,
        chartData:
            month?
            [ 
                ['Days',(sales && 'Sales') || (revenue && 'Revenue')],
                ...monthlyDataset(month,year).map(data=>
                    (revenue && [`${month} ${data.day}`,data.revenue]) || (sales && [` ${month} ${data.day}`,data.sales]))    
            ]
            :
            [
                ['Month',(sales && 'Sales') || (revenue && 'Revenue')],
                ...annualDataset(year).map(data=>
                        (revenue && [data.month,data.revenue]) || (sales && [data.month,data.sales]))
            ]
    }
    return <div className='annual-sales-report'>
        <div className="year-sales-title">
            <h1 className='text-center font-bold md:text-4xl text-lg text-slate-800 bg-slate-300 rounded-lg py-2 shadow-md mb-2'>
              {month && month + ' - '}  {year} {(sales && 'Sales') || (revenue && 'Revenue')}
            </h1>
            {chartOption.chartData.length > 1 ? <Chart
                chartType={chartOption.chartType}
                data={chartOption.chartData}
                options={ {
                'height': 400,
                'chartArea': {'width': '90%', 'height': '80%'},
                'legend': chartOption.chartType === 'PieChart'? {'position': 'bottom' } : {'position': 'none'}
                }}
                formatters={
                revenue && [{
                        type: "NumberFormat",
                        column: 1,
                        options: {
                          suffix:'EGP',
                          negativeColor: "red",
                          negativeParens: true,
                        },
                      }]
            }
            />:
            <div className="no-data flex justify-center items-center h-[400px] hover:bg-slate-400">
                <h1 className='text-2xl font-bold text-slate-800'>No data available</h1>
            </div>
            }
        </div>
</div>
}