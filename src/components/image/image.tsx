import { forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Box from '@mui/material/Box';
import { styled, SxProps } from '@mui/material/styles';
import { CONFIG } from 'src/config-global';
import { imageClasses } from './classes';

// ----------------------------------------------------------------------

const ImageWrapper = styled(Box)({
  overflow: 'hidden',
  position: 'relative',
  verticalAlign: 'bottom',
  display: 'inline-block',
  [`& .${imageClasses.wrapper}`]: {
    width: '100%',
    height: '100%',
    verticalAlign: 'bottom',
    backgroundSize: 'cover !important',
  },
});

const Overlay = styled('span')({
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
});

// ----------------------------------------------------------------------

interface ImageProps {
  ratio?: number;
  disabledEffect?: boolean;
  alt?: string;
  src: string;
  delayTime?: number;
  threshold?: number;
  beforeLoad?: () => void;
  delayMethod?: 'throttle' | 'debounce';
  placeholder?: string;
  wrapperProps?: object;
  scrollPosition?: any;
  effect?: string;
  visibleByDefault?: boolean;
  wrapperClassName?: string;
  useIntersectionObserver?: boolean;
  slotProps?: {
    overlay?: object;
  };
  sx?: SxProps;
  imageSx?: SxProps;
  [key: string]: any;
}

export const Image = forwardRef<HTMLSpanElement, ImageProps>(
  (
    {
      ratio,
      disabledEffect = false,
      alt,
      src,
      delayTime,
      threshold,
      beforeLoad,
      delayMethod,
      placeholder,
      wrapperProps,
      scrollPosition,
      effect = 'blur',
      visibleByDefault,
      wrapperClassName,
      useIntersectionObserver,
      slotProps,
      sx,
      imageSx,
      ...other
    },
    ref
  ) => {
    const content = (
      <Box
        component={LazyLoadImage}
        alt={alt}
        src={src}
        delayTime={delayTime}
        threshold={threshold}
        beforeLoad={beforeLoad}
        delayMethod={delayMethod}
        placeholder={placeholder}
        wrapperProps={wrapperProps}
        scrollPosition={scrollPosition}
        visibleByDefault={visibleByDefault}
        effect={visibleByDefault || disabledEffect ? undefined : effect}
        useIntersectionObserver={useIntersectionObserver}
        wrapperClassName={wrapperClassName || imageClasses.wrapper}
        placeholderSrc={
          visibleByDefault || disabledEffect
            ? `${CONFIG.site.basePath}/assets/transparent.png`
            : `${CONFIG.site.basePath}/assets/placeholder.svg`
        }
        sx={{
          width: 1,
          height: 1,
          objectFit: 'cover',
          verticalAlign: 'bottom',
          aspectRatio: ratio,
          ...imageSx,
        }}
      />
    );

    return (
      <ImageWrapper
        ref={ref}
        // @ts-ignore
        component="span"
        className={imageClasses.root}
        sx={{ ...(!!ratio && { width: 1 }), ...sx }}
        {...other}
      >
        {slotProps?.overlay && <Overlay className={imageClasses.overlay} sx={slotProps?.overlay} />}
        {content}
      </ImageWrapper>
    );
  }
);
