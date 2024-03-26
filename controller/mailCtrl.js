const { StatusCodes } = require("http-status-codes")
const mailsend = require('../config/mail')

//send an email
const sendEmail = async (req,res) => {
    try {
        const { to, subject, content } = req.body
        
        const filesData = [
            {
                filename: "data.txt",
                path: "http://localhost:4800/data.txt"
            },
            {
                filename: "h.pdf",
                path: "http://localhost:4800/h.pdf"
            },
        ]

        //send email
        const mailRes = await mailsend(to,subject,content)

        // if mail rejected
        if(mailRes.rejected[0] === to)
            return res.status(StatusCodes.CONFLICT).json({ success: false, msg: `Error sending emial to ${to}`})

        //if mail id accepted
        if(mailRes.accepted[0] === to)
            return res.status(StatusCodes.ACCEPTED).json({ success: true, msg: `email sent successfully to ${to}`})

    } catch (err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message})
    }
}

// read a stored email
const readEmail = async (req,res) => {
    try {
        res.json({ msg: "read mail"})
    }catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message})
    }
}

// delete stored email
const deleteEmail = async (req,res) => {
    try {
        res.json({ msg: "delete mail"})
    }catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.message})
    }
}

module.exports = { sendEmail, readEmail, deleteEmail }