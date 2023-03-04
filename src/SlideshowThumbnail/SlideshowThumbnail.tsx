import { SlideOptions, ThumbnailMetadata } from "../useSlideshow";
import clsx from "clsx";
import { forwardRef, useCallback, useState } from "react";
import { DATA_IDX_ATTR } from "../useSlideshow/Constants";
import { SLIDE_THUMBNAIL_TEST_ID } from "../TestConstants";

export interface SlideshowThumbnailAddedProps extends ThumbnailMetadata {
  className?: string;
}

export const SlideshowThumbnail = forwardRef<HTMLImageElement, SlideOptions>(
  ({ thumbnail, active, dataIdx }, _) => {
    const [showFullQuality, setShowFullQuality] = useState(false);
    const onLoad = useCallback(() => setShowFullQuality(true), []);

    if (thumbnail) {
      const {
        className,
        containerId,
        imgProps,
        classes,
        blurImgProps,
        onThumbnailClick,
        loaded,
        src,
        ref,
      } = thumbnail;
      return (
        <div
          className={clsx(className, classes?.container, {
            hide: !active,
            active,
          })}
          onClick={onThumbnailClick}
          data-testid={SLIDE_THUMBNAIL_TEST_ID}
          id={containerId}
        >
          {blurImgProps && (
            <img
              className={clsx(blurImgProps?.className, classes?.blurImg, {
                hide: showFullQuality,
              })}
              {...blurImgProps}
              loading={"eager"}
            />
          )}
          <img
            ref={ref}
            className={clsx(classes?.mainImg)}
            {...imgProps}
            {...{ [DATA_IDX_ATTR]: dataIdx }}
            src={loaded ? src : undefined}
            // src={dataSrc}
            // loading={active ? "eager" : loading ?? "lazy"}
            onLoad={onLoad}
          />
        </div>
      );
    }

    return null;
  }
);
