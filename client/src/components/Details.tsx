import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const FETCH_DETAILS = gql`
  query FetchDetails($id: String) {
    launch(id: $id) {
      name
      details
      rocket
      date_local
      links {
        patch {
          small
        }
      }
    }
  }
`;

const FETCH_ROCKET = gql`
  query FetchRocket($id: String) {
    rocket(id: $id) {
      name
      type
      active
      description
      flickr_images
    }
  }
`;

export const Details = (props) => {
  const { id } = useParams();
  const rocketId = props.location.state.rocketId;
  const { loading, error, data } = useQuery(FETCH_DETAILS, {
    variables: { id },
  });
  const {
    loading: rocketLoading,
    error: rocketError,
    data: rocketData,
  } = useQuery(FETCH_ROCKET, {
    variables: { id: rocketId },
  });
  console.log(rocketData);

  let history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  console.log(rocketId);
  if (loading || rocketLoading) return <p>Loading...</p>;
  if (error || rocketError) return <p>Error</p>;
  return (
    <div>
      <h3 className="text-secondary border-bottom pb-1">
        <img
          src={data.launch.links.patch.small}
          alt="Patch"
          style={{ width: 150 }}
        />
        <p className="ml-2 text-center text-success">
          {data.launch.name} Mission
        </p>
      </h3>
      <div className="card">
        <div className="card-header">
          <h4 className="text-warning">Mission Date</h4>{' '}
        </div>
        <div className="card-body">
          {moment(data.launch.date_local).format('DD MMMM YYYY')}
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4 className="text-warning">Mission details</h4>
        </div>
        <div className="card-body">
          {data.launch.details
            ? data.launch.details
            : 'No details for this mission'}
        </div>
      </div>
      <div className="card mb-2">
        <div className="card-header">
          <h4 className="text-warning">Rocket: {rocketData.rocket.name}</h4>
        </div>
        <div className="card-body">
          <p>{rocketData.rocket.description}</p>
          <p>
            <strong>Still Active: </strong>
            {rocketData.rocket.active ? 'yes' : 'no'}
          </p>
        </div>
        <div className="row d-flex flex-row mb-2 justify-content-center">
          {rocketData.rocket.flickr_images.map((img, i) => (
            <img key={i} src={img} className="d-block col-md-3 m-2" />
          ))}
        </div>
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => {
          goBack();
        }}
      >
        Go Back
      </button>
    </div>
  );
};
