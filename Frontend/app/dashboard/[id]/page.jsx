"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Card, Switch, Accordion, AccordionItem } from '@nextui-org/react';


const DashboardInfo = ({ dashboardName, deviceId ,deviceHealth, deviceConnection }) => {
  return (
    <>
        <div className="mx-auto sm:w-80 md:w-[500px] text-white rounded-lg bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 shadow-xl flex flex-col gap-1 p-4 md:pl-6 mb-6 font-sans">
          <div className='text-xs'>
            <span className='font-bold'>Dashboard Name:</span> <span>{dashboardName}</span>
          </div>
          <div className='text-xs'>
            <span className='font-bold'>Device ID:</span> <span>{deviceId}</span>
          </div>
          <div className='text-xs'>
            <span className='font-bold'>Device Health:</span> <span className='text-green-300'>{deviceHealth}</span>
          </div>
          <div className='text-xs'>
            <span className='font-bold'>Device Connection:</span> <span className='text-green-300'>{deviceConnection}</span>
          </div>
         
        </div>
 
    </>
  );
};


// CircularProgressBar component
const CircularProgressBar = ({ percentage }) => {
  const radius = 65;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let strokeColor;
  if (percentage <= 40) {
    strokeColor = '#f87171'; // red
  } else if (percentage <= 70) {
    strokeColor = '#4ade80'; // green
  } else {
    strokeColor = '#facc15'; // yellow
  }

  return (
    <div className="relative">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="gray"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-semibold text-lg">{percentage}%</span>
      </div>
    </div>
  );
};

// VisualizationCard component
const VisualizationCard = ({ title, percentage }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80  w-full max-w-3xl rounded-lg shadow-lg flex flex-col items-center ">
      <CircularProgressBar percentage={percentage} />
      <h2 className="text-sm font-semibold text-white pb-3">{title}</h2>
    </div>
  );
};

// TemperatureCard component
const TemperatureCard = ({ temperature }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 shadow-xl w-full max-w-3xl rounded-lg flex flex-col items-center justify-center py-4">
      <div className="text-white text-lg font-bold">{temperature}°C</div>
      <h2 className="text-sm font-semibold text-white pb-2">Temperature</h2>
    </div>
  );
};

// WindSpeedCard component
const WindSpeedCard = ({ windSpeed }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 w-full max-w-3xl rounded-lg shadow-lg flex flex-col items-center justify-center py-4">
      <div className="text-white text-lg font-bold">{windSpeed} km/h</div>
      <h2 className="text-sm font-semibold text-white pb-2">Wind Speed</h2>
    </div>
  );
};

// AiAnalyzeCard component
const defaultContent =
  "When soil moisture is below optimal, irrigate your crops, monitor moisture levels, use mulch to retain water, optimize irrigation schedules, and check for system leaks..";

  const AiAnalyzeCard = ({ title, percentage, alertMessage }) => {
    return (
      <>
        {percentage <= 40 && (
          <div className="w-full max-w-md sm:w-80 md:w-[450px] text-white text-sm rounded-lg shadow-xl">
            <div className="text-center font-bold border border-gray-100 drop-shadow-md rounded-t-lg p-2 text-md bg-default-200/35 backdrop-blur-xl backdrop-saturate-200">
              {title}
            </div>
            <div className="border border-t-0 border-gray-100 rounded-b-lg bg-white/10 ">
              <Accordion
                bordered
                className="w-full "
              >
                <AccordionItem
                  
                  title={<div className='text-center w-64'><span className="text-red-300 text-center text-sm -mr-7 md:-mr-44 ">{alertMessage}</span></div>}
                >
                  <p className="p-4">{defaultContent}</p>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </>
    );
  };
  

// UtilizationCard component
const UtilizationCard = ({ title }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <Card className="w-full max-w-3xl relative border border-gray-100 bg-white/10  rounded-lg shadow-lg py-7 px-5 mb-4 flex flex-row justify-between items-center">
  <div>
    <h2 className="text-white text-md font-semibold">{title}</h2>
  </div>
  {/* <div className="absolute top-0 left-[200px] md:left-[375px]">
    {isOn ? (
      <span><span className='text-tiny text-white'>System is </span><span className="text-green-300 text-tiny">ON</span></span>
    ) : (
      <span><span className='text-tiny text-white'>System is </span><span className="text-red-300 text-tiny">OFF</span></span>
    )}
  </div> */}
  <Switch 
  checked={isOn} 
  onChange={handleToggle} 
  color={isOn ? 'success' : 'error'} 
  // startContent={<span className='text-[2px]'>ON</span>}
  // endContent={<span className='text-xs'>OFF</span>}
  />
</Card>

  );
};

// Profile component
const Profile = () => {
  const router = useRouter(); // Initialize useRouter

  const handleBackClick = () => {
    router.push('/dashboard'); 
  };
  return (
    <div className="min-h-screen flex flex-col justify-start h-screen	overflow-y-scroll">
      <div className="mx-auto w-full max-w-3xl p-6 pt-2">
        <div className="relative">
          <div onClick={handleBackClick} className="absolute cursor-pointer text-white hover:bg-white/10 hover:rounded p-1 pl-0 pr-2 left-0 md:left-[105px] left-0 md:left-[105px] flex items-center justify-center top-[3px] md:top-[2px]">
            <i className="bx bx-chevron-left text-xl"></i>
            <p className="text-sm md:text-lg -ml-1">Back</p>
          </div>
          <h1 className="text-center text-md md:text-xl text-white mt-2 mb-6">
            Ground-1 / <span className="text-white/50">Device-1</span>
          </h1>
        </div>

        <DashboardInfo
        dashboardName='Ground-1'
        deviceId='Device-1'
        deviceHealth='Ok'
        deviceConnection='Connected'
        />

        <div className="mx-auto sm:w-80 md:w-[500px] mb-6">
          <h1 className="text-white/90 mb-2 font-sans font-bold">Visualization Data:</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <VisualizationCard title="Soil Moisture" percentage={30} />
            <VisualizationCard title="Water Level" percentage={60} />
            <VisualizationCard title="Enhanced Yield" percentage={70} />
            <VisualizationCard title="Humidity" percentage={90} />
            <TemperatureCard temperature={22} />
            <WindSpeedCard windSpeed={15} />
          </div>
        </div>

        <div className="mx-auto sm:w-80 md:w-[500px] mb-6">
          <h1 className="text-white/90 mb-2 font-sans font-bold">Ai Analyze Suggestions:</h1>
          <div className="bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 p-4 rounded-lg shadow-xl flex flex-col items-center space-y-4">
            <AiAnalyzeCard
              title="Soil Moisture Analysis"
              percentage={30}
              alertMessage="Soil Moisture is below optimal level"
            />
            <AiAnalyzeCard
              title="Humidity Analysis"
              percentage={30}
              alertMessage="Humidity is high optimal level"
            />
          </div>
        </div>

        <div className="mx-auto sm:w-80 md:w-[500px] mb-32 ">
          <h1 className="text-white/90 mb-2 font-sans font-bold">System Utilization:</h1>
          <div className="w-full max-w-3xl bg-gradient-to-r from-blue-500/40 to-purple-500/20 backdrop-blur-xl border border-blue-400/80 pt-4 px-4 rounded-lg shadow-xl flex flex-col items-center">
            <UtilizationCard title="AI Water System" />
            <UtilizationCard title="AI Lights System" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
