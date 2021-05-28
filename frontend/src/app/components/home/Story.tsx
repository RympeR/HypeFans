import React from 'react';

const Story = ({ storyContent }: { storyContent: any }) => {
  return (
    <>
      <img className="stories__story-content-img" src={storyContent.src} alt="" />
    </>
  );
};

export default Story;
