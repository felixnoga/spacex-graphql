import { fromPromise } from '@apollo/client';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface ILaunch {
  id?: string;
  flight_number?: number;
  name?: string;
  date_local?: string;
  success?: boolean;
  rocket?: string;
}

const LaunchItem = ({
  launch: {
    id,
    flight_number,
    name,
    date_local,
    rocket,
    success,
    details,
    links,
  },
}) => {
  return (
    <div className="card card-body mb-1 col-lg-3 col-md-5  mx-1 d-flex flex-column">
      <div className="card-title">
        <h4>
          <img
            src={links.patch.small}
            alt="patch"
            style={{ width: 60, height: 60 }}
          />
          {name}{' '}
        </h4>
      </div>
      <h6 className="card-subtitle text-muted mb-2">
        {moment(date_local).format('D MMMM YYYY')}
      </h6>
      <p className="card-text">Flight Number: {flight_number}</p>
      {success ? (
        <div className="alert alert-success col-md-6 mx-auto" role="alert">
          Mission Succeded
        </div>
      ) : (
        <div className="alert alert-danger col-md-6 mx-auto" role="alert">
          Mission failed
        </div>
      )}
      <Link
        to={{ pathname: `/details/${id}`, state: { rocketId: rocket } }}
        className="btn btn-sm btn-secondary mt-auto col-md-6 col-12 mx-auto"
      >
        Details
      </Link>
    </div>
  );
};

export default LaunchItem;
