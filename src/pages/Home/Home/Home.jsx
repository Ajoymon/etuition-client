import React from 'react';
import Banner from '../Banner/Banner';
import LatestTuitions from '../LatestTuitions/LatestTuitions';
import LatestTutors from '../LatestTutors/LatestTutors';
import Reviews from '../Reviews/Reviews';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestTuitions></LatestTuitions>
      <LatestTutors></LatestTutors>
      <WhyChooseUs></WhyChooseUs>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
