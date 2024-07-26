const mysql=require("mysql2/promise");

const insertDB=async(Size,Name,Price)=>{
    const connection = await mysql.createConnection({
        host: "sql5.freesqldatabase.com",
        user: "sql5721789",
        password: "LHRjg6JSud",
        database: "sql5721789",
        port:3306,
    })
    try {
        await connection.query(
            "INSERT INTO `Sneaker-Store` (Size, Name, Price) VALUES (?,?,?)",
            [Size,Name,Price]
        )
        console.log("Inserted")
    } catch (e) {
        console.log(e)
    }
}

const deleteDB = async (name,size) => {
    const connection = await mysql.createConnection({
        host: "sql5.freesqldatabase.com",
        user: "sql5721789",
        password: "LHRjg6JSud",
        database: "sql5721789",
        port: 3306,
    });

    try {
        const [result] = await connection.execute(
            "DELETE FROM `Sneaker-Store` WHERE Name = ? AND Size = ?",
            [name, size]
        );
        if (result.affectedRows > 0) {
            console.log(`Deleted ${result.affectedRows} record(s)`);
        } else {
            console.log('No records found to delete');
        }
    } catch (e) {
        console.error(e);
    } finally {
        await connection.end();
    }
};
const retrieveRows = async () => {
    const connection = await mysql.createConnection({
        host: "sql5.freesqldatabase.com",
        user: "sql5721789",
        password: "LHRjg6JSud",
        database: "sql5721789",
        port: 3306,
    });

    try {
        const [rows, fields] = await connection.query('SELECT Size, Name, Price FROM `Sneaker-Store`');
        for (const row of rows) {
            const { Size, Name, Price } = row;
            console.log(`Size: ${Size}, Name: ${Name}, Price: ${Price}`);
            const product = {
                name: Name,
                size: Size,
                price: Price,
            };
            return product;
            // Add your processing logic here
        }
    } catch (e) {
        console.error('Error retrieving data:', e);
    } finally {
        await connection.end();
    }
};
insertDB(9.5, 'J Balvin 3',259.99);