
const bcrypt    = require('bcryptjs')
const mysql     = require('mysql2')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'belajar_database',
})
db.connect()

module.exports =
{
    get_semua_user: function() {
        let sql = mysql.format(
            `SELECT * FROM user;`
        )

        return new Promise( (resolve,reject)=>{
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },


    tambah: function(req) {
        let data = {
            // nama kolom di sql: req.body.name
            username    : req.body.form_username,
            password    : bcrypt.hashSync( req.body.form_password ),
            nama_lengkap: req.body.nama_lengkap,
        }
        let sql = mysql.format(
            `INSERT INTO user SET ?`,
            [data]
        )

        return new Promise( (resolve,reject)=>{
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    }
}