const express=require("express");
const app=express();

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


const request=require("request");

const https=require("https");
////////////////////////////////////////////////////////////////////////////////
app.use(express.static("public"));

/////////////////////////////////////////////////////////////////////////////////

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req,res){

    console.log(req.body.first_name);
    var fname=req.body.first_name;
    var lname=req.body.last_name;
    var dob=req.body.dob;
    var email=req.body.email;


    var data={
            members:[
                {
                    email_address:email,
                    status:"subscribed",
                    merge_fields:{
                        FNAME:fname,
                        LNAME:lname,
                        BIRTHDAT:dob,
                        EMAIL:email

                    }


                }
        ]
    };

    const jsondata=JSON.stringify(data);

    const url="https://us11.api.mailchimp.com/3.0/lists/c2461e23b4";
    const options={
        method:"POST",
        auth: "asdf:7a6b9588f8239b637706c688e239384b-us11"

    }

    const request=https.request(url, options, function(response){
        console.log(response.statusCode);

        if(response.statusCode === 200 )
        {
            res.sendFile(__dirname+"/sucess.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){
                console.log(JSON.parse(data));
        })

        });

        request.write(jsondata);
        request.end();

})


app.post("/failure", function(req,res){
    res.redirect("/");

})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server live on port 3000");
});


//API Key =  74bcc94d75207bac9308e4a73cb1c743-us11


// audience id - c2461e23b4.
