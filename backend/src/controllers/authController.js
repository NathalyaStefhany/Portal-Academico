const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')
const User = require('../models/student');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async(req, res) => {
    try {
        if (await User.findOne({ matriculationNumber }))
            return res.status(400).send({ error: 'Usuário existente' });

        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({ user })
    } catch (err) {
        return res.status(500).send({ error: err });
    }
});

router.post('/authenticate', async(req, res) => {
    const { matNumber, password } = req.body;
    const user = await User.findOne({ matNumber }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'Usuário não encontrado' });

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Senha incorreta' });

    user.password = undefined;
    res.send({
        user,
        token: generateToken({ id: user.matriculationNumber })
    });
});

module.exports = (app) => app.use('/auth', router);