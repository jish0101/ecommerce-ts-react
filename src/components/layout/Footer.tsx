import { Link } from 'react-router-dom';
import P from '../typography/P';
import { cn } from '@/lib/utils';
import Ul from '../typography/Ul';
import Li from '../typography/Li';
import H4 from '../typography/H4';

type Option = { label: string; to: string };

const Footer = () => {
  const options: Record<string, Option[]> = {
    about: [
      {
        label: 'Contact us',
        to: ''
      },
      {
        label: 'About us',
        to: ''
      },
      {
        label: 'Careers',
        to: ''
      },
      {
        label: 'FAQ',
        to: ''
      }
    ],
    help: [
      {
        label: 'Terms of use',
        to: ''
      },
      {
        label: 'Payments',
        to: ''
      },
      {
        label: 'Shipping',
        to: ''
      },
      {
        label: 'Cancellation & Returns',
        to: ''
      }
    ]
  };

  return (
    <div className={cn(`h-[200px] border-t px-8 shadow-sm`)}>
      <div className="mx-auto grid h-full items-center md:grid-cols-3">
        <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 space-y-2 sm:flex-row">
          <Link to={'/'}>
            <img src={'/logo.svg'} className="md:w-20" loading="eager" />
          </Link>
          <P className="mx-3 text-center text-sm leading-4 sm:text-start md:pt-[18px] md:text-base">
            Crown Clothings <br /> Get your favourite clothings
          </P>
        </div>

        {Object.keys(options).map((key) => (
          <div className="flex items-center justify-center" key={key}>
            <Ul className="ml-0 w-[calc(100%-1rem)] list-none text-center sm:w-[300px] sm:text-start">
              <div className="flex w-full justify-center sm:justify-start">
                <H4 className="w-fit capitalize">{key}</H4>
              </div>
              {options[key].map((option) => (
                <Li
                  className={'text-primary underline-offset-4 hover:underline'}
                  key={option.label}
                >
                  <Link to={option.to}>{option.label}</Link>
                </Li>
              ))}
            </Ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
