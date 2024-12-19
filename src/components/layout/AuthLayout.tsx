import { Link, Outlet } from 'react-router-dom';
import H1 from '../typography/H1';

type Props = {};

const AuthLayout = ({}: Props) => {
  return (
    <main className="mx-auto">
      <div
        className={`flex h-[50px] items-center justify-between p-3 md:h-[70px]`}
      >
        <Link to={'/'}>
          <img src={'/logo.svg'} className="w-12 md:mx-2" loading="eager" />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center md:flex-row md:gap-32">
        <div className="mt-10 flex items-center justify-center md:mt-0 md:min-h-[calc(90vh-70px)] md:gap-3">
          <img
            src={'/logo.svg'}
            className="min-w-[80px] rotate-[-24deg] md:mx-2 md:min-w-[200px] lg:min-w-[300px]"
            loading="eager"
          />
          <H1 className="mt-auto font-[500] md:mt-24 md:font-[700]">
            Crown Clothing
          </H1>
        </div>
        <div className="mt-10 min-w-[calc(100%-1rem)] md:mt-0 md:min-w-[350px] lg:min-w-[450px]">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
