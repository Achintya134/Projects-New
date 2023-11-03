const express = require('express');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuidv4  = require('uuid').v4;
const app = express();
app.use(cookieParser());

const model = require('./view/model');
const data = require('./data/data');
const words = require('./words');
const { users } = require('./data/data');
app.use(express.static('./public'));

let wordTobeGuessed= '';
let possibleWords=[];
let counter = 0;
let lettersInWord=[];
let flag=true;
let checkFlag=true;
let startFlag=false;
let wordGuessed='';

const compareWords = function(guess){
    let word=wordTobeGuessed.toUpperCase().split('');
    let guessedWord = guess.toUpperCase().split('');
    checkFlag=true;
    counter=0;

    if(guess.toLowerCase() === wordTobeGuessed.toLowerCase())
    {
        flag=true;
        lettersInWord= word;
        counter=wordTobeGuessed.length;
    }
    else
    {
        flag = false;
        for(let checkWord in words){
            if(guess === words[checkWord])
            {
                checkFlag = true;
                break;
            }
            checkFlag = false;

        }
        if(checkFlag === true)
        {
            for(let c in word)
            {
                for(let c2 in guessedWord)
                {
                    if(word[c] === guessedWord[c2])
                    {
                        counter++;
                        lettersInWord.push(guessedWord[c2]);
                        guessedWord.splice(c2,1); 
                        break;
                    }
                }
            }
        }
    }
}


words.map(element =>{
    data.words.push(element);
})

app.get('/', (req, res) => {
    const sid = req.cookies.sid || null;
    if(!sid){
        res.send(model.login());
    }
    else{
        if(checkFlag === false){
            res.send(model.main(data,data.sessions[sid],possibleWords,'invalid', counter, lettersInWord, checkFlag, wordGuessed));
        }
        else if(counter>0){
        res.send(model.main(data,data.sessions[sid],possibleWords,wordTobeGuessed, counter, lettersInWord, flag, wordGuessed));
        }
        else if(startFlag === false){
            res.send(model.main(data,data.sessions[sid],possibleWords,wordTobeGuessed,null,null,null,wordGuessed));
        }
        else
        {
            res.send(model.main(data,data.sessions[sid],possibleWords,wordTobeGuessed,0, [], flag, wordGuessed));
        }
    }
})



app.post('/main',express.urlencoded({extended: false}), (req, res) => {
    const sid = uuidv4();
    const { username } = req.body;
    const nameCheck = /^[A-Za-z0-9]*$/
    //username includes only alphabets and numbers  
    if(username.toLowerCase() === 'dog' || nameCheck.test(username) === false || username === '')
    {
        res.status(401).send(model.errorPage());
        return;
    }
    res.cookie('sid',sid);
    data.addSessionID( username, sid);
    data.addUserSession(username);
    
    if(!data.users[username].wordsGiven)
    {
        res.redirect(307,'/new-game');
        
    }
    else{
        res.redirect('/');

    }
})


app.post('/logout', express.urlencoded({extended: false}), (req, res) => {
    const sid = req.cookies.sid;
    data.deleteSessionID(sid);
    res.clearCookie("sid");
    res.redirect('/');
});


app.post(('/new-game'), express.urlencoded({extended: false}), (req,res) => {
    const sid = req.cookies.sid;
    if(!sid){
        res.redirect('/');
    }
    else{

        wordTobeGuessed = data.selectsecretWord(data.sessions[sid]);
        counter=0;
        lettersInWord=[];
        flag=true;
        possibleWords = [];
        checkFlag=true;
        startFlag=false;
        possibleWords=data.possibleWords(wordTobeGuessed);
        guessedWord = wordTobeGuessed;
        console.log(data.sessions[sid]);
        console.log(wordTobeGuessed);
        res.redirect('/');
    }
    
});

app.post(('/guess'), express.urlencoded({extended: false}), (req,res) => {
    const sid = req.cookies.sid;
    if(!sid){
        res.redirect('/');
    }
    else
    {
        startFlag = true;
        const { guessWord } = req.body;
        wordGuessed = guessWord+'';
        
        lettersInWord=[];
        compareWords(guessWord+'');
        if(flag === true){
            data.addUserSession(data.sessions[sid], wordTobeGuessed);
        }
        else{
            data.addUserSession(data.sessions[sid], '');
        }
        res.cookie('sid',sid);
        res.redirect('/');
    }
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!Please check if you deleted the SID from a previous session!');
 });

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));