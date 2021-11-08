import React from 'react';
import {Navbar} from "../Components/Navbar"
import {Footer} from "../Components/Footer"
import {SecondSection} from "../Components/SecondSection"
import firstimg from "../firstimg.png"
import "../App.css"
export function Services(){
    return <React.Fragment>
        <Navbar/>
        <div className="SecondSection">
            <SecondSection imgUrl={firstimg} title="Training" description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and timeframe."/>
            <SecondSection imgUrl={firstimg} title="Training" description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and timeframe."/>
            <SecondSection imgUrl={firstimg} title="Training" description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and timeframe."/>
            <SecondSection imgUrl={firstimg} title="Training" description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and timeframe."/>
            <SecondSection imgUrl={firstimg} title="Training" description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and timeframe."/>
            <SecondSection imgUrl={firstimg} title="Training" description="We specializes in all major design authoring tools. We can create a tailor made training course to ensure it meets your business needs and timeframe."/>
        </div>
        <Footer/>
    </React.Fragment>
}