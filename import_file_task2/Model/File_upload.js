const Model = require("@longanphuc/orm-mysql").Model
class File_upload extends Model {
	constructor() {
		super("File_upload")
		this.$primaryKey = ["id"]
		this.id = undefined;
		this.orders = undefined;
		this.phone = undefined;
		this.prize = undefined;
		this.voucher = undefined;

	}
}

module.exports = File_upload