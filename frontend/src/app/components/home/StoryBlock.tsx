import React, { useState } from 'react';
import Stories from 'react-insta-stories';
import { Story } from 'react-insta-stories/dist/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import ava1 from '../../../assets/images/ava1.png';
import desire from '../../../assets/images/desire.png';
import rebeccaAvatar from '../../../assets/images/rebecca.png';

//Example Data
const fetchedStories = [
  {
    src:
      'https://images.unsplash.com/photo-1600749981395-1478679d4669?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    username: 'tonybellew',
    userAvatar: rebeccaAvatar
  },
  {
    src:
      'https://images.unsplash.com/photo-1616176885019-7eb95d47c19a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    username: 'desiree ',
    userAvatar: desire
  },
  {
    src:
      'https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    username: ' rebecca',
    userAvatar: ava1
  }
];

const STORY_DURATION = 2500;

const StoryBlock = () => {
  const [currentIndexOfStory, setCurrentIndexOfStory] = useState<number | null>(null);

  const formatedStories: Story[] = fetchedStories.map((story) => {
    return {
      url: story.src,
      duration: STORY_DURATION,
      header: {
        heading: `@${story.username}`,
        subheading: '',
        profileImage: story.userAvatar
      }
    };
  });

  const [stories, setStories] = useState<Story[]>(formatedStories);

  const toggleStoryModal = (index: number) => {
    setCurrentIndexOfStory(index);
  };

  return (
    <>
      <div className="stories">
        <Swiper slidesPerView={'auto'} freeMode={true}>
          {stories.map((story, index) => (
            <SwiperSlide key={index}>
              <div className="stories__story-wrapper" onClick={() => toggleStoryModal(index)}>
                <img className="stories__user-avatar" src={story.header.profileImage} alt="story" />

                <p className="stories__user-login">{story.header.heading}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={currentIndexOfStory !== null ? 'stories__modal stories__modal_active' : 'stories__modal'}>
        <Stories
          stories={stories}
          currentIndex={currentIndexOfStory}
          onAllStoriesEnd={() => toggleStoryModal(null)}
          storyStyles={{
            width: '100%',
            maxWidth: '',
            margin: '',
            height: '100%',
            maxHeight: '',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />

        <button className="stories__close-modal" onClick={() => toggleStoryModal(null)}>
          &times;
        </button>
      </div>
    </>
  );
};

export default StoryBlock;
