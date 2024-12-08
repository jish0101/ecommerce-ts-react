import { Link, Outlet } from 'react-router-dom';
import H1 from '../typography/H1';

type Props = {};

const AuthLayout = ({}: Props) => {
  return (
    <main>
      <div
        className={`flex items-center justify-between p-3 h-[50px] md:h-[70px]`}
      >
        <Link to={'/'}>
          <img src={'/logo.svg'} className="w-12 md:mx-2" loading="eager" />
        </Link>
      </div>

      <div className="flex items-center justify-center md:flex-row flex-col md:gap-32">
        <div className="flex md:gap-3 items-center md:mt-0 mt-10 justify-center md:min-h-[calc(90vh-70px)]">
          <img
            src={'/logo.svg'}
            className="lg:min-w-[300px] md:min-w-[200px] min-w-[80px] md:mx-2 rotate-[-24deg]"
            loading="eager"
          />
          <H1 className="font-[500] mt-auto md:mt-24 md:font-[700]">
            Crown Clothing
          </H1>
        </div>
        <div className="lg:min-w-[450px] mt-10 md:mt-0 md:min-w-[350px] min-w-[calc(100%-1rem)]">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
