var express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
var Muscle = require('./models/Muscle');
var MuscleArea = require('./models/MuscleArea');

router.get('/', function(req, res){
  res.render('index')
});

router.route("/")
.get((req, res) => {
    res.send({
        message: "helloo"
    });
});


router.route("/muscles")
    .get((req, res) => {
        const query = req.query;
        const muscle = Muscle.find()
        if(query.order_by === "name"){
            muscle.sort({
                name: 1
            });
        }
        muscle.exec((err, docs) => {
            if(err !== null) {
                res.status(400)
                    .send({
                        error: err
                    });
                return;
            }
            res.status(200)
                .send(docs)
        })
    })

    router.route("/muscles/new")
    .post((req, res) => {
        const body = req.body;
        const muscle = new Muscle(body);

        muscle.save((err, doc) => {
            if (err !== null){
                res.status(400)
                    .send({
                        error: err
                    });
                return;
            }
            res.status(200)
                .send(doc);
        })
    });    

// the specific muscle
router.route("/muscles/:muscle_id")
    .get((req,res) => {
        const params = req.params;
        // find gives an array of docs, findOne gives one
        Muscle.findOne({_id:params.muscle_id}, (err, doc) => {
            if (err !==null) {
                res.status(400)
                .send({
                    error: err
                });
                return;
            }
            res.status(200)
                .send(doc);
        });
    })
    .put((req,res) => {
        Muscle.findById(req.params.muscle_id, (err, doc) => {
            if(err ==!null){
                res.status(400)
                    .send({
                        error: err
                    })
                return;
            }
            Object.assign(doc, req.body,{score: doc.score += 1}); 
            doc.save((err, savedDoc) => {
                if (err !==null) {
                    res.status(400)
                    .send({
                        error: err
                    });
                    return;
                }
                res.status(200)
                    .send(savedDoc);
            })
            //kinda like combining two objs, can also overwrite
        })
    })
    .delete((req,res) => {
        Muscle.findByIdAndRemove(req.params.muscle_id, (err, doc) => {
            if(err !== null) {
                res.status(400)
                    .send({
                        error: err
                    });
                return;
            }
            res.status(200)
                .send({
                    success: "Item deleted"
                });
        })
    });

    export default router;