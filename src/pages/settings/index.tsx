import { Outlet, useParams } from 'react-router-dom';

type Props = {};

const Settings = ({}: Props) => {
  const { subSettings } = useParams();
  return (
    <div>
      Settings `&gt;` {subSettings}
      <Outlet />
    </div>
  );
};

export default Settings;
