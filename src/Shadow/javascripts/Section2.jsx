import React from 'react'
import decor from '../images/decorator.png'
 import ellipse from '../images/ellipse.png'
 import shield from '../images/icon.png'
 import always from '../images/icon2.png'
 import smile from '../images/smile.png'
import '../css/section2.css'
import Section2subsec2 from './Section2subsec2'
import Section2subsec1 from './Section2subsec1'
import OurServices from './OurServices'
import BecomeAgent from './BecomeAgent'
import Testimonials from './Testimonials'
import Section2subsec4 from './Section2subsec4'
const section2 = () => {
  return (
    <section className="section2-wrapper">
        <section className='expectation'>
            <div className="expect">
                <div className="decor">
                    <img src={decor} alt="" />
                </div>
                <div className="text">
                    <h3>Send Anything Anywhere Anytime</h3>
                </div>
                <div className="ellispes">
                    <img src={ellipse} alt="" className='big-ellipse'/>
                    <img src={ellipse} alt="" className='small-ellipse' />
                </div>
            </div>
            <div className="section2-subsec1-wrapper">
                    <div className='secure'>
                        <div className='icons'>
                            <img src={shield} alt="" />
                        </div>
                        <h4>Secure And Convenient</h4>
                        <p>Relax while we connect you to our delivery agents to safely deliver your items</p>
                    </div>
                    <div className='avaliable'>
                        <div className='icons'>
                            <img src={always} alt="" className='icon2'/>
                        </div>
                        <h4>Always Available For You</h4>
                        <p>Have your items delivered and get support anytime you need them</p>
                    </div>
                    <div className='Happer-user'>
                        <div className='icons'>
                            <img src={smile} alt="" />
                        </div>
                        <h4>Happy Users And Riders</h4>
                        <p>Our deliery agents earn, Our users chill. Hence everyone's Happy</p>
                    </div>
            </div>
        </section>
        <Section2subsec1/>
        <OurServices/>
        <BecomeAgent/>
        <Testimonials/>
        <Section2subsec4/>
        <Section2subsec2/>
    </section>
  )
}

export default section2