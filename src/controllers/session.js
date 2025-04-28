import Session from "../models/Session.js";

let getSessions = async (req, res) => {
    const userEmail = req.email;

    try {
        let sessions = await Session.find({ users: userEmail });
        res.status(200).json({
            status: "success",
            message: "Sessions retrieved.",
            sessions: sessions,
        });
    } catch (err) {
        console.log("ERR:" + err);
        res.status(500).json({
            status: "error",
            error: [err],
            message: "Internal Server Error",
        })
    }
}

let createSession = async (req, res) => {
    const { name, target, startDate, endDate, tasks } = req.body;
    const userEmail = req.email;

    try {
        let session = new Session({
            name: name,
            target: target,
            startDate: startDate,
            endDate: endDate,
            tasks: tasks,
            users: [userEmail],
        });

        await session.save()
        res.status(200).json({
            status: "success",
            message: "Session created."
        });
    } catch (err) {
        console.log("ERR:" + err);
        res.status(500).json({
            status: "error",
            error: [err],
            message: "Internal Server Error",
        })
    }
}

let updateSession = async (req, res) => {
    const { id, name, target, startDate, endDate, tasks } = req.body;

    try {
        let session = await Session.findById(id);

        if (!session) {
            return res.status(404).json({
                status: "failed",
                message: "Session not found."
            });
        }

        session.name = name;
        session.target = target;
        session.startDate = startDate;
        session.endDate = endDate;
        session.tasks = tasks;

        await session.save()
        res.status(200).json({
            status: "success",
            message: "Session updated."
        });
    } catch (err) {
        console.log("ERR:" + err);
        res.status(500).json({
            status: "error",
            error: [err],
            message: "Internal Server Error",
        })
    }
}

export default { getSessions, createSession, updateSession };