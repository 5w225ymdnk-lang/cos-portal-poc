const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.serialize(() => {

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

/* ==========================
   FILE UPLOADS
========================== */

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

const upload = multer({ storage });

/* ==========================
   APPLICATIONS
========================== */

app.post("/api/application", (req, res) => {

    const {
        bandName,
        contactName,
        contactEmail,
        memberCount,
        venueList
    } = req.body;

    if (
        !bandName ||
        !contactName ||
        !contactEmail ||
        !venueList
    ) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(contactEmail)) {
        return res.status(400).json({
            error: "Invalid email address"
        });
    }

    if (
        isNaN(memberCount) ||
        Number(memberCount) < 1 ||
        Number(memberCount) > 500
    ) {
        return res.status(400).json({
            error: "Invalid member count"
        });
    }

    const applicationId =
        "COS-" + Date.now();

    db.run(
        `
        INSERT INTO applications
        (
            applicationId,
            bandName,
            contactName,
            contactEmail,
            memberCount,
            venueList,
            createdAt
        )
        VALUES
        (?,?,?,?,?,?,?)
        `,
        [
            applicationId,
            bandName,
            contactName,
            contactEmail,
            memberCount,
            venueList,
            new Date().toISOString()
        ],
        err => {

            if (err) {
                return res
                    .status(500)
                    .json({ error: err.message });
            }

            res.json({
                applicationId
            });

        }
    );

});

app.post("/api/application/draft", (req, res) => {

    const applicationId =
        "DRAFT-" + Date.now();

    db.run(
        `
        INSERT INTO applications
        (
            applicationId,
            bandName,
            contactName,
            contactEmail,
            memberCount,
            venueList,
            createdAt,
            draft
        )
        VALUES (?,?,?,?,?,?,?,1)
        `,
        [
            applicationId,
            req.body.bandName || "",
            req.body.contactName || "",
            req.body.contactEmail || "",
            req.body.memberCount || 0,
            req.body.venueList || "",
            new Date().toISOString()
        ],
        err => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                success: true,
                applicationId
            });

        }
    );

});

app.get(
    "/api/application/:id",
    (req, res) => {

        db.get(
            `
            SELECT *
            FROM applications
            WHERE applicationId = ?
            `,
            [req.params.id],
            (err, row) => {

                if (err) {
                    return res
                        .status(500)
                        .json({
                            error: err.message
                        });
                }

                res.json(row);

            }
        );

    }
);

/* ==========================
   MEMBERS
========================== */

app.post(
    "/api/member",
    upload.single("passport"),
    (req, res) => {

        if (!req.body.fullName) {
            return res.status(400).json({
                error: "Full name is required"
            });
        }

        if (!req.body.nationality) {
            return res.status(400).json({
                error: "Nationality is required"
            });
        }

        if (!req.body.passportNumber) {
            return res.status(400).json({
                error: "Passport number is required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                error: "Passport upload is required"
            });
        }

        db.run(
            `
            INSERT INTO members
            (
                applicationId,
                fullName,
                nationality,
                placeOfBirth,
                countryOfBirth,
                homeAddress,
                firstEntryDate,
                finalExitDate,
                showCount,
                earnings,
                jobTitle,
                travellingFromIreland,
                reEnteringUk,
                firstExitDate,
                reEntryDate,
                passportNumber,
                passportExpiry,
                passportFile
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `,
            [
                req.body.applicationId,
                req.body.fullName,
                req.body.nationality,
                req.body.placeOfBirth,
                req.body.countryOfBirth,
                req.body.homeAddress,
                req.body.firstEntryDate,
                req.body.finalExitDate,
                req.body.showCount,
                req.body.earnings,
                req.body.jobTitle,
                req.body.travellingFromIreland,
                req.body.reEnteringUk,
                req.body.firstExitDate,
                req.body.reEntryDate,
                req.body.passportNumber,
                req.body.passportExpiry,
                req.file
                    ? req.file.filename
                    : null
            ],
            err => {

                if (err) {
                    return res
                        .status(500)
                        .json({
                            error: err.message
                        });
                }

                res.json({
                    success: true
                });

            }
        );

    }
);

app.get(
    "/api/members/:applicationId",
    (req, res) => {

        db.all(
            `
            SELECT *
            FROM members
            WHERE applicationId = ?
            ORDER BY id DESC
            `,
            [req.params.applicationId],
            (err, rows) => {

                if (err) {
                    return res
                        .status(500)
                        .json({
                            error: err.message
                        });
                }

                res.json(rows);

            }
        );

    }
);

app.get(
    "/api/member/:id",
    (req, res) => {

        db.get(
            `
            SELECT *
            FROM members
            WHERE id = ?
            `,
            [req.params.id],
            (err, row) => {

                if (err) {
                    return res
                        .status(500)
                        .json({
                            error: err.message
                        });
                }

                res.json(row);

            }
        );

    }
);

app.put(
    "/api/member/:id",
    (req, res) => {

        db.run(
            `
            UPDATE members
            SET
                fullName = ?,
                nationality = ?,
                passportNumber = ?,
                jobTitle = ?
            WHERE id = ?
            `,
            [
                req.body.fullName,
                req.body.nationality,
                req.body.passportNumber,
                req.body.jobTitle,
                req.params.id
            ],
            err => {

                if (err) {
                    return res
                        .status(500)
                        .json({
                            error: err.message
                        });
                }

                res.json({
                    success: true
                });

            }
        );

    }
);

app.delete(
    "/api/member/:id",
    (req, res) => {

        db.run(
            `
            DELETE FROM members
            WHERE id = ?
            `,
            [req.params.id],
            err => {

                if (err) {
                    return res
                        .status(500)
                        .json({
                            error: err.message
                        });
                }

                res.json({
                    success: true
                });

            }
        );

    }
);

/* ==========================
   DASHBOARD
========================== */

app.get(
    "/api/dashboard",
    (req, res) => {

        db.all(
            `SELECT * FROM applications`,
            [],
            (err, applications) => {

                if (err) {
                    return res
                        .status(500)
                        .json({
                            error: err.message
                        });
                }

                if (!applications.length) {
                    return res.json([]);
                }

                let results = [];
                let pending =
                    applications.length;

                applications.forEach(
                    application => {

                        db.all(
                            `
                            SELECT *
                            FROM members
                            WHERE applicationId = ?
                            `,
                            [
                                application.applicationId
                            ],
                            (err, members) => {

                                const progress =
                                    Math.min(
                                        100,
                                        Math.round(
                                            (
                                                members.length /
                                                application.memberCount
                                            ) * 100
                                        )
                                    );

                                results.push({
                                    ...application,
                                    progress,
                                    addedMembers:
                                        members.length
                                });

                                pending--;

                                if (
                                    pending === 0
                                ) {
                                    res.json(
                                        results
                                    );
                                }

                            }
                        );

                    }
                );

            }
        );

    }
);

/* ==========================
   START SERVER
========================== */

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Running on http://localhost:${PORT}`
    );

});