-- Grant permissions to messenger_app user
GRANT USAGE, SELECT ON SEQUENCE "User_id_seq" TO messenger_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON "User" TO messenger_app;
