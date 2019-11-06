module.exports = {
  up: queryInterface =>
    queryInterface.sequelize.query(`CREATE TABLE "Session" (
  "sid" varchar NOT NULL COLLATE "default",
\t"sess" json NOT NULL,
\t"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "Session" ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;`),

  down: queryInterface =>
    queryInterface.sequelize.query(`DROP TABLE "Session"`),
};
