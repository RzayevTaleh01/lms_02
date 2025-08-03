import { db } from "../server/db";
import { sql } from "drizzle-orm";
import { 
  attendance, 
  lessonSessions, 
  submissions, 
  enrollments, 
  assignments, 
  lessons, 
  courses, 
  users,
  blogPosts,
  certificates,
  contactSubmissions,
  lessonMaterials,
  lessonAssignments,
  lessonProgress
} from "../shared/schema";

async function cleanDatabase() {
  try {
    console.log("🧹 Cleaning database...");
    
    // Delete in reverse order of dependencies
    await db.delete(attendance);
    await db.delete(lessonProgress);
    await db.delete(lessonSessions);
    await db.delete(submissions);
    await db.delete(lessonAssignments);
    await db.delete(lessonMaterials);
    await db.delete(assignments);
    await db.delete(enrollments);
    await db.delete(lessons);
    await db.delete(courses);
    await db.delete(certificates);
    await db.delete(contactSubmissions);
    await db.delete(blogPosts);
    
    // Delete all non-default users
    await db.delete(users).where(
      sql`id NOT LIKE 'admin_%' AND id NOT LIKE 'teacher_%' AND id NOT LIKE 'student_%'`
    );

    console.log("✅ Database cleaned successfully!");
    console.log("Default users remain intact");
    
  } catch (error) {
    console.error("❌ Error cleaning database:", error);
    process.exit(1);
  }
}

cleanDatabase();