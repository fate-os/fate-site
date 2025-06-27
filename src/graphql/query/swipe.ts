import { gql } from '@apollo/client';

export const SWIPE_IMAGE_DECK = gql`
  query SwipeImage($page: Int, $size: Int) {
    swipeImageDeck(page: $page, size: $size) {
      message
      success
      result {
        id
        media {
          id
          url
          file_name
        }
      }
      total
    }
  }
`;

export const SELECTED_IMAGE_DECK = gql`
  query SelectedImageDeck($idsStr: String) {
    selectedImageDeck(idsStr: $idsStr) {
      message
      success
      result {
        id
        media {
          id
          url
          file_name
        }
      }
    }
  }
`;

export const CLIENT_SESSION_LIST = gql`
  query ClientSessionList($cursor: String, $sortBy: String, $size: String, $page: Int) {
    clientSessionList(cursor: $cursor, sortBy: $sortBy, size: $size, page: $page) {
      message
      success
      result {
        created_at
        id
        note
        image_group {
          id
          group_name
          group_images {
            id
          }
        }
      }
      total
      hasNextPage
      cursor
    }
  }
`;

export const CLIENT_SINGLE_SESSION = gql`
  query GetClientSession($id: ID!) {
    singleClientSession(id: $id) {
      success
      message
      result {
        id
        note
        created_at
        image_group {
          id
          group_name
          group_id
          group_images {
            id
            image_name
            image_deck {
              id
              media {
                url
                file_name
              }
            }
          }
        }
      }
    }
  }
`;
