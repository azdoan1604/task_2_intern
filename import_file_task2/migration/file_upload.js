const Schema = require('@longanphuc/orm-mysql').Schema
const Table = require("@longanphuc/orm-mysql").Table
const up = async () => {
    await Schema.CreateTable(() => {
        let table = new Table("File_upload")
        table.name("id").type("int").primaryIncrement()
        table.name("orders").type("VARCHAR", 200)
        table.name("phone").type("varchar", 200)
        table.name("prize").type("varchar", 200)
        table.name("voucher").type("varchar", 200)
        return table
    }, true)
}
const down = async () => {
    await Schema.DropTable("File_upload")
}
module.exports = {
    up: up,
    down: down
}