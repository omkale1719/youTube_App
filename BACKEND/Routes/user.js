const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user');
const User = require('../Modals/user');




router.post("/signUp",UserController.signUp)
router.post('/login',UserController.signIn);
router.post('/logout',UserController.logout);


// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('channelName profilePic userName about createdAt');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;