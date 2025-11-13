import React from 'react';
import HowItWorks from './HowItWorks';
import WhyGoGreen from './WhyGoGreen';
import HeroBanner from './HeroBanner';
import LiveStats from './LiveStats';
import ActiveChallenges from './ActiveChallenges';
import UpcomingEvents from './UpcomingEvents';
import RecentTips from './RecentTips';

const Home = () => {
    return (
        <div>
        <HeroBanner></HeroBanner>
        <ActiveChallenges></ActiveChallenges>
        <UpcomingEvents></UpcomingEvents>
        <RecentTips></RecentTips>
        <LiveStats></LiveStats>
   <WhyGoGreen></WhyGoGreen>
   <HowItWorks></HowItWorks>

        </div>
    );
};

export default Home;