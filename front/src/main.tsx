import React from 'react'
import ReactDOM from 'react-dom/client'

import {Reset} from "styled-reset";

import "../src/assets/css/common/common.css";
import "../src/assets/css/common/topbar.css";
import "../src/assets/css/common/fontStyle.css"
import "../src/assets/css/common/reset.css"
import "../src/assets/css/common/selector.css"
import "../src/assets/css/common/checkBox.css"
import "../src/assets/css/common/tooltip.css"

import "../src/assets/css/modal/lastEvent.css"
import "../src/assets/css/modal/datepicker.css"
import 'react-datepicker/dist/react-datepicker.css'

import "../src/assets/css/main/dashboard.css"
import "../src/assets/css/main/search.css"
import "../src/assets/css/main/dashboardEvent.css"
import "../src/assets/css/main/dashboardCctv.css"
import "../src/assets/css/main/viewer.css"
import "../src/assets/css/main/cctvPlayer.css"
import "../src/assets/css/main/gis.css"
import "../src/assets/css/main/dashboardLegend.css"
import "../src/assets/css/main/tree.css"
import "../src/assets/css/main/mapMarker.css"
import "../src/assets/css/main/facPopup.css"
import "leaflet-geometryutil";

import "../src/assets/css/stat/modal.css";
import "../src/assets/css/stat/statistics.css";
import "../src/assets/css/stat/datePicker.css";

import "../src/assets/css/modal/popPlayer.css"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';


import Root from "./page/component/root";


const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Reset/>
        <Root/>
    </QueryClientProvider>
)
