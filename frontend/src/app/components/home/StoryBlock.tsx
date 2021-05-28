import React, { useState } from 'react';
import Stories from 'react-insta-stories';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { showVisibleText, STORY_DURATION, STORY_USERNAME_LENGTH } from '~/app/utils/utilities';
import { useViewport } from '~/app/utils/ViewportProvider';
import ava1 from '../../../assets/images/ava1.png';
import desire from '../../../assets/images/desire.png';
import rebeccaAvatar from '../../../assets/images/rebecca.png';
import Story from './Story';

//Example Data
const stories = [
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
  },
  {
    src:
      'https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    username: ' rebecca',
    userAvatar: ava1
  },
  {
    src:
      'https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    username: ' rebecca',
    userAvatar: ava1
  },
  {
    src:
      'https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    username: ' rebecca',
    userAvatar: ava1
  },
  {
    src:
      'https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    username: ' rebecca',
    userAvatar: ava1
  }
];

const StoryBlock = () => {
  const [currentIndexOfStory, setCurrentIndexOfStory] = useState<number | null>(null);

  const windowDimensions = useViewport();

  const toggleStoryModal = (index: number) => {
    setCurrentIndexOfStory(index);
  };

  const storyObjects = stories.map((story) => {
    return {
      content: () => {
        return <Story storyContent={story} />;
      }
    };
  });

  return (
    <>
      <div className="stories">
        <Swiper slidesPerView={'auto'} freeMode={true}>
          {stories.map((story, index) => (
            <SwiperSlide key={index}>
              <div className="stories__story-thumbnail" onClick={() => toggleStoryModal(index)}>
                <div className="stories__avatar-wrapper stories__avatar-wrapper_active">
                  <img className="stories__user-avatar" src={story.userAvatar} alt="story" />
                </div>

                <p className="stories__user-login">@{showVisibleText(story.username, STORY_USERNAME_LENGTH)}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={currentIndexOfStory !== null ? 'stories__modal stories__modal_active' : 'stories__modal'}>
        <Stories
          stories={storyObjects}
          currentIndex={currentIndexOfStory}
          onAllStoriesEnd={() => toggleStoryModal(null)}
          defaultInterval={STORY_DURATION}
          width={windowDimensions.width >= 768 ? 360 : windowDimensions.width}
          height={windowDimensions.width >= 768 ? 640 : windowDimensions.height * 0.95}
        />

        <button className="stories__close-modal" onClick={() => toggleStoryModal(null)}>
          &times;
        </button>
      </div>
    </>
  );
};

export default StoryBlock;
