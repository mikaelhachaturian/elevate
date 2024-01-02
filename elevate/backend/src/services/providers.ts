import { Provider } from '../models/provider';

export const populateProviders = async () => {
  const Provider1 = await Provider.create({
    name: 'Idan Flooring',
    phone: '0542469444',
    description: 'Working on flooring and everything in between.',
    work_times: '08:00-17:00',
    cost: '1000',
  });
  const Provider2 = await Provider.create({
    name: 'Dorian Kitchens',
    phone: '0504687777',
    description: 'Best kitchens specialists.',
    work_times: '09:00-18:00',
    cost: '2500',
  });
  const Provider3 = await Provider.create({
    name: 'Tomer Air',
    phone: '0528403223',
    description: 'Hot? Cold? We got what you need.',
    work_times: '08:30-16:00',
    cost: '5000',
  });
  const Provider4 = await Provider.create({
    name: 'Electricy',
    phone: '0542469444',
    description: 'Reliable and honest electricians.',
    work_times: '11:00-17:00',
    cost: '9000',
  });
  const Provider5 = await Provider.create({
    name: 'Real Doors',
    phone: '0542469444',
    description: 'Got your dream doors.',
    work_times: '06:00-15:00',
    cost: '7000',
  });
};

export const getProviders = async () => {
  const providers = await Provider.findAll();

  return providers.map((u) => ({
    name: u.name,
    work_times: u.work_times,
    phone: u.phone,
    description: u.description,
    cost: u.cost,
  }));
};
