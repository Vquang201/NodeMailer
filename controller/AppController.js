const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

class AppController {

    //test
    async sigup(req, res) {
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        let message = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world !!!!!", // plain text body
            html: "<b>Hello world?</b>", // html body
        }

        transporter.sendMail(message)
            .then(info => {
                return res.status(201).json({
                    mess: 'you should receve an email',
                    info: info.messageId,
                    preview: nodemailer.getTestMessageUrl(info)
                })
            })
            .catch(err => {
                return res.status(500).json({ err })
            })

    }

    // send mail from real mail
    async getBill(req, res) {

        const { userEmail } = req.body

        let config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                password: process.env.PASSWORD
            }

        }

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(config)

        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'Mailgen',
                link: 'https://mailgen.js/'
                // Optional product logo
                // logo: 'https://mailgen.js/img/logo.png'
            }
        })

        let respone = {
            body: {
                name: 'Van Quang',
                intro: 'your bill has arrived',
                table: {
                    data: [
                        {
                            item: 'Nodemailer stack book',
                            description: 'a backend application',
                            price: '$10.00'
                        }
                    ]
                },
                outro: 'looking forward to do more business  '
            }
        }

        let mail = mailGenerator.generate(respone)

        let mess = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'place order',
            html: mail
        }

        transporter.sendMail(mess)
            .then((info) => {
                return res.status(200).json({
                    mess: 'You should receive an email',
                })
            })
            .catch(err => {
                return res.status(500).json({ err })
            })
    }

}

module.exports = new AppController