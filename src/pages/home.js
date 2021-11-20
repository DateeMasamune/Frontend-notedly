import React from "react";
import { useQuery, gql } from '@apollo/client';

import NoteFeed from "../components/NoteFeed";
import Button from "../../final/components/Button";

const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`

const Home = () => {
  const {data, loading, error, fetchMore} = useQuery(GET_NOTES)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes}/>
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
          fetchMore({
            variables: {
              cursor: data.noteFeed.cursor
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
              return {
                noteFeed: {
                  cursor: fetchMoreResult.noteFeed.cursor,
                  hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                  //совмещаем новые результаты по старыми
                  notes: [
                    ...previousResult.noteFeed.notes,
                    ...fetchMoreResult.noteFeed.notes
                  ],
                  __typename: 'noteFeed'
                }
              }
            }
          })}
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  )
}

export default Home;