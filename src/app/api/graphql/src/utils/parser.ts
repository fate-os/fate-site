import { user, media } from '@prisma/client';

import { uuidV2 } from './uuid';

export const removeUnwanted = (text: string) => {
  return text.replace(/[-]+/g, ' ').trim().toLowerCase();
};

export const firstSplit = (text: string) => {
  const split = text?.split('-');

  return split[0];
};

export const hyphenParser = (text: string, all?: boolean) => {
  if (all) {
    const res = text.replace(/[,.(){}[]? ]+/g, ' ').trim();

    return res
      .replace(/[&.,%:-]+/g, '')
      .split(' ')
      .join('-')
      .toLowerCase();
  }

  const res = text.replace(/[, ]+/g, ' ').trim();

  return res.split(' ').join('-').toLowerCase();
};

export const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export function hasHttps(link: string) {
  return link.startsWith('https://');
}

type ProfileType = user;

export const useProfileParser = (data: any) => {
  const { ...others } = data;

  const obj: any = {};

  // if (photo_url) {
  //   const _url = `https://${s3BucketName}.s3.amazonaws.com/${photo_url}`;
  //   obj.photo_url = hasHttps(photo_url) ? photo_url : _url;
  // }

  return { ...obj, ...others };
};

export const underScoreParser = (text: string, all?: boolean) => {
  // Replace all special characters with underscores
  const res = text.replace(/[^a-zA-Z0-9]+/g, '_').trim();

  if (all) {
    // Replace consecutive underscores with a single one and trim underscores at the edges
    return res
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '')
      .toLowerCase();
  }

  return res.toLowerCase();
};

export const fileNameParse = (text: string) => {
  return `${uuidV2()}_${underScoreParser(text, true)}`;
};

export const useDeckMediaParser = (data: media) => {
  const { url, ...others } = data;

  const obj = {} as media;

  // if (url) {
  //   const _url = `https://${s3BucketName}.s3.amazonaws.com/${url}`;
  //   obj.url = _url;
  // }

  return { ...obj, ...others };
};
