import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Slider from "react-slick";
import IStory from "../../../../app/types/IStory";
import {
  isStoryWatched,
  showVisibleText,
  STORY_USERNAME_LENGTH,
} from "../../../../app/utils/utilities";
import ava1 from "../../../../assets/images/ava1.png";
import { ReactComponent as StoryOutline } from "../../../../assets/images/story1.svg";
import StoryModal from "./StoryModal";

//Example Data
const fetchedStories: IStory[] = [
  {
    src: "https://images.unsplash.com/photo-1600749981395-1478679d4669?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    username: "tonybellew",
    userAvatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    id: "1",
  },
  {
    src: "https://images.unsplash.com/photo-1616176885019-7eb95d47c19a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    username: "desiree ",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80",

    id: "2",
  },
  {
    src: "https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    username: " rebecca",
    userAvatar:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    id: "3",
  },
  {
    src: "https://images.unsplash.com/photo-1550573079-b12f15bbfc8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    username: " rebecca",
    userAvatar: ava1,

    id: "4",
  },
  // {
  //   src:
  //     'https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  //   username: ' rebecca',
  //   userAvatar: ava1,
  // id:'5'

  // },
  // {
  //   src:
  //     'https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  //   username: ' rebecca',
  //   userAvatar: ava1,
  // id:'6'

  // },
  // {
  //   src:
  //     'https://images.unsplash.com/photo-1621478654947-499529690845?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  //   username: ' rebecca',
  //   userAvatar: ava1,
  // id:'7'

  // }
];

const StoryBlock = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [stories, setStories] = useState(fetchedStories);

  const [currentIdOfStory, setCurrentIdOfStory] = useState(stories[0].id);

  useEffect(() => {
    const localStorageKeys = Object.keys(localStorage).filter((key) =>
      isStoryWatched(key)
    );
    const storiesIds = stories.map((story) => story.id);
    localStorageKeys.forEach((key) => {
      if (!storiesIds.includes(key)) localStorage?.removeItem(`${key}`);
    });

    const unwatchedStories = stories.filter(
      (story) => !localStorageKeys.includes(story.id)
    );
    const watchedStories = stories.filter((story) =>
      localStorageKeys.includes(story.id)
    );
    setStories([...unwatchedStories, ...watchedStories]);
  }, [isModalOpened]);

  const openModalHandler = (id: string) => {
    setIsModalOpened(true);
    setCurrentIdOfStory(id);
  };

  return (
    <>
      <div className="stories">
        <Slider>
          {stories.map((story) => (
            <div key={story.id}>
              <div
                className="stories__story-thumbnail"
                onClick={() => openModalHandler(story.id)}
              >
                <StoryOutline
                  className={`stories__outline ${
                    isStoryWatched(story.id) ? "stories__outline_watched" : ""
                  }`}
                />
                <div className="stories__avatar-wrapper stories__avatar-wrapper_active">
                  <img
                    className="stories__user-avatar"
                    src={story.userAvatar}
                    alt="story"
                  />
                </div>
                <p className="stories__user-login">
                  @{showVisibleText(story.username, STORY_USERNAME_LENGTH)}
                </p>
              </div>
            </div>
          ))}
        </Slider>
        <Modal
          show={isModalOpened}
          onHide={() => setIsModalOpened(false)}
          centered
          fullscreen={true}
        >
          <Modal.Body className="notifications__modal">
            <StoryModal
              stories={stories}
              currentIdOfStory={currentIdOfStory}
              setIsModalOpened={setIsModalOpened}
            />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default StoryBlock;
