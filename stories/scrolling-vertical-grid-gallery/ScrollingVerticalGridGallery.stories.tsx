import "./ScrollingVerticalGridGallery.scss";
import {
  ImageMetadata,
  SlideOptions,
  useSlideshow,
  SlideshowImage,
  SlideshowThumbnail,
} from "../../src/main";
import { DefaultSlides } from "../shared";
import { ComponentStoryObj } from "@storybook/react";
import { basicSlideshowTest } from "../shared/tests/BasicSlideshowTest";

const getBlurSrc = (imageMetadata: ImageMetadata) => {
  return imageMetadata.src + ",bl-12";
};

const ScrollingVerticalGridGalleryComponent = () => {
  const {
    rootThumbnailContainerRef,
    rootSlidesContainerRef,
    slides,
    active,
    index,
    setSlideIdx,
    slideshowState,
  } = useSlideshow(DefaultSlides, {
    getBlurSrc,
    getThumbnailBlurSrc: getBlurSrc,
    isScrolling: true,
  });

  return (
    <div className="scrolling-vertical-grid-gallery-container">
      <div
        ref={rootSlidesContainerRef}
        className="scrolling-gallery-container"
        data-testid="slide-image-container"
      >
        {/* <div className={clsx("loading-indicator", { loading: isLoading })}>
          Loading...
        </div> */}
        {slides.map((slide, idx) => (
          <SlideshowImage key={idx} {...slide.main} />
        ))}
      </div>
      <div
        ref={rootThumbnailContainerRef}
        className="image-gallery-thumbnail-container"
      >
        {slides.map(
          (slide, idx) =>
            slide.thumbnail && (
              <SlideshowThumbnail key={idx} {...slide.thumbnail} />
            )
        )}
      </div>
    </div>
  );
};

export default {
  title: "Slideshow",
  component: ScrollingVerticalGridGalleryComponent,
};

export const ScrollingVerticalGrid: ComponentStoryObj<
  typeof ScrollingVerticalGridGalleryComponent
> = {
  play: async (context) => {
    await basicSlideshowTest(context);
  },
};
