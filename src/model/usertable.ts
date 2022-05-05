export const text = `
CREATE TABLE IF NOT EXISTS "users"(
    "id" SERIAL PRIMARY KEY,
    "full_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" VARCHAR(15) NOT NULL,
    "is_Active" BOOLEAN DEFAULT true,
    "created_at" timestamp DEFAULT NOW(),
    "is_verified" BOOLEAN DEFAULT false
);`;
