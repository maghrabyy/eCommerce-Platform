import maghhPhoto from '../../../assets/maghh.jpg';
import { FaHtml5,FaCss3,FaBootstrap,FaReact } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { SiRedux } from "react-icons/si";
import { RiFlutterFill } from "react-icons/ri";
import { SiDart } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FaEarthAfrica } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';

export const AboutPage = ()=>{
    return <div className="flex gap-2 items-center justify-center h-full ">
        <div className="dev-info bg-slate-300 rounded-md px-4 pt-4 w-full bg-[url(assets/abstractpattern.jpg)] bg-cover h-full ">
            <div className="dev-photo flex justify-center py-2">
                <img src={maghhPhoto} className='w-36 rounded-full h-36' alt="maghrabyy" />
            </div>
            <div className="dev-name text-2xl sm:text-3xl text-slate-900 font-bold font-righteous text-center uppercase">Mahmoud Elmaghraby</div>
            <div className="dev-title text-md sm:text-lg text-slate-700 font-semibold text-center font-righteous">Software Engineer / <span className='text-green-700'>MaghTech</span> Founder</div>
            <div className="skills-contact-container bg-white bg-opacity-60 backdrop-blur-sm py-3 px-4 rounded-md mt-2">
                <div className="dev-skills">
                    <div className="section-title font-bold text-2xl text-slate-800">Skills</div>
                    <div className="skills-list text-4xl sm:text-5xl grid grid-cols-6 sm:grid-cols-8 md:grid-cols-11 lg:grid-cols-12 pt-3 gap-3 py-2">
                        <FaHtml5 className="text-[#e34f26]"/>
                        <FaCss3 className="text-[#002561]"/>
                        <FaBootstrap className="text-[#7010EF]"/>
                        <SiTailwindcss className="text-[#36B7F0]"/>
                        <IoLogoJavascript className="text-[#f7df1e]"/>
                        <SiTypescript className="text-[#3178c6]"/>
                        <FaReact className="text-[#00d8ff]"/>
                        <SiRedux className="text-[#764ABC]"/>
                        <RiFlutterFill className="text-[#64CBF8]"/>
                        <SiDart className="text-[#04599C]"/>
                        <IoLogoFirebase className="text-[#FFA917]"/>
                    </div>
                </div>
                <div className="dev-contact">
                    <div className="section-title font-bold text-2xl text-slate-800">Contact</div>
                    <div className="contact-list flex gap-2 ms-2 pt-3 text-blue-900 text-xl">
                        <a href="https://github.com/maghrabyy" target="_blank" rel="noreferrer">
                            <FaGithub className="cursor-pointer hover:text-gray-700"/>
                        </a>
                        <a href="https://www.linkedin.com/in/maghrabyy/" target="_blank" rel="noreferrer">
                            <FaLinkedin className="cursor-pointer hover:text-gray-700"/>
                        </a>
                        <a href="https://maghrabyy.netlify.app/" target="_blank" rel="noreferrer">
                            <FaEarthAfrica className="cursor-pointer hover:text-gray-700"/>
                        </a>
                        <Tooltip title='mahmoud.elmaghraby11@gmail.com' arrow>
                            <div className="email" onClick={() => {navigator.clipboard.writeText('mahmoud.elmaghraby11@gmail.com')}}>
                                <MdEmail className="cursor-pointer hover:text-gray-700"/>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
}