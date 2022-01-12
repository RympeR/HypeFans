import React from 'react';
import Stories from 'react-insta-stories';
import { BREAKPOINTS, findIndexById, STORY_DURATION } from '~/app/utils/utilities';
import { useViewport } from '~/app/utils/ViewportProvider';
import { ReactComponent as CloseBtn } from '../../../../assets/images/close-btn.svg';
import IStory from '../../../types/IStory';
import Story from './Story';

interface IStoryModalProps {
  stories: IStory[];
  currentIdOfStory: string;
  setIsModalOpened: (arg: boolean) => void;
}

const StoryModal = ({ stories, currentIdOfStory, setIsModalOpened }: IStoryModalProps) => {
  const windowDimensions = useViewport();

  const storiesJSX = stories.map((story: any) => {
    return {
      content: () => {
        return <Story story={story} />;
      }
    };
  });

  const closeModalHandler = () => {
    setIsModalOpened(false);
  };

  const markStoryAsWatched = (index: number) => {
    const { id } = stories[index];
    localStorage?.setItem(`${id}`, 'watched');
  };

  const startStory = (index: number) => {
    markStoryAsWatched(index);
  };

  const endStory = (index: number) => {
    markStoryAsWatched(index);

    if (index === stories.length - 1) {
      setTimeout(closeModalHandler, 0);
    }
  };

  return (
    <div className="stories__modal">
      <Stories
        stories={storiesJSX}
        currentIndex={findIndexById(stories, currentIdOfStory)}
        defaultInterval={STORY_DURATION}
        width={windowDimensions.width > 538 ? 538 : windowDimensions.width}
        height={windowDimensions.width >= BREAKPOINTS.S ? windowDimensions.height : windowDimensions.height * 0.95}
        onStoryStart={startStory}
        onStoryEnd={endStory}
      />

      <button className="stories__close-modal" onClick={closeModalHandler}>
        <CloseBtn />
      </button>
    </div>
  );
};

export default StoryModal;
