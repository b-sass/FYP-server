INSERT INTO assignment (name, subject, description, targetGrade, actualGrade, dueDate)
VALUES
("Coursework 1", "MAD", DEFAULT, 80, DEFAULT, NOW()),
("Coursework 2", "MAD", DEFAULT, 100, DEFAULT, NOW()),
("Coursework 1", "Prog 3", "DYOPL", 80, 95, NOW());


INSERT INTO user (email, password, username, phoneID)
VALUES
("alice@hotmail.co.uk", "alicepass", "alice123", "1a1a1a1a"),
("bob@gmail.com", "bobpass", NULL, NULL),
("charlie@yahoo.co.uk", "charliepass", "charls", "9a9b9c9d");


INSERT INTO session (name, description, startDate, endDate)
VALUES
("Short session 🍉", NULL, DEFAULT, DEFAULT),
("Long Session 🌑", NULL, DEFAULT, DEFAULT),
("I am cooked 💀", "Last grace", DEFAULT, DEFAULT),
("Skibidi sigma", "ohio rizz", DEFAULT, DEFAULT);

INSERT INTO sessionTargets (sessionID, name, priority, completed)
VALUES 
(1, "Target 1", "Low", 0),
(2, "Target 2", "Medium", 1),
(3, "Target 3", "High", 0),
(4, "Target 1", "Low", 0),
(1, "Target 2", "Medium", 1),
(2, "Target 3", "High", 0),
(3, "Target 1", "Low", 1),
(4, "Target 2", "Medium", 0),
(1, "Target 3", "High", 1),
(2, "Target 1", "Low", 0),
(3, "Target 2", "Medium", 0),
(4, "Target 3", "High", 1);

INSERT INTO userSessions
VALUES
(1, 1),
(3, 2),
(2, 3),
(2,4);

INSERT INTO userAssignments
VALUES
(1,3),
(2,2),
(3,1);