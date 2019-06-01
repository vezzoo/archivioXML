import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Parallax from "./components/Parallax";
import './Home.css';
import Dropzone from 'react-dropzone'
import bg from "./img/bg.jpg";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from "@material-ui/core/Grid";
import converter from "xml-js";

const styles = {
    centerAlign: {
        margin: "auto",
        width: "90%"
    },
    centeeeeeeeerAlign: {
        margin: "auto"
    },
    wrongColor: {
        color: "red"
    },
    rightColor: {
        color: "black"
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "yellow !important"
    }
};

class Home extends React.Component {

    /*
        Valkeys type:

        [
          {
              key: "aa",
              val: "bb"
          },
          {
              key: "cc",
              val: "dd"
          }
        ]
    */

    dataAreCorrect() {
        let unique = [];
        this.state.valKeys.forEach(e => {
            if (!unique.includes(e.key)) {
                unique.push(e.key);
            } else {
                this.state.wrong.push(unique.indexOf(e.key));
                this.state.wrong.push(this.state.valKeys.indexOf(e));
                this.forceUpdate();
            }
        });

        return this.state.valKeys.length === unique.length;
    }

    containsKey(key, slice, index) {
        this.state.valKeys.forEach((e) => {
            if (index) {
                if (this.state.valKeys.indexOf(e) !== index) {
                    if (e.key.slice(slice, e.key.length) === key)
                        return true;
                }
            } else {
                if (e.key.slice(slice, e.key.length) === key)
                    return true;
            }
        });

        return false;
    }

    random(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;

        do {
            for (let i = 0; i < length; i++)
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
        } while (this.containsKey(result, 8));

        return result;
    }

    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            valKeys: [],
            openValKeys: false,
            wrong: [],
            wrongColor: "red",
            wrongText: "Inserire una chiave univoca",
            rightColor: "black",
            rightText: "Inserire la chiave"
        };
        this.onDropHandler = this.onDropHandler.bind(this);
    }

    onDropHandler = (acceptedFiles) => {
        console.log("file: " + acceptedFiles);
        this.setState({
            fileName: "",
            valKeys: [],
            openValKeys: false,
            wrong: [],
            wrongColor: "red",
            wrongText: "Inserire una chiave univoca",
            rightColor: "black",
            rightText: "Inserire la chiave"
        });
        const file = acceptedFiles.map((file) =>
            file.name
        );
        this.state.valKeys.push({
            key: "Chiave-" + this.random(10),
            val: "Valore"
        });
        this.setState({fileName: file, openValKeys: true});
        console.log("fileName: " + file);
    };

    render() {
        const {classes} = this.props;
        let fileName = this.state.fileName;

        return (
            <div>
                <Parallax image={bg}>
                    <Paper className={classes.centerAlign}>
                        <div className={classes.centeeeeeeeerAlign}>
                            <h2>Archivio XML 2.0</h2>
                        </div>
                        <Dropzone onDrop={acceptedFiles => this.onDropHandler(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <div className={classes.centeeeeeeeerAlign}>
                            <h3>{fileName}</h3>
                        </div>
                        <Button onClick={() => this.setState({openValKeys: true})} color="primary">
                            Modifica
                        </Button>
                        <Button onClick={() => this.setState({
                            fileName: "",
                            valKeys: [],
                            openValKeys: false,
                            wrong: [],
                            wrongColor: "red",
                            wrongText: "Inserire una chiave univoca",
                            rightColor: "black",
                            rightText: "Inserire la chiave"
                        })} color="primary">
                            Annulla
                        </Button>
                        <Button onClick={() => console.log("TODO")} color="primary">
                            Send
                        </Button>
                    </Paper>
                </Parallax>

                <Dialog
                    open={this.state.openValKeys}
                    onClose={() => this.setState({openValKeys: false})}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Dettagli file</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Inserisci i dettagli del file
                        </DialogContentText>
                        <Grid container style={{margin: 0, padding: 0}}>
                            {Object.keys(this.state.valKeys).map((e, i) => {
                                return (
                                    <Grid item xs={12}>
                                        <Grid container style={{margin: 0, padding: 0}}>
                                            <Grid item xs={1}>
                                                <ChevronRightIcon/>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Grid container style={{margin: 0, padding: 0}}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            placeholder={this.state.valKeys[i].key}
                                                            helperText={this.state.wrong.includes(i) ? this.state.wrongText : this.state.rightText}
                                                            onChange={e => {
                                                                this.state.valKeys[i].key = e.target.value;
                                                                this.forceUpdate();
                                                            }}
                                                            error={this.state.wrong.includes(i)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={1}/>
                                                    <Grid item xs={5}>
                                                        <TextField
                                                            placeholder={this.state.valKeys[i].val}
                                                            helperText={"Inserire il valore"}
                                                            onChange={e => {
                                                                this.state.valKeys[i].val = e.target.value;
                                                                this.forceUpdate();
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Grid container style={{margin: 0, padding: 0}}>
                                                    <Grid item xs={5}>
                                                        {i === (this.state.valKeys.length - 1) &&
                                                        <Button onClick={() => {
                                                            this.state.valKeys.push({
                                                                key: "Chiave-" + this.random(10),
                                                                val: "Valore"
                                                            });

                                                            this.forceUpdate();
                                                        }}>
                                                            <AddIcon/>
                                                        </Button>}
                                                    </Grid>
                                                    <Grid item xs={1}/>
                                                    <Grid item xs={6}>
                                                        <Button disabled={this.state.valKeys.length < 2}
                                                                onClick={() => {
                                                                    this.state.valKeys.splice(i, 1);

                                                                    this.forceUpdate();
                                                                }}>
                                                            <DeleteIcon/>
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>);
                            })}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openValKeys: false})} color="primary">
                            Annulla
                        </Button>
                        <Button disabled={this.state.valKeys.length < 1} onClick={() => {
                            this.setState({wrong: []}, () => {
                                if (this.dataAreCorrect()) {
                                    this.setState({openValKeys: false});

                                    let json = {
                                        "declaration": {
                                            "attributes": {
                                                "version": "1.0",
                                                "encoding": "utf-8"
                                            }
                                        },
                                        "elements": [
                                            {
                                                "type": "element",
                                                "name": "Root",
                                                "attributes": {
                                                    "fileName": this.state.fileName[0]
                                                },
                                                "elements": [

                                                ]
                                            }
                                        ]
                                    };

                                    let i = 0;
                                    this.state.valKeys.forEach((e) => {
                                        json.elements[0].elements.push({
                                            "type": "element",
                                            "name": "Key" + i,
                                            "attributes": {
                                                "key": e.key,
                                                "value": e.val
                                            }
                                        });
                                        i++;
                                    });

                                    let converted = converter.json2xml(json, {compact: false, ignoreComment: true, spaces: 4});
                                    this.setState({converted: converted}, () => {
                                        console.log("converted to XML: " + this.state.converted)
                                    });
                                } else {
                                    this.forceUpdate();
                                }
                            });

                        }} color="primary">
                            Inserisci
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}

export default withStyles(styles)(Home);