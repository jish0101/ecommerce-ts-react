import H1 from '@/components/typography/H1';
import MutedPara from '@/components/typography/MutedPara';
import P from '@/components/typography/P';
import { MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Settings = ({}: Props) => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Profile',
      value: '/settings/user/profile',
      description: 'user, profile settings',
      icon: <User />
    },
    {
      label: 'Orders',
      value: '/settings/user/orders',
      description: 'Track, cancel or refund orders',
      icon: <MapPin />
    },
    {
      label: 'Address',
      value: '/settings/user/address',
      description: 'add, edit, delete addresses',
      icon: <MapPin />
    },
    {
      label: 'Contact us',
      value: '/contact',
      description: 'contact us, get updates for queries',
      icon: <MapPin />
    }
  ];

  return (
    <div className="space-y-6">
      <H1>Settings</H1>

      <div className="mx-auto flex w-fit flex-wrap justify-center gap-4 bg-muted/50 p-8">
        {items.map((item) => (
          <div
            key={item.value}
            onClick={() => navigate(item.value)}
            className="flex w-[260px] cursor-pointer items-center justify-center gap-4 px-2 py-4 outline outline-1 hover:bg-muted hover:outline hover:outline-1"
          >
            <div className="rounded-full bg-background p-2">{item.icon}</div>
            <div>
              <P className="text-xl font-medium">{item.label}</P>
              <MutedPara className="capitalize">{item.description}</MutedPara>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
