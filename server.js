const express = require ( "express" );
const bodyParser = require ( "body-parser" );
const jwt = require ( "jsonwebtoken" );
const mysql = require ( "mysql" );

const app = express();
app.use ( bodyParser.json() );

const knex = require ( "knex" ) ({
    client : "mysql" , 
    connection : {
        host : "localhost",
        user : "root",
        password : "bhavnes",
        database : "access_control"
    }
});


knex.schema.hasTable ( "Users" ).then( exists => {
    if ( !exists ) {
        knex.schema.createTable ( "Users" , ( table ) => {
            table.increments ( "Id" ).primary(),
            table.string ( "Email" ).unique().notNullable(),
            table.string ( "Password" ).notNullable(),
            table.string ( "Name" ),
            table.string ( "Role" ),
            table.string ( "Access" )
        }).then (( data ) => {
            console.log ( "Table created" );
            // console.log ( data );
        }).catch (( err ) => {
            console.log ( err );
        });
    }else {
        console.log ( "Table already created" );
    };
});

knex.schema.hasTable ( "Resources" ).then ( exists => {
    if ( !exists ) {
        knex.schema.createTable ( "Resources" , ( table ) => {
            table.increments ( "Id").primary (),
            table.string ( "Name" ),
            table.string ( "Type" )
        }).then (( data ) => {
                // console.log ( data )
                console.log ( "Table created" );
        }).catch (( err ) => {
            console.log ( err );
        });
    }else {
        console.log ( "Table already created" );
    };
});

var register = express.Router ();
app.use ( "/register" , register );
require ( "./Routes/register") ( register, knex, jwt );

var login = express.Router();
app.use ( "/login" , login );
require ( "./Routes/login" ) ( login, knex, jwt );

var resources = express.Router();
app.use ( "/resources" , resources );
require ( "./Routes/resources" ) ( resources, knex, jwt );

app.listen (6000, () => {
    console.log ( "Your app is running on port 6000");
})
