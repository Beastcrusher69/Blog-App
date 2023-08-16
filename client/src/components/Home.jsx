import { useEffect, useState } from 'react';
import {Swiper , SwiperSlide } from "swiper/react";
import {EffectCoverflow , Pagination , Navigation, Autoplay} from "swiper/modules";
import '../styles/home.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Home() {

  useEffect(()=>{
    let header = document.getElementById("header");
    let info = document.getElementById("info");

      document.addEventListener("scroll",()=>{

        console.log(header.classList.contains('top'));

        if((window.pageYOffset != 0) && !header.classList.contains('middle')){
          header.classList.add("middle");
          header.classList.remove("top");

          info.classList.add('info-shadow');

          
        }
        else if(window.pageYOffset == 0 && !header.classList.contains('top')){
          header.classList.add("top");
          header.classList.remove("middle")

          info.classList.remove('info-shadow');

        }
      })
  })

  return (
    <>
      <header id='header' className='top'>
        <span id="header-blogspot" className='blogspot'>
        blogspot
        </span>
      </header>

      <div id="signup-login-header">
          <form id="signup-login-wrap">
                <button className="signup-login signup" >SignUp</button>
                <button className="signup-login login" >Login</button>
          </form>
      </div>
    <div id="home-bg-image-container">

      <div id="home-dark-filter">
      <div id="home-trans-container">
              <div id="home-blogspot-wrap">
                <h1 id="h1-blogspot" className="blogspot">blogspot</h1>
                <h2 id="sub-title">read, write and explore</h2>
              </div>

              <div id="swiper-div">

              

              </div>
             
      </div>
      </div>
    </div>

    <section id="info">
      <div className="block" id="block-1">
        <div className = "text">
          <h2 className='home-h2'>Share your thoughts</h2>
          <p className="home-p"> Just reading blogs can be boring. Express your thoughts and interact with other readers through comments. You can also leave a like to let the creator know about their amazing job. You can also share the blog with your friends and family.</p>
        </div>
        <div className='image'>
           <img className="info-image" src="../../public/comment.jpg"></img>
        </div>
      </div>

      <div className="block" id="block-2">
        <div className = "text">
          <h2 className='home-h2'>Connect to your favourite creators</h2>
          <p className="home-p">Ever read something so interesting that you wished that you could have more of it. Well, by following the creator you can make sure that you don’t miss any of their updates. </p>
        </div>
        <div className='image'>
          <img className="info-image" src="../public/follow.png"></img>
        </div>
      </div>

      <div className="block" id="block-3">
        <div className = "text">
          <h2 className='home-h2'>Collect  your favourites</h2>
          <p className="home-p"> 
you can access all the liked blogs at one place  </p>
        </div>
        <div className='image'>
          <img className="info-image" src="../public/like.jpg"></img>
        </div>
      </div>

      <Swiper 
              modules={[Navigation, Pagination, EffectCoverflow ,Autoplay]}
              effect='coverflow'
              // spaceBetween={100}
              centeredSlides={true}
              grabCursor={true}
              loop={ true }
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 200, 
                modifier: 1,
                // slideShadows: true,
              }}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}>
                
        <SwiperSlide style={{"background-image" : "url(../public/img-1.webp)"}}>
          {/* <img className="swiper-image" src={"../public/img-1.webp"}></img> */}
        </SwiperSlide>
        <SwiperSlide style={{"background-image" : "url(../public/img-2.jpg)"}}>
        {/* <img className="swiper-image" src={"../public/img-2.jpg"}></img> */}
        </SwiperSlide>
        <SwiperSlide style={{"background-image" : "url(../public/img-3.jpg)"}}>
        {/* <img className="swiper-image" src={"../public/img-3.jpg"}></img> */}
        </SwiperSlide>
        <SwiperSlide style={{"background-image" : "url(../public/img-4.jpg)"}}>
        {/* <img className="swiper-image" src={"../public/img-4.jpg"}></img> */}
        </SwiperSlide>

      </Swiper>
       </section>
    </>
  )
}

export default Home