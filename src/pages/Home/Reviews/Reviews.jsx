import React, { Suspense } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewsCard from './ReviewsCard';

const dummyReviews = [
  {
    id: 1,
    userName: 'Rahim Uddin',
    review:
      'I found an amazing Math tutor through eTuitionBD within 2 days! The process was so easy and the tutor is excellent. Highly recommended!',
    user_photoURL: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    userName: 'Fatema Khanam',
    review:
      'My daughter needed an English tutor urgently. eTuitionBD helped us find the perfect one in no time. Great platform!',
    user_photoURL: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    userName: 'Karim Hossain',
    review:
      'As a tutor, this platform helped me find students easily. The payment system is secure and the process is very transparent.',
    user_photoURL: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    userName: 'Nasrin Akter',
    review:
      'Excellent platform! Found a great Physics tutor for my son. The tutor verification process gives me confidence.',
    user_photoURL: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 5,
    userName: 'Sabbir Ahmed',
    review:
      'eTuitionBD is the best platform for tutors in Bangladesh. I got multiple students within a week of joining!',
    user_photoURL: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 6,
    userName: 'Mitu Begum',
    review:
      'Very easy to use. I posted my tuition requirement and got responses from tutors within hours. Great experience!',
    user_photoURL: 'https://i.pravatar.cc/150?img=6',
  },
];

const Reviews = () => {
  return (
    <div className="py-16 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-bold">What Our Users Say</h3>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Trusted by students and tutors across Bangladesh
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'3'}
        coverflowEffect={{
          rotate: 0,
          stretch: '50%',
          depth: 100,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {dummyReviews.map(review => (
          <SwiperSlide key={review.id}>
            <ReviewsCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
