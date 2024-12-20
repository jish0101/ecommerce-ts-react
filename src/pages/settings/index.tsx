import { Outlet, useParams } from 'react-router-dom';

type Props = {};

const Settings = ({}: Props) => {
  const { sub_settings } = useParams();
  return (
    <div>
      Settings &gt; {sub_settings ?? 'No subroute'}
      <Outlet />
    </div>
  );
};

export default Settings;
