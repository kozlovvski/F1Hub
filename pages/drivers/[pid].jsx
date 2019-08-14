import Head from "components/Head";

import getDriverInfo from "util/getDriverInfo";
import { Typography } from "@material-ui/core";

const DriverPage = props => {
  const { driverInfo } = props;

  return (
    <>
      <Head title={`${driverInfo.givenName} ${driverInfo.familyName}`}/>
      <Typography variant="h2">{`${driverInfo.givenName} ${driverInfo.familyName}`}</Typography>
    </>
  );
};

DriverPage.getInitialProps = async ({query}) => {
  const {pid} = query;

  return {
    driverInfo: await getDriverInfo(pid)
  };
};

export default DriverPage;
