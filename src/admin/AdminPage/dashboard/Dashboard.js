import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import CardWithIcon from "./CardWithIcon";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DollarIcon from '@material-ui/icons/AttachMoney';
import userIcon from '@material-ui/icons/PersonAdd';
import {useVersion,useDataProvider } from 'react-admin';
import { subDays } from 'date-fns';
import {useState,useEffect,useCallback} from 'react';


const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

export default function Dashboard(){
    const [state, setState] = useState({revenue:"",nbOrders:"",nbReceivedOrders:"",nbUsers:""});
    const version = useVersion();
    const dataProvider = useDataProvider();

    const fetchOrdersMonth = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);
        const {data:recentOrders} = await dataProvider.getList(
            'orders',
            {
                filter: { date: aMonthAgo.toISOString() },
                sort: { field: 'Date', order: 'DESC' },
                pagination: { page: 1, perPage: 50 },
            }
        );
        const aggregations = recentOrders
            .filter(order => order.status !== 'cancelled')
            .reduce((stats, order) => {
                    if (order.status !== 'cancelled') {
                        stats.revenue += Number((order.totalOrder).replace("₪",""))
                        stats.nbOrders++;
                    }
                    return stats;
                }, {   revenue: 0,nbOrders: 0 }
            );
        setState(state => ({
            ...state,
            recentOrders,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'ILS',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbOrders: aggregations.nbOrders,
        }));
    }, [dataProvider]);

    const fetchOrdersReceived = useCallback(async () => {
        const {data:receivedOrders} = await dataProvider.getList(
            'orders',
            {
                filter: { status: "Received" },
                sort: { },
                pagination: { page: 1, perPage: 50 },
            }
        );
        const nbReceivedOrders = receivedOrders.reduce((num, order) => {return num+1;},0);
        setState(state => ({
            ...state,
            nbReceivedOrders: nbReceivedOrders,
        }));
    }, [dataProvider]);

    const fetchUsers = useCallback(async () => {
        const {data:users} = await dataProvider.getList(
            'users',
            {
                filter: { active: "true" },
                sort: { },
                pagination: { page: 1, perPage: 50 },
            }
        );
        const nbUsers = users.reduce((num, user) => {return num+1;},0);
        setState(state => ({
            ...state,
            nbUsers: nbUsers,
        }));
    }, [dataProvider]);



    useEffect(() => {
        fetchOrdersMonth();
        fetchOrdersReceived();//the pending orders
        fetchUsers();//all user that active
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            <h2>summary from {subDays(new Date(), 30).getDate()+"/"+(subDays(new Date(), 30).getMonth()+1)+"/"+subDays(new Date(), 30).getFullYear()}</h2>
            <br/>
            <br/>
            <div style={{display: 'flex', flexDirection: 'row' }}>
                {/* number of new orders */}
                <CardWithIcon
                    to="/orders"
                    icon={ShoppingCartIcon}
                    title={"Orders"}
                    subtitle={state.nbOrders}
                />
                <Spacer/>
                {/* sum of orders */}
                <CardWithIcon
                    to="/orders"
                    icon={DollarIcon}
                    title={"Revenue"}
                    subtitle={state.revenue}
                />
                <Spacer/>
                {/* num of order with status received */}
                <CardWithIcon
                    to="/orders"
                    icon={ShoppingCartIcon}
                    title={"Received Orders"}
                    subtitle={""+state.nbReceivedOrders}
                />
                <Spacer/>
                {/* number of users */}
                <CardWithIcon
                    to="/users"
                    icon={userIcon}
                    title={"Users"}
                    subtitle={state.nbUsers}
                />

                {/* <Card>
                    <CardHeader title="Welcome to the administration" />
                    <CardContent>Lorem ipsum sic dolor amet...</CardContent>
                </Card> */}
            </div>
        </div>
        
        
    );
}