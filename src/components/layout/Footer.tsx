import { Link } from 'react-router-dom';
import P from '../typography/P';
import { cn } from '@/lib/utils';
import Ul from '../typography/Ul';
import Li from '../typography/Li';
import H4 from '../typography/H4';

type Option = {label: string; to: string};

const Footer = () => {

  const options: Record<string, Option[]> = {
    about: [
      {
        label: "Contact us",
        to: ""
      },
      {
        label: "About us",
        to: ""
      },
      {
        label: "Careers",
        to: ""
      },
      {
        label: "FAQ",
        to: ""
      },
    ],
    help: [
      {
        label: "Terms of use",
        to: ""
      },
      {
        label: "Payments",
        to: ""
      },
      {
        label: "Shipping",
        to: ""
      },
      {
        label: "Cancellation & Returns",
        to: ""
      },
    ]
  }

  return <div className={cn(`h-[200px] border-t px-8 shadow-sm`)}>
    <div className='grid md:grid-cols-3 h-full items-center mx-auto'>
      <div className='space-y-2 flex flex-col gap-2 sm:flex-row justify-center items-center min-h-[100px]'>
        <Link to={'/'}>
          <img src={'/logo.svg'} className="md:w-20" loading="eager" />
        </Link>
        <P className='mx-3 text-center sm:text-start text-sm md:text-base md:pt-[18px] leading-4'>
          Crown Clothings <br /> Get your favourite clothings
        </P>
      </div>

      {Object.keys(options).map(key => (
        <div className='flex justify-center items-center' key={key}>
          <Ul className='list-none ml-0 text-center sm:text-start w-[calc(100%-1rem)] sm:w-[300px]'>
            <div className='w-full flex sm:justify-start justify-center'>
              <H4 className='capitalize w-fit'>{key}</H4>
            </div>
            {options[key].map(option => (
              <Li className={"text-primary underline-offset-4 hover:underline"} key={option.label}>
                <Link to={option.to}>
                  {option.label}
                </Link>
              </Li>
            ))}
          </Ul>
        </div>
      ))}
    </div>
  </div>;
};

export default Footer;
