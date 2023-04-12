import { Role } from '@prisma/client';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  role: z.nativeEnum(Role, {
    required_error: 'Roles are Admin,PM,SoftwareDev, or Volunteer ',
    invalid_type_error: 'Role must be chosen from Enum',
  }),
});

export type UserValidation = z.infer<typeof userSchema>;

const teamSchema = z.object({
  name: z.string({
    required_error: 'Team name required',
    invalid_type_error: 'Team name must be a string',
  }),
  description: z.string({
    required_error: 'Team description required',
    invalid_type_error: 'Team description must be a string',
  }),
});
export type TeamValidation = z.infer<typeof teamSchema>;

const taskSchema = z.object({
  title: z.string({
    required_error: 'Task title required',
    invalid_type_error: 'Task title must be a string',
  }),
  description: z.string({
    required_error: 'Provide task description',
    invalid_type_error: 'Task description must be a string',
  }),
  deadline: z
    .date({
      required_error: 'Provide task deadline',
      invalid_type_error: 'Deadline must be a date',
    })
    .refine((date) => {
      return date > new Date(Date.now());
    }, 'Task deadline must be set for a future date'),
  approved: z.boolean({
    required_error: 'Is task approved? True or False',
    invalid_type_error: 'Approved must be a boolean',
  }),
  status: z.string({
    required_error: 'Please provide task status',
    invalid_type_error: 'Status must be a string',
  }),
  teamId: z
    .string({
      required_error: 'Please provide your TeamId',
      invalid_type_error: 'TeamId must be a string',
    })
    .optional(),
});
export type TaskValidation = z.infer<typeof taskSchema>;

const meetingSchema = z.object({
  title: z.string({
    required_error: 'Provide meeting title',
    invalid_type_error: 'Meeting title must be a string',
  }),
  description: z.string({
    required_error: 'Provide meeting description',
    invalid_type_error: 'Meeting description must be a string',
  }),
  date: z
    .date({
      required_error: 'Provide meeting date',
      invalid_type_error: 'Meeting date must be a date',
    })
    .refine((date) => {
      return date > new Date(Date.now());
    }, 'Meeting must be set for a future date'),
  time: z
    .date({
      required_error: 'Provide meeting time',
      invalid_type_error: 'Meeting time must be a date',
    })
    .refine((date) => {
      return date > new Date(Date.now());
    }, 'Meeting time must be set for a future date'),
});
export type MeetingValidation = z.infer<typeof meetingSchema>;
