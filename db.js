const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db");

db.serialize(() => {

    db.run(`
        ALTER TABLE applications
        ADD COLUMN draft INTEGER DEFAULT 0
    `, err => {});

    db.run(`
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            applicationId TEXT UNIQUE,
            bandName TEXT,
            contactName TEXT,
            contactEmail TEXT,
            memberCount INTEGER,
            venueList TEXT,
            createdAt TEXT
        )
    `);

    db.run(
        `
        ALTER TABLE applications
        ADD COLUMN accessToken TEXT
        `,
        err => {}
    );

    db.run(`
        CREATE TABLE IF NOT EXISTS members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            applicationId TEXT,
            fullName TEXT,
            nationality TEXT,
            placeOfBirth TEXT,
            countryOfBirth TEXT,
            homeAddress TEXT,
            firstEntryDate TEXT,
            finalExitDate TEXT,
            showCount INTEGER,
            earnings TEXT,
            jobTitle TEXT,
            travellingFromIreland TEXT,
            reEnteringUk TEXT,
            firstExitDate TEXT,
            reEntryDate TEXT,
            passportNumber TEXT,
            passportExpiry TEXT,
            passportFile TEXT
        )
    `);

});

module.exports = db;