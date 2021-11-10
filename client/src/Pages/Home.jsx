import React from 'react';
import About from '../components/About';
import Info from '../components/Info';
import Slider from '../components/Slider';

function Home({ setPathname }) {
    setPathname('home');

    return (
        <div>
            <Slider />
            <About />
            <Info />
        </div>
    );
}

export default Home;
