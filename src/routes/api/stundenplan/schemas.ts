import * as v from 'valibot';

const booleanFromString = v.coerce(v.boolean(), (value) => !!value && value !== '0');
const dateFromString = v.transform(v.string(), (value) => new Date(value));

export const academicYearSchema = v.union([v.literal(1), v.literal(2), v.literal(3), v.literal(4)]);

export type AcademicYear = v.Input<typeof academicYearSchema>;

export const semesterSchema = v.object({
	year: v.number([v.minValue(2020), v.maxValue(2100)]),
	winter_semester: v.boolean()
});

export type Semester = v.Input<typeof semesterSchema>;

export const locationSchema = v.object({
	name: v.optional(v.string()),
	street: v.optional(v.string()),
	nr: v.optional(v.string()),
	desc: v.optional(v.string())
});

export type EventLocation = v.Input<typeof locationSchema>;

export const lecturerSchema = v.object({
	name: v.optional(v.string()),
	mail: v.optional(v.string())
});

export type EventLecturer = v.Input<typeof lecturerSchema>;

export const eventSchema = v.object({
	name: v.string(),
	start: dateFromString,
	end: dateFromString,
	location: locationSchema,
	lecturer: lecturerSchema,
	information: v.optional(v.string()),
	isHoliday: booleanFromString,
	isExercive: booleanFromString,
	allDay: v.boolean(),
	isLecture: booleanFromString
});

export type Event = v.Input<typeof eventSchema>;
