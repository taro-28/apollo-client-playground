import { gql, useFragment, useQuery } from "@apollo/client";
import "./App.css";

const LOCATION_FIELDS = gql`
  fragment Loc on Location {
    name
    description
  }
`;

const GET_LOCATIONS = gql`
  ${LOCATION_FIELDS}
  query GetLocations {
    locations {
      id
      ...Loc
    }
  }
`;

const Location = ({ from }: { from: string }) => {
  const {
    complete,
    data: { name, description },
  } = useFragment({
    fragment: LOCATION_FIELDS,
    fragmentName: "Loc",
    from,
  });
  return (
    <div>
      <h3>{name}</h3>
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
      <p>complete:{JSON.stringify(complete)}</p>
    </div>
  );
};

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id }) => <Location key={id} from={id} />);
}

export default App;
