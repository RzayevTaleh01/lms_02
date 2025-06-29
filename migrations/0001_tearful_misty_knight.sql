CREATE TABLE "attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"lesson_id" integer,
	"student_id" varchar NOT NULL,
	"date" timestamp DEFAULT now(),
	"status" varchar NOT NULL,
	"recorded_by" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
