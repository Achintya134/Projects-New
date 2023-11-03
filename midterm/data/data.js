const sessions={};
const users={};
let secretWord='';

const words=[];


const addUserSession = function(username, word){
    
    if(!users[username]){
        //users[username]={name: username};
        //const wordsGiven= [];
        users[username]={name: username, score:0, guessCount: 0, wordsGuessed:[] ,lastGuess: 'First Word Not Guessed Yet!'};
        return;
    }
    let totalScore = users[username].score;
    const wordsGuessedCurrentSet = users[username].wordsGuessed || [];
    let guessCount=users[username].guessCount;
    
    if(word !== undefined){
        // wordsGiven.push(secretWord);
        //if the word is guessed incorrectly
        if(word === ''){
            guessCount=guessCount+1;
            users[username]={...users[username], guessCount: guessCount,
                lastGuess: 'Last Word Not Guessed Yet!'};
        }
        //if the word is guessed correctly
        else{
            wordsGuessedCurrentSet.push(word);
            guessCount=guessCount+1;
            totalScore = users[username].score+1;
            users[username]={...users[username],guessCount:guessCount,
                score: totalScore, wordsGuessed: wordsGuessedCurrentSet, lastGuess: 'Last Word Guessed Correctly!'};

        }
        
    }
    
}

const addSessionID = function(username, sid){
    sessions[sid] = username;
}

const deleteSessionID = function(sid){
    delete sessions.sid;
}

const possibleWords = function(secretWord){
    
    let arrayWords=words.sort(() => Math.random() - 0.5);
    const index = arrayWords.indexOf(secretWord);
    arrayWords.splice(index,1);
    arrayWords = arrayWords.slice(0,5);
    arrayWords.push(secretWord);
    arrayWords=arrayWords.sort(() => Math.random() - 0.5);
    return arrayWords;
}


const selectsecretWord = function(username){
    const arrayWords=words.sort(() => Math.random() - 0.5);
    const wordsGiven=[];
    let flag=false;
    
        if(!users[username].wordsGiven){
            secretWord = arrayWords[0];
            wordsGiven.push(secretWord);
            users[username]={...users[username], wordsGiven: wordsGiven}
            //possibleWords(secretWord);
            return secretWord;
        }
        else{
            for(let wordSelected in arrayWords) {
            users[username].wordsGuessed.forEach(element => {
                if(arrayWords[wordSelected] === element){
                    flag=true;
                }
            });
            if(flag === false){
                secretWord = arrayWords[wordSelected];
                const wordsGiven=users[username].wordsGiven
                wordsGiven.push(secretWord);
                users[username]={...users[username], wordsGiven}
                return secretWord;
                break;
            }
        }
    };
}


const data={
    sessions,
    users,
    secretWord,
    words,
    addUserSession,
    addSessionID,
    deleteSessionID,
    selectsecretWord,
    possibleWords
}

module.exports =data;