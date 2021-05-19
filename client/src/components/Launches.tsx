import React from 'react';
import { gql, useQuery } from '@apollo/client';
import LaunchItem from './LaunchItem';

// Query to retrieve launches
const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      id
      name
      success
      flight_number
      date_local
      rocket
      details
      links {
        patch {
          small
        }
      }
    }
  }
`;

const Launches = (): JSX.Element => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);
  return (
    <div className="row">
      {data.launches.map((launch) => (
        <LaunchItem key={launch.id} launch={launch} />
      ))}
    </div>
  );
};

export default Launches;
