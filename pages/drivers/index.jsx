import Head from "../../components/Head";
import Layout from "../../components/Layout";

const Drivers = props => {
  return <Head title="Drivers" />;
};

Drivers.getInitialProps = async () => {
  return {
    name: "Drivers",
  };
};

export default Drivers;
