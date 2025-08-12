import { useState } from "react"
import Links from "./UserLinks";
import Forms from "./FormDashboard";
import Profile from "./Profile";
import Referral from "./Referral";



const Navbar = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const handleSet = (key) =>{
        setActiveTab(key)
    }
  return (
    <>
    {activeTab=="dashboard" && <Links/>}
    {activeTab=="forms" && <Forms/>}
    {activeTab=="invite" && <Referral/>}
    {activeTab=="profile" && <Profile/>}
    <div className=' fixed  bottom-0 left-0 right-0 flex justify-center w-full text-gray-900 z-0  '>
        <div className='grid grid-cols-4 backdrop-blur-3xl border-t-2 border-gray-100 p-2 w-2xl'>

             <div className='flex flex-col justify-stretch gap-0.25 items-center ' onClick={() => handleSet('dashboard')}>
            <div className= {` w-full h-1.5 rounded   ${activeTab === "dashboard" ? "bg-emerald-700 animate-bounce transition-all origin-top duration-1000" : ""}`}></div>
            <div className={`w-full text-center  py-2 ${activeTab === "dashboard"?'bg-linear-to-b from-[-400%] from-emerald-700  to-transparent to-100% transition-all origin-top duration-1000 opacity-100':'opacity-50'}`}>
                <div className='flex justify-center items-center flex-col'>
                   <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#303030"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                    <div className="font-stretch-105%">links</div>
                </div>
            </div>
        </div>

        <div className='flex flex-col justify-stretch gap-0.25 items-center ' onClick={() => handleSet('forms')}>
            <div className= {` w-full h-1.5 rounded ${activeTab === "forms" ? "bg-emerald-700 animate-bounce transition-all origin-top duration-1000" : ""}`}></div>
            <div className={`w-full text-center  py-2 ${activeTab === "forms"?'bg-linear-to-b from-[-400%] from-emerald-700  to-transparent to-100% transition-all origin-top duration-1000':'opacity-50'}`}>
                <div className='flex justify-center items-center flex-col'>
                   <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#303030"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z"/></svg>
                    <div className="font-stretch-105%">Forms</div>
                </div>
            </div>
        </div>

        <div  className='flex flex-col justify-stretch gap-0.25 items-center ' onClick={() => handleSet('invite')}>
            <div className= {` w-full h-1.5 rounded ${activeTab === "invite" ? "hover:p-1.5 bg-emerald-700 animate-bounce transition-all origin-top duration-1000" : ""}`}></div>
            <div className={`w-full text-center  py-2 ${activeTab === "invite"?'bg-linear-to-b from-[-400%] from-emerald-700  to-transparent to-100% transition-all origin-top duration-1000':'opacity-50'}`}>
                <div className='flex justify-center items-center flex-col'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#303030"><path d="M40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92H40Zm440-160q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z"/></svg>
                    <div className="font-stretch-105%">Invite</div>
                </div>
            </div>
        </div>

        <div  className='flex flex-col justify-stretch gap-0.25 items-center ' onClick={() => handleSet('profile')}>
            <div className= {` w-full h-1.5 rounded ${activeTab === "profile" ? "bg-emerald-700 animate-bounce transition-all origin-top duration-1000" : ""}`}></div>
            <div className={`w-full text-center  py-2 ${activeTab === "profile"?'bg-linear-to-b from-[-400%] from-emerald-700  to-transparent to-100% transition-all origin-top duration-1000 ':'opacity-50'}`}>
                <div className='flex items-center justify-center flex-col'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#303030"><path d="M560-440h200v-80H560v80Zm0-120h200v-80H560v80ZM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22Zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg>
                    <div className="font-stretch-105%">Profile</div>
                </div>
            </div>
        </div>

        </div>
    </div>
    </>
  )
}

export default Navbar