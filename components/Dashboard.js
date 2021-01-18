import React, { useRef, useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import MultiRef from 'react-multi-ref';
import { filterYears, filterLaunching, filterLanding } from './inputData.js';
import axios from 'axios';

import './styles.css';


const Dashboard = (props) => {
    const { router } = props;
    const yearsRef = new MultiRef();
    const launchingRef = new MultiRef();
    const landingRef = new MultiRef();
    const [launch_year, setLaunchYear] = useState();
    const [launch_success, setLaunchSuccess] = useState('');
    const [land_success, setLandSuccess] = useState('');
    const [responseData, setResponseData] = useState([]);

    useEffect(function () {
        handleApiCall({});

    }, []);

    const handleApiCall = param => {
        
        axios({
            "method": "GET",
            "url": "https://api.spaceXdata.com/v3/launches?limit=100",
            "headers": {
                "content-type": "application/octet-stream",
            },
            "params": param
        })
            .then((response) => {
                console.log('response.data in function', response.data);
                setResponseData(response.data);
            })
            .catch((error) => {
                console.log('response.error', error);
            })
    }

    const handlLaunchYearData = index => {
        const filterParam = {
            'launch_success': launch_success,
            'land_success': land_success
        }
        if (yearsRef.map.get(index).value == launch_year) {
            router.replace('/home/dashboard');
            yearsRef.map.get(index).style.background = '#c5e09b';
            setLaunchYear('');
        }
        else {
            // router.push('/?button-' + index, null, { shallow: true })
            router.replace('/home/dashboard/', 'button-' + index);
            filterYears.forEach((val, i) => yearsRef.map.get(i).style.background = '#c5e09b');
            yearsRef.map.get(index).style.background = '#7cba01';
            filterParam.launch_year = yearsRef.map.get(index).value;
            setLaunchYear(yearsRef.map.get(index).value);
        }
        handleApiCall(filterParam);
    }

    const handlLaunchSuccessData = index => {
        const filterParam = {
            'launch_year': launch_year,
            'land_success': land_success
        }
        if (launchingRef.map.get(index).value == launch_success) {
            router.replace('/home/dashboard');
            launchingRef.map.get(index).style.background = '#c5e09b';
            setLaunchSuccess('');
        }
        else {
            router.replace('/home/dashboard/', 'button-' + index);
            filterLaunching.forEach((val, i) => launchingRef.map.get(i).style.background = '#c5e09b');
            launchingRef.map.get(index).style.background = '#7cba01';
            filterParam.launch_success = launchingRef.map.get(index).value.toLowerCase();
            setLaunchSuccess(launchingRef.map.get(index).value.toLowerCase());
        }
        handleApiCall(filterParam);
    }

    const handlLandingSuccessData = index => {
        const filterParam = {
            'launch_year': launch_year,
            'launch_success': launch_success
        }
        if (landingRef.map.get(index).value == land_success) {
            router.replace('/home/dashboard');
            landingRef.map.get(index).style.background = '#c5e09b';
            setLandSuccess('');
        }
        else {
            router.replace('/home/dashboard/', 'button-' + index);
            filterLanding.forEach((val, i) => landingRef.map.get(i).style.background = '#c5e09b');
            landingRef.map.get(index).style.background = '#7cba01';
            filterParam.land_success = landingRef.map.get(index).value.toLowerCase();
            setLandSuccess(landingRef.map.get(index).value.toLowerCase());
        }
        handleApiCall(filterParam);
    }

    return (

        <div className='container'>
            <h2>SpaceX Launch Programs</h2>
            <div className='containerBox'>
                <div className='containerLeftSection'>
                    <h3>Filters</h3>
                    <div className='launchYearBox'>
                        <h4>Launch Year</h4>
                        {filterYears.map(function (elem, index) {
                            return (
                                <div key={elem}>
                                    <button className='defaultColor' ref={yearsRef.ref(index)} value={elem} onClick={() => handlLaunchYearData(index)}>{elem}</button><br></br>
                                </div>
                            )
                        })}
                    </div>
                    <div className='successBox'>
                        <h4>Successful Launch</h4>
                        <div className='filterBtnDiv'>
                            {filterLaunching.map(function (elem, index) {
                                return (
                                    <div key={index}>
                                        <button className='defaultColor' ref={launchingRef.ref(index)} value={elem} onClick={() => handlLaunchSuccessData(index)}>{elem}</button><br></br>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div className='successBox'>
                        <h4>Successful Landing</h4>
                        <div className='filterBtnDiv'>
                            {filterLanding.map(function (elem, index) {
                                return (
                                    <div key={index}>
                                        <button className='defaultColor' ref={landingRef.ref(index)} value={elem} onClick={() => handlLandingSuccessData(index)}>{elem}</button><br></br>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='containerRightSection'>
                    {responseData.map(function (elem, index) {
                        return (
                            <div className='launchDetailsCard' key={index}>
                             <div className='launchImage' > <img src={elem.links.mission_patch_small} /></div>
                                <div className='launchDetails'>
                                    <div className='blueText'>{elem.mission_name} #{elem.flight_number}</div>
                                    <div><span>Mission Ids: </span><span className='blueText'>{elem.mission_id}</span> </div>
                                    <div><span>Launch Year: </span><span className='blueText'>{elem.launch_year} </span></div>
                                    <div><span>Successful Launch: </span><span className='blueText'>{elem.launch_success == null ? '' : elem.launch_success.toString()}</span> </div>
                                    <div><span>Successful Landing: </span><span className='blueText'>{elem.rocket.first_stage.cores[0].land_success == null ? '' : elem.rocket.first_stage.cores[0].land_success.toString()} </span></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default withRouter(Dashboard);
