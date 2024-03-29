import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Testimonial from './../about/Testimonial';
import { screen } from '@testing-library/react';
const HomeStyle = styled.div`
  @media screen and (width: 1024px){
  }
  @media screen and (max-width: 1023px){
    .home-courses-container{
      flex-wrap: wrap;
    }
    .home-courses-items{
      width: 100%;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 767px){
    .home-success-students-container{
      flex-wrap: wrap;
    }
    .home-success-students-items{
      width: 100%;
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 500px){
    .home-category{
        grid-template-columns: repeat(2, 1fr)
    }
  }
`
const Home = () => {
    return <HomeStyle className='py-[128px] bg-[#f8f8f8]'>
        <div className=' max-w-[1320px] mx-auto'>
            <div className='text-center pb-[24px]'>
                <h3 className='text-[16px] font-bold leading-[28.8px] text-[var(--primary-color)] mb-[5px]'>OUR COURSES</h3>
                <h1 className='text-[40px] font-medium leading-[56px] mb-[48px]'>Explore Our Popular Online Courses</h1>
            </div>
            <div className= 'home-courses-container flex justify-between pt-[32px] pr-5'>
                <div className='home-courses-items ml-[20px] pt-[30px] pl-[30px] pr-[30px] pb-[40px] bg-white flex flex-col'>
                    <div className='flex mb-[5px]'>
                        <div className='flex-shrink-0 w-[80px] h-[80px] rounded-full bg-[var(--primary-color)] flex justify-center items-center'>
                            <img className='w-[50px] h-[50.4px]' src="https://cdn-icons-png.flaticon.com/512/1839/1839274.png"></img>
                        </div>
                        <h2 className='pl-[20px] text-[26px] font-medium leading-[39px] mb-[5px]'>HTML, CSS, and Javascript for Web Developers</h2>
                    </div>
                    <div className='mt-auto'>
                        <div className='mt-[5px] mb-[5px]'>
                            <div>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                            </div>
                            <div className='flex'>
                                <div className='w-[30px] h-[30px] rounded-full'>
                                    <img className='w-full h-full rounded-full' src="https://preview.colorlib.com/theme/academia/images/author-1.jpg.webp"></img>
                                </div>
                                <span className='pl-[10px] text-[16px] font-medium leading-[28.8px]'> by John Smith</span>
                            </div>
                            <div className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)]'>
                                <h4>50 lectures (190 hrs)</h4>
                            </div>
                        </div>
                        <div>
                            <div className='rounded-lg text-[16px] font-normal leading-[28.8px] mt-[16px] mb-[16px] pt-[8px] pb-[8px] bg-[#f8f8f8]'>
                                <p className='text-center text-[16px] font-medium leading-[28.8px] text-[var(--primary-color)]'>$100 All Course/$15 per month</p>
                            </div>
                            <a className='rounded-lg text-center text-[12px] font-bold leading-[18px] pb-[16px] pt-[16px] bg-[var(--primary-color)] text-white block' href=''>Enroll Now!</a>
                        </div>
                    </div>
                </div>
                <div className='home-courses-items ml-[20px] pt-[30px] pl-[30px] pr-[30px] pb-[40px] bg-white flex flex-col'>
                    <div className='flex mb-[5px]'>
                        <div className='flex-shrink-0 w-[80px] h-[80px] rounded-full bg-[var(--primary-color)] flex justify-center items-center'>
                            <img className='w-[50px] h-[50.4px]' src="https://cdn-icons-png.flaticon.com/512/1839/1839274.png"></img>
                        </div>
                        <h2 className='pl-[20px] text-[26px] font-medium leading-[39px] mb-[5px]'>HTML, CSS, and Javascript for Web Developers</h2>
                    </div>
                    <div className='mt-auto'>
                        <div className='mt-[5px] mb-[5px]'>
                            <div>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                            </div>
                            <div className='flex'>
                                <div className='w-[30px] h-[30px] rounded-full'>
                                    <img className='w-full h-full rounded-full' src="https://preview.colorlib.com/theme/academia/images/author-1.jpg.webp"></img>
                                </div>
                                <span className='pl-[10px] text-[16px] font-medium leading-[28.8px]'> by John Smith</span>
                            </div>
                            <div className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)]'>
                                <h4>50 lectures (190 hrs)</h4>
                            </div>
                        </div>
                        <div>
                            <div className='rounded-lg text-[16px] font-normal leading-[28.8px] mt-[16px] mb-[16px] pt-[8px] pb-[8px] bg-[#f8f8f8]'>
                                <p className='text-center text-[16px] font-medium leading-[28.8px] text-[var(--primary-color)]'>$100 All Course/$15 per month</p>
                            </div>
                            <a className='rounded-lg text-center text-[12px] font-bold leading-[18px] pb-[16px] pt-[16px] bg-[var(--primary-color)] text-white block' href=''>Enroll Now!</a>
                        </div>
                    </div>
                </div>
                <div className='home-courses-items ml-[20px] pt-[30px] pl-[30px] pr-[30px] pb-[40px] bg-white flex flex-col'>
                    <div className='flex mb-[5px]'>
                        <div className='flex-shrink-0 w-[80px] h-[80px] rounded-full bg-[var(--primary-color)] flex justify-center items-center'>
                            <img className='w-[50px] h-[50.4px]' src="https://cdn-icons-png.flaticon.com/512/1839/1839274.png"></img>
                        </div>
                        <h2 className='pl-[20px] text-[26px] font-medium leading-[39px] mb-[5px]'>HTML, CSS, and Javascript for Web Developers</h2>
                    </div>
                    <div className='mt-auto'>
                        <div className='mt-[5px] mb-[5px]'>
                            <div>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                                <FontAwesomeIcon className='text-[var(--primary-color)]' icon = {faStar}/>
                            </div>
                            <div className='flex'>
                                <div className='w-[30px] h-[30px] rounded-full'>
                                    <img className='w-full h-full rounded-full' src="https://preview.colorlib.com/theme/academia/images/author-1.jpg.webp"></img>
                                </div>
                                <span className='pl-[10px] text-[16px] font-medium leading-[28.8px]'> by John Smith</span>
                            </div>
                            <div className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)]'>
                                <h4>50 lectures (190 hrs)</h4>
                            </div>
                        </div>
                        <div>
                            <div className='rounded-lg text-[16px] font-normal leading-[28.8px] mt-[16px] mb-[16px] pt-[8px] pb-[8px] bg-[#f8f8f8]'>
                                <p className='text-center text-[16px] font-medium leading-[28.8px] text-[var(--primary-color)]'>$100 All Course/$15 per month</p>
                            </div>
                            <a className='rounded-lg text-center text-[12px] font-bold leading-[18px] pb-[16px] pt-[16px] bg-[var(--primary-color)] text-white block' href=''>Enroll Now!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className=' max-w-[1320px] mx-auto pt-[128px] pb-[128px]'>
            <div className='text-[16px] font-normal leading-[28.8px] pl-[12px] pr-[12px] mb-[48px] text-center'>
                <h3 className='text-[16px] font-bold leading-[28.8px] mb-[5px] text-[var(--primary-color)]'>COURSES</h3>
                <h1 className='text-[40px] font-medium leading-[56px] mb-[24px]'>Browse Our Online Courses</h1>
            </div>
            <div className='home-category ml-[-12px] mr-[-12px] grid grid-cols-4 gap-[24px]'>
                <div className='pl-[12px] pr-[12px] flex flex-col justify-center items-center bg-white pt-[20px] pb-[20px]'>
                    <div className='w-[70px] h-[84px] mb-[8px]'>
                        <img className='w-[70px] h-[70.4px]' src="https://cdn-icons-png.flaticon.com/512/5961/5961777.png"></img>
                    </div>
                    <div className='text-center flex flex-col'>
                        <h2 className='text-[20px] font-semibold leading-[30px] mb-[2px]'>UI/UX Design Courses</h2>
                    </div>
                        <h4 className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)] mt-auto pt-[5px] pb-[5px] pl-[5px] pr-[5px] bg-white'>25 Courses</h4>
                </div>
                <div className='pl-[12px] pr-[12px] flex flex-col justify-center items-center bg-white pt-[20px] pb-[20px]'>
                    <div className='w-[70px] h-[84px] mb-[8px]'>
                        <img className='w-[70px] h-[70.4px]' src="https://cdn-icons-png.flaticon.com/512/3199/3199863.png"></img>
                    </div>
                    <div className='text-center flex flex-col'>    
                        <h2 className='text-[20px] font-semibold leading-[30px] mb-[2px]'>Art & Design</h2>
                    </div>
                        <h4 className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)] mt-auto pt-[5px] pb-[5px] pl-[5px] pr-[5px] bg-white'>25 Courses</h4>
                </div>
                <div className='pl-[12px] pr-[12px] flex flex-col justify-center items-center bg-white pt-[20px] pb-[20px]'>
                    <div className='w-[70px] h-[84px] mb-[8px]'>
                        <img className='w-[70px] h-[70.4px]' src="https://cdn-icons-png.flaticon.com/512/3044/3044120.png"></img>
                    </div>
                    <div className='text-center flex flex-col'>
                        <h2 className='text-[20px] font-semibold leading-[30px] mb-[2px]'>Computer Science</h2>
                    </div>
                        <h4 className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)] mt-auto pt-[5px] pb-[5px] pl-[5px] pr-[5px] bg-white'>10 Courses</h4>
                </div>
                <div className='pl-[12px] pr-[12px] flex flex-col justify-center items-center bg-white pt-[20px] pb-[20px]'>
                    <div className='w-[70px] h-[84px] mb-[8px]'>
                        <img className='w-[70px] h-[70.4px]' src="https://cdn-icons-png.flaticon.com/512/2920/2920323.png"></img>
                    </div>
                    <div className='text-center flex flex-col'>
                        <h2 className='text-[20px] font-semibold leading-[30px] mb-[2px]'>History & Archeologic</h2>
                    </div>
                        <h4 className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)] mt-auto pt-[5px] pb-[5px] pl-[5px] pr-[5px] bg-white'>25 Courses</h4>
                </div>
                <div className='pl-[12px] pr-[12px] flex flex-col justify-center items-center bg-white pt-[20px] pb-[20px]'>
                    <div className='w-[70px] h-[84px] mb-[8px]'>
                        <img className='w-[70px] h-[70.4px]' src="https://cdn-icons-png.flaticon.com/512/2704/2704969.png"></img>
                    </div>
                    <div className='text-center flex flex-col'>
                        <h2 className='text-[20px] font-semibold leading-[30px] mb-[2px]'>Software Engineering</h2>
                    </div>
                        <h4 className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)] mt-auto pt-[5px] pb-[5px] pl-[5px] pr-[5px] bg-white'>25 Courses</h4>
                </div>
                <div className='pl-[12px] pr-[12px] flex flex-col justify-center items-center bg-white pt-[20px] pb-[20px]'>
                    <div className='w-[70px] h-[84px] mb-[8px]'>
                        <img className='w-[70px] h-[70.4px]' src="https://cdn-icons-png.flaticon.com/512/1119/1119005.png"></img>
                    </div>
                    <div className='text-center flex flex-col'>
                        <h2 className='text-[20px] font-semibold leading-[30px] mb-[2px]'>Information Software</h2>
                    </div>
                        <h4 className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)] mt-auto pt-[5px] pb-[5px] pl-[5px] pr-[5px] bg-white'>25 Courses</h4>
                </div>
                <div className='pl-[12px] pr-[12px] flex flex-col justify-center items-center bg-white pt-[20px] pb-[20px]'>
                    <div className='w-[70px] h-[84px] mb-[8px]'>
                        <img className='w-[70px] h-[70.4px]' src="https://cdn-icons-png.flaticon.com/512/3043/3043888.png"></img>
                    </div>
                    <div className='text-center flex flex-col'>
                        <h2 className='text-[20px] font-semibold leading-[30px] mb-[2px]'>Health & Fitness</h2>
                    </div>
                        <h4 className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)] mt-auto pt-[5px] pb-[5px] pl-[5px] pr-[5px] bg-white'>25 Courses</h4>
                </div>
                <div className='pl-[12px] pr-[12px] flex flex-col justify-center items-center bg-white pt-[20px] pb-[20px]'>
                    <div className='w-[70px] h-[84px] mb-[8px]'>
                        <img className='w-[70px] h-[70.4px]' src="https://cdn-icons-png.flaticon.com/512/1997/1997928.png"></img>
                    </div>
                    <div className='text-center flex flex-col'>
                        <h2 className='text-[20px] font-semibold leading-[30px] mb-[2px]'>Marketing</h2>
                    </div>
                        <h4 className='text-[13px] font-medium leading-[23.4px] text-[var(--primary-color)] mt-auto pt-[5px] pb-[5px] pl-[5px] pr-[5px] bg-white'>15 Courses</h4>
                </div>
            </div>
        </div>
        <div className='max-w-[1320px] mx-auto'>
            <Testimonial/>
        </div>
    </HomeStyle>;                      
};
export default Home;

// End project