const model = {
    root: function(){
        return`<html>
            <head>
                <link rel="stylesheet" href="root.css"></link>
                <title>Welcome to Word Guess!</title>
            </head>
            <body>
                <nav>
                    <div class="header">
                        <h1>Word Guess!</h1>
                        <p>Test your grammer skills</p>
                        <div class = 'nav-links'>
                            <a href='/about' class="link-1">About</a>
                            <a href='/login'>Login</a>
                        </div>
                    </div>
                </nav>
                <div>
                <p>Quiz your vocabulary skills with this game, keep guessing and<br> let's see what score you amass. All you need to do is eneter you username<br> and you can start playing the game.<br><b>All The Best!</b></p>
                </div>
            </body>
        </html>`;
    },

    login: function(){
        return `<html>
                    <head>
                        <link rel="stylesheet" href="root.css"></link>
                        <link rel="stylesheet" href="login.css"></link>
                        <title>Word Guess: Login</title>
                    </head>
                    <body>   
                        <nav>
                            <div class="header">
                                <h1><b>Word Guess!</b></h1>
                                <div class="nav-links">
                                    <a href='/about'>About</a>
                                </div>
                            </div>
                        </nav> 
                        <form action='/main' method = 'POST' class="login-form">
                            <label for="username">Username:</label>
                            <input name="username" class="username" type="text" placeholder="Username"/>
                            <button type='submit' class="login-btn"> Login </button>
                        </form>
                    </body>
                </html>`;
    },

    about: function(){
        return `<html>
                    <head>
                        <link rel="stylesheet" href="root.css"></link>
                        <link rel="stylesheet" href="about.css"></link>
                        <title>Word Guess: About</title>
                    </head>
                    <body>   
                        <nav>
                            <div class="header">
                                <h1><b>Word Guess!</b></h1>
                                <div class="nav-links">
                                    <a href='/login'>Login</a>
                                </div>
                            </div>
                        </nav> 
                        <p>This game was developed by Achintya Singh for the course INFO 6250 - Web Development Tools.<br>The game was developed as a result of the midterm project for the course.<br>To know more about the project you can contact via:<br>email: <a href="mailto:singh.ac@northeastern.edu">singh.ac@northeastern.edu</a></p>
                    </body>
                </html>`;
    },

    main: function(data, username, possibleWords, wordTobeGuessed, counter, lettersInWord, flag, wordGuessed){
        // const { name } = username; ${data.users[name].name}
        //console.log(words);
        //const word=data.possibleWords(wordTobeGuessed);
        //<form action='/logout' method='POST'>
        const guessedWord = lettersInWord || [];
        if(!wordGuessed){
            wordGuessed='';
        }
        counter =counter || 0;
        let correctClass='';
        //let lastWordGuessedCorrectly = data.users[username].wordsGuessed[(data.users[username].wordsGuessed.length)-1] || '';
        if(flag===true)
        {
            correctClass='Correct'
        }
        else if(wordTobeGuessed==='invalid')
        {
            correctClass='Invalid'
        }
        else if(flag === false){
            correctClass='Incorrect'
        }
        else{
            correctClass='';
        }
        return `<html>
                <head>
                    <link rel="stylesheet" href="root.css"></link>
                    <link rel="stylesheet" href="main.css"></link>
                    <title>Word Guess: Hello ${username}</title>
                </head>
                <body>    
                    <nav>
                        <div class="header">
                            <h1><b>Word Guess!</b></h1>
                            <form action='/logout' method="POST">

                                <button type="submit" class='login-btn'>Logout</button>
                            </form>
                        </div>
                    </nav>
                    <div class="intro-to-user">
                        <p class="greetings">Hi ${username}, Welcome back!</p>
                        <div class="current-creds">
                            <p>Current Score:${data.users[username].score}</p>
                            <p>Total Number of Guesses:${data.users[username].guessCount}</p>
                            <p>Previous Attempt: ${data.users[username].lastGuess}</p>
                            <p>Last Word Guessed :${wordGuessed}</p>
                            <p class="words-guessed">Words Guessed: ${data.users[username].wordsGuessed}</p>
                        </div>
                    </div>
                    <div class="working-page">
                    <div class="game-area">
                        <div class="possible-words">
                            <p>Possible Words can be:</p>
                        
                            <span class="list-of-possible-words">`+
                            possibleWords.map( w =>
                                    
                                        ` <mark class="possible-word">${w}</mark>`

                                    ).join(" ")+`
                                    </span>
                                    <br>

                                    <form action='/guess' class="making-a-guess" method="POST" >
                                        <input type="text" name="guessWord" placeholder="enter a letter to guess"> 
                                        <button type="submit">Make a guess</button>
                                    </form>
                            </div>
                                    <div class="gussed-stats">
                                        <p>Matched Letter Are:</p>`+
                                        guessedWord.map( w =>
                                                
                                                    `<ins> ${w}</ins>`

                                                ).join(" ")+`
                                        <p>Numbers of letters matched: ${counter}</p>
                                        <p class="guess-flag-${correctClass.toLowerCase()}">Your Guess was ${correctClass}!</p>
                                    </div>        
                        
                        
                        </div>
                        
                        <form action='/new-game' method="POST">
                            <button type="submit" class="play-a-new-game">Play A New Game</button>
                        </form>
                    </div>
                </body>
            </html>`;
    },
    errorPage : function() {
        return `
        <html>
            <head>
                <link rel="stylesheet" href="root.css"></link>
                <title>401-Error</title>
            </head>
            <body>
                <nav>
                    <div class="header">
                        <h1><b>Word Guess!</b></h1>
                            <a href='/login'>Login</a>       
                    </div>
                </nav>
                <h1>401<br>Illegal Username! Please Enter a valid username.</h1>
                <a href='/'> Try Again</a>
            </body>
        </html>
        `;
    }
}

module.exports = model;