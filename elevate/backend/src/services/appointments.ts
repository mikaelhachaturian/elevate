import { Appointment } from '../models/appointment';

export const getAppointments = async (email: string) => {
  const appointments = await Appointment.findAll({
    where: {
      by: email,
    },
  });

  return appointments.map((a) => ({
    with: a.with,
    by: a.by,
    date: a.date,
    text: a.text,
  }));
};

export const createAppointment = async (a: Appointment) => {
  const appointment = await Appointment.create({ ...a });
  return appointment;
};
