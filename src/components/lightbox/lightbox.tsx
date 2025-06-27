import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Video from 'yet-another-react-lightbox/plugins/video';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import ReactLightbox, { useLightboxState, Slide } from 'yet-another-react-lightbox';

import Box from '@mui/material/Box';

import { Iconify } from '../iconify';
import { lightboxClasses } from './classes';

interface LightboxProps {
  slides: Slide[];
  disableZoom?: boolean;
  disableVideo?: boolean;
  disableTotal?: boolean;
  disableCaptions?: boolean;
  disableSlideshow?: boolean;
  disableThumbnails?: boolean;
  open?: boolean;
  index?: number;
  disableFullscreen?: boolean;
  onGetCurrentIndex?: (index: number) => void;
  close?: () => void;
}

export function Lightbox({
  slides,
  disableZoom,
  disableVideo,
  disableTotal,
  disableCaptions,
  disableSlideshow,
  disableThumbnails,
  disableFullscreen,
  onGetCurrentIndex,
  index,
  open,
  close,
  ...other
}: LightboxProps) {
  const totalItems = slides.length;

  return (
    <ReactLightbox
      slides={slides}
      animation={{ swipe: 240 }}
      carousel={{ finite: totalItems < 5 }}
      controller={{ closeOnBackdropClick: true }}
      plugins={getPlugins({
        disableZoom,
        disableVideo,
        disableCaptions,
        disableSlideshow,
        disableThumbnails,
        disableFullscreen,
      })}
      on={{
        view: ({ index }) => {
          if (onGetCurrentIndex) {
            onGetCurrentIndex(index);
          }
        },
      }}
      toolbar={{
        buttons: [
          <DisplayTotal key={0} totalItems={totalItems} disableTotal={disableTotal} />,
          'close',
        ],
      }}
      render={{
        iconClose: () => <Iconify width={24} icon="carbon:close" />,
        iconZoomIn: () => <Iconify width={24} icon="carbon:zoom-in" />,
        iconZoomOut: () => <Iconify width={24} icon="carbon:zoom-out" />,
        iconSlideshowPlay: () => <Iconify width={24} icon="carbon:play" />,
        iconSlideshowPause: () => <Iconify width={24} icon="carbon:pause" />,
        iconPrev: () => <Iconify width={32} icon="carbon:chevron-left" />,
        iconNext: () => <Iconify width={32} icon="carbon:chevron-right" />,
        iconExitFullscreen: () => <Iconify width={24} icon="carbon:center-to-fit" />,
        iconEnterFullscreen: () => <Iconify width={24} icon="carbon:fit-to-screen" />,
      }}
      className={lightboxClasses.root}
      index={index}
      open={open}
      close={close}
      {...other}
    />
  );
}

interface PluginOptions {
  disableZoom?: boolean;
  disableVideo?: boolean;
  disableCaptions?: boolean;
  disableSlideshow?: boolean;
  disableThumbnails?: boolean;
  disableFullscreen?: boolean;
}

export function getPlugins({
  disableZoom,
  disableVideo,
  disableCaptions,
  disableSlideshow,
  disableThumbnails,
  disableFullscreen,
}: PluginOptions) {
  let plugins = [Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom];

  if (disableThumbnails) plugins = plugins.filter((plugin) => plugin !== Thumbnails);
  if (disableCaptions) plugins = plugins.filter((plugin) => plugin !== Captions);
  if (disableFullscreen) plugins = plugins.filter((plugin) => plugin !== Fullscreen);
  if (disableSlideshow) plugins = plugins.filter((plugin) => plugin !== Slideshow);
  if (disableZoom) plugins = plugins.filter((plugin) => plugin !== Zoom);
  if (disableVideo) plugins = plugins.filter((plugin) => plugin !== Video);

  return plugins;
}

interface DisplayTotalProps {
  totalItems: number;
  disableTotal?: boolean;
}

export function DisplayTotal({ totalItems, disableTotal }: DisplayTotalProps) {
  const { currentIndex } = useLightboxState();

  if (disableTotal) {
    return null;
  }

  return (
    <Box
      component="span"
      className="yarl__button"
      sx={{
        typography: 'body2',
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
      }}
    >
      <strong> {currentIndex + 1} </strong> / {totalItems}
    </Box>
  );
}
